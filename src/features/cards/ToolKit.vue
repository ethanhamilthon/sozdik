<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import AddWord from './AddWord.vue'
const words = useWordsStore()
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <span v-if="words.currentWords.length !== 0"
      >{{ words.currentWords.length }} words</span
    ><span v-else>No words yet</span>
    <AddWord />
  </div>
</template>
