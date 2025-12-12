<script setup lang="ts">
import type { Action } from '../../types'
import Button from '../button.vue'

withDefaults(defineProps<{
  actions?: Action[]
}>(), {
  actions: () => [],
})
</script>

<template>
  <div data-stream-markdown="actions">
    <Button
      v-for="action in actions"
      :key="action.key"
      :name="action.name"
      :icon="action.icon"
      :icon-style="action.iconStyle"
      :options="action.options"
      @click="action.onClick"
    />
  </div>
</template>
