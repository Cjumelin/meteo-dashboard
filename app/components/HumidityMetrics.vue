<template>
  <div class="relative">
    <CardSkeleton 
      v-if="loading || !humidity"
      :show-icon="true"
      :show-title="false"
      :show-subtitle="false"
      :show-value="true"
      :show-unit="false"
      :show-description="true"
      :class="levelClasses"
      class="p-6 md:p-8"
    />
    
    <Card 
      v-else
      :variant="levelClasses"
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
          class="mt-2 text-xs px-2 py-1"
          :class="getBadgeVariant(Object.values(HumidityLevel).indexOf(humidity.level))"
        >
          {{ humidity.status }}
        </Badge>
        
        <div class="mt-4 w-full">
          <ProgressBar 
            :percentage="humidity.humidity"
            :variant="getProgressBarVariant(Object.values(HumidityLevel).indexOf(humidity.level))"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { HumidityLevel } from '~~/shared/weather/types'
import { useCardVariant } from '~/composables/ui/useCardVariant'
import { useBadgeVariant } from '~/composables/ui/useBadgeVariant'
import { useProgressBarVariant } from '~/composables/ui/useProgressBarVariant'
import ProgressBar from '~/components/ui/ProgressBar.vue'

const { currentCondition, loading } = useWeather()
const { getHumidityIcon } = useWeatherIcons()
const { getCardVariant } = useCardVariant()
const { getBadgeVariant } = useBadgeVariant()
const { getProgressBarVariant } = useProgressBarVariant()

const humidity = computed(() => currentCondition.value?.humidity)
const humidityIcon = computed(() => humidity.value ? getHumidityIcon(humidity.value.level) : '')

const levelClasses = computed(() => {
  if (!humidity.value) return 'weather-moderate'
  return getCardVariant(Object.values(HumidityLevel).indexOf(humidity.value.level))
})




</script>


