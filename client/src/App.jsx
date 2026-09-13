import { useState } from 'react'
import FloatingHearts from './components/FloatingHearts.jsx'
import Opening from './sections/Opening.jsx'
import Hero from './sections/Hero.jsx'
import WhySpecial from './sections/WhySpecial.jsx'
import OurStory from './sections/OurStory.jsx'
import Moments from './sections/Moments.jsx'
import OpenWhen from './sections/OpenWhen.jsx'
import AskMyHeart from './sections/AskMyHeart.jsx'
import Surprise from './sections/Surprise.jsx'
import FinalLetter from './sections/FinalLetter.jsx'

const SECTIONS = ['hero', 'why-special', 'our-story', 'moments', 'open-when', 'ask-my-heart', 'final-letter', 'surprise']

export default function App() {
  const [entered, setEntered] = useState(false)
  const [maxSection, setMaxSection] = useState(0)

  const unlockNext = (index) => {
    setMaxSection((prev) => {
      const next = Math.max(prev, index)
      setTimeout(() => {
        document.getElementById(SECTIONS[index])?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return next
    })
  }

  return (
    <div>
      <FloatingHearts />
      {!entered && <Opening onEnter={() => { setEntered(true) }} />}

      {entered && (
        <main>
          <Hero onNext={() => unlockNext(1)} />
          {maxSection >= 1 && <WhySpecial onNext={() => unlockNext(2)} />}
          {maxSection >= 2 && <OurStory onNext={() => unlockNext(3)} />}
          {maxSection >= 3 && <Moments onNext={() => unlockNext(4)} />}
          {maxSection >= 4 && <OpenWhen onNext={() => unlockNext(5)} />}
          {maxSection >= 5 && <AskMyHeart onNext={() => unlockNext(6)} />}
          {maxSection >= 6 && <FinalLetter onNext={() => unlockNext(7)} />}
          {maxSection >= 7 && <Surprise />}
        </main>
      )}
    </div>
  )
}
