<template>
  <div class="relative">
    <Card 
      class="p-6 md:p-8 text-center relative"
      :class="intensityClasses"
    >
        <div class="text-3xl md:text-4xl mb-4">
          {{ windIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold font-mono mb-2 text-weather-cloudy-800">
          {{ wind.speed }}
        </div>
        
        <div class="text-weather-cloudy-600 font-weather">
          {{ wind.speedUnit }}
        </div>
        
        <div class="text-xs text-weather-cloudy-500 mt-3 font-weather">
          {{ wind.direction }} Wind
        </div>
        
        <div class="absolute top-2 right-2 w-6 h-6" v-if="showCompass">
          <div 
            class="text-lg transition-transform duration-300 ease-[var(--ease-weather)]"
            :style="{ transform: `rotate(${wind.compassAngle}deg)`, transformOrigin: 'center' }"
          >
            🧭
          </div>
        </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { Wind } from '~~/shared/weather/types'
import { WindIntensity } from '~~/shared/weather/types'

const { getWindIcon } = useWeatherIcons()
const { getWindDisplayOptions } = useWeatherDisplay()

type Props = {
  wind: Wind
}

const props = defineProps<Props>()

const windIcon = computed(() => getWindIcon(props.wind.intensity))
const { showCompass } = getWindDisplayOptions(props.wind)

const intensityClasses = computed(() => {
  const classMap = {
    [WindIntensity.Light]: 'border-weather-windy-200 bg-weather-windy-50/50',
    [WindIntensity.Moderate]: 'border-weather-partlyCloudy-200 bg-weather-partlyCloudy-50/50',
    [WindIntensity.Strong]: 'border-weather-clear-200 bg-weather-clear-50/50',
    [WindIntensity.Severe]: 'border-weather-storm-200 bg-weather-storm-50/50'
  }
  
  return classMap[props.wind.intensity] || 'border-weather-partlyCloudy-200 bg-weather-partlyCloudy-50/50'
})
</script>


