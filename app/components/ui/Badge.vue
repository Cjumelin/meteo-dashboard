<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { BADGE_VARIANT_CLASSES, type BadgeVariant } from '~/utils/ui/badge-variants'

type Props = {
  variant?: BadgeVariant
}

const _ = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClasses = BADGE_VARIANT_CLASSES
</script>
