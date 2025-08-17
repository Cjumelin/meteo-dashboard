import type { Percentage } from '~~/shared/utils/percentage/types'
import type { Temperature } from '~~/shared/utils/temperature/types'

export type Distance = number     
export type UvIndex = number      
export type WindSpeed = number
export type Humidity = Percentage 

export const DISTANCE_FALLBACK = 0
export const UV_INDEX_FALLBACK = 0
export const WIND_SPEED_FALLBACK = 0

export enum WeatherCondition {
  Clear,
  Sunny,
  Cloudy,
  PartlyCloudy,
  Rainy,
  Stormy
}
export enum WindDirection {
  N,
  NNE,
  NE,
  ENE,
  E,
  ESE,
  SE,
  SSE,
  S,
  SSW,
  SW,
  WSW,
  W,
  WNW,
  NW,
  NNW
}
export enum DistanceUnit {
  Kilometers,
  Miles,
  Meters,
  Feet
}

export enum HumidityLevel {
  Low = 'Low',
  Moderate = 'Moderate',
  Comfortable = 'Comfortable',
  High = 'High',
  VeryHigh = 'Very High'
}

export enum UvRiskLevel {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High',
  VeryHigh = 'Very High',
  Extreme = 'Extreme'
}

export enum VisibilityLevel {
  VeryPoor = 'Very Poor',
  Poor = 'Poor',
  Moderate = 'Moderate',
  Good = 'Good',
  Excellent = 'Excellent'
}

export enum WindIntensity {
  Light = 'Light',
  Moderate = 'Moderate',
  Strong = 'Strong',
  Severe = 'Severe'
}


export type CurrentCondition = {
  readonly temperature: Temperature
  readonly feelsLike: Temperature
  readonly highTemp: Temperature
  readonly lowTemp: Temperature
  readonly description: string
  readonly weatherIcon: string
  readonly condition: WeatherCondition
  
  readonly wind: Wind
  
  readonly humidity: HumidityData
  
  readonly uvIndex: UvIndexData
  
  readonly visibility: Visibility
}

export type Wind = {
  readonly speed: WindSpeed
  readonly direction: WindDirection
  readonly speedUnit: string
  readonly intensity: WindIntensity
  readonly compassAngle: number
}

export type HumidityData = {
  readonly humidity: Humidity
  readonly level: HumidityLevel
  readonly status: string
}

export type UvIndexData = {
  readonly index: UvIndex
  readonly riskLevel: UvRiskLevel
  readonly riskText: string
  readonly protectionAdvice: string
  readonly scalePosition: number
}

export type Visibility = {
  readonly distance: Distance
  readonly distanceUnit: DistanceUnit
  readonly maxVisibility: number
  readonly level: VisibilityLevel
  readonly status: string
  readonly atmosphericConditions: string
  readonly visibilityPercentage: number
}
