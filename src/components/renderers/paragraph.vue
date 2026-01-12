<script setup lang="ts">
import type { ParagraphNodeRendererProps } from '../../types'
import { computed } from 'vue'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<ParagraphNodeRendererProps>(), {})

const nextNode = computed(() => props.nextNode?.type ?? '')

const marginBottom = computed(() => {
  if (nextNode.value === 'list')
    return '0.5rem'
  return ''
})
</script>

<template>
  <p
    data-stream-markdown="paragraph"
    :style="{
      marginBottom,
    }"
  >
    <NodeList v-bind="props" :nodes="node.children" />
  </p>
</template>

<style>
:where(.stream-markdown, .stream-markdown-overlay) {
  & [data-stream-markdown='paragraph'] {
    margin-block: 1rem;
    vertical-align: middle;
    transition: height var(--default-transition-duration) ease;
  }
}
</style>
