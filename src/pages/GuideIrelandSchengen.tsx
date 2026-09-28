import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Does Ireland count toward Schengen 90/180?',
    a: 'No. Ireland is an EU member but not part of the Schengen area. Days spent only in Ireland do not use the shared Schengen 90-day pool and do not restore it.',
  },
  {
    q: 'If I spend a week in Dublin, do I get Schengen days back?',
    a: 'No. Time in Ireland does not pause or reset the Schengen clock. Days return only when old Schengen presence falls outside the rolling 180-day window.',
  },
  {
    q: 'What if my trip mixes Ireland and France?',
    a: 'Only the Schengen portion (for example France) uses the 90/180 pool. Enter those dates on Stay, not the Ireland dates, when estimating Schengen days.',
  },
  {
    q: 'Is Ireland the same as Cyprus or the UK for this rule?',
    a: 'All three sit outside the Schengen pool, for different reasons. Check each place’s own stay rules separately.',
  },
]

export function GuideIrelandSchengen() {
  return (
    <>
      <RouteMeta
        title="Does Ireland count toward Schengen 90/180?"
        description="No. Ireland is EU but not Schengen. Days there do not use or restore the 90/180 pool. Confirm with the official EU short-stay calculator."
        path="/guide/ireland-schengen"
        faqs={FAQS}
      />
      <h1>Does Ireland count toward Schengen 90/180?</h1>
      <p className="lede">
        Answer: No. Ireland is an EU member state but not part of the Schengen area. Days spent
        only in Ireland do not use the shared Schengen 90-day pool, and they do not restore it.
        Confirm official sources for your nationality.
      </p>

      <section className="qa-block">
        <h2>EU membership is not Schengen membership</h2>
        <p>
          Travellers often treat “Europe” and “EU” as the same day-count system. For the usual
          visa-free short-stay cap, what matters is presence in the Schengen area: one pool of 90
          days in any rolling 180 across the{' '}
          <Link to="/guide/schengen-countries">29 countries that count</Link>. Ireland opted out
          of Schengen. Crossing into Ireland is not the same as entering France, Spain, or Germany
          for 90/180 purposes.
        </p>
        <p>
          That means a Dublin holiday by itself does not consume Schengen days. It also means
          leaving Paris for a week in Cork does not wipe your Schengen history. Capacity in the
          Schengen pool returns only as old presence ages out of the rolling window — see{' '}
          <Link to="/guide/when-days-reset">when days come back</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>What still counts on a mixed trip</h2>
        <p>
          Many itineraries combine Ireland with Schengen states: Dublin then Amsterdam, Cork then
          Rome, or a ferry/air hop into France. Only the Schengen legs draw from the shared pool
          (estimate). Enter those entry and exit dates on the{' '}
          <Link to="/stay">Stay calculator</Link>. Keep Ireland dates out of the Schengen estimate
          unless you somehow also entered Schengen on the same calendar day through another
          routing — count what you actually entered.
        </p>
        <p>
          Ireland has its own stay and entry rules. Meeting the Schengen estimate does not answer
          whether you may enter Ireland, and the reverse is also true.
        </p>
      </section>

      <section className="qa-block">
        <h2>Common mix-ups</h2>
        <ul>
          <li>
            Myth: “I reset my Schengen days by going to Ireland.” Reality: Ireland does not reset
            the window.
          </li>
          <li>
            Myth: “All EU countries share one stamp system.” Reality: Schengen and EU overlap a
            lot but not completely — Ireland and Cyprus are the usual EU-not-Schengen examples
            people ask about (
            <Link to="/guide/cyprus-schengen">Cyprus guide</Link>).
          </li>
          <li>
            Myth: “A layover in Dublin counts like Frankfurt.” Reality: Dublin is outside
            Schengen; Frankfurt is inside if you enter. See{' '}
            <Link to="/guide/layover-schengen">layover guide</Link>.
          </li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>Related passport pages</h2>
        <p>
          US travellers often combine Ireland with Schengen sightseeing — see{' '}
          <Link to="/guide/us-passport-90-180">US passport 90/180</Link>. UK passport holders after
          Brexit follow the short-stay rules that apply to their nationality for Schengen visits —
          see <Link to="/guide/uk-passport-90-180">UK passport 90/180</Link>. Read{' '}
          <Link to="/guide/90-180">how 90/180 is counted</Link> for the rolling-window basics.
        </p>
        <p>
          Before you rely on any number, run Schengen dates through the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
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
        <Link to="/guide/schengen-countries">Countries that count</Link>
        {' · '}
        <Link to="/guide/cyprus-schengen">Cyprus</Link>
        {' · '}
        <Link to="/guide/uk-passport-90-180">UK passport</Link>
        {' · '}
        <Link to="/guide/90-180">90/180 explained</Link>
      </p>
    </>
  )
}
