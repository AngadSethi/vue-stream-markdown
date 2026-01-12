<script setup lang="ts">
import type { TextNodeRendererProps } from '../../types'

defineOptions({
  inheritAttrs: false,
})

withDefaults(defineProps<TextNodeRendererProps>(), {})
</script>

<template>
  <span data-stream-markdown="text">{{ node.value }}</span>
</template>

<style>
:where(.stream-markdown, .stream-markdown-overlay) {
  & [data-stream-markdown='text'] {
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}
</style>
