<template>
  <div class="relative">
    <div 
      class="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] p-6 md:p-8 border shadow-[var(--shadow-glass)]"
      :class="clarityClasses"
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
        
        <div class="mt-3 p-2 md:p-3 bg-weather-cloudy-50 rounded-lg" v-if="showConditions">
          <div class="text-lg mb-1">
            {{ conditionsIcon }}
          </div>
          <div class="text-xs md:text-sm text-weather-cloudy-600 font-weather">
            {{ visibility.atmosphericConditions }}
          </div>
        </div>
        
        <div class="mt-4 w-full" v-if="showIndicator">
          <div class="w-full h-2 bg-weather-cloudy-200 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-300 ease-[var(--ease-weather)]"
              :style="{ width: `${visibility.visibilityPercentage}%` }"
              :class="indicatorFillClass"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-weather-cloudy-500 mt-2 font-mono">
            <span>0</span>
            <span>{{ visibility.maxVisibility }}{{ visibility.distanceUnit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Visibility } from '~~/shared/weather/types'
import { VisibilityLevel } from '~~/shared/weather/types'

const { getVisibilityIcon } = useWeatherIcons()
const { getVisibilityDisplayOptions } = useWeatherDisplay()

type Props = {
  visibility: Visibility
}

const props = defineProps<Props>()

// View model concerns computed from domain data
const visibilityIcon = computed(() => getVisibilityIcon(props.visibility.level))
const conditionsIcon = computed(() => getVisibilityIcon(props.visibility.level))
const { showConditions, showIndicator } = getVisibilityDisplayOptions(props.visibility)

const clarityClasses = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'border-weather-storm-200 bg-weather-storm-50/30',
    [VisibilityLevel.Poor]: 'border-weather-fog-200 bg-weather-fog-50/30',
    [VisibilityLevel.Moderate]: 'border-weather-partlyCloudy-200 bg-weather-partlyCloudy-50/30',
    [VisibilityLevel.Good]: 'border-weather-clear-200 bg-weather-clear-50/30',
    [VisibilityLevel.Excellent]: 'border-weather-clear-300 bg-weather-clear-100/30'
  }
  
  return classMap[props.visibility.level] || 'border-weather-cloudy-200 bg-weather-cloudy-50/30'
})

const statusClasses = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'bg-weather-storm-100 text-weather-storm-800',
    [VisibilityLevel.Poor]: 'bg-weather-fog-100 text-weather-fog-800',
    [VisibilityLevel.Moderate]: 'bg-weather-partlyCloudy-100 text-weather-partlyCloudy-800',
    [VisibilityLevel.Good]: 'bg-weather-clear-100 text-weather-clear-800',
    [VisibilityLevel.Excellent]: 'bg-weather-clear-200 text-weather-clear-900'
  }
  
  return classMap[props.visibility.level] || 'bg-weather-cloudy-100 text-weather-cloudy-800'
})

const indicatorFillClass = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'bg-gradient-to-r from-weather-storm-300 to-weather-storm-500',
    [VisibilityLevel.Poor]: 'bg-gradient-to-r from-weather-fog-300 to-weather-fog-500',
    [VisibilityLevel.Moderate]: 'bg-gradient-to-r from-weather-partlyCloudy-300 to-weather-partlyCloudy-500',
    [VisibilityLevel.Good]: 'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
    [VisibilityLevel.Excellent]: 'bg-gradient-to-r from-weather-clear-400 to-weather-clear-600'
  }
  
  return classMap[props.visibility.level] || 'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500'
})
</script>