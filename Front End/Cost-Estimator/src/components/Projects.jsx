import ProjectDetails from './ProjectDetails.jsx'

function Projects({ projects }) {
  return (
    <section className="project-grid" aria-label="Project list">
      {projects.map((project) => (
        <ProjectDetails key={project.id} project={project} />
      ))}
    </section>
  )
}

export default Projects
