<template>
  <div class="relative">
    <div 
      class="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-200 shadow-md"
      :class="levelClasses"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ humidityIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold text-gray-900 font-mono mb-2">
          {{ humidity.humidity }}
        </div>
        
        <div class="text-gray-600 font-weather">
          %
        </div>
        
        <div class="text-xs text-gray-500 mt-3 font-weather">
          Humidity
        </div>
        
        <div 
          v-if="showStatus"
          class="text-xs font-medium mt-2 px-2 py-1 rounded-full"
          :class="statusClasses"
        >
          {{ humidity.status }}
        </div>
        
        <div class="mt-4 w-full" v-if="showIndicator">
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full"
              :style="{ width: `${humidity.humidity}%` }"
              :class="indicatorClasses"
            ></div>
          </div>
        </div>
      </div>
    </div>
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
    [HumidityLevel.Low]: 'border-yellow-200 bg-yellow-50/30',
    [HumidityLevel.Moderate]: 'border-yellow-200 bg-yellow-50/30',
    [HumidityLevel.Comfortable]: 'border-green-200 bg-green-50/30',
    [HumidityLevel.High]: 'border-blue-200 bg-blue-50/30',
    [HumidityLevel.VeryHigh]: 'border-sky-200 bg-sky-50/30'
  }
  
  return classMap[props.humidity.level] || 'border-gray-200 bg-gray-50/30'
})

const statusClasses = computed(() => {
  const classMap = {
    [HumidityLevel.Low]: 'bg-yellow-100 text-yellow-800',
    [HumidityLevel.Moderate]: 'bg-yellow-100 text-yellow-800',
    [HumidityLevel.Comfortable]: 'bg-green-100 text-green-800',
    [HumidityLevel.High]: 'bg-blue-100 text-blue-800',
    [HumidityLevel.VeryHigh]: 'bg-sky-100 text-sky-800'
  }
  
  return classMap[props.humidity.level] || 'bg-gray-100 text-gray-800'
})

const indicatorClasses = computed(() => {
  const classMap = {
    [HumidityLevel.Low]: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    [HumidityLevel.Moderate]: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    [HumidityLevel.Comfortable]: 'bg-gradient-to-r from-green-300 to-green-500',
    [HumidityLevel.High]: 'bg-gradient-to-r from-blue-300 to-blue-500',
    [HumidityLevel.VeryHigh]: 'bg-gradient-to-r from-sky-300 to-sky-500'
  }
  
  return classMap[props.humidity.level] || 'bg-gradient-to-r from-gray-300 to-gray-500'
})
</script>


