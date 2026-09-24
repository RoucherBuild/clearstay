import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function GuideSchengenCountries() {
  return (
    <>
      <RouteMeta
        title="Which countries count toward Schengen 90/180? — Staywindow"
        description="The 29 Schengen countries share one 90-day pool. Ireland, Cyprus and the UK do not count. Unofficial planning list — confirm with official EU sources."
      />
      <h1>Which countries count toward your 90 Schengen days?</h1>
      <p className="lede">
        Visa-free short stays use one shared allowance: 90 days in any rolling 180-day window,
        across the whole Schengen Area — not 90 days per country.
      </p>
      <p className="lede">
        If you spend 20 days in Spain and 20 in Norway, that is 40 days used, not two separate
        pots.
      </p>
      <p className="lede">
        This page is an unofficial planning list. Confirm with official EU sources before you
        travel.
      </p>

      <section className="qa-block">
        <h2>The 29 countries that count</h2>
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
        <h2>Places that do not use Schengen days</h2>
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
              <td>Ireland</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Cyprus</td>
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
          separately.
        </p>
      </section>

      <section className="qa-block">
        <h2>Easy mistakes</h2>
        <p>
          EU is not Schengen. Ireland and Cyprus are in the EU only. Iceland, Norway,
          Switzerland, and Liechtenstein are in Schengen only.
        </p>
        <p>
          It is one pool. Moving from Italy to Switzerland does not start a new 90 days.
        </p>
        <p>
          Entry and exit days both count in a country that is in the Area, even if you are only
          there a few hours.
        </p>
        <p>
          A layover counts if you pass Schengen passport control. Airside transit that never
          enters the Area usually does not.
        </p>
        <p>
          Overseas territories of France, the Netherlands, and others are often outside
          Schengen. Mainland Europe and the islands that are in the Area count; many Caribbean
          or Pacific territories do not. Check that place by name.
        </p>
        <p>
          Andorra, Monaco, San Marino, and Vatican City are not formal Schengen members. You
          almost always reach them through Schengen, so do not treat a stay there as a free
          reset.
        </p>
        <p>
          EES and ETIAS do not change this list. They are border and pre-travel systems. The
          29-country pool is the same.
        </p>
      </section>

      <section className="qa-block">
        <h2>How to log this in Staywindow</h2>
        <p>
          On the Stay tool, pick the country you were physically in. Schengen members add days.
          Ireland, Cyprus, the UK, and “Other / non-Schengen” add 0.
        </p>
        <p>
          Overlapping trips in two Schengen countries on the same calendar day still count as
          one day.
        </p>
      </section>

      <p>
        <Link to="/stay" className="btn btn-primary">
          Open the stay calculator
        </Link>
      </p>
      <p>
        <Link to="/guide/90-180">How 90/180 works</Link>
      </p>
      <p className="muted">
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          Official EU short-stay calculator
        </a>
      </p>

      <p className="muted">
        Staywindow is an independent planning tool — not a government site, visa shop, or claim
        company. This list is for planning only.
      </p>
    </>
  )
}
