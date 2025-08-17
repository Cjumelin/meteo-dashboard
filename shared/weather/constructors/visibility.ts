import type { Visibility } from '~~/shared/weather/types'
import type { Distance } from '~~/shared/weather/types'
import { DistanceUnit, VisibilityLevel } from '~~/shared/weather/types'
import { DISTANCE_FALLBACK } from '~~/shared/weather/types'

const guardDistance = (value: number): Distance => {
  if (value < 0 || isNaN(value)) {
    return DISTANCE_FALLBACK
  }
  return value
}

export const createVisibility = ({ distance, unit, maxDistance }: {
  distance: number
  unit: DistanceUnit
  maxDistance: number
}): Visibility => {
  const visibilityDistance = guardDistance(distance)

  const getVisibilityLevel = (value: number): VisibilityLevel => {
    if (value < 1) return VisibilityLevel.VeryPoor
    if (value < 4) return VisibilityLevel.Poor
    if (value < 8) return VisibilityLevel.Moderate
    if (value < 12) return VisibilityLevel.Good
    return VisibilityLevel.Excellent
  }

  const level = getVisibilityLevel(visibilityDistance)



  const getAtmosphericConditions = (level: VisibilityLevel): string => {
    const conditionsMap: Record<VisibilityLevel, string> = {
      [VisibilityLevel.VeryPoor]: 'Heavy fog/smog',
      [VisibilityLevel.Poor]: 'Light fog/haze',
      [VisibilityLevel.Moderate]: 'Slight haze',
      [VisibilityLevel.Good]: 'Clear air',
      [VisibilityLevel.Excellent]: 'Crystal clear'
    }
    return conditionsMap[level] || 'Normal conditions'
  }

  const getVisibilityPercentage = (value: number, max: number): number => {
    const percentage = (value / max) * 100
    return Math.min(Math.max(percentage, 5), 100) // Clamp between 5% and 100%
  }

  return {
    distance: visibilityDistance,
    distanceUnit: unit,
    maxVisibility: Math.max(maxDistance, 1), // Ensure at least 1 for calculations
    level,
    status: level,
    atmosphericConditions: getAtmosphericConditions(level),
    visibilityPercentage: getVisibilityPercentage(visibilityDistance, Math.max(maxDistance, 1))
  }
}
