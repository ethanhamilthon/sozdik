import OpenAI from 'openai'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'
import type { Language } from '@/stores/languages'
import { levels, pos } from '@/stores/consts'
import { useTokenStore } from '@/stores/token'

export const WordSchema = z.object({
  in_target: z.string(),
  in_user: z.string(),
  transcription: z.string(),
  pos: z.enum(pos).optional(),
  level: z.enum(levels),
})

export const useGenerateWord = () => {
  const token = useTokenStore()
  const getWordInfo = async (
    word: string,
    target: Language,
    user: Language,
  ) => {
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: token.token,
    })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-2024-11-20',
      messages: [
        {
          role: 'developer',
          content:
            'You are AI language learning assistant. User will send you a word or phrase, language that use learning (target) and users native language (user). You have to give info about the word or phrase in JSON. You have to return the word/phrase in target language, user language, pos if it is single word, its level and transcription in IPA.',
        },
        {
          role: 'user',
          content: `
          target language: ${target},
          user language: ${user},
          word or phrase: ${word}
          `,
        },
      ],
      store: true,
      response_format: zodResponseFormat(WordSchema, target),
    })
    const message = completion.choices[0].message
    const ui = message.content
    return ui
  }

  const generateDescription = async (
    word: string,
    target: Language,
    user: Language,
    callback: (chunk: string) => void,
  ) => {
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: token.token,
    })
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-2024-11-20',
      messages: [
        {
          role: 'developer',
          content:
            'You are AI language learning assistant. User will send you a word or phrase, language that use learning (target) and users native language (user). You have to explain the word/phrase in user language. If the word/phrase is not in target language, then translate it to target language. You have to be short but answer should contain all importants things. You have to create 3 examples with translation in both languages. Give answer without markdown',
        },
        {
          role: 'user',
          content: `
            target language: ${target},
            user language: ${user},
            word or phrase: ${word}
            `,
        },
      ],
      stream: true,
    })
    for await (const chunk of stream) {
      callback(chunk.choices[0]?.delta?.content || '')
    }
  }

  return { getWordInfo, generateDescription }
}
