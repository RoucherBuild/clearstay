import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function GuideWhenSchengenDaysReset() {
  return (
    <>
      <RouteMeta
        title="When do Schengen days come back? (rolling 180) | Staywindow"
        description="Days fall off a rolling 180-day window — they don’t reset on a fixed calendar date. Unofficial guide; confirm with the EU calculator."
      />
      <h1>When do Schengen days come back?</h1>
      <p className="lede">
        Unofficial guide to the rolling window. Confirm with the official EU short-stay
        calculator.
      </p>

      <section className="qa-block">
        <h2>Short answer</h2>
        <p>
          Under the usual 90/180 rule, days “come back” when they fall outside the 180-day window
          that ends on your as-of date. That is a rolling window, not a once-a-year reset and not
          a clean slate every Monday.
        </p>
      </section>

      <section className="qa-block">
        <h2>What people mean by reset</h2>
        <p>
          Forums often say “reset” when they mean “I get capacity back.” Capacity returns
          gradually as old presence days age out of the window. If you used many days recently,
          new capacity appears only as those days slide out — not all at once on a single
          anniversary unless your history happens to work that way.
        </p>
      </section>

      <section className="qa-block">
        <h2>As-of date matters</h2>
        <p>
          Tomorrow’s window is not identical to today’s. Planning a trip next month means checking
          the window that ends on those future dates.
        </p>
      </section>

      <section className="qa-block">
        <h2>How Stay helps (estimate)</h2>
        <p>
          Staywindow can show days used, days left, and related dates as an unofficial estimate,
          including shareable URLs. When you have trips listed, Stay may show a “Next full 90-day
          stay available from” date — the first day the rolling window no longer contains any of
          your listed Schengen days (estimate). It does not declare you safe to travel. Confirm
          with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
      </section>

      <section className="qa-block">
        <h2>Related myths</h2>
        <ul>
          <li>
            Myth: days reset every 180 days on a fixed schedule for everyone.
          </li>
          <li>Myth: leaving for one day refreshes 90.</li>
        </ul>
        <p>Reality: track presence in the rolling window.</p>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/90-180">How 90/180 works</Link>
        {' · '}
        <Link to="/guide/schengen-countries">Countries list</Link>
      </p>
    </>
  )
}
