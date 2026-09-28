import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { AIRLINE_BAGS, formatAirlineDims, formatBagWeight } from '../lib/bags'

function airlineById(id: string) {
  const found = AIRLINE_BAGS.find((a) => a.id === id)
  if (!found) throw new Error(`Missing bag source for ${id}`)
  return found
}

export function BagsRyanairVsUnited() {
  const ryanair = airlineById('ryanair')
  const united = airlineById('ua')

  return (
    <>
      <RouteMeta
        title="Ryanair vs United cabin bag sizes (cm and in) | Staywindow"
        description="Compare common cabin limits in cm and inches. Unofficial — always check the airline before you fly."
      />
      <h1>Ryanair vs United cabin bag sizes</h1>
      <p className="lede">
        Cabin limits differ by airline and fare. Use centimetres and inches, then confirm on
        Ryanair.com and United.com for your exact fare brand. Staywindow’s Bags tool compares
        common published sizes; it does not replace the airline.
      </p>

      <section className="qa-block">
        <h2>Side-by-side (from Staywindow bag sources)</h2>
        <div className="compare-grid" aria-label="Ryanair vs United cabin limits">
          <article className="card compare-card">
            <h3>{ryanair.name}</h3>
            <p className="big-dims">{formatAirlineDims(ryanair.maxCm, 'cm')}</p>
            <p className="muted">{formatAirlineDims(ryanair.maxCm, 'in')}</p>
            <p className="muted">Weight: {formatBagWeight(ryanair.maxKg)}</p>
            <p className="muted small">{ryanair.notes}</p>
          </article>
          <article className="card compare-card">
            <h3>{united.name}</h3>
            <p className="big-dims">{formatAirlineDims(united.maxCm, 'cm')}</p>
            <p className="muted">{formatAirlineDims(united.maxCm, 'in')}</p>
            <p className="muted">Weight: {formatBagWeight(united.maxKg)}</p>
            <p className="muted small">{united.notes}</p>
          </article>
        </div>
      </section>

      <section className="qa-block">
        <h2>How to compare</h2>
        <ol>
          <li>
            Measure your bag’s height × width × depth the way the airline states (including
            wheels/handles if they say so).
          </li>
          <li>Toggle cm/in on the Bags tool.</li>
          <li>
            Check whether your fare includes a cabin bag, a personal item only, or priority rules
            — size is only half the policy.
          </li>
        </ol>
      </section>

      <section className="qa-block">
        <h2>Why this page exists</h2>
        <p>
          Searchers want a side-by-side. We give a clear compare plus a hard rule: always check
          the airline. Policies change.
        </p>
      </section>

      <section className="qa-block">
        <h2>Not a guarantee of boarding</h2>
        <p>
          Gate agents enforce the airline’s current rules. If Bags and the airline site disagree,
          the airline wins.
        </p>
      </section>

      <p>
        <Link to="/bags" className="btn btn-primary">
          Open Bags
        </Link>
      </p>
      <p className="disclaimer">
        Unofficial published sizes only. Confirm on the airline site before you fly.
      </p>
    </>
  )
}
