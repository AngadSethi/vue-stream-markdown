<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { useContext } from '../composables'

const props = withDefaults(defineProps<{
  icon: string
  width?: number
  height?: number
  class?: string | string[] | Record<string, unknown>
  style?: CSSProperties
}>(), {
  width: 14,
  height: 14,
})

const { icons } = useContext()

const Icon = computed(() => icons.value[props.icon])
const iconStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))
</script>

<template>
  <div :style="iconStyle">
    <Icon :width="width" :height="height" :class="props.class" :style="style" />
  </div>
</template>
