<template>
  <div class="relative">
    <div
      class="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-200 shadow-md"
      :class="intensityClasses"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ wind.windIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold text-gray-900 font-mono mb-2">
          {{ wind.speed }}
        </div>
        
        <div class="text-gray-600 font-weather">
          {{ wind.speedUnit }}
        </div>
        
        <div class="text-xs text-gray-500 mt-3 font-weather">
          {{ wind.direction }} Wind
        </div>
        
        <div class="absolute top-2 right-2 w-6 h-6" v-if="wind.showCompass">
          <div 
            class="text-lg"
            :style="{ transform: `rotate(${wind.compassAngle}deg)`, transformOrigin: 'center' }"
          >
            🧭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Wind } from '../../shared/weather/types/current-condition'
import { WindIntensity } from '../../shared/weather/types/current-condition'

type Props = {
  wind: Wind
}

const props = defineProps<Props>()

// Presentation logic: Styling based on wind intensity
const intensityClasses = computed(() => {
  const classMap = {
    [WindIntensity.Light]: 'border-green-200 bg-green-50/50',
    [WindIntensity.Moderate]: 'border-blue-200 bg-blue-50/50',
    [WindIntensity.Strong]: 'border-yellow-200 bg-yellow-50/50',
    [WindIntensity.Severe]: 'border-red-200 bg-red-50/50'
  }
  
  return classMap[props.wind.intensity] || 'border-blue-200 bg-blue-50/50'
})
</script>


