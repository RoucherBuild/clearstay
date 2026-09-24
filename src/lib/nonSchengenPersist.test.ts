import { describe, expect, it } from 'vitest'
import {
  NON_SCHENGEN_STORAGE_KEY,
  isValidNonSchengenTripRange,
  loadNonSchengenStore,
  saveNonSchengenStore,
  sumInclusiveDays,
  tripInclusiveDays,
  type NonSchengenStore,
} from './nonSchengenPersist'

function memoryStorage(initial: Record<string, string> = {}) {
  const map = new Map<string, string>(Object.entries(initial))
  return {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    setItem(key: string, value: string) {
      map.set(key, String(value))
    },
    removeItem(key: string) {
      map.delete(key)
    },
    raw: map,
  }
}

describe('isValidNonSchengenTripRange', () => {
  it('accepts entry === exit (one inclusive day)', () => {
    expect(isValidNonSchengenTripRange('2026-06-01', '2026-06-01')).toBe(true)
  })

  it('accepts entry before exit', () => {
    expect(isValidNonSchengenTripRange('2026-06-01', '2026-06-10')).toBe(true)
  })

  it('rejects exit before entry', () => {
    expect(isValidNonSchengenTripRange('2026-06-10', '2026-06-01')).toBe(false)
  })

  it('rejects non-YMD strings', () => {
    expect(isValidNonSchengenTripRange('06/01/2026', '2026-06-10')).toBe(false)
  })
})

describe('sumInclusiveDays / tripInclusiveDays', () => {
  it('counts a single-day trip as 1', () => {
    expect(
      tripInclusiveDays({ id: 'a', entry: '2026-04-01', exit: '2026-04-01' }),
    ).toBe(1)
  })

  it('sums trip lengths inclusively', () => {
    const total = sumInclusiveDays([
      { id: 'a', entry: '2026-04-01', exit: '2026-04-05' }, // 5
      { id: 'b', entry: '2026-05-01', exit: '2026-05-03' }, // 3
    ])
    expect(total).toBe(8)
  })

  it('double-counts overlapping trips (documented behaviour)', () => {
    const total = sumInclusiveDays([
      { id: 'a', entry: '2026-04-01', exit: '2026-04-05' }, // 5
      { id: 'b', entry: '2026-04-03', exit: '2026-04-04' }, // 2
    ])
    expect(total).toBe(7)
  })
})

describe('loadNonSchengenStore / saveNonSchengenStore', () => {
  it('round-trips a valid store', () => {
    const storage = memoryStorage()
    const data: NonSchengenStore = {
      uk: [
        {
          id: 'ns1',
          entry: '2026-07-01',
          exit: '2026-07-10',
          label: 'London',
        },
      ],
      ireland: [],
    }
    saveNonSchengenStore(data, storage)
    expect(storage.getItem(NON_SCHENGEN_STORAGE_KEY)).toBeTruthy()
    const loaded = loadNonSchengenStore(storage)
    expect(loaded.uk).toEqual(data.uk)
    expect(loaded.ireland).toEqual([])
  })

  it('returns empty object when missing or corrupt', () => {
    expect(loadNonSchengenStore(memoryStorage())).toEqual({})
    expect(
      loadNonSchengenStore(memoryStorage({ [NON_SCHENGEN_STORAGE_KEY]: 'not-json' })),
    ).toEqual({})
  })

  it('drops invalid trips and unknown zone keys on load', () => {
    const payload = {
      uk: [
        { id: 'ok', entry: '2026-01-01', exit: '2026-01-02' },
        { id: 'bad', entry: '2026-02-10', exit: '2026-02-01' },
        { id: 'missing' },
      ],
      'not-a-zone': [{ id: 'x', entry: '2026-01-01', exit: '2026-01-02' }],
    }
    const storage = memoryStorage({
      [NON_SCHENGEN_STORAGE_KEY]: JSON.stringify(payload),
    })
    const loaded = loadNonSchengenStore(storage)
    expect(loaded.uk).toEqual([
      { id: 'ok', entry: '2026-01-01', exit: '2026-01-02' },
    ])
    expect(loaded['not-a-zone']).toBeUndefined()
  })

  it('does not write to Schengen trips key', () => {
    const storage = memoryStorage()
    saveNonSchengenStore(
      { turkey: [{ id: 't1', entry: '2026-08-01', exit: '2026-08-05' }] },
      storage,
    )
    expect(storage.getItem('staywindow.trips.v1')).toBeNull()
    expect(storage.raw.has(NON_SCHENGEN_STORAGE_KEY)).toBe(true)
  })
})
