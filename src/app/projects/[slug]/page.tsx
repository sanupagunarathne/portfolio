import { getSiteOrigin } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { caseStudies } from "@/data/case-studies";
import { MediaFrame } from "@/components/media-frame";
import { MediaGallery } from "@/components/interest-gallery";
import { MacWindow } from "@/components/mac-window";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const origin = getSiteOrigin();
  const canonical = origin ? new URL(`/projects/${slug}`, origin).href : undefined;
  return {
    alternates: canonical ? { canonical } : undefined,
    title: project.title,
    description: project.summary,
    openGraph: { title: `${project.title} — Sanupa Gunarathne`, description: project.summary, type: "article", url: canonical },
    twitter: { card: "summary", title: project.title, description: project.summary },
  };
}

const contents = [
  ["overview", "Overview"], ["problem", "The problem"], ["role", "My role"],
  ["features", "Main features"], ["stack", "Technology stack"], ["approach", "Development approach"],
  ["challenges", "Challenges"], ["progress", "Results & progress"], ["gallery", "Image gallery"],
] as const;

function Pending({ children }: { children: string }) {
  return <p className="case-pending"><span className="content-note">To be documented</span>{children}</p>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const study = caseStudies[slug];
  if (!study) notFound();
  const next = projects[(index + 1) % projects.length];

  return <main id="main-content" tabIndex={-1} className="case-page page-width">
    <header className="case-hero">
      <Link href="/#work" className="text-link"><ArrowLeft aria-hidden="true" size={16} />All projects</Link>
      <p className="eyebrow">PROJECT {String(index + 1).padStart(2, "0")} / {project.category}</p>
      <h1>{project.title}</h1><p className="case-lead">{project.summary}</p>
      <p className="case-status"><span className="status-dot" aria-hidden="true" />{project.status}</p>
      <div className="case-links">
        {project.github && <a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer">GitHub repository <ArrowUpRight aria-hidden="true" size={16} /><span className="sr-only"> (opens in a new tab)</span></a>}
        {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noopener noreferrer">Live demo <ArrowUpRight aria-hidden="true" size={16} /><span className="sr-only"> (opens in a new tab)</span></a>}
        {!project.github && !project.demo && <p className="content-note">Repository and demo links will be added once verified.</p>}
      </div>
    </header>
    <MediaFrame src={project.screenshot} alt={`${project.title} project overview`} label={`${project.title} overview screenshot`} />
    <div className="case-layout">
      <nav className="case-contents" aria-label="Case study contents"><p className="eyebrow">IN THIS STUDY</p><ol>{contents.map(([id, title]) => <li key={id}><a href={`#${id}`}>{title}</a></li>)}</ol></nav>
      <div className="case-story">
        <section id="overview" aria-labelledby="overview-title"><h2 id="overview-title">Overview</h2><p>{project.note}</p><MacWindow title={`${project.slug}.info`}><dl className="case-facts"><dt>Project</dt><dd>{project.title}</dd><dt>Area</dt><dd>{project.category}</dd><dt>Status</dt><dd>{project.status}</dd><dt>Role</dt><dd>{study.role ?? "To be confirmed"}</dd></dl></MacWindow></section>
        <section id="problem" aria-labelledby="problem-title"><h2 id="problem-title">The problem</h2><p>{study.problem}</p></section>
        <section id="role" aria-labelledby="role-title"><h2 id="role-title">My role</h2>{study.role ? <p>{study.role}</p> : <Pending>My individual responsibilities and contributions have not yet been supplied.</Pending>}</section>
        <section id="features" aria-labelledby="features-title"><h2 id="features-title">Main features</h2>{study.features?.length ? <ul>{study.features.map(feature => <li key={feature}>{feature}</li>)}</ul> : <Pending>Verified features will be listed here. Planned capabilities are not presented as delivered.</Pending>}</section>
        <section id="stack" aria-labelledby="stack-title"><h2 id="stack-title">Technology stack</h2><ul className="tag-list" aria-label="Project technologies">{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul></section>
        <section id="approach" aria-labelledby="approach-title"><h2 id="approach-title">Development approach</h2>{study.approach ? <p>{study.approach}</p> : <Pending>Architecture decisions, implementation steps and development workflow are still to be documented.</Pending>}</section>
        <section id="challenges" aria-labelledby="challenges-title"><h2 id="challenges-title">Challenges</h2>{study.challenges?.length ? <ul>{study.challenges.map(challenge => <li key={challenge}>{challenge}</li>)}</ul> : <Pending>Specific technical challenges and how they were addressed have not yet been confirmed.</Pending>}</section>
        <section id="progress" aria-labelledby="progress-title"><h2 id="progress-title">Results &amp; progress</h2>{study.progress ? <p>{study.progress}</p> : <Pending>{`Current recorded status: ${project.status}. No completion, deployment or measured outcomes are claimed.`}</Pending>}</section>
        <section id="gallery" aria-labelledby="gallery-title"><h2 id="gallery-title">Image gallery</h2><p>Space for the real project, in detail.</p><MediaGallery items={study.gallery} kind="screenshot" className="case-gallery" /></section>
      </div>
    </div>
    <nav className="next-project" aria-label="Next project"><p className="eyebrow">KEEP EXPLORING</p><Link href={`/projects/${next.slug}`}><span><span className="content-note">Next project</span><span>{next.title}</span></span><ArrowUpRight aria-hidden="true" size={32} /></Link><Link className="text-link" href="/#work">Back to selected work</Link></nav>
  </main>;
}
