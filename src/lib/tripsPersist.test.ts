import { describe, expect, it } from 'vitest'
import {
  LEGACY_TRIPS_STORAGE_KEY,
  TRIPS_STORAGE_KEY,
  loadTripsFromStorage,
  migrateTripsStorageOnce,
  saveTripsToStorage,
} from './tripsPersist'

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

describe('migrateTripsStorageOnce', () => {
  it('copies clearstay.trips.v1 to staywindow.trips.v1 once and removes legacy', () => {
    const payload = JSON.stringify({
      trips: [{ id: 't1', country: 'Spain', entry: '2026-03-01', exit: '2026-03-10' }],
      asOf: '2026-03-10',
    })
    const storage = memoryStorage({ [LEGACY_TRIPS_STORAGE_KEY]: payload })

    migrateTripsStorageOnce(storage)

    expect(storage.getItem(TRIPS_STORAGE_KEY)).toBe(payload)
    expect(storage.getItem(LEGACY_TRIPS_STORAGE_KEY)).toBeNull()
  })

  it('does not overwrite an existing staywindow key', () => {
    const newer = JSON.stringify({ trips: [], asOf: '2026-04-01' })
    const older = JSON.stringify({
      trips: [{ id: 'old', country: 'France', entry: '2026-01-01', exit: '2026-01-05' }],
    })
    const storage = memoryStorage({
      [TRIPS_STORAGE_KEY]: newer,
      [LEGACY_TRIPS_STORAGE_KEY]: older,
    })

    migrateTripsStorageOnce(storage)

    expect(storage.getItem(TRIPS_STORAGE_KEY)).toBe(newer)
    expect(storage.getItem(LEGACY_TRIPS_STORAGE_KEY)).toBe(older)
  })

  it('loadTripsFromStorage migrates then reads the new key', () => {
    const payload = {
      trips: [{ id: 't1', country: 'Spain', entry: '2026-03-01', exit: '2026-03-10' }],
      asOf: '2026-03-10',
    }
    const storage = memoryStorage({
      [LEGACY_TRIPS_STORAGE_KEY]: JSON.stringify(payload),
    })

    const loaded = loadTripsFromStorage(storage)
    expect(loaded).toEqual(payload)
    expect(storage.getItem(TRIPS_STORAGE_KEY)).toBe(JSON.stringify(payload))
    expect(storage.getItem(LEGACY_TRIPS_STORAGE_KEY)).toBeNull()
  })

  it('saveTripsToStorage writes only the new key', () => {
    const storage = memoryStorage()
    const data = {
      trips: [{ id: 't2', country: 'Italy', entry: '2026-05-01', exit: '2026-05-08' }],
    }
    saveTripsToStorage(data, storage)
    expect(storage.getItem(TRIPS_STORAGE_KEY)).toBe(JSON.stringify(data))
    expect(storage.getItem(LEGACY_TRIPS_STORAGE_KEY)).toBeNull()
  })
})
