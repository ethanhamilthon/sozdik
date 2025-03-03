<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'
import ModalWindow from '@/features/ModalWindow.vue'
import { ref } from 'vue'
import { useWordsStore } from '@/stores/words'
import WordInfo from './WordInfo.vue'
const isOpen = ref(false)
const words = useWordsStore()
function handleClose() {
  if (words.newWord !== null) {
    words.handleSave()
  }
  isOpen.value = false
}
async function handleButton() {
  if (words.newWord !== null) {
    words.handleSave()
    isOpen.value = false
  } else {
    await words.addNewWord()
  }
}
</script>

<template>
  <div
    @click="isOpen = !isOpen"
    class="flex items-center gap-3 bg-emerald-900 rounded-md px-4 py-2 cursor-pointer"
  >
    <PhPlus :size="16" weight="bold" class="fill-white" />
    <span class="text-white">New word</span>
  </div>
  <ModalWindow title="Create new word" :is-open="isOpen" @toggle="handleClose">
    <div class="w-full flex items-center gap-4">
      <input
        v-model="words.inputToWord"
        type="text"
        placeholder="your word"
        class="flex-1 pl-3 py-2 focus:outline-none border rounded-lg border-neutral-500"
      />
      <button
        :disabled="words.isLoading"
        @click="handleButton"
        class="px-4 py-2 rounded-lg bg-emerald-700 text-white"
      >
        {{ words.isLoading ? 'Loading' : words.newWord !== null ? 'Save' : 'Add' }}
      </button>
    </div>
    <WordInfo v-if="words.newWord !== null" :word="words.newWord!" />
  </ModalWindow>
</template>
