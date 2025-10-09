import Tag from './Tag'

export default function ProjectCard({ project, onOpen }) {
  // Fallback : si pas de project.tags, on tente depuis description "A, B, C"
  const tags = Array.isArray(project.tags)
    ? project.tags
    : (project.description ? project.description.split(',').map(t => t.trim()) : []);

  return (
    <article
      className="project-card"
      onClick={() => onOpen(project)}
      tabIndex={0}
      role="button"
      aria-label={`Ouvrir ${project.title}`}
    >
      <h3 className="project-title">{project.title}</h3>

      <div className="project-thumb">
        <img src={project.image} alt={project.title} />
      </div>

      {tags.length > 0 && (
        <div className="tags" aria-label="Technologies">
          {tags.map((tag, i) => (
            <Tag key={i} label={tag} variant="default" />
          ))}
        </div>
      )}
    </article>
  )
}
