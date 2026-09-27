import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjects } from '../services/projectService.js'
import { getUserById } from '../services/userService.js'

function UserDetailPage() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        const [fetchedUser, fetchedProjects] = await Promise.all([
          getUserById(userId, { signal: controller.signal }),
          getProjects({ signal: controller.signal }),
        ])

        if (controller.signal.aborted) {
          return
        }

        setUser(fetchedUser)
        setProjects(fetchedProjects.filter((project) => project.ownerId === userId))
      } catch (err) {
        if (err?.name === 'AbortError') {
          return
        }

        setError('Unable to load user details right now.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      controller.abort()
    }
  }, [userId])

  const projectsByOwner = useMemo(() => projects, [projects])

  if (loading) {
    return <div className="detail-page state-page">Loading user details...</div>
  }

  if (error) {
    return <div className="detail-page state-page error-state">{error}</div>
  }

  if (!user) {
    return (
      <div className="detail-page state-page empty-state">
        <p>The requested user profile was not found.</p>
        <Link to="/">Back to projects</Link>
      </div>
    )
  }

  return (
    <div className="detail-page">
      <div className="detail-page__header">
        <Link to="/" className="back-link">
          ← Back to projects
        </Link>
      </div>

      <article className="user-profile-card">
        <div className="user-profile-card__header">
          <div className="user-avatar">
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
          <div>
            <p className="user-profile-card__label">Owner profile</p>
            <h2>
              {user.firstName} {user.middleName ? `${user.middleName} ` : ''}
              {user.lastName}
            </h2>
          </div>
        </div>

        <div className="user-profile-grid">
          <div className="profile-field">
            <span>First Name</span>
            <strong>{user.firstName}</strong>
          </div>
          <div className="profile-field">
            <span>Middle Name</span>
            <strong>{user.middleName || '—'}</strong>
          </div>
          <div className="profile-field">
            <span>Last Name</span>
            <strong>{user.lastName}</strong>
          </div>
          <div className="profile-field">
            <span>Role</span>
            <strong>{user.role}</strong>
          </div>
          <div className="profile-field profile-field--full">
            <span>Branch</span>
            <strong>{user.branch}</strong>
          </div>
        </div>
      </article>

      <section className="user-projects">
        <h3>Projects managed by this owner</h3>

        {projectsByOwner.length === 0 ? (
          <p className="empty-user-projects">No projects assigned to this owner.</p>
        ) : (
          <ul className="project-mini-list">
            {projectsByOwner.map((project) => (
              <li key={project.id}>
                <div>
                  <strong>{project.name}</strong>
                  <span>{project.client}</span>
                </div>
                <span>{project.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default UserDetailPage
