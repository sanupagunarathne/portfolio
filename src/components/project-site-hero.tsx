import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectSiteHero({project}: {project: Project}) {
  return <header className="project-site-opening" aria-label={`${project.title} website preview`}>
    <h1 className="sr-only">{project.title}</h1>
    <div className="project-site-image">
      {project.screenshot ? <Image src={project.screenshot} alt={`${project.title} actual website hero`} width={project.screenshotSize?.width ?? 1920} height={project.screenshotSize?.height ?? 1080} priority sizes="100vw" className="project-site-capture" /> : <div className="project-site-pending"><p className="eyebrow">{project.title}</p><p>Actual website hero awaiting image upload.</p></div>}
    </div>
    <div className="project-site-visit">
      {project.demo ? <><a className="button primary" href={project.demo} target="_blank" rel="noopener noreferrer">Visit <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> {project.title} (opens in a new tab)</span></a><a className="project-site-url" href={project.demo} target="_blank" rel="noopener noreferrer">{project.demo}<span className="sr-only"> (opens in a new tab)</span></a></> : <p className="content-note">Website URL to be supplied.</p>}
    </div>
  </header>;
}
