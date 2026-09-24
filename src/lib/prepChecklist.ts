import {
  EU_EES_OVERVIEW,
  EU_EES_STAY_CHECKER,
  EU_ETIAS,
  EU_SHORT_STAY_CALCULATOR,
} from './officialLinks'

export const PREP_STORAGE_KEY = 'staywindow.prep.v1'

export type PrepCheckState = Record<string, boolean>

export type PrepLink = {
  label: string
  href: string
}

export type PrepItem = {
  id: string
  label: string
  help?: string
  links?: PrepLink[]
}

/** Border-prep expectations for visa-free travellers — not legal requirements. */
export const PREP_ITEMS: PrepItem[] = [
  {
    id: 'passport-validity',
    label: 'Passport validity checked',
    help: 'Confirm with your destination and official guidance. Common framings (e.g. validity for 3 months after leaving, or issued within 10 years) vary by country and can change.',
    links: [
      { label: 'Official EU short-stay calculator', href: EU_SHORT_STAY_CALCULATOR },
    ],
  },
  {
    id: 'entry-exit-dates',
    label: 'Entry and exit dates written down',
    help: 'Under EES, ink stamps may be gone for many travellers. Keep your own record of when you entered and left.',
    links: [{ label: 'Official EES overview', href: EU_EES_OVERVIEW }],
  },
  {
    id: 'onward-travel',
    label: 'Return or onward travel plan',
    help: 'Be ready to explain how and when you intend to leave if an officer asks. This is a planning habit, not a guarantee of entry.',
  },
  {
    id: 'funds-accommodation',
    label: 'Proof of funds / accommodation plan if asked',
    help: 'Some travellers are asked how they will support themselves and where they will stay. Carry what you would reasonably need to show — requirements vary.',
  },
  {
    id: 'travel-insurance',
    label: 'Travel insurance considered',
    help: 'Worth thinking about for medical and trip disruption cover. We do not sell insurance here.',
  },
  {
    id: 'ees-airport-time',
    label: 'Extra airport time for EES biometrics / queues',
    help: 'First registration and busy borders can take longer. Build in buffer time rather than racing the gate.',
    links: [{ label: 'Official EES overview', href: EU_EES_OVERVIEW }],
  },
  {
    id: 'official-vs-estimate',
    label: 'Know official EES checker vs Staywindow estimate',
    help: 'Staywindow is an unofficial estimate from trips you enter on this device. Officers and EES records control what counts at the border.',
    links: [
      { label: 'Official EES: check how long you can stay', href: EU_EES_STAY_CHECKER },
      { label: 'Official EU short-stay calculator', href: EU_SHORT_STAY_CALCULATOR },
      { label: 'Official ETIAS page', href: EU_ETIAS },
    ],
  },
  {
    id: 'esim-connectivity',
    label: 'eSIM / connectivity for the trip (optional)',
    help: 'Soft reminder only — useful for maps, boarding passes, and reaching people. Partner offers coming later; nothing to buy here.',
  },
]

export function loadPrepChecks(
  storage: Pick<Storage, 'getItem'> = localStorage,
): PrepCheckState {
  try {
    const raw = storage.getItem(PREP_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}
    const out: PrepCheckState = {}
    for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof key === 'string' && typeof value === 'boolean') {
        out[key] = value
      }
    }
    return out
  } catch {
    return {}
  }
}

export function savePrepChecks(
  state: PrepCheckState,
  storage: Pick<Storage, 'setItem'> = localStorage,
): void {
  try {
    storage.setItem(PREP_STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode
  }
}
