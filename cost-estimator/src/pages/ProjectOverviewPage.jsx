import { useEffect, useMemo, useState } from 'react'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectSkeleton from '../components/ProjectSkeleton.jsx'
import { getProjects } from '../services/projectService.js'
import { getUsers } from '../services/userService.js'

function ProjectOverviewPage() {
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadCount, setReloadCount] = useState(0)

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
    () => Object.fromEntries(users.map((user) => [user.id, user])),
    [users],
  )

  const projectCards = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        owner: ownerById[project.ownerId] ?? null,
      })),
    [projects, ownerById],
  )

  return (
    <main className="app-shell">
      <div className="learning-shell">


        <section className="project-board-section">
          <div className="project-board-heading">
            <p className="board-label">Project overview</p>
            <h2>Projects</h2>
            <p className="board-subtitle">A quick look at project ownership, timelines, effort, and cost.</p>
          </div>

          {isLoading && <ProjectSkeleton />}

          {!isLoading && error && (
            <div className="empty-state error-state">
              <p>{error}</p>
              <button type="button" className="retry-button" onClick={() => setReloadCount((count) => count + 1)}>
                Try again
              </button>
            </div>
          )}

          {!isLoading && !error && projectCards.length === 0 && (
            <div className="empty-state">
              <p>No projects are available yet.</p>
            </div>
          )}

          {!isLoading && !error && projectCards.length > 0 && (
            <div className="project-grid" aria-label="Project list">
              {projectCards.map((project) => (
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
