<script setup lang="ts">
import { languageCodes } from '@/stores/consts'
import type { WordType } from '@/stores/words'
import { computed } from 'vue'
import { PhSpeakerSimpleHigh } from '@phosphor-icons/vue'

const props = defineProps<{
  word: WordType
}>()
const renderedHTML = computed(() => {
  return props.word.description.replace(/\n/g, '<br>')
})
function sound() {
  const utterance = new SpeechSynthesisUtterance(props.word.in_target)
  utterance.lang = languageCodes.find((c) => c.language === props.word.target_lang)?.code || 'en-US'
  window.speechSynthesis.speak(utterance)
}
</script>

<template>
  <div class="w-full flex flex-wrap gap-3">
    <span class="text-sm text-white px-3 py-1 bg-emerald-700 rounded-md">{{
      props.word.in_user
    }}</span>
    <span class="text-sm text-white px-3 py-1 bg-neutral-500 rounded-md">{{
      props.word.level
    }}</span>
    <span class="text-sm text-white px-3 py-1 bg-neutral-500 rounded-md">{{
      props.word.pos || 'no pos'
    }}</span>
    <span
      @click="sound"
      class="text-sm flex items-center gap-2 text-white px-3 py-1 bg-neutral-500 rounded-md cursor-pointer"
      ><PhSpeakerSimpleHigh :size="16" />{{ props.word.transcription }}</span
    >
  </div>
  <p class="text-neutral-500" v-html="renderedHTML"></p>
</template>
