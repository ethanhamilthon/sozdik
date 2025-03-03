<script setup lang="ts">
import { PhFadersHorizontal } from '@phosphor-icons/vue'
import { ref } from 'vue'
import ModalWindow from '../ModalWindow.vue'
import NewLanguage from './NewLanguage.vue'
import { useLanguagesStore } from '@/stores/languages'
import { capitalize } from 'vue'
import SettingPanel from '../SettingPanel.vue'
const langs = useLanguagesStore()
const isOpen = ref(false)
</script>

<template>
  <header
    class="w-full px-4 sm:px-12 py-4 border-b border-b-neutral-500 flex items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <span
        v-for="(l, index) in langs.languages"
        @click="langs.selectedIndex = index"
        :key="index"
        :class="[
          'px-4 py-2 border-b-2 border-b-emerald-500 cursor-pointer transition text-sm',
          {
            'border-b-white text-neutral-400': langs.selectedIndex != index,
          },
        ]"
        >{{ capitalize(l.target) }}</span
      >
      <NewLanguage />
    </div>

    <div class="p-2 rounded-lg bg-neutral-200 cursor-pointer" @click="isOpen = !isOpen">
      <PhFadersHorizontal class="fill-neutral-800" :size="18" />
    </div>
    <ModalWindow title="Settings" :is-open="isOpen" @toggle="isOpen = !isOpen">
      <SettingPanel />
    </ModalWindow>
  </header>
</template>
