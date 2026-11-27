import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";
import { interests } from "@/data/interests";
import { PhraseHeading, SectionHeading } from "@/components/section-heading";
import { Playground } from "@/components/playground";
import { Expertise } from "@/components/expertise";
import { Journey } from "@/components/journey";
import { InterestGallery } from "@/components/interest-gallery";
import { AboutBird } from "@/components/about-bird";
import { RetroComputer } from "@/components/retro-computer";
import { SocialIcon } from "@/components/social-icon";
import { ContactForm } from "@/components/contact-form";
import { PortraitOrbit } from "@/components/portrait-orbit";

export function AboutContent() { return <section id="about" className="about-editorial page-width" aria-labelledby="about-name">
 <div className="about-editorial-copy"><p className="eyebrow">SOFTWARE ENGINEERING / SRI LANKA</p><h2 id="about-name" aria-label={personal.name}>Sanupa<br/>Gunarathne<span>.</span></h2><p className="about-lead">Engineering ideas.<br/>Making room for curiosity.</p><p>I’m a Software Engineering undergraduate at the University of Westminster, studying at IIT Sri Lanka. I enjoy connecting practical software with thoughtful design.</p><p>Beyond the code, you’ll find me exploring photography, graphic design, motorcycling and tennis. This is a small collection of what I’m building, learning and trying next.</p><a className="text-link" href="/contact">Let’s talk <ArrowUpRight size={16} aria-hidden="true"/></a><Image className="personal-signature" src="/images/portraits/sanupa-signature.png" alt="Sanupa — redesigned personal signature with a crimson orbit" width={420} height={210}/><AboutBird/></div>
 <div className="portrait-composition"><PortraitOrbit/><div className="portrait-placeholder"><Image src={personal.heroPortrait!} alt="Halftone portrait of Sanupa Gunarathne" fill sizes="(max-width:767px) 90vw, 40vw" priority className="hero-photo"/></div></div>
 </section>; }

export function ExpertiseContent() { return (
        <section id="expertise" className="portfolio-section expertise-section" tabIndex={-1} aria-labelledby="expertise-title">
          <div className="page-width"><SectionHeading number="03" label="EXPERTISE" title="Tools I use to bring ideas to life." id="expertise-title" />
            <div className="expertise-intro"><RetroComputer /><div><p className="lead">Different tools. One curious mindset.</p><p>A collection of languages, frameworks and tools connected to my projects and studies. Individual learning statuses are still being confirmed.</p></div></div>
            <Expertise />
          </div>
        </section>
); }

export function JourneyContent() { return (
        <section id="journey" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="journey-title">
          <SectionHeading number="04" label="JOURNEY" title="Every experience shapes what comes next." id="journey-title" />
          <Journey />
        </section>
); }

export function PlaygroundContent() { return (
        <section id="playground" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="playground-title">
          <SectionHeading number="05" label="PLAYGROUND" title="Small experiments. Big curiosity." id="playground-title" />
          <p className="section-intro">A little room to try something, change something, and see what happens.</p><Playground />
        </section>
); }

export function BeyondContent() { return (
        <section id="beyond" className="portfolio-section page-width" tabIndex={-1} aria-labelledby="beyond-title">
          <SectionHeading number="06" label="BEYOND THE SCREEN" title="There's more to me than code." id="beyond-title" />
          <InterestGallery items={interests} />
        </section>
); }

export function ContactContent() { return (
        <section id="contact" className="contact-section" tabIndex={-1} aria-labelledby="contact-title">
          <div className="page-width contact-layout"><div>
            <p className="eyebrow">LET&apos;S CONNECT</p>
            <PhraseHeading id="contact-title" title="Let's make something meaningful together." />
            <p className="contact-description">Have an idea to explore or a project to talk about? I&apos;d love to hear from you.</p>
            <a className="button primary" href="https://www.linkedin.com/in/sanupagunarathne/" target="_blank" rel="noopener noreferrer"><SocialIcon name="LinkedIn" />Connect on LinkedIn <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>
            <dl className="contact-availability"><div><dt>Email</dt><dd>{personal.email ? <a href={`mailto:${personal.email}`}>{personal.email}</a> : "To be provided"}</dd></div><div><dt>Résumé</dt><dd>{personal.resume ? <a href={personal.resume}>Download résumé</a> : "To be added"}</dd></div></dl>
          </div><ContactForm deliveryEnabled={Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL)} /></div>
        </section>
); }