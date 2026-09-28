import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Which countries count toward Schengen 90/180?',
    a: 'Twenty-nine Schengen members share one pool. Iceland, Liechtenstein, Norway, and Switzerland count even though they are not in the EU. Ireland, Cyprus, and the UK do not count toward the pool.',
  },
  {
    q: 'Does Ireland count?',
    a: 'No. EU member, not Schengen. Days there do not use or restore the 90.',
  },
  {
    q: 'Does Cyprus count?',
    a: 'No — not while internal Schengen borders are not abolished. Track Cyprus separately.',
  },
  {
    q: 'Do Norway and Switzerland count?',
    a: 'Yes. They are Schengen members outside the EU and use the same shared 90-day pool.',
  },
]

export function GuideSchengenCountries() {
  return (
    <>
      <RouteMeta
        title="Which countries count toward Schengen 90/180"
        description="29 Schengen members share one 90/180 pool. Ireland, Cyprus, UK do not count; IS/LI/NO/CH do. Unofficial list — confirm official sources."
        path="/guide/schengen-countries"
        faqs={FAQS}
      />
      <h1>Which countries count toward Schengen 90/180</h1>
      <p className="lede">
        Visa-free short stays use one shared allowance: 90 days in any rolling 180-day window,
        across the whole Schengen Area — not 90 days per country. This page is an unofficial
        planning list. Membership and border rules change — confirm on European Commission /
        home-affairs pages and the{' '}
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          official EU short-stay calculator
        </a>
        .
      </p>

      <section className="qa-block">
        <h2>The 29 countries that count (in the pool)</h2>
        <p>Time in any of these uses the same 90 days.</p>

        <h3>Also in the EU (25)</h3>
        <p>
          Austria, Belgium, Bulgaria, Croatia, Czech Republic, Denmark, Estonia, Finland,
          France, Germany, Greece, Hungary, Italy, Latvia, Lithuania, Luxembourg, Malta,
          Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden.
        </p>

        <h3>Schengen, not in the EU (4)</h3>
        <p>Iceland, Liechtenstein, Norway, Switzerland.</p>
        <p>Those four non-EU members count exactly like France or Germany.</p>
        <p>
          Bulgaria and Romania count fully (air and sea from 31 March 2024; land borders from 1
          January 2025). Croatia has counted since 2023.
        </p>
      </section>

      <section className="qa-block">
        <h2>Outside the pool (common confusion)</h2>
        <table className="guide-table">
          <thead>
            <tr>
              <th>Place</th>
              <th>In the EU?</th>
              <th>Uses your 90 days?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="/guide/ireland-schengen">Ireland</Link>
              </td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>
                <Link to="/guide/cyprus-schengen">Cyprus</Link>
              </td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>United Kingdom</td>
              <td>No</td>
              <td>No</td>
            </tr>
            <tr>
              <td>United States, Canada, Australia, and most other countries</td>
              <td>No</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
        <p>
          Days in Ireland, Cyprus, or the UK do not pause or reset the Schengen clock. They
          simply do not add to the 90. Those places have their own stay rules — check those
          separately. Passport-specific notes:{' '}
          <Link to="/guide/us-passport-90-180">US</Link>,{' '}
          <Link to="/guide/uk-passport-90-180">UK</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Easy mistakes</h2>
        <p>
          EU is not Schengen. Ireland and Cyprus are in the EU only. Iceland, Norway,
          Switzerland, and Liechtenstein are in Schengen only.
        </p>
        <p>
          It is one pool. Moving from Italy to Switzerland does not start a new 90 days. Entry and
          exit days both count in a country that is in the Area. A layover counts if you pass
          Schengen passport control — see{' '}
          <Link to="/guide/layover-schengen">does a layover count?</Link>
        </p>
        <p>
          Overseas territories of France, the Netherlands, and others are often outside Schengen.
          Andorra, Monaco, San Marino, and Vatican City are not formal Schengen members; you
          almost always reach them through Schengen, so do not treat a stay there as a free reset.
          Days “come back” on a rolling window —{' '}
          <Link to="/guide/when-days-reset">when do Schengen days come back?</Link>
        </p>
        <p>
          EES and ETIAS do not change this list. They are border and pre-travel systems. The
          29-country pool is the same for day counting.
        </p>
      </section>

      <section className="qa-block">
        <h2>How to use with Stay</h2>
        <p>
          Count days in countries that are in the Schengen area for your itinerary. On the{' '}
          <Link to="/stay">Stay</Link> tool, pick the country you were physically in. Schengen
          members add days. Ireland, Cyprus, the UK, and “Other / non-Schengen” add 0. Overlapping
          trips in two Schengen countries on the same calendar day still count as one day. Then
          confirm with the official calculator. Read{' '}
          <Link to="/guide/90-180">how 90/180 is counted</Link> for inclusive-day basics.
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
        <Link to="/guide/90-180">How 90/180 works</Link>
        {' · '}
        <Link to="/guide/layover-schengen">Layover</Link>
        {' · '}
        <Link to="/guide/ireland-schengen">Ireland</Link>
        {' · '}
        <Link to="/guide/cyprus-schengen">Cyprus</Link>
        {' · '}
        <Link to="/guide/when-days-reset">When days come back</Link>
      </p>
      <p className="muted">
        Staywindow is an independent planning tool — not a government site, visa shop, or claim
        company. This list is for planning only.
      </p>
    </>
  )
}
