<template>
  <div class="relative">
    <div 
      class="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-gray-200 shadow-md"
      :class="clarityClasses"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ visibility.visibilityIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold text-gray-900 font-mono mb-2">
          {{ visibility.distance }}
        </div>
        
        <div class="text-gray-600 font-weather">
          {{ visibility.distanceUnit }}
        </div>
        
        <div class="text-xs text-gray-500 mt-3 font-weather">
          Visibility
        </div>
        
        <div 
          class="text-xs font-medium mt-2 px-2 py-1 rounded-full"
          :class="statusClasses"
        >
          {{ visibility.status }}
        </div>
        
        <div class="mt-3 p-2 md:p-3 bg-gray-50 rounded-lg" v-if="visibility.showConditions">
          <div class="text-lg mb-1">
            {{ visibility.conditionsIcon }}
          </div>
          <div class="text-xs md:text-sm text-gray-600 font-weather">
            {{ visibility.atmosphericConditions }}
          </div>
        </div>
        
        <div class="mt-4 w-full" v-if="visibility.showIndicator">
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full"
              :style="{ width: `${visibility.visibilityPercentage}%` }"
              :class="indicatorFillClass"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-2 font-mono">
            <span>0</span>
            <span>{{ visibility.maxVisibility }}{{ visibility.distanceUnit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { Visibility } from '../../shared/weather/types/current-condition'
import { VisibilityLevel } from '../../shared/weather/types/current-condition'

type Props = {
  visibility: Visibility
}

const props = defineProps<Props>()



// Presentation logic: Dynamic card styling based on visibility level
const clarityClasses = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'border-red-200 bg-red-50/30',
    [VisibilityLevel.Poor]: 'border-yellow-200 bg-yellow-50/30',
    [VisibilityLevel.Moderate]: 'border-blue-200 bg-blue-50/30',
    [VisibilityLevel.Good]: 'border-green-200 bg-green-50/30',
    [VisibilityLevel.Excellent]: 'border-green-300 bg-green-100/30'
  }
  
  return classMap[props.visibility.level] || 'border-gray-200 bg-gray-50/30'
})

// Presentation logic: Status text styling
const statusClasses = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'bg-red-100 text-red-800',
    [VisibilityLevel.Poor]: 'bg-yellow-100 text-yellow-800',
    [VisibilityLevel.Moderate]: 'bg-blue-100 text-blue-800',
    [VisibilityLevel.Good]: 'bg-green-100 text-green-800',
    [VisibilityLevel.Excellent]: 'bg-green-200 text-green-900'
  }
  
  return classMap[props.visibility.level] || 'bg-gray-100 text-gray-800'
})

// Presentation logic: Indicator fill styling
const indicatorFillClass = computed(() => {
  const classMap = {
    [VisibilityLevel.VeryPoor]: 'bg-gradient-to-r from-red-300 to-red-500',
    [VisibilityLevel.Poor]: 'bg-gradient-to-r from-yellow-300 to-yellow-500',
    [VisibilityLevel.Moderate]: 'bg-gradient-to-r from-blue-300 to-blue-500',
    [VisibilityLevel.Good]: 'bg-gradient-to-r from-green-300 to-green-500',
    [VisibilityLevel.Excellent]: 'bg-gradient-to-r from-green-400 to-green-600'
  }
  
  return classMap[props.visibility.level] || 'bg-gradient-to-r from-gray-300 to-gray-500'
})
</script>