import {
  daysRemaining,
  daysUsed,
  status,
  type StayStatus,
  type Trip,
} from './schengen'

/** Proposed future trip for dry-run only (no id required). */
export type ProposedTrip = {
  country: string
  entry: string
  exit: string
  label?: string
}

export type StayPreview = {
  used: number
  remaining: number
  status: StayStatus
}

/**
 * Dry-run: append a hypothetical trip and recompute used / remaining / status
 * with the existing Schengen helpers. Does not mutate `trips`.
 * Invalid ranges throw the same way as daysUsed (exit before entry).
 */
export function previewStayWithTrip(
  trips: Trip[],
  asOf: string,
  proposed: ProposedTrip,
): StayPreview {
  const trip: Trip = {
    id: '__preview__',
    country: proposed.country,
    entry: proposed.entry,
    exit: proposed.exit,
    ...(proposed.label?.trim() ? { label: proposed.label.trim() } : {}),
  }
  const withProposed = [...trips, trip]
  const used = daysUsed(withProposed, asOf)
  const remaining = daysRemaining(withProposed, asOf)
  return {
    used,
    remaining,
    status: status(withProposed, asOf),
  }
}
