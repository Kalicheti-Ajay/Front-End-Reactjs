import { useEffect, useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { getProjectById } from '../services/projectService.js'
import { PATHS } from '../utils/paths.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function ProjectPage() {
  const { projectId, tab = 'overview' } = useParams()
  const [result, setResult] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    getProjectById(projectId, { signal: controller.signal })
      .then((project) => setResult({ id: projectId, project }))
      .catch((error) => { if (error.name !== 'AbortError') setResult({ id: projectId, error: error.status === 404 ? 'not-found' : 'error' }) })
    return () => controller.abort()
  }, [projectId])
  if (!['overview', 'estimate', 'team'].includes(tab)) return <NotFoundPage />
  if (!result || result.id !== projectId) return <div className="state-page">Loading project...</div>
  const { project, error } = result
  if (error === 'not-found' || (!error && !project)) return <section className="state-page"><h1>Project Not Found</h1><p>This project may have been removed.</p><Link to={PATHS.projects}>Back to Projects</Link></section>
  if (error) return <section className="state-page error-state"><h1>Unable to load project</h1><p>Please refresh and try again.</p></section>
  const tabs = [['overview', PATHS.projectOverview(projectId)], ['estimate', PATHS.projectEstimate(projectId)], ['team', PATHS.projectTeam(projectId)]]
  return <section className="project-detail-page"><Link to={PATHS.projects} className="back-link">← Projects</Link><header className="project-board-heading"><p className="board-label">{project.client}</p><h1>{project.name}</h1></header>
    <nav className="project-tabs" aria-label="Project sections">{tabs.map(([label, path]) => <NavLink key={label} to={path} end>{label[0].toUpperCase() + label.slice(1)}</NavLink>)}</nav>
    {tab === 'team' ? <div className="detail-panel"><h2>Project owner</h2><p>{project.owner?.firstName} {project.owner?.lastName}</p>{project.owner?._id && <Link to={PATHS.user(project.owner._id)}>View user profile</Link>}</div> : tab === 'estimate' ? <div className="detail-panel"><h2>Estimate</h2><p>Estimated cost: ₹{Number(project.estimatedCost || 0).toLocaleString('en-IN')}</p><p>{new Date(project.startDate).toLocaleDateString()} to {new Date(project.endDate).toLocaleDateString()}</p></div> : <div className="detail-panel"><h2>Overview</h2><p>Client: {project.client}</p><p>Status: {project.status || 'Planned'}</p><p>Owner: {project.owner?.firstName} {project.owner?.lastName}</p></div>}</section>
}
