import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { addedLanguages } from './consts'
import type { SubType } from './words'

export type Language = (typeof addedLanguages)[number]

export function capitalize(str: string): string {
  if (str.length === 0) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export type LanguageType = {
  target: Language
  user: Language
}

export const useLanguagesStore = defineStore('language', () => {
  const languages = ref<LanguageType[]>([])
  const selectedIndex = ref(0)
  const subs = ref<SubType[]>([])

  const addNewLanguage = (lang: LanguageType) => {
    languages.value = [...languages.value, lang]

    localStorage.setItem('language', JSON.stringify(languages.value))
    triggerSubs()
  }

  const deleteLanguage = (lang: string) => {
    languages.value = languages.value.filter((l) => l.target !== lang)
    localStorage.setItem('language', JSON.stringify(languages.value))
    triggerSubs()
  }

  onMounted(() => {
    languages.value = JSON.parse(localStorage.getItem('language') || '[]')
  })

  function triggerSubs() {
    for (const s of subs.value) {
      s()
    }
  }

  function addSub(s: SubType) {
    subs.value = [...subs.value, s]
  }

  return { addSub, triggerSubs, languages, addNewLanguage, selectedIndex, deleteLanguage }
})
