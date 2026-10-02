import ProjectName from './ProjectName/ProjectName.jsx'
import StatusBadge from './StatusBadge/StatusBadge.jsx'
import DetailRow from './DetailRow/DetailRow.jsx'

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

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function ProjectDetails({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__heading">
        <ProjectName name={project.name} client={project.client} />
        <StatusBadge status={project.status} />
      </div>
      <div className="project-card__details">
        <DetailRow label="Owner" value={project.owner} />
        <DetailRow label="Date range" value={project.dateRange} />
        <DetailRow label="Estimated effort" value={formatEffort(project.hours)} />
        <DetailRow label="Estimated cost" value={formatCurrency(project.cost)} />
      </div>
    </article>
  )
}

export default ProjectDetails
