<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  icon?: Component
  language: string
  showIcon?: boolean
  showName?: boolean
}>(), {
  showIcon: true,
  showName: true,
})
</script>

<template>
  <header data-stream-markdown="language-title">
    <component :is="icon" v-if="showIcon" />
    <span v-if="showName" data-stream-markdown="language-name">
      {{ language }}
    </span>
  </header>
</template>
