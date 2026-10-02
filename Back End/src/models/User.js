import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true }, middleName: { type: String, default: '' }, lastName: { type: String, required: true, trim: true },
  role: { type: String, required: true }, branch: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true, trim: true }, passwordHash: { type: String, required: true, select: false },
}, { timestamps: true })
export default mongoose.model('User', userSchema)
