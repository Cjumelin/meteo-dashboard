<template>
  <div class="relative">
    <CardSkeleton 
      v-if="loading || !wind"
      :show-icon="true"
      :show-title="false"
      :show-subtitle="false"
      :show-value="true"
      :show-unit="true"
      :show-description="true"
      class="p-6 md:p-8 text-center relative"
      :class="intensityClasses"
    />
    
    <Card 
      v-else
      :variant="intensityClasses"
      class="p-6 md:p-8 text-center"
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
      
    
    <div class="self-center text-center pt-4">
        <span class="block text-2xl transition-transform duration-300 ease-[var(--ease-weather)]"
        :style="{ transform: `rotate(${wind.compassAngle}deg)`, transformOrigin: 'center' }"
        >🧭</span>

      <span class="text-xs text-weather-cloudy-500 mt-3 font-weather">
        {{ wind.direction }} {{ wind.compassAngle }}°
      </span>
    </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { WindIntensity } from '~~/shared/weather/types'
import { useCardVariant } from '~/composables/ui/useCardVariant'

const { currentCondition, loading } = useWeather()
const { getWindIcon } = useWeatherIcons()
const { getCardVariant } = useCardVariant()

const wind = computed(() => currentCondition.value?.wind)
const windIcon = computed(() => wind.value ? getWindIcon(wind.value.intensity) : '')

const intensityClasses = computed(() => {
  if (!wind.value) return 'weather-low'
  return getCardVariant(Object.values(WindIntensity).indexOf(wind.value.intensity))
})
</script>


