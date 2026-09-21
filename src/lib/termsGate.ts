const STORAGE_KEY = 'staywindow.terms.v1'
const CURRENT_VERSION = '2026-09-21'

export type TermsAcceptance = {
  acceptedAt: string
  version: string
}

export { STORAGE_KEY as TERMS_STORAGE_KEY, CURRENT_VERSION as TERMS_VERSION }

export function readTermsAcceptance(): TermsAcceptance | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<TermsAcceptance>
    if (
      typeof parsed?.acceptedAt !== 'string' ||
      typeof parsed?.version !== 'string'
    ) {
      return null
    }
    return { acceptedAt: parsed.acceptedAt, version: parsed.version }
  } catch {
    return null
  }
}

/** Version strings are YYYY-MM-DD; lexicographic compare is correct. */
export function hasAcceptedTerms(minVersion: string = CURRENT_VERSION): boolean {
  const stored = readTermsAcceptance()
  if (!stored) return false
  return stored.version >= minVersion
}

export function acceptTerms(version: string = CURRENT_VERSION): TermsAcceptance {
  const record: TermsAcceptance = {
    acceptedAt: new Date().toISOString(),
    version,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  return record
}
