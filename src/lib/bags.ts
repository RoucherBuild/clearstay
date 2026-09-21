export type AirlineBagLimit = {
  id: string
  name: string
  /** Max cabin bag dimensions in cm: height × width × depth (approximate). */
  maxCm: [number, number, number]
  /** Max weight in kg if commonly published; null if not fixed / piece concept. */
  maxKg: number | null
  notes: string
}

/**
 * Approximate published cabin / under-seat limits — confirm on airline site.
 * Dimensions ordered H×W×D where sources state that; otherwise largest-first.
 */
export const AIRLINE_BAGS: readonly AirlineBagLimit[] = [
  {
    id: 'ryanair',
    name: 'Ryanair',
    maxCm: [40, 20, 25],
    maxKg: null,
    notes: 'Small personal bag under seat (free). Larger cabin bag often paid Priority.',
  },
  {
    id: 'easyjet',
    name: 'easyJet',
    maxCm: [45, 36, 20],
    maxKg: null,
    notes: 'One under-seat bag free; larger cabin bag may need Speedy Boarding / fare.',
  },
  {
    id: 'ba',
    name: 'British Airways',
    maxCm: [56, 45, 25],
    maxKg: 23,
    notes: 'Cabin bag + small bag; weight combined often capped — check fare.',
  },
  {
    id: 'lh',
    name: 'Lufthansa',
    maxCm: [55, 40, 23],
    maxKg: 8,
    notes: 'Economy cabin bag typically 8 kg; verify class.',
  },
  {
    id: 'af',
    name: 'Air France',
    maxCm: [55, 35, 25],
    maxKg: 12,
    notes: 'Cabin bag + accessory; weight varies by cabin.',
  },
  {
    id: 'klm',
    name: 'KLM',
    maxCm: [55, 35, 25],
    maxKg: 12,
    notes: 'Similar to Air France group rules.',
  },
  {
    id: 'iberia',
    name: 'Iberia',
    maxCm: [56, 40, 25],
    maxKg: 10,
    notes: 'Cabin bag size/weight depend on fare brand.',
  },
  {
    id: 'vueling',
    name: 'Vueling',
    maxCm: [40, 30, 20],
    maxKg: null,
    notes: 'Small bag free; cabin bag often paid.',
  },
  {
    id: 'ei',
    name: 'Aer Lingus',
    maxCm: [55, 40, 24],
    maxKg: 10,
    notes: 'Cabin allowance varies by route and fare.',
  },
  {
    id: 'delta',
    name: 'Delta',
    maxCm: [56, 35, 23],
    maxKg: null,
    notes: 'US carriers often use linear inches (~45 in) rather than a fixed kg.',
  },
  {
    id: 'ua',
    name: 'United',
    maxCm: [56, 35, 22],
    maxKg: null,
    notes: 'Confirm linear inches and overhead space.',
  },
  {
    id: 'aa',
    name: 'American',
    maxCm: [56, 36, 23],
    maxKg: null,
    notes: 'Confirm linear inches before you fly.',
  },
  {
    id: 'b6',
    name: 'JetBlue',
    maxCm: [55, 40, 23],
    maxKg: null,
    notes: 'Personal item + carry-on; size limits apply.',
  },
  {
    id: 'qf',
    name: 'Qantas',
    maxCm: [56, 36, 23],
    maxKg: 7,
    notes: 'Economy cabin bag often 7 kg.',
  },
  {
    id: 'ac',
    name: 'Air Canada',
    maxCm: [55, 40, 23],
    maxKg: null,
    notes: 'Weight may apply on some routes; check fare.',
  },
] as const

/** Pass if each user dimension ≤ corresponding airline max (order-insensitive sorted). */
export function bagFits(
  userCm: [number, number, number],
  airline: AirlineBagLimit,
): boolean {
  const u = [...userCm].map(Number).sort((a, b) => b - a)
  const m = [...airline.maxCm].map(Number).sort((a, b) => b - a)
  return u[0] <= m[0] && u[1] <= m[1] && u[2] <= m[2]
}
