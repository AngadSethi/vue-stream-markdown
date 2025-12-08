<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = withDefaults(defineProps<{
  title?: string
  closable?: boolean
  zIndex?: number
  getContainer?: () => HTMLElement | undefined
}>(), {
  zIndex: 1000,
})

const slots = useSlots()

const open = defineModel<boolean>('open', { required: false, default: false })

const container = props.getContainer ? props.getContainer() || 'body' : 'body'

const modalStyle = computed(() => ({
  zIndex: props.zIndex,
}))
const showHeader = computed(() => !!props.title || props.closable || !!slots.title || !!slots.extra)
</script>

<template>
  <teleport :to="container">
    <Transition name="modal" appear>
      <div v-if="open" data-stream-markdown="modal" :style="modalStyle">
        <header v-if="showHeader" data-stream-markdown="modal-header">
          <slot name="title">
            {{ title }}
          </slot>
          <slot name="header-center">
            <div />
          </slot>
          <div data-stream-markdown="modal-actions">
            <slot name="actions" />
          </div>
        </header>
        <main data-stream-markdown="modal-body">
          <slot />
        </main>
      </div>
    </Transition>
  </teleport>
</template>
