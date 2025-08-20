<template>
  <div class="w-full">
    <div 
      class="relative w-full h-3 rounded-full overflow-hidden"
      :class="containerClasses"
    >
      <slot name="background">
        <div 
          class="h-full rounded-full transition-all duration-300 ease-[var(--ease-weather)]"
          :style="{ width: `${percentage}%` }"
          :class="fillClasses"
        ></div>
      </slot>
      
      <slot name="marker">
        <div 
          v-if="showMarker"
          class="absolute top-0 w-1 h-full bg-weather-cloudy-800 transition-all duration-300 ease-[var(--ease-weather)]"
          :style="{ left: `${percentage}%` }"
        ></div>
      </slot>
    </div>
    
    <slot name="labels">
      <div v-if="showLabels" class="flex justify-between text-xs text-weather-cloudy-500 mt-2 font-mono">
        <span>{{ minLabel }}</span>
        <span v-if="centerLabel">{{ centerLabel }}</span>
        <span>{{ maxLabel }}</span>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { PROGRESS_VARIANT_CLASSES, type ProgressVariant } from '~~/app/utils/ui/progress-variants'

type Props = {
  percentage: number
  variant?: ProgressVariant
  showLabels?: boolean
  showMarker?: boolean
  minLabel?: string
  centerLabel?: string
  maxLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showLabels: false,
  showMarker: false,
  minLabel: '0',
  centerLabel: '',
  maxLabel: '100'
})

const variantClasses = PROGRESS_VARIANT_CLASSES

const containerClasses = computed(() => variantClasses.container[props.variant])
const fillClasses = computed(() => variantClasses.fill[props.variant])
</script>
