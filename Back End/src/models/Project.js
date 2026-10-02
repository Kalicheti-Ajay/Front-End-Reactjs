import mongoose from 'mongoose'
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, client: { type: String, required: true, trim: true }, owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true }, endDate: { type: Date, required: true }, estimatedCost: { type: Number, required: true, min: 0 },
  estimatedHours: { type: Number, min: 0, default: 0 }, status: { type: String, default: 'Planned' }, description: { type: String, default: '' },
}, { timestamps: true })
export default mongoose.model('Project', projectSchema)
