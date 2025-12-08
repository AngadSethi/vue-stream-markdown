<script setup lang="ts">
import type { ParagraphNodeRendererProps } from '../../types'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<ParagraphNodeRendererProps>(), {})
</script>

<template>
  <p data-stream-markdown="paragraph">
    <NodeList v-bind="props" :nodes="node.children" />
  </p>
</template>
