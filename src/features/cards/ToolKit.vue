<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import AddWord from './AddWord.vue'
import { useGemini } from '../llm/useGemini'
const words = useWordsStore()
const gemini = useGemini()
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <span @click="gemini.getInfo">{{ words.currentWords.length }} words</span><AddWord />
  </div>
</template>
