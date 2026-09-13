import { Router } from 'express'
import { loveData } from '../data/loveData.js'

const router = Router()

// POST /api/chat  { message: "..." }
router.post('/chat', async (req, res) => {
  const { message = '' } = req.body
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.json({ reply: pickRandom(loveData.aiContext.messages), stub: true })
  }

  try {
    const systemPrompt = buildSystemPrompt(loveData)

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'groq/compound-mini',
        max_tokens: 120,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Groq API error:', response.status, errText)
      return res.json({ reply: pickRandom(loveData.aiContext.messages), stub: true })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || pickRandom(loveData.aiContext.messages)

    res.json({ reply, stub: false })
  } catch (err) {
    console.error('Chat route error:', err)
    res.json({ reply: pickRandom(loveData.aiContext.messages), stub: true })
  }
})

function buildSystemPrompt(data) {
  const { herName, aiContext } = data
  return `You are "A Little Piece of Me" — a tiny AI built from a boyfriend's memories and feelings for ${herName}.
Rules:
- ALWAYS reply with a non-empty content field. Never leave it blank.
- Reply in 2 sentences MAX. Be warm, personal, concise.
- Match the language the user writes in (Bengali or English).
- Never invent details not listed below. If you don't have it, say so warmly in one sentence.
- Never claim to be him directly.

Memories: ${aiContext.memories.join(' | ')}
Things he loves: ${aiContext.thingsHeLoves.join(' | ')}
Favorite moments: ${aiContext.favoriteMoments.join(' | ')}
Inside jokes: ${aiContext.insideJokes.join(' | ')}
Messages: ${aiContext.messages.join(' | ')}`
}

function pickRandom(arr) {
  if (!arr || arr.length === 0) return "I don't have an answer for that yet — add more to aiContext!"
  return arr[Math.floor(Math.random() * arr.length)]
}

export default router