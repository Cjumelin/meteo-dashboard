<template>
  <section class="mt-20 text-center">
    <div class="inline-block bg-white/95 backdrop-blur-lg rounded-3xl p-12 md:p-16 border-2 border-gray-200 shadow-xl">
      <div class="text-6xl md:text-8xl mb-8">
        {{ currentCondition.weatherIcon }}
      </div>
      
      <div class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
        {{ currentCondition.temperature.value }}
        <span class="text-4xl text-gray-600">
          °C
        </span>
      </div>
      
      <div class="text-2xl text-gray-800 font-atmospheric mb-4">
        {{ currentCondition.description }}
      </div>
      
      <div class="text-gray-600 font-weather text-lg">
        Feels like {{ currentCondition.feelsLike.value }}°C
      </div>
      
      <div class="mt-8 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
        <div class="rounded-full px-6 py-3 flex items-center gap-3 bg-weather-clear-200">
          <span class="text-lg">
            🌡️
          </span>
          <span class="font-mono font-bold text-weather-clear-900">
            H: {{ currentCondition.highTemp.value }}°
          </span>
        </div>
        <div class="rounded-full px-6 py-3 flex items-center gap-3 bg-blue-200">
          <span class="text-lg">
            ❄️
          </span>
          <span class="font-mono font-bold text-blue-900">
            L: {{ currentCondition.lowTemp.value }}°
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CurrentCondition } from '../../shared/weather/types/current-condition'

type Props = {
  currentCondition: CurrentCondition
}

const props = defineProps<Props>()
</script>