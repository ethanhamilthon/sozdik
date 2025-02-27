<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'
const props = defineProps<{ title: string; body: string; isAddButton: boolean }>()
</script>

<template>
  <div
    :class="[
      'min-w-96 flex-1 h-36 border border-neutral-300 rounded-xl p-3 cursor-pointer hover:bg-neutral-100 transition max-w-[500px]',
      {
        'flex items-center justify-center gap-3': props.isAddButton,
      },
    ]"
  >
    <span class="text-xl font-bold text-neutral-800" v-if="!props.isAddButton">{{
      props.title
    }}</span>
    <p class="text-sm font-light text-neutral-500" v-if="!props.isAddButton">{{ props.body }}</p>
    <PhPlus :size="18" weight="bold" v-if="props.isAddButton" />
    <span v-if="props.isAddButton" class="text-neutral-800">Add a word</span>
  </div>
</template>

<style scoped></style>
