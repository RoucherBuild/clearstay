import { useEffect, useMemo, useState } from 'react'
import { RouteMeta } from '../components/RouteMeta'
import {
  AIRLINE_BAGS,
  bagFits,
  cmToIn,
  formatAirlineDims,
  formatBagWeight,
  inToCm,
  toCm,
  type BagUnits,
} from '../lib/bags'

const DEFAULT_IDS = ['ryanair', 'easyjet', 'ba']
const UNITS_KEY = 'staywindow.bagUnits'

function readStoredUnits(): BagUnits {
  try {
    const v = localStorage.getItem(UNITS_KEY)
    if (v === 'in' || v === 'cm') return v
  } catch {
    /* ignore */
  }
  return 'cm'
}

function convertDisplayTriple(
  h: number,
  w: number,
  d: number,
  from: BagUnits,
  to: BagUnits,
): [number, number, number] {
  if (from === to) return [h, w, d]
  if (from === 'cm' && to === 'in') {
    return [cmToIn(h), cmToIn(w), cmToIn(d)]
  }
  return [inToCm(h), inToCm(w), inToCm(d)]
}

export function Bags() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_IDS)
  const [units, setUnits] = useState<BagUnits>(() => readStoredUnits())
  const [h, setH] = useState(() => {
    const u = readStoredUnits()
    return u === 'in' ? cmToIn(55) : 55
  })
  const [w, setW] = useState(() => {
    const u = readStoredUnits()
    return u === 'in' ? cmToIn(40) : 40
  })
  const [d, setD] = useState(() => {
    const u = readStoredUnits()
    return u === 'in' ? cmToIn(20) : 20
  })

  useEffect(() => {
    try {
      localStorage.setItem(UNITS_KEY, units)
    } catch {
      /* ignore */
    }
  }, [units])

  const compared = useMemo(
    () => AIRLINE_BAGS.filter((a) => selected.includes(a.id)).slice(0, 3),
    [selected],
  )

  const toggleAirline = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 3) return [...prev.slice(1), id]
      return [...prev, id]
    })
  }

  const switchUnits = (next: BagUnits) => {
    if (next === units) return
    const [nh, nw, nd] = convertDisplayTriple(h, w, d, units, next)
    setH(nh)
    setW(nw)
    setD(nd)
    setUnits(next)
  }

  const unitLabel = units === 'in' ? 'in' : 'cm'
  const userCm: [number, number, number] = [
    toCm(h, units),
    toCm(w, units),
    toCm(d, units),
  ]

  return (
    <>
      <RouteMeta
        title="Cabin bag size comparison — Staywindow"
        description="Compare typical cabin bag dimensions for major airlines. Approximate — confirm on the airline site before you fly."
      />
      <h1>Cabin bag comparison</h1>
      <p className="lede">
        Typical published limits (approximate). Always confirm on the airline site before you
        fly.
      </p>

      <div className="unit-toggle" role="group" aria-label="Measurement units">
        <button
          type="button"
          className={units === 'cm' ? 'unit-btn active' : 'unit-btn'}
          aria-pressed={units === 'cm'}
          onClick={() => switchUnits('cm')}
        >
          cm
        </button>
        <button
          type="button"
          className={units === 'in' ? 'unit-btn active' : 'unit-btn'}
          aria-pressed={units === 'in'}
          onClick={() => switchUnits('in')}
        >
          in
        </button>
      </div>

      <section className="card form-card">
        <h2>Your bag ({unitLabel})</h2>
        <div className="form-grid three-col">
          <label className="field">
            <span>Height ({unitLabel})</span>
            <input
              type="number"
              min={1}
              step="any"
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>Width ({unitLabel})</span>
            <input
              type="number"
              min={1}
              step="any"
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>Depth ({unitLabel})</span>
            <input
              type="number"
              min={1}
              step="any"
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
            />
          </label>
        </div>
        <p className="muted small">
          Compare in the units on your tape measure. Airline sites usually publish centimetres.
        </p>
      </section>

      <section className="card">
        <h2>Choose up to three airlines</h2>
        <div className="chip-row">
          {AIRLINE_BAGS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={selected.includes(a.id) ? 'chip active' : 'chip'}
              onClick={() => toggleAirline(a.id)}
              aria-pressed={selected.includes(a.id)}
            >
              {a.name}
            </button>
          ))}
        </div>
      </section>

      <section className="compare-grid" aria-label="Airline comparison">
        {compared.map((a) => {
          const fit = bagFits(userCm, a)
          return (
            <article key={a.id} className="card compare-card">
              <h3>{a.name}</h3>
              <p className="big-dims">{formatAirlineDims(a.maxCm, units)}</p>
              <p className="muted">Weight: {formatBagWeight(a.maxKg)}</p>
              <p className={fit ? 'fit-pass' : 'fit-fail'}>
                {fit
                  ? 'Looks within published limit (check airline)'
                  : 'Looks over published limit (check airline)'}
              </p>
              <p className="muted small">{a.notes}</p>
            </article>
          )
        })}
        {compared.length === 0 && (
          <p className="muted">Select at least one airline to compare.</p>
        )}
      </section>

      <p className="disclaimer">
        Hard disclaimer: dimensions and free allowances change by fare and route. Confirm on the
        airline site before you fly. This is not a guarantee your bag will be accepted.
      </p>
    </>
  )
}
