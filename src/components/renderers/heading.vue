<script setup lang="ts">
import type { HeadingNodeRendererProps } from '../../types'
import { computed } from 'vue'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<HeadingNodeRendererProps>(), {})

const depth = computed(() => props.node.depth)
const tag = computed(() => `h${depth.value}`)
const id = computed(() => `heading-${depth.value}`)
</script>

<template>
  <component :is="tag" :data-stream-markdown="id">
    <NodeList v-bind="props" :nodes="node.children" />
  </component>
</template>
