import type { UnguardCurrentCondition } from './index'
import { WeatherCondition, WindDirection, WindIntensity, DistanceUnit } from './types'

export const stub: UnguardCurrentCondition = {
  temperature: {
    current: 22.4,
    feelsLike: 24,
    high: 26.2,
    low: 14.2
  },
  condition: {
    description: "Sunny",
    icon: "🌤️",
    type: WeatherCondition.Sunny
  },
  wind: {
    speed: 11.9,
    direction: WindDirection.E,
    unit: "km/h",
    intensity: WindIntensity.Light
  },
  humidity: {
    value: 43
  },
  uv: {
    index: 5.8
  },
  visibility: {
    distance: 10,
    unit: DistanceUnit.Kilometers,
    maxDistance: 15
  }
}
