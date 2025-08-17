import type { ForecastResponse, WeatherApiError, Current } from './types'
import type { UnguardCurrentCondition } from '~~/shared/weather'
import {
  WeatherCondition,
  WindDirection,
  DistanceUnit,
  WindIntensity
} from '~~/shared/weather/types'

// Validation and mapping functions
const isValidApiResponse = (data: any): data is ForecastResponse => {
  return (
    data &&
    typeof data === 'object' &&
    data.location &&
    data.current &&
    data.forecast &&
    typeof data.current.temp_c === 'number' &&
    typeof data.current.feelslike_c === 'number' &&
    typeof data.current.humidity === 'number' &&
    typeof data.current.wind_kph === 'number' &&
    typeof data.current.uv === 'number' &&
    typeof data.current.vis_km === 'number'
  )
}

const mapWeatherCondition = (conditionText: string): WeatherCondition => {
  const text = conditionText.toLowerCase()
  
  if (text.includes('clear') || text.includes('sunny')) return WeatherCondition.Clear
  if (text.includes('cloudy') || text.includes('overcast')) return WeatherCondition.Cloudy
  if (text.includes('partly cloudy') || text.includes('scattered')) return WeatherCondition.PartlyCloudy
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) return WeatherCondition.Rainy
  if (text.includes('storm') || text.includes('thunder')) return WeatherCondition.Stormy
  
  return WeatherCondition.Clear // Default fallback
}

const mapWindDirection = (direction: string): WindDirection => {
  const dir = direction.toUpperCase()
  
  switch (dir) {
    case 'N': return WindDirection.N
    case 'NNE': return WindDirection.NNE
    case 'NE': return WindDirection.NE
    case 'ENE': return WindDirection.ENE
    case 'E': return WindDirection.E
    case 'ESE': return WindDirection.ESE
    case 'SE': return WindDirection.SE
    case 'SSE': return WindDirection.SSE
    case 'S': return WindDirection.S
    case 'SSW': return WindDirection.SSW
    case 'SW': return WindDirection.SW
    case 'WSW': return WindDirection.WSW
    case 'W': return WindDirection.W
    case 'WNW': return WindDirection.WNW
    case 'NW': return WindDirection.NW
    case 'NNW': return WindDirection.NNW
    default: return WindDirection.N
  }
}

const mapWindIntensity = (speedKph: number): WindIntensity => {
  if (speedKph < 20) return WindIntensity.Light
  if (speedKph < 40) return WindIntensity.Moderate
  if (speedKph < 60) return WindIntensity.Strong
  return WindIntensity.Severe
}



// Main adapter function
export const adaptForecastToCurrentCondition = (
  data: ForecastResponse | WeatherApiError
): UnguardCurrentCondition | null => {
  // Guard against error responses
  if ('error' in data) {
    console.error('API Error in adapter:', data.error)
    return null
  }

  // Validate API response structure
  if (!isValidApiResponse(data)) {
    console.error('Invalid API response structure:', data)
    return null
  }

  const current = data.current
  const location = data.location

  try {
    // Extract forecast data for high/low temps
    const todayForecast = data.forecast.forecastday[0]
    const highTemp = todayForecast?.day?.maxtemp_c ?? current.temp_c
    const lowTemp = todayForecast?.day?.mintemp_c ?? current.temp_c

    // Create unguarded current condition object
    const currentCondition: UnguardCurrentCondition = {
      temperature: {
        current: current.temp_c,
        feelsLike: current.feelslike_c,
        high: highTemp,
        low: lowTemp
      },
      condition: {
        description: current.condition.text,
        icon: '🌤️', // Default icon - will be handled by view model
        type: mapWeatherCondition(current.condition.text)
      },
      wind: {
        speed: current.wind_kph,
        direction: mapWindDirection(current.wind_dir),
        unit: 'km/h',
        intensity: mapWindIntensity(current.wind_kph)
      },
      humidity: {
        value: current.humidity
      },
      uv: {
        index: current.uv
      },
      visibility: {
        distance: current.vis_km,
        unit: DistanceUnit.Kilometers,
        maxDistance: 15 // Typical max visibility
      }
    }

    console.log('Successfully adapted API response to UnguardCurrentCondition:', {
      location: location.name,
      temperature: current.temp_c,
      condition: current.condition.text
    })

    return currentCondition

  } catch (error) {
    console.error('Error adapting API response to UnguardCurrentCondition:', error)
    return null
  }
}

// Validation helper for external use
export const validateForecastResponse = (data: any): data is ForecastResponse => {
  return isValidApiResponse(data)
}
