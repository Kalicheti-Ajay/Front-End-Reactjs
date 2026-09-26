import './ProjectName.css'

function ProjectName({ name, client }) {
  return (
    <div className="project-name">
      <h2 className="project-name__title">{name}</h2>
      <p className="project-name__client">{client}</p>
    </div>
  )
}

export default ProjectName
