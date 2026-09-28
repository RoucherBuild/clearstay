import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'When do Schengen days come back?',
    a: 'They do not reset on exit. A day returns when it falls outside the 180-day look-back that ends on your as-of date. Capacity comes back gradually as old presence ages out.',
  },
  {
    q: 'If I leave Schengen for one day, do I get 90 days again?',
    a: 'No. Leaving does not wipe the rolling window. Only days that fall outside the look-back stop counting.',
  },
  {
    q: 'Is there a calendar-year reset?',
    a: 'Not for the usual 90/180 short-stay rule. The window moves with you; it is not 90 days per calendar year.',
  },
  {
    q: 'What does Staywindow’s “next full 90” date mean?',
    a: 'An unofficial estimate of the first day the rolling window no longer contains any of your listed Schengen days. Confirm with the official EU short-stay calculator.',
  },
]

export function GuideWhenDaysReset() {
  return (
    <>
      <RouteMeta
        title="When do Schengen days come back?"
        description="Days do not reset on exit. A day returns when it falls outside the 180-day look-back. Confirm with the official EU short-stay calculator."
        path="/guide/when-days-reset"
        faqs={FAQS}
      />
      <h1>When do Schengen days come back?</h1>
      <p className="lede">
        Answer: they do not reset on exit. A day returns when it falls outside the 180-day
        look-back that ends on your as-of date. Capacity comes back as old presence ages out of
        the rolling window — not on a fixed anniversary for everyone.
      </p>

      <section className="qa-block">
        <h2>Rolling window, not a reset button</h2>
        <p>
          Under the usual Schengen short-stay rule, many visa-free visitors may stay up to 90 days
          in any 180-day period across the area. The 180 days end on the date you are checking
          (your as-of date). Presence that still sits inside that look-back still counts. Presence
          that has slid out no longer counts. That is what people mean when they say days “come
          back.”
        </p>
        <p>
          Leaving the area for a weekend does not grant a fresh 90. A calendar New Year does not
          wipe the slate. Forums that say “your days reset on the 1st” are usually describing a
          different mental model. For the mechanics of counting — inclusive entry/exit, one pool —
          see <Link to="/guide/90-180">how 90/180 is counted</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>What “reset” usually means in conversation</h2>
        <p>
          Travellers say “reset” when they mean “I have room again.” Room appears gradually. If you
          used many days recently, new capacity appears only as those days age beyond the 180-day
          horizon. If your history is sparse, you may already have most of the 90 available. Your
          neighbour’s timeline is not yours.
        </p>
        <p>
          Tomorrow’s window is not identical to today’s. Planning a trip next month means checking
          the window that ends on those future dates, not only today’s remaining total.
        </p>
      </section>

      <section className="qa-block">
        <h2>Myths that waste planning time</h2>
        <ul>
          <li>Myth: days reset every 180 days on a fixed schedule for everyone.</li>
          <li>Myth: leaving for one day refreshes 90.</li>
          <li>
            Myth: a week in Ireland or the UK restores Schengen days — those places are outside
            the pool (
            <Link to="/guide/ireland-schengen">Ireland</Link>,{' '}
            <Link to="/guide/uk-passport-90-180">UK passport</Link>).
          </li>
        </ul>
        <p>
          Reality: track presence in the rolling window across{' '}
          <Link to="/guide/schengen-countries">countries that count</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>How Stay helps (estimate only)</h2>
        <p>
          The <Link to="/stay">Stay calculator</Link> can show days used, days left, window
          bounds, and — when you have trips listed — a “next full 90-day stay available from”
          date: the first day the rolling window no longer contains any of your listed Schengen
          days (estimate). It does not declare you safe to travel. Always confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
        <p>
          US and UK passport explainers:{' '}
          <Link to="/guide/us-passport-90-180">US</Link>,{' '}
          <Link to="/guide/uk-passport-90-180">UK</Link>.
        </p>
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
        <Link to="/guide/90-180">90/180 explained</Link>
        {' · '}
        <Link to="/guide/schengen-countries">Countries that count</Link>
        {' · '}
        <Link to="/faq">FAQ</Link>
      </p>
    </>
  )
}
