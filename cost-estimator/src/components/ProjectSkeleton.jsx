function ProjectSkeleton() {
  return (
    <div className="project-grid" aria-label="Loading projects">
      {Array.from({ length: 3 }).map((_, index) => (
        <article className="project-card project-card--skeleton" key={index}>
          <div className="project-card__heading">
            <div className="project-skeleton__title-group">
              <div className="project-skeleton__line project-skeleton__line--title" />
              <div className="project-skeleton__line project-skeleton__line--subtitle" />
            </div>
            <div className="project-skeleton__badge" />
          </div>

          <div className="project-card__details">
            {Array.from({ length: 4 }).map((__, lineIndex) => (
              <div className="detail-row" key={lineIndex}>
                <span className="detail-row__label">
                  <span className="project-skeleton__line project-skeleton__line--label" />
                </span>
                <span className="detail-row__value">
                  <span className="project-skeleton__line project-skeleton__line--value" />
                </span>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}

export default ProjectSkeleton
