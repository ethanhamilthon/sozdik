<script setup lang="ts">
import { PhFadersHorizontal, PhPlus } from '@phosphor-icons/vue'
import { ref } from 'vue'
const languages = [
  {
    target: 'english',
    display: 'English',
    system: 'russian',
  },
  {
    target: 'german',
    display: 'German',
    system: 'english',
  },
]
const selected = ref(0)
</script>

<template>
  <header class="w-full px-12 py-4 border-b border-b-neutral-500 flex items-center justify-between">
    <span>Sozdik</span>
    <div class="flex items-center">
      <span
        v-for="(l, index) in languages"
        @click="selected = index"
        :key="index"
        :class="[
          'px-4 py-2 border-b-2 border-b-emerald-500 cursor-pointer transition',
          {
            'border-b-white text-neutral-400': selected != index,
          },
        ]"
        >{{ l.display }}</span
      >
      <span
        class="px-4 py-2 bg-neutral-100 text-neutral-500 flex items-center gap-2 rounded-lg ml-6 cursor-pointer"
        ><PhPlus :size="16" weight="bold" /><span>Add language</span></span
      >
    </div>
    <div class="p-3 rounded-lg bg-neutral-200 cursor-pointer">
      <PhFadersHorizontal class="fill-neutral-800" :size="24" />
    </div>
  </header>
</template>
