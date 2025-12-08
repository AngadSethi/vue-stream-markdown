<script setup lang="ts">
const props = withDefaults(defineProps<{
  getAlign?: (index: number) => 'left' | 'center' | 'right'
  headers?: unknown[]
  rows?: Array<{ children: unknown[] }>
}>(), {})

function getAlign(index: number) {
  return props.getAlign?.(index) || 'left'
}
</script>

<template>
  <table data-stream-markdown="table">
    <thead data-stream-markdown="table-header">
      <tr>
        <th
          v-for="(cell, index) in headers"
          :key="`header-${index}`"
          :style="{
            textAlign: getAlign(index),
          }"
        >
          <slot name="header-cell" v-bind="{ cell, cellIndex: index }" />
        </th>
      </tr>
    </thead>
    <tbody data-stream-markdown="table-body">
      <tr v-for="(row, rowIndex) in rows" :key="`${row}-${rowIndex}`">
        <td
          v-for="(cell, cellIndex) in row.children"
          :key="cellIndex"
          :style="{
            textAlign: getAlign(cellIndex),
          }"
        >
          <slot name="body-cell" v-bind="{ cell, rowIndex, cellIndex }" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
