import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Hero({ onNext }) {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    fetch('/api/hero').then(r => r.json()).then(setHero).catch(() => {})
  }, [])

  return (
    <div className="love-shell">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,80,110,0.22) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,60,255,0.14) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <section className="love-section justify-center text-center">

        {/* Kicker */}
        <motion.p className="section-kicker"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          A birthday universe, made just for you
        </motion.p>

        {/* Photo with rotating ring + glow */}
        <motion.div className="relative mt-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>

          {/* Spinning gradient ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: '17rem', height: '17rem',
              background: 'conic-gradient(from 0deg, #ff4d6d, #ff8fab, #c084fc, #ff4d6d)',
              filter: 'blur(2px)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* White gap ring */}
          <div className="absolute rounded-full"
            style={{ width: '15.6rem', height: '15.6rem', background: '#c2185b' }} />

          {/* Photo */}
          <div className="relative w-56 h-56 md:w-60 md:h-60 rounded-full overflow-hidden"
            style={{ boxShadow: '0 0 60px rgba(255,60,100,0.5), 0 0 120px rgba(255,60,100,0.2)' }}>
            {hero?.heroPhoto
              ? <img src={hero.heroPhoto} alt="Her" className="w-full h-full object-cover" />
              : (
                <div className="w-full h-full flex items-center justify-center text-6xl"
                  style={{ background: 'linear-gradient(135deg, #3d0020, #7a0035)' }}>
                  ♥
                </div>
              )
            }
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1 className="section-title mt-10"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}>
          Happy Birthday,<br />
          <span style={{
            color: '#fff',
            textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 0 40px rgba(180,0,60,0.6)',
            WebkitTextStroke: '1px rgba(255,255,255,0.3)'
          }}>
            Hippu 🩷
          </span>
        </motion.h1>

        {/* Hero line */}
        <motion.p className="section-subtitle font-display italic text-xl mt-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}>
          {hero?.heroLine || 'For the girl who makes ordinary days feel extraordinary.'}
        </motion.p>

        {/* Stats row */}
        <motion.div className="flex gap-8 mt-10 flex-wrap justify-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}>
          {[
            { num: '∞', label: 'Reasons I love you' },
            { num: '1', label: 'Universe for you' },
            { num: '💫', label: 'Made with my heart' }
          ].map(({ num, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 px-6 py-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                backdropFilter: 'blur(12px)'
              }}>
              <span className="font-display text-3xl font-bold text-white">{num}</span>
              <span className="text-xs text-white/55 tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.button onClick={onNext}
          className="mt-12 px-10 py-4 rounded-full font-bold text-base tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #ff4d6d, #ff8fab)',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 0 30px rgba(255,60,100,0.4), 0 8px 32px rgba(0,0,0,0.3)'
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(255,60,100,0.6)' }}
          whileTap={{ scale: 0.96 }}>
          Explore Your World ✨
        </motion.button>
      </section>
    </div>
  )
}
