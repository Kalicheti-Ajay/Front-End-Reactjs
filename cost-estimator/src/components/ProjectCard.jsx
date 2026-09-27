import { Link } from 'react-router-dom'

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
          <h2>{project.name}</h2>
          <p>{project.client}</p>
        </div>

        <span className={`status-badge status-badge--${project.status.toLowerCase().replaceAll(' ', '-')}`}>
          {project.status}
        </span>
      </div>

      <div className="project-card__details">
        <div className="detail-row">
          <span className="detail-row__label">Owner</span>
          <Link className="detail-row__value detail-row__link" to={`/users/${owner?.id ?? project.ownerId}`}>
            {owner ? `${owner.firstName} ${owner.lastName}` : project.ownerId}
          </Link>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Date range</span>
          <span className="detail-row__value">{project.dateRange}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Estimated effort</span>
          <span className="detail-row__value">{formatEffort(project.hours)}</span>
        </div>

        <div className="detail-row">
          <span className="detail-row__label">Estimated cost</span>
          <span className="detail-row__value">{formatCurrency(project.cost)}</span>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
