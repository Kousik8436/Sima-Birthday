import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function WhySpecial({ onNext }) {
  const [cards, setCards] = useState([])
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    fetch('/api/memories').then(r => r.json()).then(setCards).catch(() => setCards([]))
  }, [])

  return (
    <div className="love-shell">
      <section id="why-special" className="love-section">
        <p className="section-kicker">Written from the heart</p>
        <h2 className="section-title">Why You Are<br />Special To Me</h2>
        <p className="section-subtitle mb-12">Each one of these is a piece of how I see you.</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl w-full mt-4">
          {cards.map((card, i) => {
            const isOpen = openId === card.id
            return (
              <motion.button
                key={card.id}
                onClick={() => setOpenId(isOpen ? null : card.id)}
                className="text-left rounded-3xl overflow-hidden glass-panel hover:scale-[1.02] transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {card.photo && (
                  <div className="w-full h-44 overflow-hidden">
                    <img src={card.photo} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <span className="section-kicker">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-2xl text-white mt-1 font-bold">{card.title}</h3>
                  {isOpen ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="font-body text-sm text-white/80 mt-3 leading-relaxed"
                    >
                      {card.message}
                    </motion.p>
                  ) : (
                    <p className="font-body text-xs text-white/50 mt-2">Tap to read ❤️</p>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        <button onClick={onNext} className="next-button">
          <span className="next-button__label">There's more ✨</span>
          <span className="next-button__arrow">↓</span>
        </button>
      </section>
    </div>
  )
}
