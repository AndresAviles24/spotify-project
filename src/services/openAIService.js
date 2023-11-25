// openAIService.js

import axios from 'axios'

const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer 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`
  }
})

export const generateText = async (prompt, engine = 'text-davinci-003') => {
  try {
    const response = await openAI.post(`/engines/${engine}/completions`, {
      prompt: prompt,
      max_tokens: 150 // O el número de tokens que desees
    })
    return response.data.choices[0].text
  } catch (error) {
    console.error('Error al generar texto con OpenAI:', error)
    throw error
  }
}
