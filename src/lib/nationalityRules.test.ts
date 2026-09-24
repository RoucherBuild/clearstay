import { describe, expect, it } from 'vitest'
import {
  NATIONALITY_RULES,
  getNationalityRule,
  loadNationalityId,
  saveNationalityId,
  type NationalityId,
} from './nationalityRules'

const IDS: NationalityId[] = ['US', 'UK', 'AU', 'CA']

describe('nationalityRules', () => {
  it('defines all four nationalities with required fields', () => {
    expect(NATIONALITY_RULES).toHaveLength(4)
    for (const id of IDS) {
      const rule = getNationalityRule(id)
      expect(rule).toBeTruthy()
      expect(rule!.id).toBe(id)
      expect(rule!.label.length).toBeGreaterThan(0)
      expect(rule!.bullets.length).toBeGreaterThan(0)
      expect(rule!.links.length).toBeGreaterThan(0)
    }
  })

  it('each nationality has at least one official https link', () => {
    for (const rule of NATIONALITY_RULES) {
      const httpsLinks = rule.links.filter((l) => l.href.startsWith('https://'))
      expect(httpsLinks.length).toBeGreaterThanOrEqual(1)
      for (const link of rule.links) {
        expect(link.label.length).toBeGreaterThan(0)
        expect(link.href).toMatch(/^https:\/\//)
      }
    }
  })

  it('persists nationality id in storage', () => {
    const store = new Map<string, string>()
    const storage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => {
        store.set(k, v)
      },
      removeItem: (k: string) => {
        store.delete(k)
      },
    }
    expect(loadNationalityId(storage)).toBe('')
    saveNationalityId('AU', storage)
    expect(loadNationalityId(storage)).toBe('AU')
    saveNationalityId('', storage)
    expect(loadNationalityId(storage)).toBe('')
  })
})
