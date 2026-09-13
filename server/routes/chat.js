import { Router } from 'express'
import { loveData } from '../data/loveData.js'

const router = Router()

// POST /api/chat  { message: "..." }
router.post('/chat', async (req, res) => {
  const { message = '' } = req.body
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    return res.json({ reply: getLocalReply(message), stub: true })
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
      return res.json({ reply: getLocalReply(message), stub: true })
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || getLocalReply(message)

    res.json({ reply, stub: false })
  } catch (err) {
    console.error('Chat route error:', err)
    res.json({ reply: getLocalReply(message), stub: true })
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

function getLocalReply(message) {
  const lower = String(message).toLowerCase().trim()
  const { herName, aiContext } = loveData
  const contains = (...words) => words.some(word => lower.includes(word))

  if (/^(hi|hello|hey|হাই|হ্যালো)\b/.test(lower)) {
    return "Hi ❤️ Ask me about his feelings, your favorite memories, or the little things he loves about you."
  }
  if (contains('is he', 'does he', 'do he', 'ভালোবাসে কি', 'কি সে')) {
    return `Yes, he does. He loves your smile, your little acts of care, and the way you understand him even when he does not say much. ❤️`
  }
  if (contains('why', 'love', 'special', 'কেন', 'ভালোবাস')) {
    return `He loves you because your smile can make his whole day better, your care makes him feel special, and you are simply yourself. ❤️`
  }
  if (contains('memory', 'remember', 'favorite', 'moment', 'স্মৃতি')) {
    return `His favorite memory is when you messaged him after he proposed and told him that you loved him too. That message made him feel like the luckiest person in the world. ❤️`
  }
  if (contains('say enough', 'tell me something', 'doesn\'t say', 'বলিস না', 'বলে না')) {
    return `He may not say it enough, but you are not just his girlfriend. You are one of the most important and special people in his life. ❤️`
  }
  if (contains('how did', 'meet', 'beginning', 'কীভাবে দেখা', 'শুরু')) {
    return `Your story began at school. In class eleven, he started liking you and even joined your tuition just to see you, despite already having private tuition for that subject. 😂`
  }
  if (contains('propose', 'confess', 'বলেছিল', 'প্রপোজ')) {
    return `At the end of class eleven, he finally told you how he felt. You first said no, but later your message saying you loved him too became one of his most precious memories. ❤️`
  }
  if (contains('joke', 'laugh', 'funny', 'মজা', 'হাস')) {
    return `One of his favorite funny memories is joining your tuition just to see you, even though he already had a private tutor for that subject. That was a very silly and very sweet beginning. 😂`
  }
  if (contains('who am i', 'আমার পরিচয়')) {
    return `You are ${herName}, the person whose smile, care, and presence turned ordinary moments into special memories for him. ❤️`
  }
  return `He may not have a perfect answer for every question, but one thing is clear: having you in his life gives him many reasons to smile. ${aiContext.messages[1]} ❤️`
}

export default router