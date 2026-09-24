import { describe, expect, it } from 'vitest'
import { buildTripFromForm } from './stampAssist'

const fixedId = () => 't_test_1'

describe('buildTripFromForm', () => {
  it('builds a trip with optional label', () => {
    const result = buildTripFromForm(
      {
        country: 'Spain',
        entry: '2026-03-01',
        exit: '2026-03-10',
        label: '  Stamp photo  ',
      },
      fixedId,
    )
    expect(result).toEqual({
      ok: true,
      trip: {
        id: 't_test_1',
        country: 'Spain',
        entry: '2026-03-01',
        exit: '2026-03-10',
        label: 'Stamp photo',
      },
    })
  })

  it('omits empty label', () => {
    const result = buildTripFromForm(
      {
        country: 'France',
        entry: '2026-01-01',
        exit: '2026-01-01',
        label: '   ',
      },
      fixedId,
    )
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.trip).toEqual({
        id: 't_test_1',
        country: 'France',
        entry: '2026-01-01',
        exit: '2026-01-01',
      })
      expect(result.trip.label).toBeUndefined()
    }
  })

  it('rejects exit before entry', () => {
    const result = buildTripFromForm(
      {
        country: 'Italy',
        entry: '2026-03-10',
        exit: '2026-03-01',
      },
      fixedId,
    )
    expect(result).toEqual({
      ok: false,
      error: 'Exit (2026-03-01) is before entry (2026-03-10).',
    })
  })

  it('rejects missing country or dates', () => {
    expect(
      buildTripFromForm({ country: '', entry: '2026-01-01', exit: '2026-01-02' }, fixedId)
        .ok,
    ).toBe(false)
    expect(
      buildTripFromForm({ country: 'Spain', entry: '', exit: '2026-01-02' }, fixedId).ok,
    ).toBe(false)
    expect(
      buildTripFromForm({ country: 'Spain', entry: '2026-01-01', exit: '' }, fixedId).ok,
    ).toBe(false)
  })
})
