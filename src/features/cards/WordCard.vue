<script setup lang="ts">
import { useWordsStore, type WordType } from '@/stores/words'
import ModalWindow from '../ModalWindow.vue'
import { ref } from 'vue'

import WordInfo from './WordInfo.vue'
const { word } = defineProps<{ word: WordType }>()
const isOpen = ref(false)
const words = useWordsStore()
</script>

<template>
  <div
    @click="isOpen = !isOpen"
    :class="[
      'w-full border border-neutral-300 rounded-lg p-3 cursor-pointer hover:bg-neutral-100 transition',
    ]"
  >
    <span class="text-xl font-bold text-neutral-800 flex items-center gap-3"
      ><span>{{ word.in_target }}</span>
      <span class="text-xs font-light text-neutral-400">{{ word.in_user }}</span></span
    >
  </div>
  <ModalWindow :title="word.in_target" :is-open="isOpen" @toggle="isOpen = !isOpen">
    <WordInfo :word="word" />
    <div class="w-full flex items-center justify-end">
      <button
        @click="
          () => {
            words.handleDelete(word.id)
            isOpen = false
          }
        "
        class="px-4 py-2 bg-red-700 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  </ModalWindow>
</template>
