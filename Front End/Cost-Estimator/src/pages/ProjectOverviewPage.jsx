import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectSkeleton from '../components/ProjectSkeleton.jsx'
import { getProjects } from '../services/projectService.js'
import { getUsers } from '../services/userService.js'
import { PATHS } from '../utils/paths.js'

function ProjectOverviewPage() {
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    let isActive = true
    const controller = new AbortController()

    async function loadProjectsAndUsers() {
      setError('')
      setIsLoading(true)

      try {
        const [fetchedProjects, fetchedUsers] = await Promise.all([
          getProjects({ signal: controller.signal }),
          getUsers({ signal: controller.signal }),
        ])

        if (!isActive) {
          return
        }

        setProjects(fetchedProjects)
        setUsers(fetchedUsers)
      } catch (err) {
        if (!isActive || err?.name === 'AbortError') {
          return
        }

        setError('The projects could not be loaded.')
      } finally {
        if (isActive && !controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProjectsAndUsers()

    return () => {
      isActive = false
      controller.abort()
    }
  }, [reloadCount])

  const ownerById = useMemo(
    () => Object.fromEntries(users.map((user) => [user._id || user.id, user])),
    [users],
  )

  const projectCards = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        id: project._id || project.id,
        owner: project.owner?._id ? project.owner : ownerById[project.ownerId] ?? null,
      })),
    [projects, ownerById],
  )
  const filteredProjects = useMemo(() => projectCards.filter((project) => `${project.name} ${project.client}`.toLowerCase().includes(query.toLowerCase())), [projectCards, query])

  return (
    <main className="app-shell">
      <div className="learning-shell">


        <section className="project-board-section">
          <div className="project-board-heading">
            <p className="board-label">Project overview</p>
            <h2>Projects</h2>
            <p className="board-subtitle">A quick look at project ownership, timelines, effort, and cost.</p>
          </div>

          <div className="list-actions"><label className="search-label">Search projects<input value={query} onChange={(event) => setSearchParams(event.target.value ? { q: event.target.value } : {})} placeholder="Project or client" /></label><Link className="primary-button inline-button" to={PATHS.createProject}>Create project</Link></div>

          {isLoading && <ProjectSkeleton />}

          {!isLoading && error && (
            <div className="empty-state error-state">
              <p>{error}</p>
              <button type="button" className="retry-button" onClick={() => setReloadCount((count) => count + 1)}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && projects.length === 0 && (
            <div className="empty-state">
              <p>Start creating projects to estimate.</p><Link className="primary-button inline-button" to={PATHS.createProject}>Create your first project</Link>
            </div>
          )}

          {!isLoading && !error && projects.length > 0 && query && filteredProjects.length === 0 && (
            <div className="empty-state"><p>No projects matched the current query.</p></div>
          )}

          {!isLoading && !error && filteredProjects.length > 0 && (
            <div className="project-grid" aria-label="Project list">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} owner={project.owner} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default ProjectOverviewPage
