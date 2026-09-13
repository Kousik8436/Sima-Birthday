import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import contentRoutes from './routes/content.js'
import chatRoutes from './routes/chat.js'

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || '*'
}))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running ✓' })
})

app.use('/api', contentRoutes)
app.use('/api', chatRoutes)

// Local dev only. Vercel imports this app as a serverless function.
if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

export default app
