import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// stage 0: locked box teaser
// stage 1: countdown 3 → 2 → 1
// stage 2: video reveal

export default function FinalSurprise() {
  const [stage, setStage] = useState(0)
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (stage !== 1) return
    if (count === 0) { setStage(2); return }
    const t = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [stage, count])

  return (
    <section id="final-surprise" className="min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <motion.h2
        className="font-display text-3xl md:text-5xl text-blush mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Your Final Surprise 🎁
      </motion.h2>

      <motion.p
        className="font-body text-sm text-white/50 mb-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        I saved the best for last.
      </motion.p>

      {/* stage 0 — locked box */}
      {stage === 0 && (
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            className="text-7xl"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎁
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStage(1)}
            className="px-8 py-3 rounded-full border border-blush/60 text-blush font-body tracking-wide bg-white/5 hover:bg-white/10 transition-colors"
          >
            Open Your Surprise →
          </motion.button>
        </motion.div>
      )}

      {/* stage 1 — countdown */}
      {stage === 1 && (
        <AnimatePresence mode="wait">
          <motion.p
            key={count}
            className="font-display text-8xl md:text-9xl text-blush"
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            {count === 0 ? '❤️' : count}
          </motion.p>
        </AnimatePresence>
      )}

      {/* stage 2 — video */}
      {stage === 2 && (
        <motion.div
          className="flex flex-col items-center gap-6 w-full max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="font-display text-xl md:text-2xl text-lilac">
            This is for you… ❤️
          </p>
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <video
              src="/video/Love.mp4"
              autoPlay
              controls
              className="w-full"
              poster="/photos/hero.jpeg"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
