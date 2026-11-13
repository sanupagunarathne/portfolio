import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { personal } from "@/data/personal";

import Image from "next/image";
import { projects } from "@/data/projects";


import { interests } from "@/data/interests";
import { SectionHeading } from "@/components/section-heading";
import { MediaFrame } from "@/components/media-frame";
import { ProjectCard } from "@/components/project-card";
import { MacWindow } from "@/components/mac-window";
import { Playground } from "@/components/playground";
import { Expertise } from "@/components/expertise";
import { Journey } from "@/components/journey";
import { InterestGallery } from "@/components/interest-gallery";
import { ExpertiseSculpture } from "@/components/expertise-sculpture";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <section id="hero" className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy"><Reveal>
            <p className="eyebrow"><span className="status-dot" /> A personal space on the web</p>
            <p className="introduction">{personal.introduction}</p>
            <h1 id="hero-title">{personal.headline}</h1>
            <p className="hero-description">{personal.description}</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">Explore My Work <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="text-link" href="#about">About Me <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className="location"><MapPin size={14} aria-hidden="true" /> Based in {personal.location}</p></Reveal>
          </div>
          <div className="portrait-composition">
            <div className="portrait-placeholder" role={personal.heroPortrait ? undefined : "img"} aria-label={personal.heroPortrait ? undefined : "Placeholder reserved for Sanupa's portrait; photograph not yet provided"}>
              {personal.heroPortrait ? <Image src={personal.heroPortrait} alt="Sanupa Gunarathne" fill sizes="(max-width: 767px) 90vw, 45vw" priority className="hero-photo" /> : <>
              <span className="portrait-index">FIG. 01 — THE PERSON BEHIND THE PIXELS</span>
              <span className="portrait-monogram" aria-hidden="true">sg.</span>
              <div className="portrait-caption"><span>Your photograph belongs here.</span><span className="mono">Portrait to be added</span></div>
              </>}
            </div>
            <span className="portrait-margin-note">A little curiosity. A lot of possibility.</span>
          </div>
        </section>

        <section id="work" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="work-title">
          <SectionHeading number="01" label="SELECTED WORK" title="A collection of things I've brought to life." id="work-title" />
          <div className="projects-layout">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div>
        </section>
        <section id="about" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="about-title">
          <SectionHeading number="02" label="ABOUT" title="More than just lines of code." id="about-title" />
          <div className="about-layout">
            <MediaFrame src={personal.aboutPortrait} alt="Sanupa Gunarathne" label="About Sanupa photograph" aspect="portrait" />
            <div className="about-copy"><p className="lead">I like the space where a practical idea meets a thoughtful experience.</p><p>{personal.aboutDescription}</p><p>{personal.interestsDescription}</p><MacWindow title="about-me.ts"><dl className="profile-list"><div><dt>name</dt><dd>{personal.name}</dd></div><div><dt>basedIn</dt><dd>{personal.location}</dd></div><div><dt>studying</dt><dd>{personal.degree}</dd></div><div><dt>at</dt><dd>{personal.university}</dd></div></dl></MacWindow></div>
          </div>
        </section>
        <section id="expertise" className="portfolio-section expertise-section" tabIndex={-1} aria-labelledby="expertise-title">
          <div className="page-width"><SectionHeading number="03" label="EXPERTISE" title="Tools I use to bring ideas to life." id="expertise-title" />
            <div className="expertise-intro"><ExpertiseSculpture /><div><p className="lead">Different tools. One curious mindset.</p><p>A collection of languages, frameworks and tools connected to my projects and studies. Individual learning statuses are still being confirmed.</p></div></div>
            <Expertise />
          </div>
        </section>
        <section id="journey" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="journey-title">
          <SectionHeading number="04" label="JOURNEY" title="Every experience shapes what comes next." id="journey-title" />
          <Journey />
        </section>
        <section id="playground" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="playground-title">
          <SectionHeading number="05" label="PLAYGROUND" title="Small experiments. Big curiosity." id="playground-title" />
          <p className="section-intro">A little room to try something, change something, and see what happens.</p><Playground />
        </section>
        <section id="beyond" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="beyond-title">
          <SectionHeading number="06" label="BEYOND THE SCREEN" title="There's more to me than code." id="beyond-title" />
          <InterestGallery items={interests} />
        </section>
        <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
          <div className="page-width">
            <p className="eyebrow">LET&apos;S CONNECT</p>
            <h2 id="contact-title">Let&apos;s make something<br />meaningful together.</h2>
            <p className="contact-description">Have an idea to explore or a project to talk about? I&apos;d love to hear from you.</p>
            <a className="button primary" href="https://www.linkedin.com/in/sanupagunarathne/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <dl className="contact-availability"><div><dt>Email</dt><dd>{personal.email ? <a href={`mailto:${personal.email}`}>{personal.email}</a> : "To be provided"}</dd></div><div><dt>Résumé</dt><dd>{personal.resume ? <a href={personal.resume}>Download résumé</a> : "To be added"}</dd></div></dl>
          </div>
        </section>
      </main>

    </>
  );
}
