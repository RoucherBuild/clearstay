export type Trip = {
  id: string
  country: string
  entry: string
  exit: string
  label?: string
} // dates YYYY-MM-DD

/** Full Schengen Area membership as of 2025/2026 (includes Bulgaria & Romania; excludes Ireland, Cyprus, UK, US). */
export const SCHENGEN_COUNTRIES: readonly string[] = [
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Iceland',
  'Italy',
  'Latvia',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Norway',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Switzerland',
] as const

const SCHENGEN_SET = new Set<string>(SCHENGEN_COUNTRIES)

function parseYmd(ymd: string): { y: number; m: number; d: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd)
  if (!m) throw new Error(`Invalid date (expected YYYY-MM-DD): ${ymd}`)
  return { y: Number(m[1]), m: Number(m[2]), d: Number(m[3]) }
}

/** Parse YYYY-MM-DD as UTC noon to avoid DST edge cases. */
function toUtcNoon(ymd: string): Date {
  const { y, m, d } = parseYmd(ymd)
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0))
}

function formatYmd(date: Date): string {
  const y = date.getUTCFullYear()
  const m = String(date.getUTCMonth() + 1).padStart(2, '0')
  const d = String(date.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function addDaysUtc(ymd: string, deltaDays: number): string {
  const dt = toUtcNoon(ymd)
  dt.setUTCDate(dt.getUTCDate() + deltaDays)
  return formatYmd(dt)
}

function isSchengenCountry(country: string): boolean {
  return SCHENGEN_SET.has(country)
}

/**
 * Number of calendar days from start through end inclusive (UTC date-only).
 * Throws if exit/end is before entry/start.
 */
export function countDaysInclusive(start: string, end: string): number {
  const a = toUtcNoon(start)
  const b = toUtcNoon(end)
  const ms = b.getTime() - a.getTime()
  if (ms < 0) {
    throw new Error(`Invalid range: exit/end (${end}) is before entry/start (${start})`)
  }
  return Math.floor(ms / 86_400_000) + 1
}

/**
 * 180-day window that INCLUDES asOf: start = asOf minus 179 days, end = asOf.
 */
export function windowBounds(asOf: string): { start: string; end: string } {
  return { start: addDaysUtc(asOf, -179), end: asOf }
}

function assertValidTrip(trip: Trip): void {
  if (toUtcNoon(trip.exit).getTime() < toUtcNoon(trip.entry).getTime()) {
    throw new Error(
      `Invalid trip "${trip.id}": exit (${trip.exit}) is before entry (${trip.entry})`,
    )
  }
}

/**
 * Unique calendar days inside Schengen that fall in the 180-day window ending on asOf.
 * Entry and exit both count; overlapping trips count once.
 * Non-Schengen trips contribute 0. Invalid trip ranges throw.
 *
 * Iterates day-by-day via addDaysUtc (UTC calendar YMD), never local Date parse
 * of YYYY-MM-DD and never trips.length / duration clamp.
 *
 * This is the single day-collection path — daysUsed / enumerateUsedDays share it.
 */
export function usedDaySet(trips: Trip[], asOf: string): Set<string> {
  const { start, end } = windowBounds(asOf)
  const days = new Set<string>()

  for (const trip of trips) {
    assertValidTrip(trip)
    if (!isSchengenCountry(trip.country)) continue

    // Walk inclusive entry..exit with UTC calendar days
    let d = trip.entry
    for (;;) {
      if (d >= start && d <= end) {
        days.add(d)
      }
      if (d === trip.exit) break
      d = addDaysUtc(d, 1)
      // Safety: if exit somehow not reachable (should not happen after assert)
      if (d > trip.exit) break
    }
  }

  return days
}

/** Sorted YYYY-MM-DD list of unique Schengen days in the window (same set as daysUsed). */
export function enumerateUsedDays(trips: Trip[], asOf: string): string[] {
  return [...usedDaySet(trips, asOf)].sort()
}

export function daysUsed(trips: Trip[], asOf: string): number {
  return usedDaySet(trips, asOf).size
}

export function daysRemaining(trips: Trip[], asOf: string): number {
  return Math.max(0, 90 - daysUsed(trips, asOf))
}

export type StayStatus = 'Safe' | 'Tight' | 'Over'

/**
 * Status from remaining/used:
 * - Safe if remaining >= 15
 * - Tight if remaining is 1–14
 * - Over if used > 90
 *
 * Gap at used === 90 (remaining === 0): JOB says Over only if used > 90,
 * but remaining is neither Safe nor Tight. We treat remaining === 0 as "Over"
 * (quota exhausted) for practical UX — documented here.
 */
export function status(trips: Trip[], asOf: string): StayStatus {
  const used = daysUsed(trips, asOf)
  const remaining = Math.max(0, 90 - used)
  if (used > 90) return 'Over'
  if (remaining >= 15) return 'Safe'
  if (remaining >= 1) return 'Tight'
  // remaining === 0 (typically used === 90): treat as Over (exhausted)
  return 'Over'
}

/**
 * Earliest date the traveller could enter and still have 90 days available
 * (daysRemaining === 90 on that as-of / entry date).
 * Returns null if they already have a full 90 remaining as of `asOf`.
 */
export function nextFullStayDate(trips: Trip[], asOf: string): string | null {
  if (daysRemaining(trips, asOf) === 90) return null

  let maxExit = asOf
  for (const trip of trips) {
    assertValidTrip(trip)
    if (!isSchengenCountry(trip.country)) continue
    if (trip.exit > maxExit) maxExit = trip.exit
  }

  const limit = addDaysUtc(maxExit, 180)
  let d = addDaysUtc(asOf, 1)
  while (d <= limit) {
    if (daysRemaining(trips, d) === 90) return d
    d = addDaysUtc(d, 1)
  }

  return addDaysUtc(maxExit, 180)
}
