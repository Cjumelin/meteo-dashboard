<template>
  <div class="relative">
    <Card 
      variant="compact"
      :class="riskClasses"
      class="p-4 md:p-5"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ uvIcon }}
        </div>
        
        <div class="text-xl md:text-2xl font-bold font-mono mb-2 text-weather-cloudy-800">
          {{ uvIndex.index }}
        </div>
        
        <div class="text-weather-cloudy-600 font-weather">
          UV
        </div>
        
        <Badge 
          class="tracking-wide"
          :class="riskLevelClass"
        >
          {{ uvIndex.riskText }}
        </Badge>
        
        <div class="mt-4 p-2 md:p-3 bg-weather-cloudy-50 rounded-lg" v-if="showProtection">
          <div class="text-lg mb-1">
            {{ protectionIcon }}
          </div>
          <div class="text-xs md:text-sm text-weather-cloudy-600 font-weather">
            {{ uvIndex.protectionAdvice }}
          </div>
        </div>
        
        <div class="mt-4" v-if="showScale">
          <div class="relative w-full h-3 bg-gradient-to-r from-weather-windy-300 via-weather-clear-400 to-weather-storm-500 rounded-full overflow-hidden">
            <div 
              class="absolute top-0 w-1 h-full bg-weather-cloudy-800 transition-all duration-300 ease-[var(--ease-weather)]"
              :style="{ left: `${uvIndex.scalePosition}%` }"
            ></div>
          </div>
          <div class="flex justify-between text-xs text-weather-cloudy-500 mt-2 font-mono">
          </div>
        </div>
      </div>
    </Card>
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
    [UvRiskLevel.Low]: 'border-weather-windy-200 bg-weather-windy-50/50',
    [UvRiskLevel.Moderate]: 'border-weather-clear-200 bg-weather-clear-50/50',
    [UvRiskLevel.High]: 'border-weather-clear-300 bg-weather-clear-100/50',
    [UvRiskLevel.VeryHigh]: 'border-weather-storm-200 bg-weather-storm-50/50',
    [UvRiskLevel.Extreme]: 'border-weather-storm-300 bg-weather-storm-100/50'
  }
  
  return classMap[props.uvIndex.riskLevel] || 'border-weather-cloudy-200 bg-weather-cloudy-50/50'
})

const riskLevelClass = computed(() => {
  const classMap = {
    [UvRiskLevel.Low]: 'bg-weather-windy-100 text-weather-windy-800',
    [UvRiskLevel.Moderate]: 'bg-weather-clear-100 text-weather-clear-800',
    [UvRiskLevel.High]: 'bg-weather-clear-200 text-weather-clear-900',
    [UvRiskLevel.VeryHigh]: 'bg-weather-storm-100 text-weather-storm-800',
    [UvRiskLevel.Extreme]: 'bg-weather-storm-200 text-weather-storm-900'
  }
  
  return classMap[props.uvIndex.riskLevel] || 'bg-weather-cloudy-100 text-weather-cloudy-800'
})
</script>


