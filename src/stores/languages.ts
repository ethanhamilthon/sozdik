import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { addedLanguages } from './consts'

export type Language = (typeof addedLanguages)[number]

export function capitalize(str: string): string {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const useLanguagesStore = defineStore('language', () => {
  const languages = ref<{ target: Language; user: Language }[]>([])
  const selectedIndex = ref(0)

  const addNewLanguage = (lang: { target: Language; user: Language }) => {
    languages.value = [...languages.value, lang]
    localStorage.setItem('language', JSON.stringify(languages.value))
  }

  const deleteLanguage = (lang: string) => {
    languages.value = languages.value.filter((l) => l.target !== lang)
    localStorage.setItem('language', JSON.stringify(languages.value))
  }

  onMounted(() => {
    languages.value = JSON.parse(localStorage.getItem('language') || '[]')
  })

  return { languages, addNewLanguage, selectedIndex, deleteLanguage }
})
