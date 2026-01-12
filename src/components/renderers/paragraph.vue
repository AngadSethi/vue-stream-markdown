<script setup lang="ts">
import type { ParagraphNodeRendererProps } from '../../types'
import { treeFlatMap } from 'treechop'
import { computed } from 'vue'
import { PLAIN_TEXT_NODES } from '../../constants'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<ParagraphNodeRendererProps>(), {})

const marginBottom = computed(() => {
  const parentNodeType = props.parentNode?.type
  const nextNodeType = props.nextNode?.type
  if (parentNodeType !== 'listItem' && nextNodeType === 'list')
    return '0.5rem'
  return ''
})

const lineHeight = computed(() => {
  if (props.deep !== 0)
    return ''
  const data = Array.from(new Set(treeFlatMap(props.node.children, node => node.type)))
  if (Array.from(data).every(type => PLAIN_TEXT_NODES.includes(type)))
    return 1.75
  return ''
})
</script>

<template>
  <p
    data-stream-markdown="paragraph"
    :style="{
      marginBottom,
      lineHeight,
    }"
  >
    <NodeList v-bind="props" :parent-node="node" :nodes="node.children" :deep="deep + 1" />
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
