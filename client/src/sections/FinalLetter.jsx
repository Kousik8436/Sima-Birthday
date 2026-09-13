import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalLetter({ onNext }) {
  const [letter, setLetter] = useState('')

  useEffect(() => {
    fetch('/api/messages').then(r => r.json()).then(d => setLetter(d.finalLetter)).catch(() => {})
  }, [])

  return (
    <div className="love-shell">
      <section id="final-letter" className="love-section justify-center text-center">
        <motion.p
          className="section-kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          One Last Thing
        </motion.p>

        <motion.div
          className="glass-panel rounded-3xl px-8 py-10 max-w-xl mt-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <p className="font-display text-lg md:text-xl text-white/90 leading-relaxed whitespace-pre-line">
            {letter}
          </p>
        </motion.div>

        <motion.h2
          className="section-title mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          Happy Birthday,<br />Hippu ❤️
        </motion.h2>

        <motion.p
          className="font-display italic text-white/60 text-xl mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          Forever yours.
        </motion.p>

        <button onClick={onNext} className="next-button">
          <span className="next-button__label">One last surprise... 🎁</span>
          <span className="next-button__arrow">↓</span>
        </button>
      </section>
    </div>
  )
}
