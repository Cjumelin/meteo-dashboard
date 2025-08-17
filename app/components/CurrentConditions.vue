<template>
  <section class="mt-20 text-center">
    <Card variant="large" class="inline-block border-2 p-12 md:p-16">
      <div class="text-6xl md:text-8xl mb-8">
        {{ currentCondition.weatherIcon }}
      </div>
      
      <div class="text-5xl md:text-6xl font-bold mb-6 font-display text-weather-cloudy-800">
        {{ currentCondition.temperature.value }}
        <span class="text-4xl text-weather-cloudy-600">
          °C
        </span>
      </div>
      
      <div class="text-2xl font-atmospheric mb-4 text-weather-cloudy-700">
        {{ currentCondition.description }}
      </div>
      
      <div class="text-weather-cloudy-600 font-weather text-lg">
        Feels like {{ currentCondition.feelsLike.value }}°C
      </div>
      
      <div class="mt-8 flex flex-col md:flex-row justify-center gap-4 md:gap-8">
        <div class="rounded-full px-6 py-3 flex items-center gap-3 bg-weather-clear-200 transition-all duration-300 ease-[var(--ease-weather)] hover:bg-weather-clear-300">
          <span class="text-lg">
            🌡️
          </span>
          <span class="font-mono font-bold text-weather-clear-900">
            H: {{ currentCondition.highTemp.value }}°
          </span>
        </div>
        <div class="rounded-full px-6 py-3 flex items-center gap-3 bg-weather-partlyCloudy-200 transition-all duration-300 ease-[var(--ease-weather)] hover:bg-weather-partlyCloudy-300">
          <span class="text-lg">
            ❄️
          </span>
          <span class="font-mono font-bold text-weather-partlyCloudy-900">
            L: {{ currentCondition.lowTemp.value }}°
          </span>
        </div>
      </div>
    </Card>
  </section>
</template>

<script setup lang="ts">
import type { CurrentCondition } from '~~/shared/weather/types'

type Props = {
  currentCondition: CurrentCondition
}

const props = defineProps<Props>()
</script>