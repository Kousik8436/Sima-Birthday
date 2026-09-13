import { Router } from 'express'
import { loveData } from '../data/loveData.js'

const router = Router()

// GET /api/hero — her name, hero photo/line
router.get('/hero', (req, res) => {
  res.json({
    herName: loveData.herName,
    heroPhoto: loveData.heroPhoto,
    heroLine: loveData.heroLine
  })
})

// GET /api/memories — the "Why You Are Special" cards
router.get('/memories', (req, res) => {
  res.json(loveData.whyYouAreSpecial)
})

// GET /api/timeline — "Our Story"
router.get('/timeline', (req, res) => {
  res.json(loveData.timeline)
})

// GET /api/moments — "Moments I Wish I Could Relive"
router.get('/moments', (req, res) => {
  res.json(loveData.moments)
})

// GET /api/messages — final letter content
router.get('/messages', (req, res) => {
  res.json({ finalLetter: loveData.finalLetter })
})

// GET /api/open-when — envelope letters
router.get('/open-when', (req, res) => {
  res.json(loveData.openWhen)
})

// GET /api/surprise — the locked-box reveal
router.get('/surprise', (req, res) => {
  res.json(loveData.surprise)
})

export default router