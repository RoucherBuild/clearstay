export type Airport = {
  iata: string
  city: string
  country: string
  lat: number
  lon: number
}

/** Approximate coordinates for great-circle distance helper. */
export const AIRPORTS: readonly Airport[] = [
  { iata: 'LHR', city: 'London Heathrow', country: 'UK', lat: 51.47, lon: -0.461 },
  { iata: 'LGW', city: 'London Gatwick', country: 'UK', lat: 51.153, lon: -0.182 },
  { iata: 'MAN', city: 'Manchester', country: 'UK', lat: 53.354, lon: -2.275 },
  { iata: 'DUB', city: 'Dublin', country: 'IE', lat: 53.421, lon: -6.27 },
  { iata: 'AMS', city: 'Amsterdam', country: 'NL', lat: 52.31, lon: 4.768 },
  { iata: 'CDG', city: 'Paris CDG', country: 'FR', lat: 49.01, lon: 2.548 },
  { iata: 'ORY', city: 'Paris Orly', country: 'FR', lat: 48.723, lon: 2.379 },
  { iata: 'FRA', city: 'Frankfurt', country: 'DE', lat: 50.037, lon: 8.562 },
  { iata: 'MUC', city: 'Munich', country: 'DE', lat: 48.354, lon: 11.786 },
  { iata: 'BER', city: 'Berlin', country: 'DE', lat: 52.366, lon: 13.503 },
  { iata: 'MAD', city: 'Madrid', country: 'ES', lat: 40.472, lon: -3.563 },
  { iata: 'BCN', city: 'Barcelona', country: 'ES', lat: 41.297, lon: 2.078 },
  { iata: 'FCO', city: 'Rome Fiumicino', country: 'IT', lat: 41.8, lon: 12.25 },
  { iata: 'MXP', city: 'Milan Malpensa', country: 'IT', lat: 45.63, lon: 8.723 },
  { iata: 'LIS', city: 'Lisbon', country: 'PT', lat: 38.774, lon: -9.134 },
  { iata: 'ATH', city: 'Athens', country: 'GR', lat: 37.936, lon: 23.944 },
  { iata: 'CPH', city: 'Copenhagen', country: 'DK', lat: 55.618, lon: 12.656 },
  { iata: 'ARN', city: 'Stockholm Arlanda', country: 'SE', lat: 59.652, lon: 17.919 },
  { iata: 'OSL', city: 'Oslo', country: 'NO', lat: 60.194, lon: 11.1 },
  { iata: 'HEL', city: 'Helsinki', country: 'FI', lat: 60.317, lon: 24.963 },
  { iata: 'VIE', city: 'Vienna', country: 'AT', lat: 48.11, lon: 16.57 },
  { iata: 'ZRH', city: 'Zurich', country: 'CH', lat: 47.465, lon: 8.549 },
  { iata: 'BRU', city: 'Brussels', country: 'BE', lat: 50.901, lon: 4.484 },
  { iata: 'WAW', city: 'Warsaw', country: 'PL', lat: 52.166, lon: 20.967 },
  { iata: 'PRG', city: 'Prague', country: 'CZ', lat: 50.101, lon: 14.26 },
  { iata: 'BUD', city: 'Budapest', country: 'HU', lat: 47.437, lon: 19.256 },
  { iata: 'JFK', city: 'New York JFK', country: 'US', lat: 40.641, lon: -73.778 },
  { iata: 'EWR', city: 'Newark', country: 'US', lat: 40.692, lon: -74.169 },
  { iata: 'BOS', city: 'Boston', country: 'US', lat: 42.365, lon: -71.01 },
  { iata: 'ORD', city: 'Chicago O’Hare', country: 'US', lat: 41.974, lon: -87.907 },
  { iata: 'LAX', city: 'Los Angeles', country: 'US', lat: 33.943, lon: -118.408 },
  { iata: 'SFO', city: 'San Francisco', country: 'US', lat: 37.621, lon: -122.379 },
  { iata: 'MIA', city: 'Miami', country: 'US', lat: 25.796, lon: -80.287 },
  { iata: 'YYZ', city: 'Toronto Pearson', country: 'CA', lat: 43.677, lon: -79.631 },
  { iata: 'YVR', city: 'Vancouver', country: 'CA', lat: 49.194, lon: -123.179 },
  { iata: 'SYD', city: 'Sydney', country: 'AU', lat: -33.94, lon: 151.175 },
  { iata: 'MEL', city: 'Melbourne', country: 'AU', lat: -37.673, lon: 144.843 },
  { iata: 'AKL', city: 'Auckland', country: 'NZ', lat: -37.008, lon: 174.792 },
] as const

const EARTH_KM = 6371

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/** Approximate great-circle distance in km. */
export function greatCircleKm(a: Airport, b: Airport): number {
  const dLat = toRad(b.lat - a.lat)
  const dLon = toRad(b.lon - a.lon)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(h)))
}

export function findAirport(iata: string): Airport | undefined {
  return AIRPORTS.find((x) => x.iata === iata)
}

export type DistanceBand = 'short' | 'medium' | 'long'

export function bandFromKm(km: number): DistanceBand {
  if (km <= 1500) return 'short'
  if (km <= 3500) return 'medium'
  return 'long'
}

export const BAND_PAYOUT = {
  short: { eur: 250, gbp: 220, label: '≤ 1,500 km' },
  medium: { eur: 400, gbp: 350, label: '1,500–3,500 km' },
  long: { eur: 600, gbp: 520, label: '> 3,500 km' },
} as const

export function isUsDomestic(depIata: string, arrIata: string): boolean {
  const dep = findAirport(depIata)
  const arr = findAirport(arrIata)
  return Boolean(dep && arr && dep.country === 'US' && arr.country === 'US')
}
