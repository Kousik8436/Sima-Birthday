import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function OurStory({ onNext }) {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('/api/timeline').then(r => r.json()).then(setTimeline).catch(() => setTimeline([]))
  }, [])

  return (
    <div className="love-shell">
      <section id="our-story" className="love-section">
        <p className="section-kicker">From the very beginning</p>
        <h2 className="section-title">Our Story</h2>
        <p className="section-subtitle mb-14">Every chapter of us, written in time.</p>

        <div className="relative max-w-2xl w-full">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.id}
                className="relative pl-14 md:pl-0 md:grid md:grid-cols-2 md:gap-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <span className="absolute left-5 md:left-1/2 top-2 w-3.5 h-3.5 rounded-full bg-white border-2 border-rose -translate-x-1/2 shadow-lg" style={{ boxShadow: '0 0 12px rgba(255,80,120,0.7)' }} />

                <div className={`glass-panel rounded-2xl p-5 min-w-0 overflow-hidden ${i % 2 === 0 ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}>
                  <span className="section-kicker">{item.date}</span>
                  <h3 className="font-display text-2xl text-white font-bold mt-1">{item.label}</h3>
                  <p className="font-body text-sm text-white/75 mt-2 leading-relaxed italic">{item.caption}</p>
                  {item.photo && (
                    <div className="mt-3 rounded-xl overflow-hidden">
                      <img src={item.photo} alt={item.label} className="w-full h-40 object-cover" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button onClick={onNext} className="next-button">
          <span className="next-button__label">There's more ✨</span>
          <span className="next-button__arrow">↓</span>
        </button>
      </section>
    </div>
  )
}
