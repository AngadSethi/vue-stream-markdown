<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { useContext, useI18n } from '../composables'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<{
  variant?: ErrorVariant
  icon?: Component
  message?: string
}>(), {
  variant: 'vanilla',
})

type ErrorVariant = 'vanilla' | 'image' | 'mermaid' | 'katex' | 'harden-image' | 'harden-link'

const { t } = useI18n()
const { icons } = useContext()

const messages = computed((): Record<ErrorVariant, string> => ({
  'vanilla': t('error.vanilla'),
  'image': t('error.image'),
  'mermaid': t('error.mermaid'),
  'katex': t('error.katex'),
  'harden-image': t('error.harden'),
  'harden-link': t('error.harden'),
}))

const icon = computed(() => {
  if (props.icon)
    return props.icon
  if (icons.value[props.variant])
    return icons.value[props.variant]
  return icons.value[props.variant.replace('harden-', '')] || icons.value.error
})

const message = computed(() => props.message
  ? props.message
  : messages.value[props.variant!] || messages.value.vanilla)

const isHarden = computed(() => props.variant?.startsWith?.('harden-'))
</script>

<template>
  <span data-stream-markdown="error-component">
    <div data-stream-markdown="error-component-icon">
      <component :is="icon" />
    </div>
    <slot v-if="isHarden" />
    [{{ message }}]
  </span>
</template>
