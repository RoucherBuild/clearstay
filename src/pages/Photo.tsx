import { useEffect, useState } from 'react'
import { RouteMeta } from '../components/RouteMeta'

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

export function Photo() {
  const [presetId, setPresetId] = useState('eu')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[2]

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onFile = (file: File | null) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    if (!file) {
      setPreviewUrl(null)
      return
    }
    setPreviewUrl(URL.createObjectURL(file))
  }

  const wIn = preset.widthIn ?? (preset.widthMm ? mmToIn(preset.widthMm) : 1)
  const hIn = preset.heightIn ?? (preset.heightMm ? mmToIn(preset.heightMm) : 1)
  // Preview box scaled for screen (~96 CSS px per inch * 2 for readability)
  const boxW = Math.round(wIn * 96)
  const boxH = Math.round(hIn * 96)

  return (
    <>
      <RouteMeta
        title="Passport photo sizes — Staywindow"
        description="Print layout and DPI notes for US, UK, EU/Schengen, Australian, and Canadian passport photo sizes. Browser-only preview."
      />
      <h1>Passport photo guide</h1>
      <p className="lede">
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
    </>
  )
}
