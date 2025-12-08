<script setup lang="ts">
import type { ListNodeRendererProps } from '../../types'
import { computed } from 'vue'
import NodeList from '../node-list.vue'

const props = withDefaults(defineProps<ListNodeRendererProps>(), {})

const isTaskList = computed(() => props.node.children.some(child => typeof child.checked === 'boolean'))

const tag = computed(() => props.node.ordered ? 'ol' : 'ul')
const id = computed(() => isTaskList.value
  ? 'task-list'
  : props.node.ordered ? 'ordered-list' : 'unordered-list')
</script>

<template>
  <component :is="tag" :data-stream-markdown="id">
    <NodeList v-bind="props" :nodes="node.children" />
  </component>
</template>
