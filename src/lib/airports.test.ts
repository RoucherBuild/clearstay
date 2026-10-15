import { describe, it, expect } from 'vitest'
import { bandPayout } from './airports'

describe('bandPayout', () => {
  it('long band 3 to under 4 hours is reduced tier', () => {
    expect(bandPayout('long', 3)).toEqual({ eur: 300, gbp: 260 })
    expect(bandPayout('long', 3.5)).toEqual({ eur: 300, gbp: 260 })
  })
  it('long band 4+ hours is full tier', () => {
    expect(bandPayout('long', 4)).toEqual({ eur: 600, gbp: 520 })
    expect(bandPayout('long', 6)).toEqual({ eur: 600, gbp: 520 })
  })
  it('short and medium unchanged', () => {
    expect(bandPayout('short', 3)).toEqual({ eur: 250, gbp: 220 })
    expect(bandPayout('medium', 3.5)).toEqual({ eur: 400, gbp: 350 })
  })
})
