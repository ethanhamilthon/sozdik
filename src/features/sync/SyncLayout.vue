<script setup lang="ts">
import { onMounted } from 'vue'
import { useSyncStore } from './useSync'

const sync = useSyncStore()
onMounted(() => {
  sync.load()
})
</script>
<template>
  <slot></slot>
</template>
