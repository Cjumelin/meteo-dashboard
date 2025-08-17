import type { Wind, HumidityData, UvIndexData, Visibility } from '~~/shared/weather/types'
import { WindIntensity, HumidityLevel, UvRiskLevel, VisibilityLevel } from '~~/shared/weather/types'

export const useWeatherDisplay = () => {
  const getWindDisplayOptions = (wind: Wind) => ({
    showCompass: wind.intensity === WindIntensity.Strong || wind.intensity === WindIntensity.Severe
  })

  const getHumidityDisplayOptions = (humidity: HumidityData) => ({
    showIndicator: humidity.level === HumidityLevel.High || humidity.level === HumidityLevel.VeryHigh,
    showStatus: humidity.level !== HumidityLevel.Comfortable
  })

  const getUvDisplayOptions = (uvIndex: UvIndexData) => ({
    showProtection: uvIndex.riskLevel === UvRiskLevel.High || uvIndex.riskLevel === UvRiskLevel.VeryHigh || uvIndex.riskLevel === UvRiskLevel.Extreme,
    showScale: uvIndex.index > 5
  })

  const getVisibilityDisplayOptions = (visibility: Visibility) => ({
    showConditions: visibility.level === VisibilityLevel.VeryPoor || visibility.level === VisibilityLevel.Poor,
    showIndicator: visibility.distance < 5
  })

  return {
    getWindDisplayOptions,
    getHumidityDisplayOptions,
    getUvDisplayOptions,
    getVisibilityDisplayOptions
  }
}
