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
      :class="'weather-moderate'"
      class="p-6 md:p-8"
    />
    
    <Card 
      v-else
      :variant="getCardVariant(Object.values(VisibilityLevel).indexOf(visibility.level))"
      class="p-6 md:p-8"
    >
      <div class="text-center relative">
        <div class="text-3xl md:text-4xl mb-4">
          {{ getVisibilityIcon(visibility.level) }}
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
        
        <Badge 
          class="mt-2 text-xs px-2 py-1"
          :class="getBadgeVariant(Object.values(VisibilityLevel).indexOf(visibility.level))"
        >
          {{ visibility.status }}
        </Badge>
        
        <div class="mt-3 p-2 md:p-3 bg-weather-cloudy-50 rounded-lg">
          <div class="text-lg mb-1">
            {{ getVisibilityIcon(visibility.level) }}
          </div>
          <div class="text-xs md:text-sm text-weather-cloudy-600 font-weather">
            {{ visibility.atmosphericConditions }}
          </div>
        </div>
        
        <div class="mt-4 w-full">
          <ProgressBar 
            :percentage="visibility.visibilityPercentage"
            :variant="getProgressBarVariant(Object.values(VisibilityLevel).indexOf(visibility.level))"
            :show-labels="true"
            min-label="0"
            :max-label="`${visibility.maxVisibility}${visibility.distanceUnit}`"
          />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { VisibilityLevel } from '~~/shared/weather/types'
import { useCardVariant } from '~/composables/ui/useCardVariant'
import { useBadgeVariant } from '~/composables/ui/useBadgeVariant'
import { useProgressBarVariant } from '~/composables/ui/useProgressBarVariant'
import ProgressBar from '~/components/ui/ProgressBar.vue'
import Badge from '~/components/ui/Badge.vue'
import { useWeather } from '~/composables/useWeather'
import { useWeatherIcons } from '~/composables/useWeatherIcons'

const { currentCondition, loading } = useWeather()
const { getVisibilityIcon } = useWeatherIcons()
const { getCardVariant } = useCardVariant()
const { getBadgeVariant } = useBadgeVariant()
const { getProgressBarVariant } = useProgressBarVariant()

const visibility = computed(() => currentCondition.value?.visibility)

</script>