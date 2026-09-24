import type { Trip } from './schengen'
import { newTripId } from './tripsPersist'

export type TripFormInput = {
  country: string
  entry: string
  exit: string
  label?: string
}

export type BuildTripOk = { ok: true; trip: Trip }
export type BuildTripErr = { ok: false; error: string }
export type BuildTripResult = BuildTripOk | BuildTripErr

/**
 * Build a Stay Trip from stamp/boarding-pass assist form fields.
 * Validates country + dates; entry must be <= exit (YYYY-MM-DD string compare).
 * Does not touch storage — caller appends via tripsPersist.
 */
export function buildTripFromForm(
  input: TripFormInput,
  idFactory: () => string = newTripId,
): BuildTripResult {
  const country = input.country?.trim() ?? ''
  const entry = input.entry?.trim() ?? ''
  const exit = input.exit?.trim() ?? ''
  const label = input.label?.trim() ?? ''

  if (!country) {
    return { ok: false, error: 'Choose a country.' }
  }
  if (!entry || !exit) {
    return { ok: false, error: 'Enter both entry and exit dates.' }
  }
  if (exit < entry) {
    return {
      ok: false,
      error: `Exit (${exit}) is before entry (${entry}).`,
    }
  }

  const trip: Trip = {
    id: idFactory(),
    country,
    entry,
    exit,
    ...(label ? { label } : {}),
  }
  return { ok: true, trip }
}
