import { ref, readonly } from 'vue'
import type { CurrentCondition } from '~~/shared/weather/types'
import type { UnguardCurrentCondition } from '~~/shared/weather/index'
import type { WeatherApiError } from '~~/server/api/forecast/types'
import { createCurrentCondition } from '~~/shared/weather/index'

export const useWeather = () => {
  const currentCondition = ref<CurrentCondition | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  const weatherApiCall = async (): Promise<UnguardCurrentCondition | WeatherApiError> => {
    return await $fetch('/api/forecast')
  }

  const retrieveCurrentCondition = async (): Promise<CurrentCondition | null> => {
    loading.value = true
    error.value = null
    currentCondition.value = null

    try {
      const apiResponse = await weatherApiCall()
      
      if ('error' in apiResponse) {
        error.value = apiResponse.error.message
        console.error('API Error:', apiResponse.error)
        return null
      }
      
      const domainCondition = createCurrentCondition(apiResponse)
      currentCondition.value = domainCondition
      
      console.log('Successfully retrieved current condition:', domainCondition)
      return domainCondition
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data'
      error.value = errorMessage
      console.error('Error in retrieveCurrentCondition:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const refreshWeather = async (): Promise<void> => {
    await retrieveCurrentCondition()
  }

  return {
    currentCondition: readonly(currentCondition),
    error: readonly(error),
    loading: readonly(loading),
    retrieveCurrentCondition,
    refreshWeather
  }
}
