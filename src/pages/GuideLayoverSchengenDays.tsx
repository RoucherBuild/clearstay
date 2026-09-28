import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function GuideLayoverSchengenDays() {
  return (
    <>
      <RouteMeta
        title="Does a Schengen layover count toward 90/180? | Staywindow"
        description="Airside transit vs entering Schengen can differ. Unofficial explainer — confirm airline routing and the EU short-stay rules."
      />
      <h1>Does a Schengen layover count toward 90/180?</h1>
      <p className="lede">
        Unofficial orientation only. Staywindow cannot see your boarding passes — confirm with
        official short-stay rules and your airline’s transit info.
      </p>

      <section className="qa-block">
        <h2>Short answer</h2>
        <p>
          It depends whether you enter the Schengen area. An airside transit where you never pass
          immigration is different from clearing passport control, collecting bags, or sleeping in
          the city.
        </p>
      </section>

      <section className="qa-block">
        <h2>When a layover usually does count</h2>
        <p>
          If you pass through border control into a Schengen country — even for one night — that
          presence normally counts toward the usual 90/180 pool. Entry and exit days both matter.
        </p>
      </section>

      <section className="qa-block">
        <h2>When it may not</h2>
        <p>
          Some itineraries keep you airside in international transit without entering. That is
          not something a website can certify from a city pair alone. Airport, airline,
          citizenship, and whether you need an airport transit visa all change the answer.
        </p>
      </section>

      <section className="qa-block">
        <h2>Ireland, UK, and “Europe” confusion</h2>
        <p>
          A layover in Dublin or London is not the same as a layover in Amsterdam or Frankfurt for
          Schengen day-counting.
        </p>
        <p>
          <Link to="/guide/ireland-uk-schengen">Ireland, the UK, and Schengen days</Link>
        </p>
      </section>

      <section className="qa-block">
        <h2>How to use Stay</h2>
        <p>
          If you know you entered (stamp, hotel, or landside connection), add that stay like any
          other trip and run the estimate. If you are unsure you entered, do not guess “zero” to
          make the number look good — check official guidance and the airline.
        </p>
      </section>

      <section className="qa-block">
        <h2>Language to avoid</h2>
        <p>
          Do not treat any web estimate as “safe to connect.” Prefer: under the usual cap
          (estimate), confirm with official sources.
        </p>
      </section>

      <section className="qa-block">
        <h2>Official next step</h2>
        <p>
          Use the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            EU short-stay calculator
          </a>{' '}
          and Commission short-stay pages. Check airline/airport transit pages for your exact
          routing.
        </p>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/90-180">How 90/180 works</Link>
        {' · '}
        <Link to="/guide/schengen-countries">Schengen countries</Link>
        {' · '}
        <Link to="/guide/ireland-uk-schengen">Ireland &amp; UK</Link>
        {' · '}
        <Link to="/faq">FAQ</Link>
      </p>
    </>
  )
}
