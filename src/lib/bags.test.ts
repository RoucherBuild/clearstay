import { describe, expect, it } from 'vitest'
import { AIRLINE_BAGS, bagFits, type AirlineBagLimit } from './bags'

function airline(id: string): AirlineBagLimit {
  const found = AIRLINE_BAGS.find((a) => a.id === id)
  if (!found) throw new Error(`missing ${id}`)
  return found
}

describe('bagFits', () => {
  const ryanair = airline('ryanair')

  it('stores Ryanair free personal bag as 40×30×20 cm', () => {
    expect(ryanair.maxCm).toEqual([40, 30, 20])
  })

  it('accepts a real 40×30×20 bag on Ryanair', () => {
    expect(bagFits([40, 30, 20], ryanair)).toBe(true)
  })

  it('treats the old 40×20×25 orientation as a fit because both sides are sorted', () => {
    // bagFits sorts user and airline dims descending, so order is not axis-locked.
    // [40, 20, 25] becomes [40, 25, 20] against [40, 30, 20]: 25 ≤ 30 and 20 ≤ 20.
    expect(bagFits([40, 20, 25], ryanair)).toBe(true)
    expect(bagFits([25, 20, 40], ryanair)).toBe(true)
    expect(bagFits([20, 40, 25], ryanair)).toBe(true)
  })

  it('rejects a bag once a sorted side exceeds the Ryanair limit', () => {
    expect(bagFits([40, 31, 20], ryanair)).toBe(false)
    expect(bagFits([41, 30, 20], ryanair)).toBe(false)
  })

  it('leaves United at 56×35×22 cm', () => {
    expect(airline('ua').maxCm).toEqual([56, 35, 22])
  })
})
