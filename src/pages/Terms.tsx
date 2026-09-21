import { RouteMeta } from '../components/RouteMeta'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

export function Terms() {
  return (
    <>
      <RouteMeta
        title="Terms of Use — Staywindow"
        description="Staywindow terms of use: unofficial estimates provided as is, not legal advice, not a government or airline site."
      />
      <h1>Terms of Use</h1>
      <p className="lede">Last updated 21 September 2026.</p>

      <section className="card">
        <h2>What this site is</h2>
        <p>
          Staywindow provides independent, unofficial estimates for travel planning. It is not
          the EU, not an airline, not a law firm, and not a claim company. The site is also
          available on this Pages.dev host and any custom domain we attach; these terms cover
          all of them.
        </p>
      </section>

      <section className="card">
        <h2>No professional relationship</h2>
        <p>
          Using the site does not create an attorney-client, adviser, or agency relationship.
        </p>
      </section>

      <section className="card">
        <h2>Estimates only / AS IS</h2>
        <p>
          Everything is provided <strong>AS IS</strong>, with no warranty of accuracy,
          completeness, merchantability, or fitness for a particular purpose. Rules and airline
          limits change. Calculators can be wrong. You must verify with official sources,
          including the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          .
        </p>
      </section>

      <section className="card">
        <h2>Not permission</h2>
        <p>
          Output from this site is not permission to enter, stay, board, or demand compensation.
        </p>
      </section>

      <section className="card">
        <h2>Your responsibility</h2>
        <p>
          You are responsible for the dates and facts you enter and for checking official
          records, including EES.
        </p>
      </section>

      <section className="card">
        <h2>Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW we are not liable for indirect, incidental,
          special, consequential, or punitive damages, including denied boarding, overstay
          findings, missed flights, bag fees, refused photos, or lost compensation claims.
          Because the tool is free, our total liability for any claim arising from the site is
          limited to US $0. These limits do not apply where the law does not allow them
          (including fraud, gross negligence, or rights that cannot be waived).
        </p>
      </section>

      <section className="card">
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Florida, USA, except where a
          mandatory consumer-protection law of your country applies and cannot be displaced.
        </p>
      </section>

      <section className="card">
        <h2>Venue</h2>
        <p>
          Disputes are subject to the courts located in Palm Beach County, Florida, except where
          a mandatory law gives you another forum.
        </p>
      </section>

      <section className="card">
        <h2>Severability</h2>
        <p>If one clause is unenforceable, the rest remains in effect.</p>
      </section>

      <section className="card">
        <h2>Changes</h2>
        <p>
          We may update these terms; the date at the top is the version. Continued use after that
          date is acceptance of that version.
        </p>
      </section>
    </>
  )
}
