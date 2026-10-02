import mongoose from 'mongoose'
import Project from '../models/Project.js'
import User from '../models/User.js'
export async function listProjects(req, res, next) { try { res.json({ projects: await Project.find().populate('owner', 'firstName middleName lastName role branch email').sort({ createdAt: -1 }) }) } catch (error) { next(error) } }
export async function getProject(req, res, next) {
  try { if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid project identifier.' }); const project = await Project.findById(req.params.id).populate('owner', 'firstName middleName lastName role branch email'); return project ? res.json({ project }) : res.status(404).json({ message: 'Project not found.' }) } catch (error) { next(error) }
}
export async function createProject(req, res, next) {
  try {
    const { name, client, owner, startDate, endDate, estimatedCost } = req.body
    if (!name || !client || !owner || !startDate || !endDate || estimatedCost === undefined || estimatedCost === '') return res.status(400).json({ message: 'Project name, client, owner, dates, and estimated cost are required.' })
    if (!mongoose.isValidObjectId(owner) || !(await User.exists({ _id: owner }))) return res.status(400).json({ message: 'Select a valid project owner.' })
    if (Number.isNaN(Date.parse(startDate)) || Number.isNaN(Date.parse(endDate)) || new Date(endDate) < new Date(startDate)) return res.status(400).json({ message: 'Enter valid project dates; end date must not be before start date.' })
    if (!Number.isFinite(Number(estimatedCost)) || Number(estimatedCost) < 0) return res.status(400).json({ message: 'Estimated cost must be zero or greater.' })
    const project = await Project.create({ ...req.body, estimatedCost: Number(estimatedCost) })
    await project.populate('owner', 'firstName middleName lastName role branch email')
    res.status(201).json({ project })
  } catch (error) { next(error) }
}
export async function deleteAllDemoProjects(req, res, next) {
  if (process.env.NODE_ENV === 'production') return res.status(404).json({ message: 'Not found.' })
  try { const result = await Project.deleteMany({}); res.json({ message: 'Demo projects deleted.', deletedCount: result.deletedCount }) } catch (error) { next(error) }
}
