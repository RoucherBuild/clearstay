import { useMemo } from 'react'
import {
  enumerateUsedDays,
  windowBounds,
  type Trip,
} from '../lib/schengen'

type Props = {
  trips: Trip[]
  asOf: string
}

/** Walk inclusive UTC calendar days from start through end (YYYY-MM-DD). */
function enumerateWindowDays(start: string, end: string): string[] {
  const out: string[] = []
  let d = start
  while (d <= end) {
    out.push(d)
    const y = Number(d.slice(0, 4))
    const m = Number(d.slice(5, 7))
    const day = Number(d.slice(8, 10))
    const dt = new Date(Date.UTC(y, m - 1, day, 12, 0, 0))
    dt.setUTCDate(dt.getUTCDate() + 1)
    const ny = dt.getUTCFullYear()
    const nm = String(dt.getUTCMonth() + 1).padStart(2, '0')
    const nd = String(dt.getUTCDate()).padStart(2, '0')
    d = `${ny}-${nm}-${nd}`
  }
  return out
}

function monthLabel(ymd: string): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const y = ymd.slice(0, 4)
  const m = Number(ymd.slice(5, 7))
  return `${months[m - 1]} ${y}`
}

/**
 * Visual 180-day rolling window: which calendar days are used vs free.
 * Day set comes from schengen.enumerateUsedDays (same path as daysUsed).
 */
export function StayTimeline({ trips, asOf }: Props) {
  const { start, end } = useMemo(() => windowBounds(asOf), [asOf])
  const usedList = useMemo(() => enumerateUsedDays(trips, asOf), [trips, asOf])
  const usedSet = useMemo(() => new Set(usedList), [usedList])
  const windowDays = useMemo(() => enumerateWindowDays(start, end), [start, end])

  const months = useMemo(() => {
    const groups: { key: string; label: string; days: string[] }[] = []
    let current: (typeof groups)[number] | null = null
    for (const d of windowDays) {
      const key = d.slice(0, 7)
      if (!current || current.key !== key) {
        current = { key, label: monthLabel(d), days: [] }
        groups.push(current)
      }
      current.days.push(d)
    }
    return groups
  }, [windowDays])

  const usedCount = usedList.length
  const freeCount = 180 - usedCount
  const summary = `${usedCount} of 180 days in this window had Schengen stay (estimate).`
  const aria = `Rolling 180-day window from ${start} to ${end}. ${usedCount} days used, ${freeCount} days not used. As-of date ${asOf}.`

  return (
    <section
      className="card stay-timeline"
      aria-labelledby="stay-timeline-title"
    >
      <h2 id="stay-timeline-title">180-day window</h2>
      <p className="stay-timeline-summary">{summary}</p>

      <div
        className="stay-timeline-visual"
        role="img"
        aria-label={aria}
      >
        {months.map((month) => (
          <div key={month.key} className="stay-timeline-month">
            <div className="stay-timeline-month-label">{month.label}</div>
            <div className="stay-timeline-cells">
              {month.days.map((d) => {
                const used = usedSet.has(d)
                const isAsOf = d === asOf
                const classes = [
                  'stay-timeline-cell',
                  used ? 'is-used' : 'is-free',
                  isAsOf ? 'is-asof' : '',
                ]
                  .filter(Boolean)
                  .join(' ')
                return (
                  <span
                    key={d}
                    className={classes}
                    title={d}
                    data-day={d}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <ul className="stay-timeline-legend" aria-label="Timeline legend">
        <li>
          <span className="stay-timeline-swatch is-used" aria-hidden="true" />
          Used
        </li>
        <li>
          <span className="stay-timeline-swatch is-free" aria-hidden="true" />
          Not used
        </li>
        <li>
          <span className="stay-timeline-swatch is-asof" aria-hidden="true" />
          As-of
        </li>
      </ul>
    </section>
  )
}
