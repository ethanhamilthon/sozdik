<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import AddWord from './AddWord.vue'
const words = useWordsStore()
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <span>{{ words.currentWords.length }} words</span><AddWord />
  </div>
</template>
