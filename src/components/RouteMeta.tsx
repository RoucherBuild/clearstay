import { useEffect } from 'react'

export type SeoFaq = { q: string; a: string }

type Props = {
  title: string
  description: string
  /** Site path for canonical, e.g. "/" or "/stay" (no trailing slash except home). */
  path: string
  faqs?: SeoFaq[]
  /** Emit WebApplication JSON-LD (tools only: /stay /flights /bags /photo). */
  webApp?: boolean
}

const ORIGIN = 'https://thestaywindow.com'
const FAQ_SCRIPT_ID = 'staywindow-jsonld-faq'
const WEBAPP_SCRIPT_ID = 'staywindow-jsonld-webapp'
const CANONICAL_ID = 'staywindow-canonical'
const ROBOTS_ID = 'staywindow-robots'

function canonicalFor(path: string): string {
  if (path === '/' || path === '') return `${ORIGIN}/`
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${ORIGIN}${clean.replace(/\/$/, '')}`
}

function isPagesDevHost(hostname: string): boolean {
  return hostname.endsWith('.pages.dev')
}

function upsertLinkCanonical(href: string) {
  let link = document.getElementById(CANONICAL_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = CANONICAL_ID
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

function upsertRobots(content: string | null) {
  let meta = document.getElementById(ROBOTS_ID) as HTMLMetaElement | null
  if (content == null) {
    if (meta) meta.remove()
    return
  }
  if (!meta) {
    meta = document.createElement('meta')
    meta.id = ROBOTS_ID
    meta.setAttribute('name', 'robots')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

function upsertJsonLd(id: string, data: object | null) {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (data == null) {
    if (script) script.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

export function RouteMeta({ title, description, path, faqs, webApp }: Props) {
  const faqsKey = faqs && faqs.length > 0 ? JSON.stringify(faqs) : ''

  useEffect(() => {
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', description)

    const canonical = canonicalFor(path)
    upsertLinkCanonical(canonical)

    const noindex = isPagesDevHost(window.location.hostname)
    upsertRobots(noindex ? 'noindex,nofollow' : null)

    const parsedFaqs: SeoFaq[] = faqsKey ? (JSON.parse(faqsKey) as SeoFaq[]) : []
    if (parsedFaqs.length > 0) {
      upsertJsonLd(FAQ_SCRIPT_ID, {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: parsedFaqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      })
    } else {
      upsertJsonLd(FAQ_SCRIPT_ID, null)
    }

    if (webApp) {
      upsertJsonLd(WEBAPP_SCRIPT_ID, {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Staywindow',
        url: canonical,
        applicationCategory: 'BrowserApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      })
    } else {
      upsertJsonLd(WEBAPP_SCRIPT_ID, null)
    }
  }, [title, description, path, faqsKey, webApp])

  return null
}
