import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Does every layover in Europe count toward Schengen 90/180?',
    a: 'No. Only presence inside the Schengen area counts. Airside transit without clearing Schengen border control generally does not. If you pass passport control into a Schengen country, the entry day normally counts.',
  },
  {
    q: 'Does a same-day connection through Amsterdam count?',
    a: 'If you stay airside and never enter the Netherlands as a Schengen arrival, it usually does not. If you clear immigration (hotel night, landside transfer, collecting bags), it usually does. Confirm your airport and routing.',
  },
  {
    q: 'What about a layover in Dublin or London?',
    a: 'Ireland and the UK are outside Schengen. Those stops do not use the shared 90/180 pool. See the Ireland and UK passport guides.',
  },
  {
    q: 'Should I add a layover to the Staywindow calculator?',
    a: 'Add it only when you know you entered Schengen. Do not assume zero to make the estimate look better. Confirm with the official EU short-stay calculator.',
  },
]

export function GuideLayoverSchengen() {
  return (
    <>
      <RouteMeta
        title="Does a layover count as a Schengen day?"
        description="Clear Schengen control and the entry day usually counts; airside transit generally does not. Confirm airport and the official EU short-stay calculator."
        path="/guide/layover-schengen"
        faqs={FAQS}
      />
      <h1>Does a layover count as a Schengen day?</h1>
      <p className="lede">
        Short answer: if you clear Schengen border control, yes — the entry day normally counts.
        Airside transit without entering the area generally does not. Confirm the airport and your
        exact routing. This is an unofficial planner guide, not a border decision.
      </p>

      <section className="qa-block">
        <h2>What “entering Schengen” means at an airport</h2>
        <p>
          The usual short-stay cap for many visa-free visitors is 90 days in any rolling 180-day
          period across the Schengen area — one shared pool, not 90 days per country. Presence
          days are what matter. A layover becomes presence when you pass through border control
          into a Schengen member state: France, Germany, Spain, Italy, the Netherlands, and the
          rest of the{' '}
          <Link to="/guide/schengen-countries">29 countries that count</Link>.
        </p>
        <p>
          Both the day you enter and the day you leave normally count as days present. A
          same-calendar-day arrival and departure still uses that one day in the pool. Overlapping
          trips on the same day still count as one day.
        </p>
      </section>

      <section className="qa-block">
        <h2>When a layover usually does count</h2>
        <p>
          Typical cases: you clear passport control, collect checked bags, overnight in a city
          hotel, take a landside train between terminals that requires entry, or otherwise leave
          the international transit zone into the Schengen country. Even a few hours on the ground
          after immigration is presence. Cabin bag rules do not change the day count — they are a
          separate packing question on <Link to="/bags">Bags</Link>.
        </p>
        <p>
          If you know you entered, treat the stop like any other short stay when you run an
          estimate on the <Link to="/stay">Stay calculator</Link>, then confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
      </section>

      <section className="qa-block">
        <h2>When it may not count</h2>
        <p>
          Some itineraries keep you airside in international transit: you never pass Schengen
          immigration, you do not enter the country for immigration purposes, and you continue on
          a connecting flight. In those cases the layover generally does not draw from the 90/180
          pool. That outcome depends on airport layout, airline through-check, citizenship, and
          whether an airport transit visa is required. A website cannot certify your boarding
          passes from a city pair alone.
        </p>
        <p>
          Mixed tickets, self-transfer, or collecting bags often force you landside. When unsure,
          assume you may enter and check airline and airport transit pages for your routing before
          you travel.
        </p>
      </section>

      <section className="qa-block">
        <h2>Ireland, UK, Cyprus, and “Europe” confusion</h2>
        <p>
          A connection in Dublin or London is not a Schengen presence day. Ireland and the UK sit
          outside the area — see <Link to="/guide/ireland-schengen">Ireland and Schengen</Link>{' '}
          and <Link to="/guide/uk-passport-90-180">UK passport 90/180</Link>. Cyprus is also
          outside the shared pool for now — see{' '}
          <Link to="/guide/cyprus-schengen">Cyprus and Schengen</Link>. Brochure “Europe” is not
          the same as Schengen.
        </p>
      </section>

      <section className="qa-block">
        <h2>How to use Staywindow (estimate only)</h2>
        <p>
          If you entered, add entry and exit dates for that Schengen country on{' '}
          <Link to="/stay">Stay</Link>. If you stayed airside and never entered, do not invent a
          free day by deleting a stop you actually cleared — and do not invent presence you did not
          have. Prefer calm language: under the usual cap (estimate). Never treat a web number as
          “safe to travel.” Read more on <Link to="/guide/90-180">how 90/180 is counted</Link> and
          when <Link to="/guide/when-days-reset">days come back</Link>.
        </p>
        <p>
          Always finish with the{' '}
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
        <Link to="/guide/90-180">90/180 explained</Link>
        {' · '}
        <Link to="/guide/schengen-countries">Countries that count</Link>
        {' · '}
        <Link to="/guide/ireland-schengen">Ireland</Link>
        {' · '}
        <Link to="/faq">FAQ</Link>
      </p>
    </>
  )
}
