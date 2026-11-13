import type { Project } from "@/data/projects";
import { MediaFrame } from "./media-frame";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className={`project-entry project-${index + 1}`} aria-labelledby={`${project.slug}-title`}>
    <MediaFrame src={project.screenshot} alt={`${project.title} application screenshot`} label={`${project.title} screenshot`} />
    <div className="project-description"><p className="eyebrow">{String(index + 1).padStart(2, "0")} / {project.category}</p><h3 id={`${project.slug}-title`}>{project.title}</h3><p>{project.summary}</p><ul className="tag-list" aria-label={`${project.title} technologies`}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul><p className="content-note">{project.status}</p></div>
  </article>;
}
