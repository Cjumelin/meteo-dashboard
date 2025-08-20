import type { UvIndexData, UvIndex } from '~~/shared/weather/types'
import { UvRiskLevel, UV_INDEX_FALLBACK } from '~~/shared/weather/types'

// UV Scale constants
export const UV_SCALE = {
  MIN: 0,
  MAX: 11,
} as const

const guardUvIndex = (value: number): UvIndex => {
  if (value < UV_SCALE.MIN || value > UV_SCALE.MAX || isNaN(value)) {
    return UV_INDEX_FALLBACK
  }
  return value
}

export const createUvIndex = ({ index }: {
  index: number
}): UvIndexData => {
  const uvIndex = guardUvIndex(index)

  const getRiskLevel = (value: number): UvRiskLevel => {
    if (value <= 2) return UvRiskLevel.Low
    if (value <= 5) return UvRiskLevel.Moderate
    if (value <= 7) return UvRiskLevel.High
    if (value <= 10) return UvRiskLevel.VeryHigh
    return UvRiskLevel.Extreme
  }

  const riskLevel = getRiskLevel(uvIndex)

  const getProtectionAdvice = (level: UvRiskLevel): string => {
    const adviceMap: Record<UvRiskLevel, string> = {
      [UvRiskLevel.Low]: 'Minimal protection needed',
      [UvRiskLevel.Moderate]: 'Seek shade during midday',
      [UvRiskLevel.High]: 'Protection essential',
      [UvRiskLevel.VeryHigh]: 'Extra protection required',
      [UvRiskLevel.Extreme]: 'Avoid sun exposure',
    }
    return adviceMap[level] || 'Use sun protection'
  }

  const getScalePosition = (value: number): number => {
    const position = Math.min((value / UV_SCALE.MAX) * 100, 100)
    return Math.max(position, 2) // Minimum 2% to keep indicator visible
  }

  return {
    index: uvIndex,
    riskLevel,
    riskText: riskLevel,
    protectionAdvice: getProtectionAdvice(riskLevel),
    scalePosition: getScalePosition(uvIndex),
  }
}
