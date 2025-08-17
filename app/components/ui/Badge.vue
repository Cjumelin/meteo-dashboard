<template>
  <span 
    class="inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-[var(--ease-weather)]"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

type Props = {
  variant?: BadgeVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

const variantClasses = {
  default: 'bg-weather-cloudy-100 text-weather-cloudy-800',
  success: 'bg-weather-clear-100 text-weather-clear-800',
  warning: 'bg-weather-partlyCloudy-100 text-weather-partlyCloudy-800',
  danger: 'bg-weather-storm-100 text-weather-storm-800',
  info: 'bg-weather-windy-100 text-weather-windy-800'
}
</script>
