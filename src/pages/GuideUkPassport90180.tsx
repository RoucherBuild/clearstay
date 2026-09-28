import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Do UK passport holders still get 90/180 in Schengen after Brexit?',
    a: 'UK nationals generally use the visa-free short-stay framework that applies to their nationality for Schengen visits — commonly discussed as 90 days in 180. Confirm current official UK and EU guidance for your trip.',
  },
  {
    q: 'Does time in the UK use Schengen days?',
    a: 'No. The UK is outside Schengen. Days only in the UK do not draw from the shared Schengen pool and do not restore it.',
  },
  {
    q: 'Is Ireland the same as Schengen for UK travellers?',
    a: 'No. Ireland is outside Schengen. Common Travel Area rules between the UK and Ireland are separate from Schengen 90/180. Check both systems on their own terms.',
  },
  {
    q: 'Should I use Staywindow as proof at the border?',
    a: 'No. Staywindow is an unofficial on-device estimate. Confirm with the official EU short-stay calculator and follow border officer instructions.',
  },
]

export function GuideUkPassport90180() {
  return (
    <>
      <RouteMeta
        title="UK passport Schengen 90/180 after Brexit"
        description="After Brexit, UK passports generally plan Schengen short stays on a 90-in-180 style cap. Confirm official UK and EU sources."
        path="/guide/uk-passport-90-180"
        faqs={FAQS}
      />
      <h1>UK passport Schengen 90/180 after Brexit</h1>
      <p className="lede">
        After Brexit, UK passport holders planning short Schengen visits generally work against
        the usual visa-free short-stay framework discussed as 90 days in any rolling 180 — one
        shared pool across Schengen. Unofficial planner guide. Confirm official UK and EU
        guidance for your nationality and trip.
      </p>

      <section className="qa-block">
        <h2>What changed, and what the day count still is</h2>
        <p>
          Free movement rules for UK nationals changed with Brexit. For many holiday and similar
          short stays in Schengen countries, travellers still need to watch a rolling short-stay
          limit rather than treating each country as a fresh 90-day pot. The mechanics match what
          other visa-free nationalities track: presence days in the area, entry and exit counting,
          rolling 180-day look-back. Details live on{' '}
          <Link to="/guide/90-180">how 90/180 is counted</Link>.
        </p>
        <p>
          This page does not replace Home Office, FCDO, or European Commission advice. Rules and
          edge cases (work, long stays, visas) sit outside a planning calculator.
        </p>
      </section>

      <section className="qa-block">
        <h2>UK and Ireland are outside the Schengen pool</h2>
        <p>
          Days spent only in the United Kingdom do not use Schengen 90/180 and do not restore
          Schengen capacity. Ireland is also outside Schengen — see{' '}
          <Link to="/guide/ireland-schengen">Ireland and Schengen</Link>. The Common Travel Area
          between the UK and Ireland is a different legal story from the Schengen short-stay pool.
          Do not assume a week in London or Dublin refreshes your Schengen allowance; days return
          when old Schengen presence falls out of the window (
          <Link to="/guide/when-days-reset">when days come back</Link>).
        </p>
        <p>
          Cyprus is another EU-not-Schengen planning case:{' '}
          <Link to="/guide/cyprus-schengen">Cyprus guide</Link>. Full member list:{' '}
          <Link to="/guide/schengen-countries">countries that count</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Mixed trips, layovers, EES</h2>
        <p>
          Eurostar, ferry, and multi-city trips often mix UK and Schengen segments. Count only the
          Schengen presence toward the pool (estimate). A layover counts when you clear Schengen
          border control — <Link to="/guide/layover-schengen">layover guide</Link>. EES records
          crossings; it does not invent a new unofficial day formula — <Link to="/ees">EES</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Estimate on Stay, confirm with the EU tool</h2>
        <p>
          Enter Schengen entry and exit dates on <Link to="/stay">Stay</Link>. Compare with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          . Staywindow is not permission to travel and not a claim that you will be admitted.
          US-passport travellers have a parallel explainer at{' '}
          <Link to="/guide/us-passport-90-180">US passport 90/180</Link>.
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
        <Link to="/guide/90-180">90/180 explained</Link>
        {' · '}
        <Link to="/guide/ireland-schengen">Ireland</Link>
      </p>
    </>
  )
}
