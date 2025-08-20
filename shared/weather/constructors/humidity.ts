import type { HumidityData, Humidity } from '~~/shared/weather/types'
import { HumidityLevel } from '~~/shared/weather/types'
import { createPercentage } from '~~/shared/utils/percentage/constructor'

const guardHumidity = (value: number): Humidity => {
  return createPercentage(value)
}

export const createHumidity = ({ value }: {
  value: number
}): HumidityData => {
  const humidity = guardHumidity(value)

  const getHumidityLevel = (value: number): HumidityLevel => {
    if (value < 30) return HumidityLevel.Low
    if (value < 50) return HumidityLevel.Moderate
    if (value < 70) return HumidityLevel.Comfortable
    if (value < 80) return HumidityLevel.High
    return HumidityLevel.VeryHigh
  }

  const level = getHumidityLevel(humidity)

  return {
    humidity,
    level,
    status: level,
  }
}
