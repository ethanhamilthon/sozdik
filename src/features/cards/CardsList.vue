<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import WordCard from './WordCard.vue'
import ToolKit from './ToolKit.vue'
import { useLanguagesStore } from '@/stores/languages'
import { useTokenStore } from '@/stores/token'
import { computed } from 'vue'
import { PhCheckCircle } from '@phosphor-icons/vue'
const words = useWordsStore()
const langs = useLanguagesStore()
const token = useTokenStore()
const isAllDone = computed(() => {
  return (
    words.allWords.length !== 0 &&
    langs.languages.length !== 0 &&
    token.token !== ''
  )
})
</script>

<template>
  <main class="w-full px-4 sm:px-12 flex flex-col gap-2 py-6">
    <ToolKit />
    <div v-if="!isAllDone" class="flex flex-col gap-2 mt-16">
      <span class="text-2xl font-bold">Welcome to Sozdik</span>
      <span class="text-2xl font-bold text-emerald-800">To get started:</span>
      <br />
      <div class="w-full flex items-center gap-3">
        <div
          :class="[
            'p-1 rounded-full ',
            {
              'bg-neutral-100': token.token === '',
              'bg-emerald-500': token.token !== '',
            },
          ]"
        >
          <PhCheckCircle
            :class="[
              '',
              {
                'fill-neutral-500': token.token === '',
                'fill-white': token.token !== '',
              },
            ]"
            :size="16"
          />
        </div>
        <span class="text-neutral-500 text-sm">
          Add your OpenAI Token. Click to settings on the top right corner
        </span>
      </div>
      <div class="w-full flex items-center gap-3">
        <div
          :class="[
            'p-1 rounded-full ',
            {
              'bg-neutral-100': langs.languages.length === 0,
              'bg-emerald-500': langs.languages.length !== 0,
            },
          ]"
        >
          <PhCheckCircle
            :class="[
              '',
              {
                'fill-neutral-500': langs.languages.length === 0,
                'fill-white': langs.languages.length !== 0,
              },
            ]"
            :size="16"
          />
        </div>
        <span class="text-neutral-500 text-sm">
          Select your the languages you want to learn
        </span>
      </div>
      <div class="w-full flex items-center gap-3">
        <div
          :class="[
            'p-1 rounded-full ',
            {
              'bg-neutral-100': words.allWords.length === 0,
              'bg-emerald-500': words.allWords.length !== 0,
            },
          ]"
        >
          <PhCheckCircle
            :class="[
              '',
              {
                'fill-neutral-500': words.allWords.length === 0,
                'fill-white': words.allWords.length !== 0,
              },
            ]"
            :size="16"
          />
        </div>
        <span class="text-neutral-500 text-sm">
          Create your first word with AI. Click on the "New word" button
        </span>
      </div>
    </div>
    <div v-if="isAllDone">
      <WordCard
        v-for="(w, index) in words.currentWords"
        :word="w"
        :key="index"
      />
    </div>
  </main>
</template>
