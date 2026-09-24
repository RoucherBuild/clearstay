import { describe, expect, it } from 'vitest'
import { countDaysInclusive, daysUsed, type Trip } from './schengen'
import { previewStayWithTrip } from './stayPreview'

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

describe('previewStayWithTrip', () => {
  it('empty window + proposed trip increases used by inclusive days', () => {
    const proposed = { country: 'Spain', entry: '2026-03-01', exit: '2026-03-10' }
    const inclusive = countDaysInclusive(proposed.entry, proposed.exit)
    expect(inclusive).toBe(10)

    const baseline = daysUsed([], '2026-03-10')
    expect(baseline).toBe(0)

    const preview = previewStayWithTrip([], '2026-03-10', proposed)
    expect(preview.used).toBe(baseline + inclusive)
    expect(preview.remaining).toBe(90 - inclusive)
    expect(preview.status).toBe('Safe')
  })

  it('does not mutate the original trips array', () => {
    const trips = [trip({ entry: '2026-03-01', exit: '2026-03-05', country: 'France' })]
    const before = trips.length
    previewStayWithTrip(trips, '2026-03-10', {
      country: 'Italy',
      entry: '2026-03-08',
      exit: '2026-03-10',
    })
    expect(trips).toHaveLength(before)
  })

  it('exit before entry throws clear error', () => {
    expect(() =>
      previewStayWithTrip([], '2026-03-10', {
        country: 'Germany',
        entry: '2026-03-10',
        exit: '2026-03-01',
      }),
    ).toThrow(/before/i)
  })

  it('overlapping proposed days count once with existing trips', () => {
    const trips = [trip({ id: 'a', entry: '2026-03-01', exit: '2026-03-10', country: 'Italy' })]
    const preview = previewStayWithTrip(trips, '2026-03-10', {
      country: 'Italy',
      entry: '2026-03-05',
      exit: '2026-03-08',
    })
    expect(preview.used).toBe(10)
  })
})
