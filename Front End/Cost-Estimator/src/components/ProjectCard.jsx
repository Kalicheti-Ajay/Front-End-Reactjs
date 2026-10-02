import { Link } from 'react-router-dom'
import { PATHS } from '../utils/paths.js'

function formatEffort(hours) {
  const days = Math.floor(hours / 8)
  const months = Math.floor(days / 20)
  const remainingDaysAfterMonths = days % 20
  const weeks = Math.floor(remainingDaysAfterMonths / 5)
  const remainingDays = remainingDaysAfterMonths % 5
  const parts = []

  if (months) parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  if (weeks) parts.push(`${weeks} ${weeks === 1 ? 'week' : 'weeks'}`)
  if (remainingDays || parts.length === 0) {
    parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`)
  }

  return `${parts.join(', ')} (${hours.toLocaleString('en-IN')} hours)`
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function ProjectCard({ project, owner }) {
  return (
    <article className="project-card">
      <div className="project-card__heading">
        <div className="project-name-group">
          <Link to={PATHS.project(project._id || project.id)} className="project-title-link"><h2>{project.name}</h2></Link>
          <p>{project.client}</p>
        </div>

        <span className={`status-badge status-badge--${(project.status || 'Planned').toLowerCase().replaceAll(' ', '-')}`}>
          {project.status || 'Planned'}
        </span>
      </div>

      <div className="project-card__details">
        <div className="detail-row">
          <span className="detail-row__label">Owner</span>
          <Link className="detail-row__value detail-row__link" to={PATHS.user(owner?._id ?? owner?.id ?? project.owner?._id ?? project.ownerId)}>
            {owner ? `${owner.firstName} ${owner.lastName}` : project.owner?.firstName ? `${project.owner.firstName} ${project.owner.lastName}` : 'Owner'}
          </Link>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Date range</span>
          <span className="detail-row__value">{project.dateRange || `${new Date(project.startDate).toLocaleDateString()} to ${new Date(project.endDate).toLocaleDateString()}`}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Estimated effort</span>
          <span className="detail-row__value">{formatEffort(project.estimatedHours ?? project.hours ?? 0)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Estimated cost</span>
          <span className="detail-row__value">{formatCurrency(project.estimatedCost ?? project.cost ?? 0)}</span>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
