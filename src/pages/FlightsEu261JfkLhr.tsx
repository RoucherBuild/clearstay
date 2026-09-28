import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import {
  EU_AIR_PASSENGER_RIGHTS,
  UK_CAA_PASSENGER_DELAYS,
} from '../lib/officialLinks'

export function FlightsEu261JfkLhr() {
  return (
    <>
      <RouteMeta
        title="EU261 delay bands: JFK–LHR example (estimate only) | Staywindow"
        description="Rough EU261 / UK261 compensation bands for a sample long delay. We do not file claims. Confirm CAA / official passenger-rights pages."
        path="/flights/eu261-jfk-lhr"
      />
      <h1>EU261 delay bands: JFK–LHR example (estimate only)</h1>
      <p className="lede">
        <strong>Estimate only.</strong> Staywindow shows rough compensation bands. We do not
        file claims, guarantee payment, or act as a claim company.
      </p>

      <section className="qa-block">
        <h2>What this page is</h2>
        <p>
          A worked example of how passengers look up rough compensation bands for delay length
          and distance. Treat the Flights tool output as orientation, not a promise.
        </p>
      </section>

      <section className="qa-block">
        <h2>Example framing (illustrative)</h2>
        <p>
          Route idea: New York (JFK) to London (LHR). A long delay (for example around four hours)
          is the kind of case people search when they are curious about bands. Distance category
          and whether EU261 / UK261-style rules apply depend on operating carrier, itinerary, and
          official criteria — verify on CAA and official passenger-rights pages.
        </p>
        <p>
          This page does not invent payout figures. Open the Flights tool, enter your details, and
          read the band estimate there.
        </p>
      </section>

      <section className="qa-block">
        <h2>Use the Flights tool</h2>
        <p>
          Enter your details on Flights for a band estimate. Treat the output as orientation, not
          a promise.
        </p>
      </section>

      <section className="qa-block">
        <h2>What we never say</h2>
        <ul>
          <li>We will get your money</li>
          <li>Guaranteed €600</li>
          <li>Our lawyers</li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>Official passenger-rights sources</h2>
        <ul className="link-list">
          <li>
            <a href={UK_CAA_PASSENGER_DELAYS} target="_blank" rel="noopener noreferrer">
              UK CAA — flight delays and passenger rights
            </a>
          </li>
          <li>
            <a href={EU_AIR_PASSENGER_RIGHTS} target="_blank" rel="noopener noreferrer">
              EU Your Europe — air passenger rights
            </a>
          </li>
        </ul>
      </section>

      <p>
        <Link to="/flights" className="btn btn-primary">
          Open Flights
        </Link>
      </p>
      <p className="muted">
        Unofficial estimate language only. Confirm CAA / official passenger-rights pages before
        you rely on any figure.
      </p>
    </>
  )
}
