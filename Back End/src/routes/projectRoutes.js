import { Router } from 'express'
import { createProject, deleteAllDemoProjects, getProject, listProjects } from '../controllers/projectController.js'
import { requireAuth } from '../middleware/auth.js'
const router = Router()
router.delete('/demo/delete-all', requireAuth, deleteAllDemoProjects)
router.use(requireAuth); router.get('/', listProjects); router.get('/:id', getProject); router.post('/', createProject)
export default router
