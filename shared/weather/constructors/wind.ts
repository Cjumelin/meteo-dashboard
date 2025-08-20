import type { Wind, WindIntensity } from '~~/shared/weather/types'
import { WindDirection, WIND_SPEED_FALLBACK } from '~~/shared/weather/types'

const guardWindSpeed = (value: number): number => {
  if (value < 0 || isNaN(value)) {
    return WIND_SPEED_FALLBACK
  }
  return value
}

const getCompassAngle = (direction: WindDirection): number => {
  const directionMap: Record<WindDirection, number> = {
    [WindDirection.N]: 0, [WindDirection.NNE]: 22.5, [WindDirection.NE]: 45, [WindDirection.ENE]: 67.5,
    [WindDirection.E]: 90, [WindDirection.ESE]: 112.5, [WindDirection.SE]: 135, [WindDirection.SSE]: 157.5,
    [WindDirection.S]: 180, [WindDirection.SSW]: 202.5, [WindDirection.SW]: 225, [WindDirection.WSW]: 247.5,
    [WindDirection.W]: 270, [WindDirection.WNW]: 292.5, [WindDirection.NW]: 315, [WindDirection.NNW]: 337.5,
  }
  return directionMap[direction] || 0
}

export const createWind = ({ speed, direction, unit, intensity }: {
  speed: number
  direction: WindDirection
  unit: string
  intensity: WindIntensity
}): Wind => {
  return {
    speed: guardWindSpeed(speed),
    direction,
    speedUnit: unit || 'km/h',
    intensity,
    compassAngle: getCompassAngle(direction),
  }
}
