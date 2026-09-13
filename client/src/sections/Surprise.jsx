import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Surprise() {
  const [surprise, setSurprise] = useState(null)
  const [phase, setPhase] = useState('locked') // locked -> counting -> revealed
  const [count, setCount] = useState(3)

  useEffect(() => {
    fetch('/api/surprise')
      .then((res) => res.json())
      .then(setSurprise)
      .catch(() => setSurprise(null))
  }, [])

  const startCountdown = () => {
    setPhase('counting')
    setCount(3)
  }

  useEffect(() => {
    if (phase !== 'counting') return
    if (count === 0) {
      setPhase('revealed')
      return
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 900)
    return () => clearTimeout(timer)
  }, [phase, count])

  return (
    <section id="surprise" className="min-h-screen px-6 py-24 flex flex-col items-center justify-center text-center">
      {phase === 'locked' && (
        <motion.button
          onClick={startCountdown}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-6xl">🎁</span>
          <span className="font-display text-2xl text-blush">Your Final Surprise</span>
          <span className="font-body text-xs text-white/40">tap to open</span>
        </motion.button>
      )}

      {phase === 'counting' && (
        <motion.div
          key={count}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-8xl text-blush"
        >
          {count}
        </motion.div>
      )}

      <AnimatePresence>
        {phase === 'revealed' && surprise && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-lg"
          >
            {surprise.type === 'video' ? (
              <video
                src="/video/Love.mp4"
                controls
                className="rounded-xl w-full"
              />
            ) : (
              <p className="font-body text-base text-white/80 whitespace-pre-line leading-relaxed">
                {surprise.content}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}