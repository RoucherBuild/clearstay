import { useMemo, useState } from 'react'
import { RouteMeta } from '../components/RouteMeta'
import { AIRLINE_BAGS, bagFits } from '../lib/bags'

const DEFAULT_IDS = ['ryanair', 'easyjet', 'ba']

export function Bags() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_IDS)
  const [h, setH] = useState(55)
  const [w, setW] = useState(40)
  const [d, setD] = useState(20)

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

  const userDims: [number, number, number] = [h, w, d]

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

      <section className="card form-card">
        <h2>Your bag (cm)</h2>
        <div className="form-grid three-col">
          <label className="field">
            <span>Height (cm)</span>
            <input
              type="number"
              min={1}
              value={h}
              onChange={(e) => setH(Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>Width (cm)</span>
            <input
              type="number"
              min={1}
              value={w}
              onChange={(e) => setW(Number(e.target.value))}
            />
          </label>
          <label className="field">
            <span>Depth (cm)</span>
            <input
              type="number"
              min={1}
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
            />
          </label>
        </div>
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
          const fit = bagFits(userDims, a)
          return (
            <article key={a.id} className="card compare-card">
              <h3>{a.name}</h3>
              <p className="big-dims">
                {a.maxCm[0]}×{a.maxCm[1]}×{a.maxCm[2]} cm
              </p>
              <p className="muted">
                Weight: {a.maxKg != null ? `~${a.maxKg} kg` : 'not a fixed kg / check fare'}
              </p>
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
