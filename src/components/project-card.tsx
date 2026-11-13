"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { MediaFrame } from "./media-frame";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cursor = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const panelId = `${project.slug}-notes`;
  return <motion.article className={`project-entry project-${index + 1}`} aria-labelledby={`${project.slug}-title`} initial={false} whileInView={reduced ? undefined : { y: [12, 0], opacity: [0.7, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.5 }}>
    <button className="project-preview" type="button" aria-label={`Explore ${project.title} notes`} aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(!expanded)} onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse" || !cursor.current) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      cursor.current.style.left = `${event.clientX - bounds.left}px`;
      cursor.current.style.top = `${event.clientY - bounds.top}px`;
    }}>
      <MediaFrame src={project.screenshot} alt={`${project.title} application screenshot`} label={`${project.title} screenshot`} />
      <span ref={cursor} className="project-cursor" aria-hidden="true">{expanded ? "Close notes" : "Explore notes"} ↗</span>
      <span className="project-preview-hint" aria-hidden="true">{expanded ? "Close" : "Explore"} <ArrowUpRight size={18} /></span>
    </button>
    <div className="project-description"><p className="eyebrow">{String(index + 1).padStart(2, "0")} / {project.category}</p><h3 id={`${project.slug}-title`} tabIndex={-1}>{project.title}</h3><p>{project.summary}</p><ul className="tag-list" aria-label={`${project.title} technologies`}>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul><p className="content-note">{project.status}</p>
      <div id={panelId} hidden={!expanded} className="project-notes"><h4>Project notes</h4><p>{project.note}</p><p className="content-note">Role, results and repository links are still being documented.</p></div>
    </div>
  </motion.article>;
}
