import type { Percentage } from './types'

const PERCENTAGE_FALLBACK = 0 // 0% as safe fallback

// Fallback should be own by upper bound
export const createPercentage = (value: number): Percentage => {
  // Valid percentage range: 0% to 100%
  if (value < 0 || value > 100 || isNaN(value)) {
    return PERCENTAGE_FALLBACK
  }
  return value
}


