import { describe, expect, it } from 'vitest'
import {
  countDaysInclusive,
  daysRemaining,
  daysUsed,
  status,
  windowBounds,
  type Trip,
} from './schengen'
import { decodeTripsFromSearch, encodeTripsToSearch } from './tripsPersist'

function trip(
  partial: Omit<Trip, 'id' | 'country'> & { id?: string; country?: string },
): Trip {
  return {
    id: partial.id ?? 't1',
    country: partial.country ?? 'Spain',
    entry: partial.entry,
    exit: partial.exit,
    label: partial.label,
  }
}

/**
 * 90 consecutive Schengen days positioned so the oldest day sits on the
 * 180-day window start for `asOfEnd`. That way:
 * - asOf === asOfEnd → used 90
 * - asOf === asOfEnd + 1 day → used 89 (oldest day dropped)
 *
 * JOB text said "90 consecutive days ending 2026-06-01"; with a real 180-day
 * window a block that *exits* on 2026-06-01 would still all fit on 2026-06-02.
 * Aligning to window start matches the required used 90 → 89 behavior.
 */
function ninetyDaysAlignedToWindow(asOfEnd: string, country = 'France'): Trip {
  const { start } = windowBounds(asOfEnd)
  const startMs = Date.UTC(+start.slice(0, 4), +start.slice(5, 7) - 1, +start.slice(8, 10), 12)
  const end = new Date(startMs)
  end.setUTCDate(end.getUTCDate() + 89)
  const y = end.getUTCFullYear()
  const m = String(end.getUTCMonth() + 1).padStart(2, '0')
  const d = String(end.getUTCDate()).padStart(2, '0')
  return trip({ id: 'ninety', country, entry: start, exit: `${y}-${m}-${d}` })
}

describe('Schengen date engine', () => {
  it('1. one-day trip counts as 1', () => {
    expect(countDaysInclusive('2026-03-10', '2026-03-10')).toBe(1)
    const trips = [trip({ entry: '2026-03-10', exit: '2026-03-10', country: 'Spain' })]
    expect(daysUsed(trips, '2026-03-10')).toBe(1)
  })

  it('2. 2026-03-01 to 2026-03-10 is 10 days used', () => {
    expect(countDaysInclusive('2026-03-01', '2026-03-10')).toBe(10)
    const trips = [trip({ entry: '2026-03-01', exit: '2026-03-10', country: 'Spain' })]
    expect(daysUsed(trips, '2026-03-10')).toBe(10)
  })

  it('3. overlapping trips count unique days only', () => {
    const trips = [
      trip({ id: 'a', entry: '2026-03-01', exit: '2026-03-10', country: 'Italy' }),
      trip({ id: 'b', entry: '2026-03-05', exit: '2026-03-08', country: 'Italy' }),
    ]
    expect(daysUsed(trips, '2026-03-10')).toBe(10)
  })

  it('4. trip outside 180-day window contributes 0', () => {
    const trips = [trip({ entry: '2026-03-01', exit: '2026-03-10', country: 'Spain' })]
    expect(daysUsed(trips, '2026-12-01')).toBe(0)
  })

  it('5. 90 consecutive days for window ending 2026-06-01, asOf 2026-06-01 → used 90, remaining 0', () => {
    const trips = [ninetyDaysAlignedToWindow('2026-06-01')]
    expect(countDaysInclusive(trips[0].entry, trips[0].exit)).toBe(90)
    expect(daysUsed(trips, '2026-06-01')).toBe(90)
    expect(daysRemaining(trips, '2026-06-01')).toBe(0)
  })

  it('6. same 90 days, asOf 2026-06-02 → used 89 (oldest day dropped)', () => {
    const trips = [ninetyDaysAlignedToWindow('2026-06-01')]
    expect(daysUsed(trips, '2026-06-02')).toBe(89)
    expect(daysRemaining(trips, '2026-06-02')).toBe(1)
  })

  it('7. exit before entry throws clear error', () => {
    expect(() => countDaysInclusive('2026-03-10', '2026-03-01')).toThrow(/before/i)
    const bad = [trip({ entry: '2026-03-10', exit: '2026-03-01', country: 'Germany' })]
    expect(() => daysUsed(bad, '2026-03-10')).toThrow(/before/i)
  })

  it('8. Ireland-only trip contributes 0 Schengen days', () => {
    const trips = [trip({ entry: '2026-03-01', exit: '2026-03-20', country: 'Ireland' })]
    expect(daysUsed(trips, '2026-03-20')).toBe(0)
    expect(daysRemaining(trips, '2026-03-20')).toBe(90)
  })

  it('9. empty trip list → used 0, remaining 90, Safe', () => {
    expect(daysUsed([], '2026-06-01')).toBe(0)
    expect(daysRemaining([], '2026-06-01')).toBe(90)
    expect(status([], '2026-06-01')).toBe('Safe')
  })
})

describe('tripsPersist encode/decode round-trip', () => {
  it('entry and exit survive as different strings (Spain 2026-03-01 / 2026-03-10)', () => {
    const trips: Trip[] = [
      {
        id: 't_spain',
        country: 'Spain',
        entry: '2026-03-01',
        exit: '2026-03-10',
        label: 'Spring',
      },
    ]
    const encoded = encodeTripsToSearch(trips, '2026-03-10')
    expect(encoded).toContain('entry')
    expect(encoded).toContain('exit')
    const decoded = decodeTripsFromSearch(encoded)
    expect(decoded).not.toBeNull()
    expect(decoded!.trips).toHaveLength(1)
    expect(decoded!.trips[0].entry).toBe('2026-03-01')
    expect(decoded!.trips[0].exit).toBe('2026-03-10')
    expect(decoded!.trips[0].entry).not.toBe(decoded!.trips[0].exit)
    expect(decoded!.trips[0].country).toBe('Spain')
    expect(decoded!.asOf).toBe('2026-03-10')
  })

  it('accepts legacy e/x keys on decode', () => {
    const legacy =
      '?asOf=2026-03-10&trips=' +
      encodeURIComponent(
        JSON.stringify([{ i: 'leg1', c: 'Spain', e: '2026-03-01', x: '2026-03-10' }]),
      )
    const decoded = decodeTripsFromSearch(legacy)
    expect(decoded).not.toBeNull()
    expect(decoded!.trips[0].entry).toBe('2026-03-01')
    expect(decoded!.trips[0].exit).toBe('2026-03-10')
  })

  it('does not silently set exit=entry when exit missing', () => {
    const bad =
      '?asOf=2026-03-10&trips=' +
      encodeURIComponent(JSON.stringify([{ i: 'bad1', c: 'Spain', entry: '2026-03-01' }]))
    const decoded = decodeTripsFromSearch(bad)
    expect(decoded).not.toBeNull()
    expect(decoded!.trips).toHaveLength(0)
  })
})
