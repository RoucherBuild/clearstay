import type { SeoFaq } from './RouteMeta'

type Props = {
  faqs: SeoFaq[]
  heading?: string
}

/** Visible FAQ accordion; pair with RouteMeta faqs for FAQPage JSON-LD. */
export function FaqDetails({ faqs, heading = 'Frequently asked questions' }: Props) {
  if (faqs.length === 0) return null
  return (
    <section className="qa-block faq-details-block" aria-labelledby="faq-details-heading">
      <h2 id="faq-details-heading">{heading}</h2>
      {faqs.map((f) => (
        <details key={f.q} className="faq-details">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  )
}
