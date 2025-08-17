import type {
  CurrentCondition,
} from '~~/shared/weather/types'

import type { Temperature } from '~~/shared/utils/temperature/types'

import {
  WeatherCondition,
  WindDirection,
  DistanceUnit,
  WindIntensity,
} from '~~/shared/weather/types'

import { createCelsius } from '~~/shared/utils/temperature/constructor'
import { createWind } from '~~/shared/weather/constructors/wind'
import { createHumidity } from '~~/shared/weather/constructors/humidity'
import { createUvIndex } from '~~/shared/weather/constructors/uv-index'
import { createVisibility } from '~~/shared/weather/constructors/visibility'

const guardTemperature = (value: number): Temperature => {
  return createCelsius(value)
}

type UnguardTemperature = {
  current: number
  feelsLike: number
  high: number
  low: number
}

type UnguardCondition = {
  description: string
  icon: string
  type: WeatherCondition
}

type UnguardWind = {
  speed: number
  direction: WindDirection
  unit: string
  intensity: WindIntensity
}

type UnguardHumidity = {
  value: number
}

type UnguardUv = {
  index: number
}

type UnguardVisibility = {
  distance: number
  unit: DistanceUnit
  maxDistance: number
}

export type UnguardCurrentCondition = {
  temperature: UnguardTemperature
  condition: UnguardCondition
  wind: UnguardWind
  humidity: UnguardHumidity
  uv: UnguardUv
  visibility: UnguardVisibility
}

export const createCurrentCondition = ({
  temperature,
  condition,
  wind,
  humidity,
  uv,
  visibility
}: UnguardCurrentCondition): CurrentCondition => ({
    temperature: guardTemperature(temperature.current),
    feelsLike: guardTemperature(temperature.feelsLike),
    highTemp: guardTemperature(temperature.high),
    lowTemp: guardTemperature(temperature.low),
    description: condition.description || 'Weather data unavailable',
    weatherIcon: condition.icon || '❓',
    condition: condition.type,
    
    wind: createWind(wind),
    humidity: createHumidity(humidity),
    uvIndex: createUvIndex(uv),
    visibility: createVisibility(visibility)
})

export { createWind } from './constructors/wind'

export { createHumidity } from './constructors/humidity'

export { createUvIndex } from './constructors/uv-index'

export { createVisibility } from './constructors/visibility'
export { stub } from './stub'
