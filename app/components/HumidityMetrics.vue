<template>
  <div class="relative">
    <Card 
      :class="levelClasses"
      class="p-6 md:p-8"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ humidityIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold font-mono mb-2 text-weather-cloudy-800">
          {{ humidity.humidity }} %
        </div>
        
        <div class="text-xs text-weather-cloudy-500 mt-3 font-weather">
          Humidity
        </div>
        
        <Badge 
          v-if="showStatus"
          class="mt-2 text-xs px-2 py-1"
          :class="statusClasses"
        >
          {{ humidity.status }}
        </Badge>
        
        <div class="mt-4 w-full" v-if="showIndicator">
          <div class="w-full h-2 bg-weather-cloudy-200 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300 ease-[var(--ease-weather)]"
              :style="{ width: `${humidity.humidity}%` }"
              :class="indicatorClasses"
            ></div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { HumidityData } from '~~/shared/weather/types'
import { HumidityLevel } from '~~/shared/weather/types'

const { getHumidityIcon } = useWeatherIcons()
const { getHumidityDisplayOptions } = useWeatherDisplay()

type Props = {
  humidity: HumidityData
}

const props = defineProps<Props>()

// View model concerns computed from domain data
const humidityIcon = computed(() => getHumidityIcon(props.humidity.level))
const { showIndicator, showStatus } = getHumidityDisplayOptions(props.humidity)

// Presentation logic: Styling based on humidity level
const levelClasses = computed(() => {
  const classMap = {
    [HumidityLevel.Low]: 'border-weather-clear-200 bg-weather-clear-50/30',
    [HumidityLevel.Moderate]: 'border-weather-clear-200 bg-weather-clear-50/30',
    [HumidityLevel.Comfortable]: 'border-weather-windy-200 bg-weather-windy-50/30',
    [HumidityLevel.High]: 'border-weather-rainy-200 bg-weather-rainy-50/30',
    [HumidityLevel.VeryHigh]: 'border-weather-rainy-300 bg-weather-rainy-100/30'
  }
  
  return classMap[props.humidity.level] || 'border-weather-cloudy-200 bg-weather-cloudy-50/30'
})

const statusClasses = computed(() => {
  const classMap = {
    [HumidityLevel.Low]: 'bg-weather-clear-100 text-weather-clear-800',
    [HumidityLevel.Moderate]: 'bg-weather-clear-100 text-weather-clear-800',
    [HumidityLevel.Comfortable]: 'bg-weather-windy-100 text-weather-windy-800',
    [HumidityLevel.High]: 'bg-weather-rainy-100 text-weather-rainy-800',
    [HumidityLevel.VeryHigh]: 'bg-weather-rainy-200 text-weather-rainy-900'
  }
  
  return classMap[props.humidity.level] || 'bg-weather-cloudy-100 text-weather-cloudy-800'
})

const indicatorClasses = computed(() => {
  const classMap = {
    [HumidityLevel.Low]: 'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
    [HumidityLevel.Moderate]: 'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
    [HumidityLevel.Comfortable]: 'bg-gradient-to-r from-weather-windy-300 to-weather-windy-500',
    [HumidityLevel.High]: 'bg-gradient-to-r from-weather-rainy-300 to-weather-rainy-500',
    [HumidityLevel.VeryHigh]: 'bg-gradient-to-r from-weather-rainy-400 to-weather-rainy-600'
  }
  
  return classMap[props.humidity.level] || 'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500'
})
</script>


