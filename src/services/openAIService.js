// openAIService.js

import axios from 'axios'

const OPENAI_API_KEY = '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';

const openAI = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'OpenAI-Beta': 'assistants=v1'
  }
})

export const generateText = async (prompt) => {
  try {
    const response = await openAI.post(`/completions`, {
      model: 'gpt-3.5-turbo',
      prompt: prompt,
      max_tokens: 150 // O el número de tokens que desees
    })
    return response.data.choices[0].text
  } catch (error) {
    console.error('Error al generar texto con OpenAI:', error)
    throw error
  }
}
