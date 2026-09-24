/**
 * Non-Schengen stay zones for plain inclusive day tracking.
 * Not Schengen 90/180 — do not reuse rolling-window math here.
 */

export type NonSchengenZoneId =
  | 'uk'
  | 'ireland'
  | 'cyprus'
  | 'western-balkans'
  | 'turkey'

export type NonSchengenZone = {
  id: NonSchengenZoneId
  label: string
  /** Short cautious note — visa-free norms vary; confirm official rules. */
  note: string
  /** Optional stable .gov / europa URL only when verified. */
  officialUrl?: string
  /** Extra countries in a group zone (display only). */
  countries?: readonly string[]
}

export const NON_SCHENGEN_ZONES: readonly NonSchengenZone[] = [
  {
    id: 'uk',
    label: 'United Kingdom',
    note: 'Visitor stays are often framed up to about 6 months per visit for eligible nationalities, but ETA/visa rules and limits vary. Check official rules — this tool only counts calendar days you enter.',
    officialUrl: 'https://www.gov.uk/standard-visitor',
  },
  {
    id: 'ireland',
    label: 'Ireland',
    note: 'Ireland is not in the Schengen Area. Short visits for many visa-free nationalities are often up to 90 days, but nationality and purpose matter. Check official rules.',
    officialUrl: 'https://www.irishimmigration.ie/coming-to-visit-ireland/',
  },
  {
    id: 'cyprus',
    label: 'Cyprus',
    note: 'Cyprus is an EU member but not (yet) fully Schengen. Short-stay rules are separate from the Schengen 90/180 estimate. Check official rules for your nationality.',
  },
  {
    id: 'western-balkans',
    label: 'Western Balkans',
    countries: [
      'Albania',
      'Bosnia and Herzegovina',
      'Montenegro',
      'North Macedonia',
      'Serbia',
      'Kosovo',
    ],
    note: 'One trip list for planning across the Western Balkans. Visa-free limits and bilateral rules differ by country — do not treat this as a single shared quota. Check official rules for each destination.',
  },
  {
    id: 'turkey',
    label: 'Türkiye / Turkey',
    note: 'Short-stay and e-visa rules depend on nationality and purpose. This is a day counter only — check official rules before travel.',
  },
] as const

export function getNonSchengenZone(id: string): NonSchengenZone | undefined {
  return NON_SCHENGEN_ZONES.find((z) => z.id === id)
}

export function isNonSchengenZoneId(id: string): id is NonSchengenZoneId {
  return NON_SCHENGEN_ZONES.some((z) => z.id === id)
}
