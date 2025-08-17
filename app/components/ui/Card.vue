<template>
  <div 
    class="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] border shadow-[var(--shadow-glass)]"
    :class="variantClasses[variant]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
type CardVariant = 'default' | 'compact' | 'large' | 'modal'

type Props = {
  variant?: CardVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'border-weather-cloudy-200',
  compact: 'border-weather-cloudy-200',
  large: 'border-weather-cloudy-200',
  modal: 'border-weather-cloudy-200 bg-white/95 backdrop-blur-lg shadow-[var(--shadow-floating)] rounded-[var(--radius-modal)]'
}



</script>
