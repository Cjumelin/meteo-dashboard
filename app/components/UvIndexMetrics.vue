<template>
  <div class="relative">
    <CardSkeleton 
      v-if="loading || !uvIndex"
      :show-icon="true"
      :show-title="false"
      :show-subtitle="false"
      :show-value="true"
      :show-unit="false"
      :show-description="true"
      variant="compact"
      :class="riskClasses"
      class="p-4 md:p-5"
    />
    
    <Card 
      v-else
      :variant="riskClasses"
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
        
        <div class="mt-4 p-2 md:p-3 bg-weather-cloudy-50 rounded-lg">
          <div class="text-lg mb-1">
            {{ protectionIcon }}
          </div>
          <div class="text-xs md:text-sm text-weather-cloudy-600 font-weather">
            {{ uvIndex.protectionAdvice }}
          </div>
        </div>
        
        <div class="mt-4">
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
import { UvRiskLevel } from '~~/shared/weather/types'
import { useCardVariant } from '~/composables/ui/useCardVariant'
import { useBadgeVariant } from '~/composables/ui/useBadgeVariant'

const { currentCondition, loading } = useWeather()
const { getUvIcon } = useWeatherIcons()
const { getCardVariant } = useCardVariant()
const { getBadgeVariant } = useBadgeVariant()

const uvIndex = computed(() => currentCondition.value?.uvIndex)

const uvIcon = computed(() => uvIndex.value ? getUvIcon(uvIndex.value.riskLevel) : '')
const protectionIcon = computed(() => uvIndex.value ? getUvIcon(uvIndex.value.riskLevel) : '')

const riskClasses = computed(() => {
  if (!uvIndex.value) return 'weather-moderate'
  return getCardVariant(Object.values(UvRiskLevel).indexOf(uvIndex.value.riskLevel))
})

const riskLevelClass = computed(() => {
  if (!uvIndex.value) return 'bg-weather-cloudy-100 text-weather-cloudy-800'
  return getBadgeVariant(Object.values(UvRiskLevel).indexOf(uvIndex.value.riskLevel))
})
</script>


