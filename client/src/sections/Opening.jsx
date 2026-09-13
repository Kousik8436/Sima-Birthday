import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StarField() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const alpha = 0.3 + 0.7 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,220,235,${alpha})`
        ctx.fill()
      })
      t++
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/20 select-none"
          style={{
            left: `${5 + i * 5.5}%`,
            fontSize: `${0.7 + (i % 4) * 0.4}rem`,
            bottom: '-5%'
          }}
          animate={{ y: [0, -(window.innerHeight + 100)], opacity: [0, 0.6, 0] }}
          transition={{
            duration: 9 + (i % 5) * 2,
            delay: i * 0.7,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}

const lines = [
  { text: "Close your eyes for a second...", delay: 0 },
  { text: "Think of someone who makes your world feel whole.", delay: 3200 },
  { text: "Now open them.", delay: 6400 },
]

export default function Opening({ onEnter }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showCard, setShowCard] = useState(false)

  useEffect(() => {
    lines.forEach((line, i) => {
      setTimeout(() => setLineIndex(i), line.delay)
    })
    setTimeout(() => setShowCard(true), 8800)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #3d0020 0%, #1a0010 45%, #0a0008 100%)'
      }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 1.2 }}
    >
      <StarField />
      <FloatingHearts />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,60,100,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(200,80,255,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center max-w-2xl">

        {/* Cinematic text lines */}
        <AnimatePresence mode="wait">
          {!showCard && (
            <motion.div key={lineIndex} className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 1 }}>
              <p className="font-display text-2xl md:text-4xl text-white/90 leading-snug font-medium italic">
                {lines[lineIndex].text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main card */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 rounded-3xl px-8 py-10 md:px-14 md:py-14"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 0 80px rgba(255,60,100,0.25), 0 30px 80px rgba(0,0,0,0.5)',
                backdropFilter: 'blur(24px)'
              }}
            >
              {/* Pulsing heart */}
              <motion.div
                animate={{ scale: [1, 1.18, 1], filter: ['drop-shadow(0 0 8px #ff4d6d)', 'drop-shadow(0 0 24px #ff4d6d)', 'drop-shadow(0 0 8px #ff4d6d)'] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl"
              >
                ♥
              </motion.div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-xs tracking-[0.22em] uppercase text-white/50 font-semibold">
                  A little universe, made only for you
                </p>
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight"
                  style={{ textShadow: '0 0 40px rgba(255,100,130,0.6)' }}>
                  I made something<br />
                  <span style={{ background: 'linear-gradient(90deg, #ff8fab, #ffccd5, #ff8fab)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    beautiful for you.
                  </span>
                </h1>
              </div>

              <p className="font-body text-white/65 text-sm md:text-base leading-relaxed max-w-sm">
                Every pixel here holds a feeling I couldn't say out loud.<br />
                Promise you'll stay until the very end?
              </p>

              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(255,80,110,0.6)' }}
                whileTap={{ scale: 0.96 }}
                className="mt-2 px-10 py-4 rounded-full font-bold text-base tracking-wide"
                style={{
                  background: 'linear-gradient(135deg, #ff4d6d, #ff8fab)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 0 30px rgba(255,60,100,0.4), 0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                Enter My World ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
