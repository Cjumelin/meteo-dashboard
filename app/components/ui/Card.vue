<template>
  <div
    class="bg-white/90 backdrop-blur-md rounded-[var(--radius-card)] border shadow-[var(--shadow-glass)]"
    :class="variantClasses[variant]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { CARD_VARIANT_CLASSES, type CardVariant } from '~/utils/ui/card-variants'

type Props = {
  variant?: CardVariant
}

const _ = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = CARD_VARIANT_CLASSES
</script>
