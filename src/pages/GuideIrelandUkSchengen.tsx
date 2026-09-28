import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function GuideIrelandUkSchengen() {
  return (
    <>
      <RouteMeta
        title="Ireland, the UK, and Schengen days (what counts) | Staywindow"
        description="Ireland and the UK are outside the Schengen area. Time there usually does not use the Schengen 90/180 pool — confirm official sources."
      />
      <h1>Ireland, the UK, and Schengen days</h1>
      <p className="lede">
        Calm, unofficial guide. Always confirm with official sources for your nationality.
      </p>

      <section className="qa-block">
        <h2>Short answer</h2>
        <p>
          Ireland and the United Kingdom are not part of the Schengen area. Days spent only in
          Ireland or only in the UK generally do not draw from the shared Schengen 90/180 pool
          that covers countries like France, Spain, Italy, and Germany.
        </p>
      </section>

      <section className="qa-block">
        <h2>What still counts</h2>
        <p>
          If your trip also includes Schengen countries, only the Schengen portion uses that pool
          (estimate). A London long weekend before Paris does not “erase” Paris days; it also does
          not usually consume Schengen days by itself.
        </p>
      </section>

      <section className="qa-block">
        <h2>Common mix-ups</h2>
        <ul>
          <li>“Europe trip” is not the same as all Schengen.</li>
          <li>
            Eurostar / ferry itineraries can mix UK and Schengen in one holiday — count the
            Schengen legs carefully.
          </li>
          <li>
            Cyprus and other special cases belong on the{' '}
            <Link to="/guide/schengen-countries">countries guide</Link>, not lumped with Ireland.
          </li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>Brexit note</h2>
        <p>
          UK passport holders follow the rules that apply to their nationality for short stays in
          Schengen. This page does not replace official Home Office / EU guidance.
        </p>
      </section>

      <section className="qa-block">
        <h2>Use Stay for the Schengen legs</h2>
        <p>
          Enter only the dates you are in Schengen countries when estimating the usual 90/180
          cap. Then confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/schengen-countries">Countries list</Link>
        {' · '}
        <Link to="/guide/90-180">90/180 pillar</Link>
        {' · '}
        <Link to="/guide/layover-schengen-days">Layover guide</Link>
      </p>
    </>
  )
}
