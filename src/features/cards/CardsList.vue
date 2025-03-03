<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import WordCard from './WordCard.vue'
import ToolKit from './ToolKit.vue'
const words = useWordsStore()
</script>

<template>
  <main class="w-full px-4 sm:px-12 flex flex-col gap-2 py-6">
    <ToolKit />

    <WordCard v-for="(w, index) in words.currentWords" :word="w" :key="index" />
  </main>
</template>
