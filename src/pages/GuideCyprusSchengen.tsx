import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Does Cyprus count toward Schengen days?',
    a: 'No — not while Cyprus has not abolished internal Schengen borders. Days in Cyprus do not use the shared Schengen 90/180 pool. Track Cyprus stays under Cyprus rules separately.',
  },
  {
    q: 'Is Cyprus in the EU?',
    a: 'Yes. EU membership is not the same as Schengen membership. Cyprus is a common EU-not-Schengen example alongside Ireland.',
  },
  {
    q: 'If I fly Larnaca–Athens, what counts?',
    a: 'The Greece (Athens) portion is Schengen presence once you enter Greece. Cyprus days themselves do not feed the shared pool. Confirm both countries’ rules for your passport.',
  },
  {
    q: 'Will this change when Cyprus joins Schengen fully?',
    a: 'Border arrangements can change. Re-check European Commission guidance closer to travel. This page describes the usual planning picture: track Cyprus separately for now.',
  },
]

export function GuideCyprusSchengen() {
  return (
    <>
      <RouteMeta
        title="Does Cyprus count toward Schengen days?"
        description="No — not while internal Schengen borders are not abolished. Track Cyprus separately. Confirm with the official EU short-stay calculator."
        path="/guide/cyprus-schengen"
        faqs={FAQS}
      />
      <h1>Does Cyprus count toward Schengen days?</h1>
      <p className="lede">
        Answer: No — not while Cyprus has not abolished internal Schengen borders. Days in Cyprus
        do not use the shared Schengen 90/180 pool. Track them under Cyprus’s own rules. Unofficial
        planner guide only.
      </p>

      <section className="qa-block">
        <h2>Why Cyprus is a frequent mix-up</h2>
        <p>
          Cyprus is in the European Union. Many travellers assume every EU destination shares the
          Schengen short-stay clock. The usual visa-free cap people mean by “90/180” applies across
          the Schengen area — currently{' '}
          <Link to="/guide/schengen-countries">29 members in one pool</Link> — not automatically
          across every EU member. Ireland is the other EU-not-Schengen case people ask about most
          often (<Link to="/guide/ireland-schengen">Ireland guide</Link>).
        </p>
        <p>
          Until internal Schengen border controls are abolished for Cyprus in the way full members
          operate, treat Cyprus presence as outside the shared Schengen day pool for planning.
          Always re-check Commission and national sources before you travel; arrangements can
          evolve.
        </p>
      </section>

      <section className="qa-block">
        <h2>What to count on a mixed itinerary</h2>
        <p>
          A common trip is Cyprus plus Greece, or Cyprus plus Italy. Once you enter a Schengen
          country, those dates use the shared pool (estimate). Cyprus dates themselves do not add
          to that pool and do not restore used Schengen days. Enter only the Schengen legs on the{' '}
          <Link to="/stay">Stay calculator</Link>, then confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
        <p>
          Overstaying Cyprus rules is a separate problem from the Schengen estimate. Meeting one
          does not satisfy the other.
        </p>
      </section>

      <section className="qa-block">
        <h2>Layover and passport notes</h2>
        <p>
          Whether a connection in Larnaca or Paphos “counts” for Schengen is the wrong first
          question: Cyprus is outside the shared pool. A later entry into Greece or another
          Schengen state is what feeds 90/180. See the{' '}
          <Link to="/guide/layover-schengen">layover guide</Link> for airside vs entering logic
          inside Schengen airports. US and UK passport holders still need the nationality-specific
          short-stay picture:{' '}
          <Link to="/guide/us-passport-90-180">US passport</Link>,{' '}
          <Link to="/guide/uk-passport-90-180">UK passport</Link>.
        </p>
        <p>
          For the rolling window itself, read{' '}
          <Link to="/guide/90-180">how 90/180 is counted</Link> and{' '}
          <Link to="/guide/when-days-reset">when days come back</Link>.
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
        <Link to="/guide/ireland-schengen">Ireland</Link>
        {' · '}
        <Link to="/guide/90-180">90/180 explained</Link>
      </p>
    </>
  )
}
