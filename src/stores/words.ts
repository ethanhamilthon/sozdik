import { defineStore } from 'pinia'
import { useLanguagesStore, type Language } from './languages'
import { computed, onMounted, ref } from 'vue'
import { useGenerateWord, WordSchema } from '@/features/llm/useGenerateWord'
import type { levels, pos } from './consts'
import { v4 as uuidv4 } from 'uuid'

export type WordType = {
  id: string
  target_lang: Language
  user_lang: Language
  in_target: string
  in_user: string
  pos: (typeof pos)[number] | null
  level: (typeof levels)[number]
  transcription: string
  description: string
  createdAt: Date
}

export type SubType = () => void

export const useWordsStore = defineStore('words', () => {
  const allWords = ref<WordType[]>([])
  const subs = ref<SubType[]>([])
  function importData(data: string) {
    const newWords: WordType[] = JSON.parse(data)
    const oldWords = allWords.value
    let wordsToAdd: WordType[] = []

    for (const w of newWords) {
      if (oldWords.find((ow) => w.id === ow.id) === undefined) {
        wordsToAdd = [...wordsToAdd, w]
      }
    }

    allWords.value = [...allWords.value, ...wordsToAdd]
    localStorage.setItem('words', JSON.stringify(allWords.value))
  }
  const langs = useLanguagesStore()
  const currentWords = computed(() => {
    const currTarget = langs.languages[langs.selectedIndex]
    return allWords.value.filter((w) => currTarget.target === w.target_lang)
  })

  // create new word
  const newWord = ref<WordType | null>(null)
  const inputToWord = ref('')
  const bothLoading = ref<{ info: boolean; desc: boolean }>({ info: false, desc: false })
  const isLoading = computed(() => {
    return bothLoading.value.info || bothLoading.value.desc
  })

  const llm = useGenerateWord()
  function load() {
    const data = localStorage.getItem('words')
    allWords.value = data
      ? JSON.parse(data).map((word: WordType) => ({
          ...word,
          createdAt: new Date(word.createdAt),
        }))
      : []

    allWords.value.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
  onMounted(() => {
    load()
  })
  async function addNewWord() {
    bothLoading.value = { info: true, desc: true }
    const currTarget = langs.languages[langs.selectedIndex]
    llm.getWordInfo(inputToWord.value, currTarget.target, currTarget.user).then((info) => {
      const newWordData = WordSchema.parse(JSON.parse(info || '{}'))
      if (newWord.value !== null) {
        newWord.value = {
          ...newWordData,
          id: uuidv4(),
          target_lang: currTarget.target,
          user_lang: currTarget.user,
          pos: newWordData.pos || null,
          description: newWord.value.description || '',
          createdAt: new Date(),
        }
      } else {
        newWord.value = {
          ...newWordData,
          id: uuidv4(),
          target_lang: currTarget.target,
          user_lang: currTarget.user,
          pos: newWordData.pos || null,
          description: '',
          createdAt: new Date(),
        }
      }
      bothLoading.value = { ...bothLoading.value, info: false }
    })
    llm.generateDescription(inputToWord.value, currTarget.target, currTarget.user, (ch) => {
      if (newWord.value !== null) {
        newWord.value = { ...newWord.value, description: newWord.value.description + ch }
      } else {
        newWord.value = {
          id: uuidv4(),
          in_target: '',
          in_user: '',
          level: 'a1',
          transcription: '',
          target_lang: currTarget.target,
          user_lang: currTarget.user,
          pos: null,
          description: ch,
          createdAt: new Date(),
        }
      }
      bothLoading.value = { ...bothLoading.value, desc: false }
    })
  }

  function triggerSubs() {
    for (const s of subs.value) {
      s()
    }
  }

  function addSub(s: SubType) {
    subs.value = [...subs.value, s]
  }

  function handleSave() {
    if (newWord.value !== null) {
      allWords.value = [newWord.value, ...allWords.value]
      localStorage.setItem('words', JSON.stringify(allWords.value))
      newWord.value = null
      inputToWord.value = ''
    }
    triggerSubs()
  }

  function handleDelete(id: string) {
    allWords.value = allWords.value.filter((w) => w.id !== id)
    localStorage.setItem('words', JSON.stringify(allWords.value))
    triggerSubs()
  }

  function setAllWords(words: WordType[]) {
    allWords.value = words
    triggerSubs()
  }
  return {
    addSub,
    setAllWords,
    allWords,
    currentWords,
    addNewWord,
    load,
    newWord,
    inputToWord,
    isLoading,
    handleSave,
    handleDelete,
    importData,
  }
})
