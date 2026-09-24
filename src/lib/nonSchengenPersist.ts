import { countDaysInclusive } from './schengen'
import {
  getNonSchengenZone,
  isNonSchengenZoneId,
  type NonSchengenZoneId,
} from './nonSchengenZones'

export const NON_SCHENGEN_STORAGE_KEY = 'staywindow.nonSchengen.v1'

/** Trip-like stay for a non-Schengen zone (no country field — zone is the key). */
export type NonSchengenTrip = {
  id: string
  entry: string
  exit: string
  label?: string
}

export type NonSchengenStore = {
  [zoneId: string]: NonSchengenTrip[]
}

const YMD = /^\d{4}-\d{2}-\d{2}$/

function isValidYmd(s: unknown): s is string {
  return typeof s === 'string' && YMD.test(s)
}

/** True when entry and exit are YYYY-MM-DD and entry <= exit (UTC date-only). */
export function isValidNonSchengenTripRange(entry: string, exit: string): boolean {
  if (!isValidYmd(entry) || !isValidYmd(exit)) return false
  try {
    countDaysInclusive(entry, exit)
    return true
  } catch {
    return false
  }
}

function parseTrip(raw: unknown): NonSchengenTrip | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null
  const t = raw as Record<string, unknown>
  const id = t.id
  const entry = t.entry
  const exit = t.exit
  if (typeof id !== 'string' || id === '') return null
  if (!isValidYmd(entry) || !isValidYmd(exit)) return null
  if (!isValidNonSchengenTripRange(entry, exit)) return null
  const trip: NonSchengenTrip = { id, entry, exit }
  if (typeof t.label === 'string' && t.label.trim()) {
    trip.label = t.label.trim()
  }
  return trip
}

function parseStore(raw: unknown): NonSchengenStore {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const out: NonSchengenStore = {}
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!isNonSchengenZoneId(key)) continue
    if (!Array.isArray(value)) continue
    const trips: NonSchengenTrip[] = []
    for (const item of value) {
      const trip = parseTrip(item)
      if (trip) trips.push(trip)
    }
    out[key] = trips
  }
  return out
}

export function loadNonSchengenStore(
  storage: Pick<Storage, 'getItem'> = localStorage,
): NonSchengenStore {
  try {
    const raw = storage.getItem(NON_SCHENGEN_STORAGE_KEY)
    if (!raw) return {}
    return parseStore(JSON.parse(raw) as unknown)
  } catch {
    return {}
  }
}

export function saveNonSchengenStore(
  store: NonSchengenStore,
  storage: Pick<Storage, 'setItem'> = localStorage,
): void {
  try {
    // Persist only known zones with validated trips
    const cleaned: NonSchengenStore = {}
    for (const [key, trips] of Object.entries(store)) {
      if (!isNonSchengenZoneId(key) || !Array.isArray(trips)) continue
      cleaned[key] = trips.filter((t) =>
        isValidNonSchengenTripRange(t.entry, t.exit),
      )
    }
    storage.setItem(NON_SCHENGEN_STORAGE_KEY, JSON.stringify(cleaned))
  } catch {
    // ignore quota / private mode
  }
}

export function getZoneTrips(
  store: NonSchengenStore,
  zoneId: NonSchengenZoneId,
): NonSchengenTrip[] {
  return store[zoneId] ?? []
}

/**
 * Sum of inclusive calendar days across trips.
 * Overlapping trips are counted separately (double-counted) — callers should note that.
 */
export function sumInclusiveDays(trips: readonly NonSchengenTrip[]): number {
  let total = 0
  for (const t of trips) {
    total += countDaysInclusive(t.entry, t.exit)
  }
  return total
}

export function tripInclusiveDays(trip: NonSchengenTrip): number {
  return countDaysInclusive(trip.entry, trip.exit)
}

export function newNonSchengenTripId(): string {
  return `ns_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}

/** Guard for UI: zone must exist in the catalog. */
export function assertKnownZone(zoneId: string): NonSchengenZoneId {
  if (!isNonSchengenZoneId(zoneId) || !getNonSchengenZone(zoneId)) {
    throw new Error(`Unknown non-Schengen zone: ${zoneId}`)
  }
  return zoneId
}
