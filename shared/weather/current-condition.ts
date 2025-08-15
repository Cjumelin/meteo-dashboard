import type {
  CurrentCondition,
  Wind,
  HumidityData,
  UvIndexData,
  Visibility,
  Humidity,
  Distance,
  UvIndex,
  WindSpeed
} from './types/current-condition'

import type { Temperature } from '../utils/temperature/types'

import {
  WeatherCondition,
  WindDirection,
  DistanceUnit,
  HumidityLevel,
  UvRiskLevel,
  VisibilityLevel,
  WindIntensity,
  DISTANCE_FALLBACK,
  UV_INDEX_FALLBACK,
  WIND_SPEED_FALLBACK
} from './types/current-condition'

import { createCelsius } from '../utils/temperature/constructor'
import { createPercentage } from '../utils/percentage/constructor'

const guardTemperature = (value: number): Temperature => {
  return createCelsius(value)
}

const guardHumidity = (value: number): Humidity => {
  return createPercentage(value)
}

const guardDistance = (value: number): Distance => {
  if (value < 0 || isNaN(value)) {
    return DISTANCE_FALLBACK
  }
  return value
}

const guardUvIndex = (value: number): UvIndex => {
  if (value < 0 || value > 15 || isNaN(value)) {
    return UV_INDEX_FALLBACK
  }
  return value
}

const guardWindSpeed = (value: number): WindSpeed => {
  if (value < 0 || isNaN(value)) {
    return WIND_SPEED_FALLBACK
  }
  return value
}

type unsafeCurrentCondition = {
  temperatureValue: number,
  feelsLikeValue: number,
  highTempValue: number,
  lowTempValue: number,
  description: string,
  weatherIcon: string,
  condition: WeatherCondition,
  
  windSpeedValue: number,
  windDirection: WindDirection,
  windSpeedUnit: string,
  windIcon: string,
  windIntensity: WindIntensity,
  showCompass: boolean,
  
  humidityValue: number,
  humidityIcon: string,
  showHumidityIndicator: boolean,
  showHumidityStatus: boolean,
  
  uvIndexValue: number,
  uvIcon: string,
  showUvProtection: boolean,
  showUvScale: boolean,
  
  visibilityDistanceValue: number,
  visibilityDistanceUnit: DistanceUnit,
  visibilityIcon: string,
  maxVisibility: number,
  showVisibilityConditions: boolean,
  showVisibilityIndicator: boolean
}

export const createCurrentCondition = ({
  temperatureValue,
  feelsLikeValue,
  highTempValue,
  lowTempValue,
  description,
  weatherIcon,
  condition,
  windSpeedValue,
  windDirection,
  windSpeedUnit,
  windIcon,
  windIntensity,
  showCompass,
  humidityValue,
  humidityIcon,
  showHumidityIndicator,
  showHumidityStatus,
  uvIndexValue,
  uvIcon,
  showUvProtection,
  showUvScale,
  visibilityDistanceValue,
  visibilityDistanceUnit,
  visibilityIcon,
  maxVisibility,
  showVisibilityConditions,
  showVisibilityIndicator
}: unsafeCurrentCondition): CurrentCondition => {

  const wind = createWind(windSpeedValue, windDirection, windSpeedUnit, windIcon, windIntensity, showCompass)
  const humidity = createHumidity(humidityValue, humidityIcon, showHumidityIndicator, showHumidityStatus)
  const uvIndex = createUvIndex(uvIndexValue, uvIcon, showUvProtection, showUvScale)
  const visibility = createVisibility(visibilityDistanceValue, visibilityDistanceUnit, visibilityIcon, maxVisibility, showVisibilityConditions, showVisibilityIndicator)

  return {
    temperature: guardTemperature(temperatureValue),
    feelsLike: guardTemperature(feelsLikeValue),
    highTemp: guardTemperature(highTempValue),
    lowTemp: guardTemperature(lowTempValue),
    description: description || 'Weather data unavailable',
    weatherIcon: weatherIcon || '❓',
    condition,
    
    wind,
    humidity,
    uvIndex,
    visibility
  }
}

export const createWind = (
  speedValue: number,
  direction: WindDirection,
  speedUnit: string,
  windIcon: string,
  intensity: WindIntensity,
  showCompass: boolean
): Wind => {
  const getCompassAngle = (direction: WindDirection): number => {
    const directionMap: Record<WindDirection, number> = {
      [WindDirection.N]: 0, [WindDirection.NNE]: 22.5, [WindDirection.NE]: 45, [WindDirection.ENE]: 67.5,
      [WindDirection.E]: 90, [WindDirection.ESE]: 112.5, [WindDirection.SE]: 135, [WindDirection.SSE]: 157.5,
      [WindDirection.S]: 180, [WindDirection.SSW]: 202.5, [WindDirection.SW]: 225, [WindDirection.WSW]: 247.5,
      [WindDirection.W]: 270, [WindDirection.WNW]: 292.5, [WindDirection.NW]: 315, [WindDirection.NNW]: 337.5
    }
    return directionMap[direction] || 0
  }

  return {
    speed: guardWindSpeed(speedValue),
    direction,
    speedUnit: speedUnit || 'km/h',
    windIcon: windIcon || '🌬️',
    intensity,
    showCompass,
    compassAngle: getCompassAngle(direction)
  }
}

export const createHumidity = (
  humidityValue: number,
  humidityIcon: string,
  showIndicator: boolean,
  showStatus: boolean
): HumidityData => {
  const humidity = guardHumidity(humidityValue)

  const getHumidityLevel = (value: number): HumidityLevel => {
    if (value < 30) return HumidityLevel.Low
    if (value < 50) return HumidityLevel.Moderate
    if (value < 70) return HumidityLevel.Comfortable
    if (value < 80) return HumidityLevel.High
    return HumidityLevel.VeryHigh
  }

  const level = getHumidityLevel(humidity)

  const getStatus = (level: HumidityLevel): string => {
    const statusMap: Record<HumidityLevel, string> = {
      [HumidityLevel.Low]: 'Dry',
      [HumidityLevel.Moderate]: 'Moderate',
      [HumidityLevel.Comfortable]: 'Comfortable',
      [HumidityLevel.High]: 'Humid',
      [HumidityLevel.VeryHigh]: 'Very Humid'
    }
    return statusMap[level] || 'Normal'
  }

  return {
    humidity,
    humidityIcon: humidityIcon || '💧',
    showIndicator,
    showStatus,
    level,
    status: getStatus(level)
  }
}

export const createUvIndex = (
  indexValue: number,
  uvIcon: string,
  showProtection: boolean,
  showScale: boolean
): UvIndexData => {
  const index = guardUvIndex(indexValue)

  const getRiskLevel = (value: number): UvRiskLevel => {
    if (value <= 2) return UvRiskLevel.Low
    if (value <= 5) return UvRiskLevel.Moderate
    if (value <= 7) return UvRiskLevel.High
    if (value <= 10) return UvRiskLevel.VeryHigh
    return UvRiskLevel.Extreme
  }

  const riskLevel = getRiskLevel(index)

  const getRiskText = (level: UvRiskLevel): string => {
    const riskMap: Record<UvRiskLevel, string> = {
      [UvRiskLevel.Low]: 'Low',
      [UvRiskLevel.Moderate]: 'Moderate',
      [UvRiskLevel.High]: 'High',
      [UvRiskLevel.VeryHigh]: 'Very High',
      [UvRiskLevel.Extreme]: 'Extreme'
    }
    return riskMap[level] || 'Unknown'
  }

  const getProtectionAdvice = (level: UvRiskLevel): string => {
    const adviceMap: Record<UvRiskLevel, string> = {
      [UvRiskLevel.Low]: 'Minimal protection needed',
      [UvRiskLevel.Moderate]: 'Seek shade during midday',
      [UvRiskLevel.High]: 'Protection essential',
      [UvRiskLevel.VeryHigh]: 'Extra protection required',
      [UvRiskLevel.Extreme]: 'Avoid sun exposure'
    }
    return adviceMap[level] || 'Use sun protection'
  }

  const getProtectionIcon = (level: UvRiskLevel): string => {
    const iconMap: Record<UvRiskLevel, string> = {
      [UvRiskLevel.Low]: '🕶️',
      [UvRiskLevel.Moderate]: '🧴',
      [UvRiskLevel.High]: '🏖️',
      [UvRiskLevel.VeryHigh]: '🧢',
      [UvRiskLevel.Extreme]: '🏠'
    }
    return iconMap[level] || '🧴'
  }

  const getScalePosition = (value: number): number => {
    const maxIndex = 15
    const position = Math.min((value / maxIndex) * 100, 100)
    return Math.max(position, 2) // Minimum 2% to keep indicator visible
  }

  return {
    index,
    uvIcon: uvIcon || '☀️',
    showProtection,
    showScale,
    riskLevel,
    riskText: getRiskText(riskLevel),
    protectionAdvice: getProtectionAdvice(riskLevel),
    protectionIcon: getProtectionIcon(riskLevel),
    scalePosition: getScalePosition(index)
  }
}

export const createVisibility = (
  distanceValue: number,
  distanceUnit: DistanceUnit,
  visibilityIcon: string,
  maxVisibility: number,
  showConditions: boolean,
  showIndicator: boolean
): Visibility => {
  const distance = guardDistance(distanceValue)

  const getVisibilityLevel = (value: number): VisibilityLevel => {
    if (value < 1) return VisibilityLevel.VeryPoor
    if (value < 4) return VisibilityLevel.Poor
    if (value < 8) return VisibilityLevel.Moderate
    if (value < 12) return VisibilityLevel.Good
    return VisibilityLevel.Excellent
  }

  const level = getVisibilityLevel(distance)

  const getStatus = (level: VisibilityLevel): string => {
    const statusMap: Record<VisibilityLevel, string> = {
      [VisibilityLevel.VeryPoor]: 'Very Poor',
      [VisibilityLevel.Poor]: 'Poor',
      [VisibilityLevel.Moderate]: 'Moderate',
      [VisibilityLevel.Good]: 'Good',
      [VisibilityLevel.Excellent]: 'Excellent'
    }
    return statusMap[level] || 'Normal'
  }

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

  const getConditionsIcon = (level: VisibilityLevel): string => {
    const iconMap: Record<VisibilityLevel, string> = {
      [VisibilityLevel.VeryPoor]: '🌫️',
      [VisibilityLevel.Poor]: '🌁',
      [VisibilityLevel.Moderate]: '🌤️',
      [VisibilityLevel.Good]: '☀️',
      [VisibilityLevel.Excellent]: '✨'
    }
    return iconMap[level] || '🌤️'
  }

  const getVisibilityPercentage = (value: number, max: number): number => {
    const percentage = (value / max) * 100
    return Math.min(Math.max(percentage, 5), 100) // Clamp between 5% and 100%
  }

  return {
    distance,
    distanceUnit,
    visibilityIcon: visibilityIcon || '👁️',
    maxVisibility: Math.max(maxVisibility, 1), // Ensure at least 1 for calculations
    showConditions,
    showIndicator,
    level,
    status: getStatus(level),
    atmosphericConditions: getAtmosphericConditions(level),
    conditionsIcon: getConditionsIcon(level),
    visibilityPercentage: getVisibilityPercentage(distance, Math.max(maxVisibility, 1))
  }
}
