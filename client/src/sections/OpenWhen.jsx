import { useState } from 'react'
import { motion } from 'framer-motion'
import { loveData } from '../loveData.js'

const CARD_STYLES = [
  { emoji: '🌙', accent: 'from-purple-500/30 to-indigo-500/20', border: 'border-purple-300/30', tag: 'for quiet nights', size: 'sm:col-span-2' },
  { emoji: '🌧️', accent: 'from-blue-400/25 to-cyan-400/15', border: 'border-blue-300/30', tag: 'for heavy days', size: '' },
  { emoji: '🔥', accent: 'from-orange-500/30 to-red-400/20', border: 'border-orange-300/30', tag: 'for when you\'re mad', size: '' },
  { emoji: '😂', accent: 'from-yellow-400/30 to-amber-300/20', border: 'border-yellow-300/30', tag: 'for a good laugh', size: 'sm:col-span-2' },
  { emoji: '💫', accent: 'from-pink-400/30 to-rose-300/20', border: 'border-pink-300/30', tag: 'a gentle reminder', size: '' },
  { emoji: '🌙', accent: 'from-teal-400/25 to-emerald-400/15', border: 'border-teal-300/30', tag: 'before you sleep', size: '' },
]

export default function OpenWhen({ onNext }) {
  const letters = loveData.openWhen
  const [openedIds, setOpenedIds] = useState([])

  const toggle = (id) => {
    setOpenedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="love-shell">
      <section id="open-when" className="love-section">
        <p className="section-kicker">Letters sealed with love</p>
        <h2 className="section-title">Open When...</h2>
        <p className="section-subtitle mb-12">
          Each envelope holds something just for you.<br />
          Open one whenever you need it most.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl w-full mt-2">
          {letters.map((letter, i) => {
            const isOpen = openedIds.includes(letter.id)
            const style = CARD_STYLES[i % CARD_STYLES.length]
            return (
              <motion.div
                key={letter.id}
                className={style.size}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <motion.button
                  onClick={() => toggle(letter.id)}
                  className={`w-full rounded-3xl p-6 text-left border bg-gradient-to-br ${style.accent} ${style.border} backdrop-blur-md transition-all duration-300`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{isOpen ? '💌' : style.emoji}</span>
                    <span className="text-xs text-white/40 border border-white/20 rounded-full px-2 py-0.5 font-body">
                      {isOpen ? 'close' : 'open'}
                    </span>
                  </div>
                  <p className="section-kicker mt-4 mb-1">{style.tag}</p>
                  <p className="font-display text-xl text-white font-bold leading-snug">{letter.label}</p>
                </motion.button>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-2 rounded-3xl p-5 border bg-gradient-to-br ${style.accent} ${style.border} backdrop-blur-md`}
                  >
                    <p className="font-body text-sm text-white/90 leading-relaxed whitespace-pre-line">
                      {letter.message}
                    </p>
                  </motion.div>
                )}
              </motion.div>
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
