<script setup lang="ts">
import { computed } from 'vue'
import { useContext, useI18n } from '../../composables'
import Segmented from '../segmented.vue'

const mode = defineModel<'preview' | 'source'>('mode', { required: false, default: 'source' })
const collapsed = defineModel<boolean>('collapsed', { required: false, default: false })

const { t } = useI18n()
const { icons } = useContext()

const SEGMENTED_OPTIONS = computed(() => [
  { label: t('button.preview'), value: 'preview', icon: icons.value.preview },
  { label: t('button.source'), value: 'source', icon: icons.value.code },
])
</script>

<template>
  <Segmented
    v-model:value="mode"
    :options="SEGMENTED_OPTIONS"
    :button-style="{
      fontFamily: 'var(--font-mono)',
    }"
    @change="() => collapsed = false"
  />
</template>
