import { useLanguagesStore, type LanguageType } from '@/stores/languages'
import { useWordsStore, type WordType } from '@/stores/words'
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { Npoint } from './JsonBin'

export const useSyncStore = defineStore('sync', () => {
  const id = ref('')
  const words = useWordsStore()
  const langs = useLanguagesStore()
  const show = ref(false)
  function toggleShow() {
    show.value = !show.value
  }

  async function sync() {
    if (id.value === '') {
      console.log('there is no id for npoint to sync')
      return
    }
    const npoint = new Npoint(id.value)
    const data = await npoint.getData()
    if ('setup' in data && data.setup) {
      const syncWords: WordType[] = data.words
      for (const w of syncWords) {
        if (words.allWords.find((aw) => aw.id === w.id) === undefined) {
          words.allWords = [...words.allWords, w]
        }
      }
      const syncLangs: LanguageType[] = data.languages
      for (const sl of syncLangs) {
        if (langs.languages.find((l) => l.target === sl.target) === undefined) {
          langs.languages = [...langs.languages, sl]
        }
      }
    } else {
      await update()
    }
  }

  async function update() {
    if (id.value === '') {
      console.log('there is no id for npoint to update')
      return
    }
    const npoint = new Npoint(id.value)
    await npoint.setData(
      JSON.stringify({
        setup: true,
        words: words.allWords,
        languages: langs.languages,
      }),
    )
  }

  async function load() {
    const ls = localStorage.getItem('npoint_id')
    id.value = ls || ''
    if (ls !== null) {
      sync()
    }
  }

  async function watcher() {
    console.log('Running watcher')
    try {
      await sync()
      await update()
    } catch (e) {
      console.log(e)
    }
  }

  watch(id, sync)
  watch(id, (newID) => {
    localStorage.setItem('npoint_id', newID)
  })
  words.addSub(update)
  langs.addSub(update)

  return { id, load, sync, update, show, toggleShow }
})
