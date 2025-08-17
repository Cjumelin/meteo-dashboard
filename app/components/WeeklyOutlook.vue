<template>
  <Card class="p-6 md:p-8">
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
        class="text-center p-2 transition-all duration-300 ease-[var(--ease-weather)] hover:scale-105"
        :class="getWeatherCardClass(day.condition)"
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
  </Card>
</template>

<script setup lang="ts">

export type WeeklyForecastDay = {
  readonly day: string
  readonly temp: number
  readonly precipitation: number
  readonly condition: string
  readonly icon: string
}

type Props = {
  weeklyForecast: WeeklyForecastDay[]
}

const props = defineProps<Props>()

const getWeatherCardClass = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return 'border-weather-clear-200 bg-gradient-to-br from-weather-clear-50 to-weather-clear-100 text-weather-clear-900 hover:from-weather-clear-100 hover:to-weather-clear-200'
    case 'partly cloudy':
      return 'border-weather-partlyCloudy-200 bg-gradient-to-br from-weather-partlyCloudy-50 to-weather-partlyCloudy-100 text-weather-partlyCloudy-900 hover:from-weather-partlyCloudy-100 hover:to-weather-partlyCloudy-200'
    case 'cloudy':
      return 'border-weather-cloudy-200 bg-gradient-to-br from-weather-cloudy-50 to-weather-cloudy-100 text-weather-cloudy-900 hover:from-weather-cloudy-100 hover:to-weather-cloudy-200'
    case 'rainy':
    case 'showers':
      return 'border-weather-rainy-300 bg-gradient-to-br from-weather-rainy-100 to-weather-rainy-50 text-weather-rainy-900 hover:from-weather-rainy-200 hover:to-weather-rainy-100'
    default:
      return 'border-weather-cloudy-200 bg-gradient-to-br from-weather-cloudy-50 to-weather-cloudy-100 text-weather-cloudy-700 hover:from-weather-cloudy-100 hover:to-weather-cloudy-200'
  }
}
</script>
