import { describe, expect, it } from 'vitest'
import {
  PREP_ITEMS,
  PREP_STORAGE_KEY,
  loadPrepChecks,
  savePrepChecks,
} from './prepChecklist'

function memoryStorage(initial: Record<string, string> = {}) {
  const map = new Map<string, string>(Object.entries(initial))
  return {
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    setItem(key: string, value: string) {
      map.set(key, String(value))
    },
    removeItem(key: string) {
      map.delete(key)
    },
    raw: map,
  }
}

describe('prepChecklist storage', () => {
  it('loadPrepChecks returns empty object when missing', () => {
    const storage = memoryStorage()
    expect(loadPrepChecks(storage)).toEqual({})
  })

  it('savePrepChecks then loadPrepChecks round-trips boolean map', () => {
    const storage = memoryStorage()
    const state = {
      'passport-validity': true,
      'entry-exit-dates': false,
      'onward-travel': true,
    }
    savePrepChecks(state, storage)
    expect(storage.getItem(PREP_STORAGE_KEY)).toBe(JSON.stringify(state))
    expect(loadPrepChecks(storage)).toEqual(state)
  })

  it('loadPrepChecks ignores non-boolean values and invalid JSON', () => {
    const storage = memoryStorage({
      [PREP_STORAGE_KEY]: JSON.stringify({
        'passport-validity': true,
        bad: 'yes',
        nested: { x: 1 },
      }),
    })
    expect(loadPrepChecks(storage)).toEqual({ 'passport-validity': true })

    const broken = memoryStorage({ [PREP_STORAGE_KEY]: '{not-json' })
    expect(loadPrepChecks(broken)).toEqual({})
  })

  it('PREP_ITEMS have unique ids covering expected checklist range', () => {
    const ids = PREP_ITEMS.map((i) => i.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(ids.length).toBeGreaterThanOrEqual(6)
    expect(ids.length).toBeLessThanOrEqual(10)
    expect(ids).toContain('passport-validity')
    expect(ids).toContain('official-vs-estimate')
  })
})
