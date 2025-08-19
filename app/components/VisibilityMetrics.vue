<template>
  <div class="relative">
    <CardSkeleton 
      v-if="loading || !visibility"
      :show-icon="true"
      :show-title="false"
      :show-subtitle="false"
      :show-value="true"
      :show-unit="true"
      :show-description="true"
      :class="clarityClasses"
      class="p-6 md:p-8"
    />
    
    <Card 
      v-else
      :variant="clarityClasses"
      class="p-6 md:p-8"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ visibilityIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold font-mono mb-2 text-weather-cloudy-800">
          {{ visibility.distance }}
        </div>
        
        <div class="text-weather-cloudy-600 font-weather">
          {{ visibility.distanceUnit }}
        </div>
        
        <div class="text-xs text-weather-cloudy-500 mt-3 font-weather">
          Visibility
        </div>
        
        <div 
          class="text-xs font-medium mt-2 px-2 py-1 rounded-full"
          :class="statusClasses"
        >
          {{ visibility.status }}
        </div>
        
        <div class="mt-3 p-2 md:p-3 bg-weather-cloudy-50 rounded-lg">
          <div class="text-lg mb-1">
            {{ conditionsIcon }}
          </div>
          <div class="text-xs md:text-sm text-weather-cloudy-600 font-weather">
            {{ visibility.atmosphericConditions }}
          </div>
        </div>
        
        <div class="mt-4 w-full">
          <div class="w-full h-2 bg-weather-cloudy-200 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300 ease-[var(--ease-weather)]"
              :style="{ width: `${visibility.visibilityPercentage}%` }"
              :class="indicatorFillClass"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-weather-cloudy-500 mt-2 font-mono">
            <span>0</span>
            <span>-</span>
            <span>{{ visibility.maxVisibility }}{{ visibility.distanceUnit }}</span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { VisibilityLevel } from '~~/shared/weather/types'
import { useCardVariant } from '~/composables/ui/useCardVariant'
import { useBadgeVariant } from '~/composables/ui/useBadgeVariant'
import { useProgressVariant } from '~/composables/ui/useProgressVariant'

const { currentCondition, loading } = useWeather()
const { getVisibilityIcon } = useWeatherIcons()
const { getCardVariant } = useCardVariant()
const { getBadgeVariant } = useBadgeVariant()
const { getProgressVariant } = useProgressVariant()

const visibility = computed(() => currentCondition.value?.visibility)

const visibilityIcon = computed(() => visibility.value ? getVisibilityIcon(visibility.value.level) : '')
const conditionsIcon = computed(() => visibility.value ? getVisibilityIcon(visibility.value.level) : '')

const clarityClasses = computed(() => {
  if (!visibility.value) return 'weather-moderate'
  return getCardVariant(Object.values(VisibilityLevel).indexOf(visibility.value.level))
})

const statusClasses = computed(() => {
  if (!visibility.value) return 'bg-weather-cloudy-100 text-weather-cloudy-800'
  return getBadgeVariant(Object.values(VisibilityLevel).indexOf(visibility.value.level))
})

const indicatorFillClass = computed(() => {
  if (!visibility.value) return 'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500'
  return getProgressVariant(Object.values(VisibilityLevel).indexOf(visibility.value.level))
})
</script>