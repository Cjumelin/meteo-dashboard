<template>
  <div v-if="loading">
    <Card class="p-6 md:p-8">
      <CardSkeleton 
        :show-icon="false"
        :show-title="true"
        :show-subtitle="true"
        :show-value="false"
        :show-unit="false"
        :show-description="false"
        class="mb-8"
      />
      
      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <CardSkeleton 
          v-for="i in 7" 
          :key="i"
          variant="compact"
          :show-icon="true"
          :show-title="true"
          :show-subtitle="false"
          :show-value="true"
          :show-unit="false"
          :show-description="true"
        />
      </div>
    </Card>
  </div>
  
  <Card v-else class="p-6 md:p-8">
    <div>
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-bold font-display text-weather-cloudy-800 mb-2">
          7-Day Forecast
        </h2>
        <p class="text-weather-cloudy-600 font-weather">
          Weekly weather outlook
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card 
          v-for="day in weeklyForecast" 
          :key="day.day"
          :variant="getWeatherCardVariant(day.condition)"
          class="text-center p-2 transition-all duration-300 ease-[var(--ease-weather)] hover:scale-105"
        >
          <div class="text-sm font-weather font-medium mb-2 text-weather-cloudy-600">
            {{ day.day }}
          </div>
          
          <div class="text-2xl mb-2">
            {{ day.icon }}
          </div>
          
          <div class="text-lg font-bold font-mono mb-1">
            {{ day.temp }}°C
          </div>
          
          <div class="text-xs font-weather opacity-70 mb-1">
            {{ day.precipitation }}mm
          </div>
          
          <div class="text-xs font-weather opacity-60">
            {{ day.condition }}
          </div>
        </Card>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { useCardVariant } from '~/composables/ui/useCardVariant'

export type WeeklyForecastDay = {
  readonly day: string
  readonly temp: number
  readonly precipitation: number
  readonly condition: string
  readonly icon: string
}



const weeklyForecast = ref<any[]>([
  { day: 'Mon', temp: 22, precipitation: 5, condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Tue', temp: 24, precipitation: 0, condition: 'Sunny', icon: '☀️' },
  { day: 'Wed', temp: 19, precipitation: 12, condition: 'Rainy', icon: '🌧️' },
  { day: 'Thu', temp: 21, precipitation: 3, condition: 'Cloudy', icon: '☁️' },
  { day: 'Fri', temp: 26, precipitation: 0, condition: 'Clear', icon: '☀️' },
  { day: 'Sat', temp: 23, precipitation: 8, condition: 'Showers', icon: '🌦️' },
  { day: 'Sun', temp: 25, precipitation: 2, condition: 'Partly Cloudy', icon: '⛅' }
])


const { loading } = useWeather()
const { getCardVariant } = useCardVariant()

const getWeatherCardVariant = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return getCardVariant(0)
    case 'partly cloudy':
      return getCardVariant(1)
    case 'cloudy':
      return getCardVariant(2)
    case 'rainy':
    case 'showers':
      return getCardVariant(3)
    default:
      return getCardVariant(2)
  }
}
</script>
