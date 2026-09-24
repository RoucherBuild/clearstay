import {
  EU_EES_OVERVIEW,
  EU_EES_STAY_CHECKER,
  EU_ETIAS,
  EU_SHORT_STAY_CALCULATOR,
} from './officialLinks'

export type NationalityId = 'US' | 'UK' | 'AU' | 'CA'

export type OfficialLink = {
  label: string
  href: string
}

export type NationalityRule = {
  id: NationalityId
  label: string
  bullets: string[]
  links: OfficialLink[]
}

/** Shared short-stay framing used across visa-free nationalities (estimate only). */
const SHARED_BULLETS_PREFIX = [
  'Usual short-stay framing for many visa-free travellers is up to 90 days in any rolling 180-day period across the Schengen area — this site’s figure is an unofficial estimate only.',
  'Check official guidance for passport validity and blank-page requirements before you travel; rules can differ by destination and change over time.',
]

const SHARED_BULLETS_SUFFIX = [
  'ETIAS travel authorisation may be required in future for short stays — check the official ETIAS page for current status; do not rely on third-party start dates.',
  'EES (Entry/Exit System) is already in force as digital border registration for many non-EU short-stay travellers — see the official EES overview.',
]

const SHARED_EU_LINKS: OfficialLink[] = [
  { label: 'Official EU short-stay calculator', href: EU_SHORT_STAY_CALCULATOR },
  { label: 'Official EES overview', href: EU_EES_OVERVIEW },
  { label: 'Official EES: check how long you can stay', href: EU_EES_STAY_CHECKER },
  { label: 'Official ETIAS page', href: EU_ETIAS },
]

export const NATIONALITY_RULES: NationalityRule[] = [
  {
    id: 'US',
    label: 'United States',
    bullets: [...SHARED_BULLETS_PREFIX, ...SHARED_BULLETS_SUFFIX],
    links: [
      {
        label: 'U.S. Travelers in Europe (travel.state.gov)',
        href: 'https://travel.state.gov/en/international-travel/planning/guidance/europe.html',
      },
      {
        label: 'U.S. Customs and Border Protection — Travel',
        href: 'https://www.cbp.gov/travel',
      },
      ...SHARED_EU_LINKS,
    ],
  },
  {
    id: 'UK',
    label: 'United Kingdom',
    bullets: [...SHARED_BULLETS_PREFIX, ...SHARED_BULLETS_SUFFIX],
    links: [
      {
        label: 'Travelling to the EU and Schengen area (GOV.UK)',
        href: 'https://www.gov.uk/travel-to-eu-schengen-area',
      },
      {
        label: 'UK foreign travel advice',
        href: 'https://www.gov.uk/foreign-travel-advice',
      },
      ...SHARED_EU_LINKS,
    ],
  },
  {
    id: 'AU',
    label: 'Australia',
    bullets: [...SHARED_BULLETS_PREFIX, ...SHARED_BULLETS_SUFFIX],
    links: [
      {
        label: 'Travelling to Europe and the Schengen Area (Smartraveller)',
        href: 'https://www.smartraveller.gov.au/before-you-go/the-basics/schengen',
      },
      {
        label: 'Europe destinations (Smartraveller)',
        href: 'https://www.smartraveller.gov.au/Europe',
      },
      ...SHARED_EU_LINKS,
    ],
  },
  {
    id: 'CA',
    label: 'Canada',
    bullets: [...SHARED_BULLETS_PREFIX, ...SHARED_BULLETS_SUFFIX],
    links: [
      {
        label: 'Travel advice and advisories (travel.gc.ca)',
        href: 'https://travel.gc.ca/travelling/advisories',
      },
      {
        label: 'Travel documents and visas (travel.gc.ca)',
        href: 'https://travel.gc.ca/travelling/documents/visas',
      },
      ...SHARED_EU_LINKS,
    ],
  },
]

export const NATIONALITY_STORAGE_KEY = 'staywindow.nationality.v1'

export function getNationalityRule(id: string | null | undefined): NationalityRule | null {
  if (!id) return null
  return NATIONALITY_RULES.find((r) => r.id === id) ?? null
}

export function loadNationalityId(
  storage: Pick<Storage, 'getItem'> = localStorage,
): NationalityId | '' {
  try {
    const raw = storage.getItem(NATIONALITY_STORAGE_KEY)
    if (raw === 'US' || raw === 'UK' || raw === 'AU' || raw === 'CA') return raw
    return ''
  } catch {
    return ''
  }
}

export function saveNationalityId(
  id: NationalityId | '',
  storage: Pick<Storage, 'setItem' | 'removeItem'> = localStorage,
): void {
  try {
    if (!id) {
      storage.removeItem(NATIONALITY_STORAGE_KEY)
      return
    }
    storage.setItem(NATIONALITY_STORAGE_KEY, id)
  } catch {
    // ignore quota / private mode
  }
}
