<script setup lang="ts">
import { useLanguagesStore } from '@/stores/languages'
import { PhTrash, PhEyeClosed, PhEye } from '@phosphor-icons/vue'
import { capitalize } from 'vue'
import { useTokenStore } from '@/stores/token'
import ImportData from '@/features/ImportData.vue'
import ExportData from '@/features/ExportData.vue'
import { useSyncStore } from './sync/useSync'

const langs = useLanguagesStore()
const token = useTokenStore()
const sync = useSyncStore()
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="w-full flex flex-col gap-2">
      <span>Languages</span>
      <span
        v-for="l in langs.languages"
        :key="l.target"
        class="w-full flex items-center justify-between rounded-md border border-neutral-300 px-3 py-2"
        ><span>{{ capitalize(l.target) }}</span>
        <div @click="langs.deleteLanguage(l.target)" class="cursor-pointer">
          <PhTrash :size="16" /></div
      ></span>
    </div>
    <div class="w-full flex flex-col gap-2">
      <span>OpenAI Token</span>

      <div class="relative">
        <input
          v-model="token.token"
          :type="token.show ? 'text' : 'password'"
          class="w-full focus:outline-none rounded-md border border-neutral-300 pl-3 py-2"
          placeholder="your token"
        />
        <div
          @click="token.toggleShow"
          class="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer bg-white p-2 rounded-lg shadow-xl"
        >
          <PhEyeClosed v-if="!token.show" :size="16" />
          <PhEye v-if="token.show" :size="16" />
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-2">
      <span>Sync data</span>
      <div class="w-full flex items-center gap-2">
        <ImportData />
        <ExportData />
      </div>
      <span>Npoint token</span>

      <div class="relative">
        <input
          v-model="sync.id"
          :type="sync.show ? 'text' : 'password'"
          class="w-full focus:outline-none rounded-md border border-neutral-300 pl-3 py-2"
          placeholder="your npoint id"
        />
        <div
          @click="sync.toggleShow"
          class="absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer bg-white p-2 rounded-lg shadow-xl"
        >
          <PhEyeClosed v-if="!sync.show" :size="16" />
          <PhEye v-if="sync.show" :size="16" />
        </div>
      </div>
    </div>
  </div>
</template>
