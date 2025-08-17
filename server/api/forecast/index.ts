import type { ForecastResponse, WeatherApiError } from './types'
import type { UnguardCurrentCondition } from '~~/shared/weather/index'
import { adaptForecastToCurrentCondition } from './adapter'
import { stub } from '~~/shared/weather/index'

export type { ForecastResponse, WeatherApiError }

export default defineEventHandler(async (event): Promise<UnguardCurrentCondition | WeatherApiError> => {
  if (process.env.NODE_ENV === 'offline') {
    console.log('🔧 Using stub data for development')
    return stub as UnguardCurrentCondition
  }

  const apiKey = process.env.NUXT_WEATHER_API_KEY
  
  if (!apiKey) {
    console.error('NUXT_WEATHER_API_KEY is not set')
    return { error: { code: 401, message: 'API key not configured' } }
  }

  try {
    const location = 'London'
    const days = 7 
    
    const baseUrl = new URL('http://api.weatherapi.com/v1/forecast.json')
    baseUrl.searchParams.set('key', apiKey)
    baseUrl.searchParams.set('q', location)
    baseUrl.searchParams.set('days', days.toString())
    baseUrl.searchParams.set('aqi', 'no')
    baseUrl.searchParams.set('alerts', 'no')
    
    const url = baseUrl.toString()
    
    console.log('Calling WeatherAPI.com Forecast...')
    console.log('URL:', url)
    
    const response = await fetch(url)
    const rawData: ForecastResponse | WeatherApiError = await response.json()
    
    console.log('WeatherAPI Forecast Response:')
    console.log(JSON.stringify(rawData, null, 2))
    
    // Use adapter to transform API response to unguarded current condition
    const currentCondition = adaptForecastToCurrentCondition(rawData)
    
    if (currentCondition) {
      console.log('Successfully adapted API response to UnguardCurrentCondition')
      return currentCondition
    } else {
      console.error('Failed to adapt API response to UnguardCurrentCondition')
      return { error: { code: 422, message: 'Failed to process weather data' } }
    }
    
  } catch (error) {
    console.error('Error calling WeatherAPI Forecast:', error)
    return { error: { code: 500, message: 'Failed to fetch forecast data' } }
  }
})
