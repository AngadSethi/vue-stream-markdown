<script setup lang="ts">
import type { TextNodeRendererProps } from '../../types'

withDefaults(defineProps<TextNodeRendererProps>(), {})
</script>

<template>
  <span data-stream-markdown="text">{{ node.value }}</span>
</template>
