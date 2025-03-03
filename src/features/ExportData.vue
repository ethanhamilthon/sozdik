<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import { PhArrowUp } from '@phosphor-icons/vue'
const downloadJson = (filename: string, data: string) => {
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
const words = useWordsStore()

const handleDownload = () => {
  const jsonData = JSON.stringify(words.allWords)
  downloadJson('szdk.json', jsonData)
}
</script>

<template>
  <div
    @click="handleDownload"
    class="flex-1 py-2 rounded-lg gap-2 border border-neutral-400 hover:bg-neutral-100 transition cursor-pointer flex items-center justify-center"
  >
    <span>Export</span>
    <PhArrowUp :size="16" weight="bold" />
  </div>
</template>
