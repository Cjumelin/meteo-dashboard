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
          :class="getBadgeVariant(Object.values(UvRiskLevel).indexOf(uvIndex.riskLevel))"
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
          <ProgressBar 
            :percentage="uvIndex.scalePosition"
            :show-marker="true"
          >
            <template #background>
              <div class="w-full h-full bg-gradient-to-r from-weather-windy-300 via-weather-clear-400 to-weather-storm-500 rounded-full"></div>
            </template>
            <template #labels>
              <div class="flex justify-between text-xs text-weather-cloudy-500 mt-2 font-mono">
                <span>{{ UV_SCALE.MIN }}</span>
                <span>{{ UV_SCALE.MAX }}+</span>
              </div>
            </template>
          </ProgressBar>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { UvRiskLevel } from '~~/shared/weather/types'
import { UV_SCALE } from '~~/shared/weather/constructors/uv'
import { useCardVariant } from '~/composables/ui/useCardVariant'
import { useBadgeVariant } from '~/composables/ui/useBadgeVariant'
import ProgressBar from '~/components/ui/ProgressBar.vue'

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


</script>


