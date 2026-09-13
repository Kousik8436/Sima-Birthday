import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { loveData } from '../loveData.js'

const ROTATIONS = [-6, 4, -3, 7, -5, 3]

export default function Moments({ onNext }) {
  const moments = loveData.moments
  const [selected, setSelected] = useState(null)

  return (
    <div className="love-shell">
      <section id="moments" className="love-section">
        <p className="section-kicker">Frozen in time</p>
        <h2 className="section-title">Moments I Wish<br />I Could Relive</h2>
        <p className="section-subtitle mb-14">Tap a photo to read the story behind it.</p>

        <div className="flex flex-wrap justify-center gap-10 max-w-4xl mt-4">
          {moments.map((m, i) => (
            <motion.button
              key={m.id}
              onClick={() => setSelected(m)}
              className="bg-white p-3 pb-10 shadow-2xl w-44 md:w-52 cursor-pointer"
              style={{ rotate: `${ROTATIONS[i % ROTATIONS.length]}deg`, borderRadius: '4px' }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={m.photo} alt={m.category} className="w-full h-full object-cover" />
              </div>
              <p className="font-display text-base text-gray-700 mt-3 text-center font-semibold">{m.category}</p>
            </motion.button>
          ))}
        </div>

        <button onClick={onNext} className="next-button">
          <span className="next-button__label">There's more ✨</span>
          <span className="next-button__arrow">↓</span>
        </button>

        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              style={{ background: 'rgba(80,0,30,0.85)', backdropFilter: 'blur(8px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                className="glass-panel rounded-3xl p-6 max-w-sm w-full text-center"
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="rounded-2xl overflow-hidden mb-4">
                  <img src={selected.photo} alt={selected.category} className="w-full h-52 object-cover" />
                </div>
                <p className="section-kicker mb-1">{selected.category}</p>
                <p className="font-body text-sm text-white/80 leading-relaxed">{selected.story}</p>
                <button onClick={() => setSelected(null)} className="mt-5 text-xs text-white/40 hover:text-white/70 transition-colors">
                  close ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
