import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import {
  EU_EES_OVERVIEW,
  EU_ETIAS,
  EU_SHORT_STAY_CALCULATOR,
} from '../lib/officialLinks'

export function Guide90180() {
  return (
    <>
      <RouteMeta
        title="How the Schengen 90/180 rule works (plain English) | Staywindow"
        description="Visa-free short stays usually mean 90 days in any rolling 180. Entry and exit count. Unofficial guide — confirm with the EU calculator."
      />
      <h1>How the Schengen 90/180 rule works</h1>
      <p className="lede">
        Unofficial plain-English guide to the usual Schengen short-stay cap. Confirm with the
        official EU short-stay calculator before you travel.
      </p>

      <section className="qa-block">
        <h2>The one-sentence rule</h2>
        <p>
          For many visa-free visitors, short stays in the Schengen area are limited to{' '}
          <strong>90 days in any 180-day period</strong>. That is the usual “90/180” cap people
          mean when they ask how many days they have left.
        </p>
      </section>

      <section className="qa-block">
        <h2>Rolling, not resetting</h2>
        <p>
          The 180 days roll with you. Days drop off when they fall outside the window ending on
          your as-of date. There is no monthly “reset button.” If someone says “your days renew
          on the 1st,” that is usually wrong for this rule.
        </p>
        <p>
          <Link to="/guide/when-schengen-days-reset">When do Schengen days come back?</Link>
        </p>
      </section>

      <section className="qa-block">
        <h2>One shared pool</h2>
        <p>
          Time in France, Germany, Spain, and other Schengen countries generally draws from the
          same 90-day pool. Visiting a second Schengen country does not give you a fresh 90.
        </p>
        <p>
          <Link to="/guide/schengen-countries">Schengen countries list (and who’s outside)</Link>
        </p>
      </section>

      <section className="qa-block">
        <h2>Entry and exit days</h2>
        <p>
          Both the day you enter and the day you leave normally count as days present. A same-day
          airside connection can be different from entering the area — see the layover guide.
        </p>
        <p>
          <Link to="/guide/layover-schengen-days">Does a Schengen layover count toward 90/180?</Link>
        </p>
      </section>

      <section className="qa-block">
        <h2>Common mix-ups</h2>
        <p>
          A layover may or may not count depending on whether you enter Schengen. Ireland and the
          UK are outside the Schengen area. “Days reset” usually means capacity coming back on a
          rolling window — not a fixed calendar wipe.
        </p>
        <ul className="link-list">
          <li>
            <Link to="/guide/layover-schengen-days">Layover / Schengen days</Link>
          </li>
          <li>
            <Link to="/guide/ireland-uk-schengen">Ireland, UK &amp; Schengen</Link>
          </li>
          <li>
            <Link to="/guide/when-schengen-days-reset">When days come back</Link>
          </li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>Who this page is for</h2>
        <p>
          Travellers with US, UK, Australian, Canadian, and similar visa-free short-stay access
          who are planning a trip in the next few weeks, or who already used part of their 90
          days. Your nationality and trip type matter; always check official rules for your
          passport.
        </p>
      </section>

      <section className="qa-block">
        <h2>What Staywindow does</h2>
        <p>
          Staywindow’s Stay tool is an unofficial on-device estimate: inclusive days, overlap
          handled as one day, as-of date, shareable URL. It is not the EU calculator and not a
          decision that you are “safe to travel.” Prefer language like “under the usual cap
          (estimate).”
        </p>
      </section>

      <section className="qa-block">
        <h2>Confirm officially</h2>
        <p>
          Use the European Commission’s short-stay calculator and Schengen short-stay guidance.
          For entry systems, read official EES / ETIAS pages — Staywindow does not sell ETIAS and
          is not EES.
        </p>
        <ul className="link-list">
          <li>
            <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
              Official EU short-stay calculator
            </a>
          </li>
          <li>
            <a href={EU_EES_OVERVIEW} target="_blank" rel="noopener noreferrer">
              Official EES overview
            </a>
          </li>
          <li>
            <a href={EU_ETIAS} target="_blank" rel="noopener noreferrer">
              Official ETIAS overview
            </a>
          </li>
        </ul>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/schengen-countries">Country list</Link>
        {' · '}
        <Link to="/guide/layover-schengen-days">Does a layover count?</Link>
        {' · '}
        <Link to="/guide/ireland-uk-schengen">Ireland &amp; UK</Link>
        {' · '}
        <Link to="/guide/when-schengen-days-reset">When days “come back”</Link>
      </p>
    </>
  )
}
