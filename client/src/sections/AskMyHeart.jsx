import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { loveData } from '../loveData.js'

function getReply(message) {
  const lower = message.toLowerCase()
  const { herName, aiContext } = loveData
  const contains = (...words) => words.some(word => lower.includes(word))

  if (/^(hi|hello|hey|হাই|হ্যালো)\b/.test(lower.trim())) {
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

export default function AskMyHeart({ onNext }) {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi ❤️ I'm a tiny AI built from all the things he wanted to tell you. Ask me anything." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 700))
    const reply = getReply(text)
    setMessages(prev => [...prev, { role: 'bot', text: reply }])
    setLoading(false)
  }

  const suggestions = [
    'Why does he love me?',
    "What's his favorite memory with me?",
    "Tell me something he doesn't say enough."
  ]

  return (
    <div className="love-shell">
      <section id="ask-my-heart" className="love-section">
        <p className="section-kicker">Powered by his feelings</p>
        <h2 className="section-title">A Little Piece<br />of Me 🤍</h2>
        <p className="section-subtitle mb-10">A tiny AI assembled from everything he wanted you to know.</p>

        <motion.div
          className="w-full max-w-lg glass-panel rounded-3xl flex flex-col overflow-hidden"
          style={{ height: '30rem' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm font-body leading-relaxed ${
                  m.role === 'bot'
                    ? 'bg-white/15 text-white self-start'
                    : 'self-end text-white font-semibold'
                }`}
                style={m.role === 'user' ? { background: 'linear-gradient(135deg,#ff4f7b,#ff8fa3)' } : {}}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[60%] px-4 py-3 rounded-2xl text-sm font-body bg-white/10 text-white/50 self-start">
                typing…
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="text-xs text-white/60 border border-white/20 rounded-full px-3 py-1 hover:bg-white/15 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-2 p-4 border-t border-white/15">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask something…"
              className="flex-1 bg-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-white/30 transition-colors"
            />
            <button
              onClick={send}
              disabled={loading}
              className="love-button px-5 py-2 text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </motion.div>

        <button onClick={onNext} className="text-link-button">
          There's more... →
        </button>
      </section>
    </div>
  )
}
