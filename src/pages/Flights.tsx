import { useMemo, useState } from 'react'
import { RouteMeta } from '../components/RouteMeta'
import {
  AIRPORTS,
  BAND_PAYOUT,
  bandFromKm,
  findAirport,
  greatCircleKm,
  isUsDomestic,
  type DistanceBand,
} from '../lib/airports'

type CarrierType = 'eu_uk' | 'other'
type BandChoice = DistanceBand | 'auto'

export function Flights() {
  const [dep, setDep] = useState('LHR')
  const [arr, setArr] = useState('JFK')
  const [otherDep, setOtherDep] = useState(false)
  const [otherArr, setOtherArr] = useState(false)
  const [bandManual, setBandManual] = useState<BandChoice>('auto')
  const [delayHours, setDelayHours] = useState(4)
  const [carrier, setCarrier] = useState<CarrierType>('eu_uk')
  const [extraordinary, setExtraordinary] = useState(false)

  const distance = useMemo(() => {
    if (otherDep || otherArr) return null
    const a = findAirport(dep)
    const b = findAirport(arr)
    if (!a || !b) return null
    return Math.round(greatCircleKm(a, b))
  }, [dep, arr, otherDep, otherArr])

  const usDomestic =
    !otherDep && !otherArr && dep !== 'OTHER' && arr !== 'OTHER' && isUsDomestic(dep, arr)

  const band: DistanceBand | null = useMemo(() => {
    if (bandManual !== 'auto') return bandManual
    if (distance == null) return null
    return bandFromKm(distance)
  }, [bandManual, distance])

  const eligibleDelay = delayHours >= 3
  const showPayout =
    !usDomestic &&
    !extraordinary &&
    carrier === 'eu_uk' &&
    eligibleDelay &&
    band != null

  return (
    <div className="flights-page">
      <RouteMeta
        title="Flight delay compensation bands — Staywindow"
        description="Rough EU261 / UK261 delay compensation money bands by distance. Not a claim company — estimate only."
      />
      <h1>Flight delay compensation bands</h1>
      <p className="lede">
        Rough EU261 / UK261 <strong>money bands</strong> only — not legal advice and not a claim
        filing service. We do not file claims.
      </p>

      <section className="card form-card">
        <div className="form-grid">
          <label className="field">
            <span>Departure airport</span>
            <select
              value={otherDep ? 'OTHER' : dep}
              onChange={(e) => {
                if (e.target.value === 'OTHER') {
                  setOtherDep(true)
                  setBandManual((b) => (b === 'auto' ? 'medium' : b))
                } else {
                  setOtherDep(false)
                  setDep(e.target.value)
                }
              }}
            >
              {AIRPORTS.map((a) => (
                <option key={a.iata} value={a.iata}>
                  {a.iata} — {a.city}
                </option>
              ))}
              <option value="OTHER">Other / enter distance band manually</option>
            </select>
          </label>

          <label className="field">
            <span>Arrival airport</span>
            <select
              value={otherArr ? 'OTHER' : arr}
              onChange={(e) => {
                if (e.target.value === 'OTHER') {
                  setOtherArr(true)
                  setBandManual((b) => (b === 'auto' ? 'medium' : b))
                } else {
                  setOtherArr(false)
                  setArr(e.target.value)
                }
              }}
            >
              {AIRPORTS.map((a) => (
                <option key={`arr-${a.iata}`} value={a.iata}>
                  {a.iata} — {a.city}
                </option>
              ))}
              <option value="OTHER">Other / enter distance band manually</option>
            </select>
          </label>

          <label className="field">
            <span>Delay (hours at arrival)</span>
            <input
              type="number"
              min={0}
              step={0.5}
              value={delayHours}
              onChange={(e) => setDelayHours(Number(e.target.value))}
            />
          </label>

          <label className="field">
            <span>Operating carrier type</span>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value as CarrierType)}
            >
              <option value="eu_uk">EU or UK operating carrier (typical EU261/UK261 scope)</option>
              <option value="other">Other / not sure</option>
            </select>
          </label>

          <label className="field checkbox-field">
            <input
              type="checkbox"
              checked={extraordinary}
              onChange={(e) => setExtraordinary(e.target.checked)}
            />
            <span>Extraordinary circumstances may apply (weather, ATC strike, etc.)</span>
          </label>

          <label className="field">
            <span>Distance band</span>
            <select
              value={bandManual}
              onChange={(e) => setBandManual(e.target.value as BandChoice)}
            >
              <option value="auto">
                Auto from airports{distance != null ? ` (~${distance} km)` : ''}
              </option>
              <option value="short">≤ 1,500 km → €250 / ~£220 band</option>
              <option value="medium">1,500–3,500 km → €400 / ~£350 band</option>
              <option value="long">&gt; 3,500 km → €600 / ~£520 band</option>
            </select>
          </label>
        </div>
      </section>

      <section className="card result-card" aria-live="polite">
        <h2>Estimate</h2>
        {usDomestic && (
          <p className="status-pill status-over" style={{ display: 'inline-block' }}>
            EU261/UK261 does not apply to US domestic flights
          </p>
        )}
        {!usDomestic && extraordinary && (
          <p>
            If extraordinary circumstances are accepted, cash compensation is often{' '}
            <strong>not</strong> owed (care obligations may still apply). This tool cannot decide
            your case.
          </p>
        )}
        {!usDomestic && !extraordinary && carrier === 'other' && (
          <p>
            EU261/UK261 usually needs an EU/UK operating carrier or departure from the EU/UK
            (with nuances). Without that, a euro/GBP band may not apply.
          </p>
        )}
        {!usDomestic && !extraordinary && carrier === 'eu_uk' && !eligibleDelay && (
          <p>
            Compensation bands typically kick in from about <strong>3 hours</strong> delay at
            arrival (rules vary by distance for some rights). Your entered delay is under that
            rough threshold.
          </p>
        )}
        {showPayout && band && (
          <>
            <p className="muted">
              Approx. distance: {distance != null ? `${distance} km` : 'manual band'} (
              {BAND_PAYOUT[band].label})
            </p>
            <div className="result-numbers">
              <div>
                <span className="big-num">€{BAND_PAYOUT[band].eur}</span>
                <span className="num-label">EU261 band</span>
              </div>
              <div>
                <span className="big-num">£{BAND_PAYOUT[band].gbp}</span>
                <span className="num-label">UK261-style band (approx.)</span>
              </div>
            </div>
            <p className="muted">
              GBP figures are approximate UK261 parallels — check current CAA / airline wording.
            </p>
          </>
        )}
        {!usDomestic && bandManual === 'auto' && distance == null && otherDep === false && otherArr === false && (
          <p className="muted">Select airports or choose a distance band manually.</p>
        )}
        <p className="disclaimer">
          Not a claim company. This is a money <em>band</em> estimate only — eligibility depends
          on operating carrier, route, delay cause, and tickets. Confirm with official guidance or
          an adviser.
        </p>
      </section>
    </div>
  )
}
