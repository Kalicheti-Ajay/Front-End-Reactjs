import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

export default async function connectDatabase() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is required')
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('MongoDB connected')
}
