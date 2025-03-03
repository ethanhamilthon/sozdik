import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')
  const show = ref(false)
  function load() {
    token.value = localStorage.getItem('OPENAI_TOKEN') || ''
  }
  onMounted(() => {
    load()
  })
  watch(token, (t) => {
    localStorage.setItem('OPENAI_TOKEN', t || '')
  })

  function toggleShow() {
    show.value = !show.value
  }

  return { token, show, toggleShow }
})
