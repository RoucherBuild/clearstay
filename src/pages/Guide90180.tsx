import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function Guide90180() {
  return (
    <>
      <RouteMeta
        title="Schengen 90/180 explained — Staywindow"
        description="Plain-English guide to the Schengen rolling 180-day window: entry and exit both count, overlapping days count once."
      />
      <h1>The 90/180 rule, in plain English</h1>
      <p className="lede">
        Visa-free short stays in the Schengen Area are limited to <strong>90 days in any
        rolling 180-day period</strong>.
      </p>

      <section className="qa-block">
        <h2>Rolling window</h2>
        <p>
          On any day you check (“as of”), look back 179 days plus that day — a 180-day window
          that includes today. Count how many unique calendar days you were physically in
          Schengen inside that window. You may use up to 90 of those days.
        </p>
      </section>

      <section className="qa-block">
        <h2>Both days count</h2>
        <p>
          The day you enter and the day you leave each count as a full day, even if you are
          only there for a few hours.
        </p>
      </section>

      <section className="qa-block">
        <h2>Overlaps count once</h2>
        <p>
          If two trips cover the same calendar day (for example you change countries without
          leaving Schengen), that day still only counts once toward the 90.
        </p>
      </section>

      <section className="qa-block">
        <h2>Non-Schengen stops</h2>
        <p>
          Time in places like Ireland, Cyprus, or the UK does not use Schengen days — but
          check each country’s own rules separately.
        </p>
        <p>
          <Link to="/guide/schengen-countries">Which countries are in Schengen?</Link>
        </p>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open the stay calculator
        </Link>
      </p>
      <p className="muted">
        Official reference:{' '}
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          EU short-stay calculator
        </a>
      </p>
    </>
  )
}
