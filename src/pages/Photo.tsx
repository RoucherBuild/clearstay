import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { SCHENGEN_COUNTRIES } from '../lib/schengen'
import { buildTripFromForm } from '../lib/stampAssist'
import {
  loadTripsFromStorage,
  saveTripsToStorage,
  todayYmd,
} from '../lib/tripsPersist'

type Preset = {
  id: string
  name: string
  widthMm?: number
  heightMm?: number
  widthIn?: number
  heightIn?: number
  dpiNote: string
  printNote: string
}

const PRESETS: Preset[] = [
  {
    id: 'us',
    name: 'US passport 2×2 in',
    widthIn: 2,
    heightIn: 2,
    dpiNote: 'Print at 300 DPI → 600×600 px minimum.',
    printNote: 'Square 2×2 inch photo. Head size rules apply on the official form.',
  },
  {
    id: 'uk',
    name: 'UK 35×45 mm',
    widthMm: 35,
    heightMm: 45,
    dpiNote: 'Print at 300 DPI → ~413×531 px.',
    printNote: 'Common UK passport / ID style. Check GOV.UK photo rules.',
  },
  {
    id: 'eu',
    name: 'EU / Schengen style 35×45 mm',
    widthMm: 35,
    heightMm: 45,
    dpiNote: 'Print at 300 DPI → ~413×531 px.',
    printNote: 'Many Schengen visa applications use 35×45 mm. Confirm the mission’s checklist.',
  },
  {
    id: 'au',
    name: 'Australian 35×45 mm',
    widthMm: 35,
    heightMm: 45,
    dpiNote: 'Print at 300 DPI → ~413×531 px.',
    printNote: 'Australian passport photos are typically 35–40 mm wide × 45–50 mm high; 35×45 is a common target.',
  },
  {
    id: 'ca',
    name: 'Canadian 50×70 mm',
    widthMm: 50,
    heightMm: 70,
    dpiNote: 'Print at 300 DPI → ~591×827 px.',
    printNote: 'Canadian passport photo size is commonly 50 mm × 70 mm.',
  },
]

function mmToIn(mm: number) {
  return mm / 25.4
}

function emptyStampDraft() {
  return {
    country: 'Spain',
    entry: todayYmd(),
    exit: todayYmd(),
    label: '',
  }
}

export function Photo() {
  const [presetId, setPresetId] = useState('eu')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [stampPreviewUrl, setStampPreviewUrl] = useState<string | null>(null)
  const [stampDraft, setStampDraft] = useState(emptyStampDraft)
  const [stampError, setStampError] = useState<string | null>(null)
  const [stampSuccess, setStampSuccess] = useState<string | null>(null)

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[2]

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  useEffect(() => {
    return () => {
      if (stampPreviewUrl) URL.revokeObjectURL(stampPreviewUrl)
    }
  }, [stampPreviewUrl])

  const onFile = (file: File | null) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (!file) {
      setPreviewUrl(null)
      return
    }
    setPreviewUrl(URL.createObjectURL(file))
  }

  const onStampFile = (file: File | null) => {
    if (stampPreviewUrl) URL.revokeObjectURL(stampPreviewUrl)
    if (!file) {
      setStampPreviewUrl(null)
      return
    }
    setStampPreviewUrl(URL.createObjectURL(file))
  }

  const exitBeforeEntry =
    Boolean(stampDraft.entry && stampDraft.exit) && stampDraft.exit < stampDraft.entry

  const addStampTrip = () => {
    setStampSuccess(null)
    const built = buildTripFromForm(stampDraft)
    if (!built.ok) {
      setStampError(built.error)
      return
    }
    setStampError(null)
    const existing = loadTripsFromStorage()
    const next = {
      trips: [...(existing?.trips ?? []), built.trip],
      ...(existing?.asOf ? { asOf: existing.asOf } : {}),
    }
    saveTripsToStorage(next)
    setStampSuccess(
      `Added ${built.trip.country} (${built.trip.entry} → ${built.trip.exit}) to Stay trips.`,
    )
    setStampDraft(emptyStampDraft())
  }

  const wIn = preset.widthIn ?? (preset.widthMm ? mmToIn(preset.widthMm) : 1)
  const hIn = preset.heightIn ?? (preset.heightMm ? mmToIn(preset.heightMm) : 1)
  // Preview box scaled for screen (~96 CSS px per inch * 2 for readability)
  const boxW = Math.round(wIn * 96)
  const boxH = Math.round(hIn * 96)

  return (
    <>
      <RouteMeta
        title="Photo tools — Staywindow"
        description="Passport photo size presets with local preview, plus stamp and boarding-pass assist to rebuild Stay trips on this device."
      />
      <h1>Photo tools</h1>
      <p className="lede">
        Passport print sizes and optional stamp / boarding-pass recall. Images stay on this
        device — nothing is uploaded to a server.
      </p>
      <p className="muted small">
        Related: <NavLink to="/stay">Stay calculator</NavLink>
        {' · '}
        <NavLink to="/prep">Border prep</NavLink>
      </p>

      <h2>Passport photo guide</h2>
      <p className="muted">
        Presets and print notes. Optional local preview only — nothing is uploaded to a server.
      </p>

      <section className="card form-card">
        <label className="field">
          <span>Preset</span>
          <select value={presetId} onChange={(e) => setPresetId(e.target.value)}>
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Optional local preview (stays in browser)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </label>
      </section>

      <section className="card">
        <h2>{preset.name}</h2>
        <p>
          Size:{' '}
          {preset.widthIn != null
            ? `${preset.widthIn}×${preset.heightIn} in`
            : `${preset.widthMm}×${preset.heightMm} mm`}
        </p>
        <p>{preset.dpiNote}</p>
        <p className="muted">{preset.printNote}</p>

        <div className="photo-layout">
          <div
            className="photo-frame"
            style={{ width: boxW, height: boxH }}
            aria-label="Print size preview frame"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Local preview of your photo" />
            ) : (
              <span className="muted small">Print-size frame (screen approx.)</span>
            )}
          </div>
        </div>
        <p className="muted small">
          Cropping is manual / printer-side in this version — use the frame as a size guide.
        </p>
      </section>

      <h2>Stamp &amp; boarding pass assist</h2>
      <section className="card form-card stamp-assist">
        <p>
          Optional local photo of a passport stamp or boarding pass to help you recall dates.
          Nothing is uploaded. This is not OCR and not an official record — you type and confirm
          country, entry, and exit, then add the trip to Stay.
        </p>
        <p className="muted small">
          <strong>Images stay on this device.</strong> Previews use browser object URLs only.
        </p>

        <label className="field">
          <span>Optional stamp / boarding-pass photo (local only)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onStampFile(e.target.files?.[0] ?? null)}
          />
        </label>

        {stampPreviewUrl ? (
          <div className="photo-layout stamp-preview">
            <img
              src={stampPreviewUrl}
              alt="Local preview of stamp or boarding pass"
              className="stamp-preview-img"
            />
          </div>
        ) : null}

        <div className="form-grid">
          <label className="field">
            <span>Country</span>
            <select
              value={stampDraft.country}
              onChange={(e) =>
                setStampDraft((d) => ({ ...d, country: e.target.value }))
              }
            >
              {SCHENGEN_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Entry</span>
            <input
              type="date"
              value={stampDraft.entry}
              onChange={(e) => {
                const entry = e.target.value
                setStampDraft((d) => ({ ...d, entry }))
              }}
            />
          </label>
          <label className="field">
            <span>Exit</span>
            <input
              type="date"
              value={stampDraft.exit}
              onChange={(e) =>
                setStampDraft((d) => ({ ...d, exit: e.target.value }))
              }
            />
          </label>
          <label className="field">
            <span>Label (optional)</span>
            <input
              type="text"
              value={stampDraft.label}
              onChange={(e) =>
                setStampDraft((d) => ({ ...d, label: e.target.value }))
              }
              placeholder="e.g. Stamp from boarding pass"
            />
          </label>
        </div>

        {exitBeforeEntry && (
          <p className="field-error" role="alert">
            Exit ({stampDraft.exit}) is before entry ({stampDraft.entry}).
          </p>
        )}
        {stampError && (
          <p className="field-error" role="alert">
            {stampError}
          </p>
        )}
        {stampSuccess && (
          <p className="success-line" role="status">
            {stampSuccess}{' '}
            <NavLink to="/stay">Open Stay calculator</NavLink>
          </p>
        )}

        <button
          type="button"
          className="btn btn-primary"
          onClick={addStampTrip}
          disabled={exitBeforeEntry}
        >
          Add trip to Stay
        </button>
      </section>

      <p className="muted small">
        Related: <NavLink to="/stay">Stay calculator</NavLink>
        {' · '}
        <NavLink to="/prep">Border prep</NavLink>
      </p>
    </>
  )
}
