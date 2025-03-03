<script setup lang="ts">
import { useWordsStore } from '@/stores/words'
import { PhArrowDown } from '@phosphor-icons/vue'
import { ref } from 'vue'

const fileContent = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const words = useWordsStore()

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return

  const file = input.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      fileContent.value = reader.result
      words.importData(reader.result)
      console.log('Содержимое файла:', reader.result)
    }
  }

  reader.readAsText(file)
}

const triggerFileInput = () => {
  fileInput.value?.click()
}
</script>

<template>
  <input
    ref="fileInput"
    type="file"
    accept="application/json"
    @change="handleFileUpload"
    style="display: none"
  />
  <div
    @click="triggerFileInput"
    class="flex-1 py-2 rounded-lg gap-2 border border-neutral-400 hover:bg-neutral-100 transition cursor-pointer flex items-center justify-center"
  >
    <span>Import</span>

    <PhArrowDown :size="16" weight="bold" />
  </div>
</template>
