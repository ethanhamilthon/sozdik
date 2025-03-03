<script setup lang="ts">
import { ref } from 'vue'
import ModalWindow from '../ModalWindow.vue'
import { PhPlus } from '@phosphor-icons/vue'
import { addedLanguages } from '@/stores/consts'
import { useLanguagesStore, type Language } from '@/stores/languages'
import { computed } from 'vue'
import { capitalize } from 'vue'
const langs = useLanguagesStore()
const notLearningLanguages = computed(() => {
  return addedLanguages.filter((alangs) => {
    return !langs.languages.map((l) => l.target).includes(alangs)
  })
})
const selectedTarget = ref<Language>(notLearningLanguages.value[0])
const selectedUser = ref<Language>(notLearningLanguages.value[0])
const isOpen = ref(false)
</script>

<template>
  <span
    @click="isOpen = !isOpen"
    class="px-4 py-2 bg-neutral-100 text-sm text-neutral-500 flex items-center gap-2 rounded-lg cursor-pointer"
    ><span v-if="langs.languages.length == 0">Add first language</span
    ><PhPlus :size="16" weight="bold"
  /></span>
  <ModalWindow title="New Language" :is-open="isOpen" @toggle="isOpen = !isOpen">
    <span>Which language do you wanna learn?</span>
    <select v-model="selectedTarget" class="p-2 border border-neutral-300 rounded-lg" name="" id="">
      <option v-for="l in notLearningLanguages" :key="l" :value="l">{{ capitalize(l) }}</option>
    </select>
    <span>Your native language?</span>
    <select v-model="selectedUser" class="p-2 border border-neutral-300 rounded-lg" name="" id="">
      <option v-for="l in addedLanguages" :key="l" :value="l">{{ capitalize(l) }}</option>
    </select>
    <div class="flex w-full items-center justify-end">
      <button
        class="bg-emerald-700 text-white px-4 py-2 rounded-md"
        @click="
          () => {
            langs.addNewLanguage({ target: selectedTarget, user: selectedUser })
            isOpen = false
          }
        "
      >
        Add
      </button>
    </div>
  </ModalWindow>
</template>
