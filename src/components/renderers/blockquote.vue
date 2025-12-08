<script setup lang="ts">
import type { BlockquoteNodeRendererProps } from '../../types'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<BlockquoteNodeRendererProps>(), {})
</script>

<template>
  <blockquote data-stream-markdown="blockquote">
    <NodeList v-bind="props" :nodes="node.children" />
  </blockquote>
</template>
