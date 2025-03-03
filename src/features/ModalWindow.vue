<script setup lang="ts">
import { PhX } from '@phosphor-icons/vue'

const props = defineProps<{ title: string; isOpen: boolean }>()
const emit = defineEmits<{
  toggle: []
}>()
</script>

<template>
  <div
    v-if="props.isOpen"
    @click="emit('toggle')"
    class="fixed inset-0 flex transition justify-center items-center z-20 backdrop-blur-md bg-black/50"
  >
    <div
      @click.stop
      class="w-5/6 sm:min-w-96 sm:w-auto sm:max-w-1/2 bg-white p-4 rounded-xl border border-neutral-400 flex flex-col gap-4"
    >
      <div class="w-full flex items-center justify-between">
        <span>{{ props.title }}</span>
        <PhX @click="emit('toggle')" class="cursor-pointer" :size="18" />
      </div>
      <slot></slot>
    </div>
  </div>
</template>
