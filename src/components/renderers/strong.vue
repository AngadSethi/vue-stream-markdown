<script setup lang="ts">
import type { StrongNodeRendererProps } from '../../types'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<StrongNodeRendererProps>(), {})
</script>

<template>
  <strong data-stream-markdown="strong">
    <NodeList v-bind="props" :parent-node="node" :nodes="node.children" :deep="deep + 1" />
  </strong>
</template>

<style>
:where(.stream-markdown, .stream-markdown-overlay) {
  & [data-stream-markdown='strong'] {
    font-weight: 600;
  }
}
</style>
