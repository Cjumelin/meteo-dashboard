import { UvRiskLevel, VisibilityLevel, WeatherCondition, WindIntensity } from '~~/shared/weather/types'

export const useWeatherIcons = () => {
  const getWeatherIcon = (condition: WeatherCondition): string => {
    switch (condition) {
      case WeatherCondition.Clear:
      case WeatherCondition.Sunny:
        return '☀️'
      case WeatherCondition.Cloudy:
        return '☁️'
      case WeatherCondition.PartlyCloudy:
        return '⛅'
      case WeatherCondition.Rainy:
        return '🌧️'
      case WeatherCondition.Stormy:
        return '⛈️'
      default:
        return '🌤️'
    }
  }

  const getWindIcon = (intensity: WindIntensity): string => {
    switch (intensity) {
      case WindIntensity.Light:
        return '💨'
      case WindIntensity.Moderate:
        return '🌬️'
      case WindIntensity.Strong:
        return '💨'
      case WindIntensity.Severe:
        return '🌪️'
      default:
        return '🌬️'
    }
  }

  const getHumidityIcon = (level: string): string => {
    switch (level) {
      case 'Low':
        return '🏜️'
      case 'Moderate':
        return '🌵'
      case 'Comfortable':
      case 'High':
        return '💧'
      case 'Very High':
        return '🌊'
      default:
        return '💧'
    }
  }

  const getUvIcon = (riskLevel: UvRiskLevel): string => {
    switch (riskLevel) {
      case UvRiskLevel.Low:
        return '🌤️'
      case UvRiskLevel.Moderate:
        return '☀️'
      case UvRiskLevel.High:
        return '🔥'
      case UvRiskLevel.VeryHigh:
        return '☀️'
      case UvRiskLevel.Extreme:
        return '🌡️'
      default:
        return '☀️'
    }
  }

  const getVisibilityIcon = (level: VisibilityLevel): string => {
    switch (level) {
      case VisibilityLevel.VeryPoor:
        return '🌫️'
      case VisibilityLevel.Poor:
        return '🌁'
      case VisibilityLevel.Moderate:
        return '🌤️'
      case VisibilityLevel.Good:
        return '☀️'
      case VisibilityLevel.Excellent:
        return '✨'
      default:
        return '🌤️'
    }
  }

  return {
    getWeatherIcon,
    getWindIcon,
    getHumidityIcon,
    getUvIcon,
    getVisibilityIcon
  }
}
