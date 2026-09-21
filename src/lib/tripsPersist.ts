import type { Trip } from './schengen'

export const TRIPS_STORAGE_KEY = 'clearstay.trips.v1'

export type PersistedTrips = {
  trips: Trip[]
  asOf?: string
}

export function loadTripsFromStorage(): PersistedTrips | null {
  try {
    const raw = localStorage.getItem(TRIPS_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as PersistedTrips
    if (!parsed || !Array.isArray(parsed.trips)) return null
    return parsed
  } catch {
    return null
  }
}

export function saveTripsToStorage(data: PersistedTrips): void {
  try {
    localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore quota / private mode
  }
}

type CompactTrip = {
  i?: string
  id?: string
  c?: string
  country?: string
  e?: string
  entry?: string
  x?: string
  exit?: string
  l?: string
  label?: string
}

function parseCompactTrip(t: CompactTrip): Trip | null {
  const id = t.id ?? t.i
  const country = t.country ?? t.c
  // Prefer clear keys; accept legacy e/x. Never copy entry onto exit.
  const entry = t.entry ?? t.e
  const exit = t.exit ?? t.x

  if (id == null || country == null) return null
  if (entry == null || entry === '') return null
  // Missing/empty exit: keep as-is only if we have a distinct empty string from
  // the payload; otherwise skip invalid. Do NOT silently set exit = entry.
  if (exit == null || exit === '') return null

  const trip: Trip = {
    id: String(id),
    country: String(country),
    entry: String(entry),
    exit: String(exit),
  }
  const label = t.label ?? t.l
  if (label) trip.label = String(label)
  return trip
}

/** Compact URL search params encoding. Uses clear entry/exit keys. */
export function encodeTripsToSearch(trips: Trip[], asOf: string): string {
  const params = new URLSearchParams()
  if (asOf) params.set('asOf', asOf)
  if (trips.length) {
    const compact = trips.map((t) => ({
      i: t.id,
      c: t.country,
      entry: t.entry,
      exit: t.exit,
      ...(t.label ? { l: t.label } : {}),
    }))
    params.set('trips', JSON.stringify(compact))
  }
  const s = params.toString()
  return s ? `?${s}` : ''
}

export function decodeTripsFromSearch(search: string): PersistedTrips | null {
  try {
    const params = new URLSearchParams(
      search.startsWith('?') ? search.slice(1) : search,
    )
    const tripsRaw = params.get('trips')
    const asOf = params.get('asOf') ?? undefined
    if (!tripsRaw && !asOf) return null
    if (!tripsRaw) return { trips: [], asOf }
    const compact = JSON.parse(tripsRaw) as CompactTrip[]
    if (!Array.isArray(compact)) return null
    const trips: Trip[] = []
    for (const t of compact) {
      const parsed = parseCompactTrip(t)
      if (parsed) trips.push(parsed)
      // skip invalid (missing entry/exit) — do not silently set exit=entry
    }
    return { trips, asOf }
  } catch {
    return null
  }
}

export function todayYmd(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function newTripId(): string {
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`
}
