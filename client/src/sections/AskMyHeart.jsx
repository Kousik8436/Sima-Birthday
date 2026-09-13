import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "I couldn't reach my thoughts just now — try again?" }])
    } finally {
      setLoading(false)
    }
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
