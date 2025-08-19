<template>
  <div 
    class="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] border shadow-[var(--shadow-glass)] animate-pulse"
    :class="variantClasses[variant]"
  >
    <div class="p-6 md:p-8">
      <div class="flex flex-col items-center">
        <div 
          v-if="showIcon"
          class="w-16 h-16 md:w-20 md:h-20 bg-weather-cloudy-200 rounded-full mb-4"
        ></div>
        
        <div 
          v-if="showTitle"
          class="w-32 h-6 bg-weather-cloudy-200 rounded mb-3"
        ></div>
        
        <div 
          v-if="showSubtitle"
          class="w-24 h-4 bg-weather-cloudy-100 rounded mb-4"
        ></div>
        
        <div 
          v-if="showValue"
          class="w-20 h-8 bg-weather-cloudy-200 rounded mb-2"
        ></div>
        
        <div 
          v-if="showUnit"
          class="w-16 h-4 bg-weather-cloudy-100 rounded mb-3"
        ></div>
        
        <div 
          v-if="showDescription"
          class="w-28 h-3 bg-weather-cloudy-100 rounded"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
type CardSkeletonVariant = 'default' | 'compact' | 'large' | 'modal'

type Props = {
  variant?: CardSkeletonVariant
  showIcon?: boolean
  showTitle?: boolean
  showSubtitle?: boolean
  showValue?: boolean
  showUnit?: boolean
  showDescription?: boolean
}

const _ = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showIcon: true,
  showTitle: true,
  showSubtitle: true,
  showValue: true,
  showUnit: true,
  showDescription: true
})

const variantClasses = {
  default: 'border-weather-cloudy-200',
  compact: 'border-weather-cloudy-200',
  large: 'border-weather-cloudy-200',
  modal: 'border-weather-cloudy-200 bg-white/95 backdrop-blur-lg shadow-[var(--shadow-floating)] rounded-[var(--radius-modal)]'
}
</script>
