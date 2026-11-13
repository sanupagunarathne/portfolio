import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { personal } from "@/data/personal";
import { socials } from "@/data/socials";

export default function Home() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <section className="hero page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> A personal space on the web</p>
            <p className="introduction">{personal.introduction}</p>
            <h1 id="hero-title">Building digital experiences that <em>feel different.</em></h1>
            <p className="hero-description">{personal.description}</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">Explore My Work <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a className="text-link" href="#about">About Me <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className="location"><MapPin size={14} aria-hidden="true" /> Based in {personal.location}</p>
          </div>
          <div className="portrait-composition">
            <div className="portrait-placeholder" role="img" aria-label="Placeholder reserved for Sanupa's portrait; photograph not yet provided">
              <span className="portrait-index">FIG. 01 — THE PERSON BEHIND THE PIXELS</span>
              <span className="portrait-monogram" aria-hidden="true">sg.</span>
              <div className="portrait-caption"><span>Your photograph belongs here.</span><span className="mono">Portrait to be added</span></div>
            </div>
            <span className="portrait-margin-note">A little curiosity. A lot of possibility.</span>
          </div>
        </section>

        <div className="phase-note page-width"><span className="mono">BUILD / 01</span><p>Foundation preview. The full portfolio will take shape across the next development phases.</p></div>

        <section id="work" className="placeholder-section page-width" tabIndex={-1} aria-labelledby="work-title">
          <p className="eyebrow">01 / SELECTED WORK</p>
          <div className="section-line"><h2 id="work-title">A collection of things<br />I&apos;ve brought to life.</h2><p>Project gallery and case studies are planned for upcoming phases. Screenshots and verified project details will be added as supplied.</p></div>
        </section>
        <section id="about" className="placeholder-section page-width" tabIndex={-1} aria-labelledby="about-title">
          <p className="eyebrow">02 / ABOUT</p>
          <div className="section-line"><h2 id="about-title">More than just<br />lines of code.</h2><div><p>{personal.identity} at {personal.university}.</p><p className="degree">{personal.degree}</p></div></div>
        </section>
        <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
          <div className="page-width">
            <p className="eyebrow">LET&apos;S CONNECT</p>
            <h2 id="contact-title">Let&apos;s make something<br /><em>meaningful</em> together.</h2>
            <div className="social-links">{socials.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">{social.name}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}</div>
            <p className="contact-note">Contact email and résumé will be added when available.</p>
          </div>
        </section>
      </main>
      <footer className="page-width footer"><a href="#main-content" className="wordmark" aria-label="Sanupa — back to top">sanupa.</a><p>Thoughtfully built. Always curious.</p><span className="mono">© {new Date().getFullYear()} {personal.name}</span></footer>
    </>
  );
}
