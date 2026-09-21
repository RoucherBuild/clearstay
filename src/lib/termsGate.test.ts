import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  TERMS_STORAGE_KEY,
  acceptTerms,
  hasAcceptedTerms,
  readTermsAcceptance,
} from './termsGate'

function installMemoryLocalStorage() {
  const map = new Map<string, string>()
  const storage = {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    setItem(key: string, value: string) {
      map.set(key, String(value))
    },
    removeItem(key: string) {
      map.delete(key)
    },
    clear() {
      map.clear()
    },
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true,
    writable: true,
  })
  return storage
}

beforeEach(() => {
  installMemoryLocalStorage()
})

afterEach(() => {
  localStorage.removeItem(TERMS_STORAGE_KEY)
})

describe('termsGate', () => {
  it('returns false when nothing stored', () => {
    expect(hasAcceptedTerms()).toBe(false)
    expect(readTermsAcceptance()).toBeNull()
  })

  it('accepts and remembers version 2026-09-21', () => {
    const record = acceptTerms()
    expect(record.version).toBe('2026-09-21')
    expect(hasAcceptedTerms()).toBe(true)
    expect(hasAcceptedTerms('2026-09-21')).toBe(true)
    const stored = readTermsAcceptance()
    expect(stored?.version).toBe('2026-09-21')
    expect(stored?.acceptedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })

  it('treats later version as accepted for current min', () => {
    localStorage.setItem(
      TERMS_STORAGE_KEY,
      JSON.stringify({ acceptedAt: '2026-10-01T00:00:00.000Z', version: '2026-10-01' }),
    )
    expect(hasAcceptedTerms('2026-09-21')).toBe(true)
  })

  it('rejects older version', () => {
    localStorage.setItem(
      TERMS_STORAGE_KEY,
      JSON.stringify({ acceptedAt: '2026-01-01T00:00:00.000Z', version: '2026-01-01' }),
    )
    expect(hasAcceptedTerms('2026-09-21')).toBe(false)
  })
})
