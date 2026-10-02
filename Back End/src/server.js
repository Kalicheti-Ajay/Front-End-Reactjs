import dotenv from 'dotenv'
import app from './app.js'
import connectDatabase from './config/db.js'
import seedInitialData from './seed/seedData.js'

dotenv.config()

const port = process.env.PORT || 5000
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')

try {
  await connectDatabase()
  if (process.env.SEED_ON_START !== 'false') await seedInitialData()
  app.listen(port, () => console.log(`API listening on port ${port}`))
} catch (error) {
  console.error('Backend startup failed:', error.message)
  process.exit(1)
}
