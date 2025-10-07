export default function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)} tabIndex={0} role="button" aria-label={`Ouvrir ${project.title}`}>
       <h3 className="project-title">{project.title}</h3>
      
      <div className="project-thumb">
        <img src={project.image} alt={project.title} />
      </div>

     
        <p className="project-desc">{project.description}</p>
     
    </article>
  )
}
