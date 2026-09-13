import { useEffect, useRef } from 'react'

const HEART_PATH = (ctx, x, y, size) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.beginPath()
  ctx.moveTo(0, -size * 0.3)
  ctx.bezierCurveTo( size * 0.9, -size * 1.1,  size * 1.8,  size * 0.4, 0,  size * 1.1)
  ctx.bezierCurveTo(-size * 1.8,  size * 0.4, -size * 0.9, -size * 1.1, 0, -size * 0.3)
  ctx.closePath()
  ctx.restore()
}

function makeHeart(W, H) {
  return {
    x: Math.random() * W,
    y: H + Math.random() * 200,
    size: 6 + Math.random() * 18,
    speed: 0.25 + Math.random() * 0.45,
    drift: (Math.random() - 0.5) * 0.5,
    opacity: 0.15 + Math.random() * 0.55,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
    rotation: (Math.random() - 0.5) * 0.4,
  }
}

export default function FloatingHearts() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let W, H

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // spawn 55 hearts staggered across the full height so it's full from the start
    const hearts = Array.from({ length: 55 }, () => {
      const h = makeHeart(W, H)
      h.y = Math.random() * (H + 300) - 300   // pre-scatter vertically
      return h
    })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      hearts.forEach(h => {
        h.y      -= h.speed
        h.wobble += h.wobbleSpeed
        h.x      += Math.sin(h.wobble) * h.drift

        // recycle when off top
        if (h.y < -60) {
          Object.assign(h, makeHeart(W, H))
        }

        ctx.save()
        ctx.translate(h.x, h.y)
        ctx.rotate(h.rotation)
        ctx.globalAlpha = h.opacity

        // draw heart
        ctx.beginPath()
        const s = h.size
        ctx.moveTo(0, -s * 0.3)
        ctx.bezierCurveTo( s * 0.9, -s * 1.1,  s * 1.8,  s * 0.4, 0,  s * 1.1)
        ctx.bezierCurveTo(-s * 1.8,  s * 0.4, -s * 0.9, -s * 1.1, 0, -s * 0.3)
        ctx.closePath()

        // red gradient fill
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 1.4)
        grad.addColorStop(0,   'rgba(255, 80, 100, 1)')
        grad.addColorStop(0.6, 'rgba(220, 20,  60, 1)')
        grad.addColorStop(1,   'rgba(160,  0,  30, 1)')
        ctx.fillStyle = grad
        ctx.fill()

        ctx.restore()
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
