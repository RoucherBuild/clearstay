import { RouteMeta } from '../components/RouteMeta'

export function Terms() {
  return (
    <>
      <RouteMeta
        title="Terms of Use — Staywindow"
        description="Staywindow terms of use: unofficial estimates provided as is, not legal advice, not a government or airline site."
      />
      <h1>Terms of Use</h1>
      <p className="lede">Short and plain. Last updated September 2026.</p>

      <section className="card">
        <h2>What this site is</h2>
        <p>
          Staywindow (thestaywindow.com) is an independent, unofficial planning tool. It
          provides estimates only. It is not a government website, not an airline website, and
          not affiliated with the EU, any state, or any airline.
        </p>
      </section>

      <section className="card">
        <h2>No warranty</h2>
        <p>
          Everything on this site is provided <strong>AS IS</strong>, without any warranty of
          accuracy, completeness, or fitness for a particular purpose. Rules, limits, and
          published dimensions change. Calculators can be wrong.
        </p>
      </section>

      <section className="card">
        <h2>Not legal advice</h2>
        <p>
          Nothing here is legal advice, immigration advice, or permission to travel. Border
          officers, airline staff, and official records (including EES) control what happens at
          the border and at the gate.
        </p>
      </section>

      <section className="card">
        <h2>Confirm with official sources</h2>
        <p>
          Before you travel or rely on any number, confirm with official EU, national CAA, and
          airline sources — not this site.
        </p>
      </section>

      <section className="card">
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent allowed by law, our liability for any claim arising from use of
          this site is limited to <strong>$0</strong>. You use Staywindow at your own risk.
        </p>
      </section>

      <section className="card">
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of the State of Florida, USA.</p>
      </section>
    </>
  )
}
