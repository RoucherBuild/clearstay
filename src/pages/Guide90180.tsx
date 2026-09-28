import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import {
  EU_EES_OVERVIEW,
  EU_ETIAS,
  EU_SHORT_STAY_CALCULATOR,
} from '../lib/officialLinks'

const FAQS = [
  {
    q: 'When do Schengen days reset?',
    a: 'They do not reset on a calendar year or when you leave. Days drop off the back of the rolling 180-day window. See the when-days-reset guide.',
  },
  {
    q: 'Do entry and exit days both count?',
    a: 'Yes, under the usual short-stay counting approach both the entry day and the exit day normally count as days present.',
  },
  {
    q: 'Is it 90 days per Schengen country?',
    a: 'No. Visa-free short stays usually share one 90-day pool across the Schengen area.',
  },
  {
    q: 'What is the as-of date?',
    a: 'The date you are checking. The 180-day look-back ends on that date. Tomorrow’s window is not identical to today’s.',
  },
  {
    q: 'Is Staywindow the official calculator?',
    a: 'No. Staywindow is an unofficial on-device estimate. Confirm with the official EU short-stay calculator.',
  },
]

export function Guide90180() {
  return (
    <>
      <RouteMeta
        title="How the Schengen 90/180 rule is counted"
        description="Not a calendar year: days drop off a rolling 180-day window. Entry+exit count; leaving does not reset. Confirm with the official EU short-stay calculator."
        path="/guide/90-180"
        faqs={FAQS}
      />
      <h1>The 90/180 rolling window</h1>
      <p className="lede">
        Unofficial plain-English guide to how the usual Schengen short-stay cap is counted: 90
        days in any rolling 180, one shared pool, entry and exit included. Confirm with the{' '}
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          official EU short-stay calculator
        </a>{' '}
        before you travel.
      </p>

      <section className="qa-block">
        <h2>The one-sentence rule</h2>
        <p>
          For many visa-free visitors, short stays in the Schengen area are limited to{' '}
          <strong>90 days in any 180-day period</strong>. That is the usual “90/180” cap people
          mean when they ask how many days they have left. It is not 90 days per country and not
          90 days per calendar year.
        </p>
      </section>

      <section className="qa-block">
        <h2>Rolling, not resetting</h2>
        <p>
          The 180 days roll with you. Days drop off when they fall outside the window ending on
          your as-of date — the date you are checking. There is no monthly reset button. Leaving
          the area does not wipe the slate. If someone says “your days renew on the 1st,” that is
          usually wrong for this rule. Capacity returns as old presence ages out — see{' '}
          <Link to="/guide/when-days-reset">when Schengen days come back</Link>.
        </p>
        <p>
          The rolling approach has applied in this modern form since the short-stay calculator
          methodology people cite from mid-October 2013 onward; always verify current Commission
          wording for your trip.
        </p>
      </section>

      <section className="qa-block">
        <h2>One shared pool across the area</h2>
        <p>
          Time in France, Germany, Spain, Italy, and other Schengen countries generally draws from
          the same 90-day pool. Visiting a second Schengen country does not give you a fresh 90.
          Iceland, Liechtenstein, Norway, and Switzerland count in that pool even though they are
          not EU members. Ireland and Cyprus are EU members outside the pool; the UK is outside
          too — full list on{' '}
          <Link to="/guide/schengen-countries">which countries count</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Entry and exit days</h2>
        <p>
          Both the day you enter and the day you leave normally count as days present. A same-day
          airside connection can be different from entering the area — see{' '}
          <Link to="/guide/layover-schengen">does a layover count as a Schengen day?</Link>
        </p>
        <p>
          If two Schengen trips overlap on one calendar day, that day still counts once in the
          pool (estimate). Non-Schengen stays contribute zero to the shared total.
        </p>
      </section>

      <section className="qa-block">
        <h2>As-of date = the check date</h2>
        <p>
          When you ask “how many days do I have left?”, you are asking about a specific end date
          for the look-back. Change the as-of date and the set of days inside the window can
          change. Planning for next month means checking next month’s window, not only today’s
          remaining figure.
        </p>
      </section>

      <section className="qa-block">
        <h2>Common mix-ups</h2>
        <ul className="link-list">
          <li>
            <Link to="/guide/layover-schengen">Layover / Schengen days</Link>
          </li>
          <li>
            <Link to="/guide/ireland-schengen">Does Ireland count?</Link>
          </li>
          <li>
            <Link to="/guide/cyprus-schengen">Does Cyprus count?</Link>
          </li>
          <li>
            <Link to="/guide/when-days-reset">When days come back</Link>
          </li>
          <li>
            <Link to="/guide/us-passport-90-180">US passport 90/180</Link>
          </li>
          <li>
            <Link to="/guide/uk-passport-90-180">UK passport 90/180</Link>
          </li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>What Staywindow does</h2>
        <p>
          Staywindow’s <Link to="/stay">Stay</Link> tool is an unofficial on-device estimate:
          inclusive days, overlap handled as one day, as-of date, shareable URL. It is not the EU
          calculator and not a decision that you are “safe to travel.” Prefer language like “under
          the usual cap (estimate).” Always confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
        <ul className="link-list">
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

      <FaqDetails faqs={FAQS} />

      <p className="unofficial-planner-note">
        Unofficial planner. Not the European Commission calculator.
      </p>
      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/schengen-countries">Country list</Link>
        {' · '}
        <Link to="/guide/layover-schengen">Does a layover count?</Link>
        {' · '}
        <Link to="/guide/ireland-schengen">Ireland</Link>
        {' · '}
        <Link to="/guide/when-days-reset">When days come back</Link>
      </p>
    </>
  )
}
