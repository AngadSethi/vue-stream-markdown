<script setup lang="ts">
import type { InlineCodeNodeRendererProps } from '../../types'

withDefaults(defineProps<InlineCodeNodeRendererProps>(), {})
</script>

<template>
  <code data-stream-markdown="inline-code">{{ node.value }}</code>
</template>
