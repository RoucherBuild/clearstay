import { RouteMeta } from '../components/RouteMeta'
import { EU_EES_OVERVIEW } from '../lib/officialLinks'

const ETIAS = 'https://travel-europe.europa.eu/etias_en'

export function Ees() {
  return (
    <>
      <RouteMeta
        title="What is EES? — Staywindow"
        description="Plain explainer of the EU Entry/Exit System (EES): who it affects, how it differs from ETIAS, and what travellers should do. Official links only."
      />
      <h1>Entry/Exit System (EES)</h1>
      <p className="lede">
        Four short answers. No application form here — only official EU information.
      </p>

      <section className="qa-block">
        <h2>1. What is EES?</h2>
        <p>
          The Entry/Exit System is an EU border system that electronically records when
          non-EU travellers enter and leave the Schengen area (fingerprints / facial image and
          travel document data), replacing manual passport stamping for many travellers.
        </p>
      </section>

      <section className="qa-block">
        <h2>2. Who does it affect?</h2>
        <p>
          Primarily short-stay travellers from outside the EU/Schengen who cross external
          borders. Exact rollout timing and airport readiness can vary — check official EU
          updates before you travel.
        </p>
      </section>

      <section className="qa-block">
        <h2>3. How does EES differ from ETIAS?</h2>
        <p>
          <strong>EES</strong> is a border registration system used at entry/exit.
          <strong> ETIAS</strong> (when fully in force) is a travel authorisation you may need
          to obtain before travel, similar in idea to other countries’ electronic authorisations.
          They are related but not the same product.
        </p>
      </section>

      <section className="qa-block">
        <h2>4. What should I do?</h2>
        <p>
          Read the official EU pages, allow a little extra time at first EES registration, and
          keep tracking your own 90/180 days with a calculator (including Staywindow’s stay tool).
          Do not buy “EES packages” from random sites.
        </p>
        <ul className="link-list">
          <li>
            <a href={EU_EES_OVERVIEW} target="_blank" rel="noopener noreferrer">
              Official EES overview (travel-europe.europa.eu)
            </a>
          </li>
          <li>
            <a href={ETIAS} target="_blank" rel="noopener noreferrer">
              Official ETIAS overview (travel-europe.europa.eu)
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}
