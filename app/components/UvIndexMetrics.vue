<template>
  <div class="relative">
    <div 
      class="bg-white/90 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-gray-200 shadow-md"
      :class="riskClasses"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ uvIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold text-gray-900 font-mono mb-2">
          {{ uvIndex.index }}
        </div>
        
        <div class="text-gray-600 font-weather">
          UV
        </div>
        
        <p 
          class="text-xs font-semibold text-center py-1 rounded-full uppercase tracking-wide"
          :class="riskLevelClass"
        >
          {{ uvIndex.riskText }}
        </p>
        
        <div class="mt-4 p-2 md:p-3 bg-gray-50 rounded-lg" v-if="showProtection">
          <div class="text-lg mb-1">
            {{ protectionIcon }}
          </div>
          <div class="text-xs md:text-sm text-gray-600 font-weather">
            {{ uvIndex.protectionAdvice }}
          </div>
        </div>
        
        <div class="mt-4" v-if="showScale">
          <div class="relative w-full h-3 bg-gradient-to-r from-green-300 via-yellow-400 to-red-500 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 w-1 h-full bg-gray-800"
              :style="{ left: `${uvIndex.scalePosition}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-gray-500 mt-2 font-mono">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UvIndexData } from '~~/shared/weather/types'
import { UvRiskLevel } from '~~/shared/weather/types'

const { getUvIcon } = useWeatherIcons()
const { getUvDisplayOptions } = useWeatherDisplay()

type Props = {
  uvIndex: UvIndexData
}

const props = defineProps<Props>()

const uvIcon = computed(() => getUvIcon(props.uvIndex.riskLevel))
const protectionIcon = computed(() => getUvIcon(props.uvIndex.riskLevel))
const { showProtection, showScale } = getUvDisplayOptions(props.uvIndex)

const riskClasses = computed(() => {
  const classMap = {
    [UvRiskLevel.Low]: 'border-green-200 bg-green-50/50',
    [UvRiskLevel.Moderate]: 'border-yellow-200 bg-yellow-50/50',
    [UvRiskLevel.High]: 'border-yellow-300 bg-yellow-100/50',
    [UvRiskLevel.VeryHigh]: 'border-red-200 bg-red-50/50',
    [UvRiskLevel.Extreme]: 'border-red-300 bg-red-100/50'
  }
  
  return classMap[props.uvIndex.riskLevel] || 'border-gray-200 bg-gray-50/50'
})

const riskLevelClass = computed(() => {
  const classMap = {
    [UvRiskLevel.Low]: 'bg-green-100 text-green-800',
    [UvRiskLevel.Moderate]: 'bg-yellow-100 text-yellow-800',
    [UvRiskLevel.High]: 'bg-yellow-200 text-yellow-900',
    [UvRiskLevel.VeryHigh]: 'bg-red-100 text-red-800',
    [UvRiskLevel.Extreme]: 'bg-red-200 text-red-900'
  }
  
  return classMap[props.uvIndex.riskLevel] || 'bg-gray-100 text-gray-800'
})
</script>


