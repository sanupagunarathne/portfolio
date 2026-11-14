"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { skills, skillCategories } from "@/data/skills";
import { projects } from "@/data/projects";
import { motion, useReducedMotion } from "motion/react";
import { useFreeFloat } from "./use-free-float";
import { MacWindow } from "./mac-window";

export function Expertise() {
  const opener = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const cosmos = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useFreeFloat(cosmos, paused, category);
  const skill = skills.find(item => item.name === selected);

  return <div className="expertise-browser">
    <div className="category-filters" role="group" aria-label="Technology category">
      {["All", ...skillCategories].map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => { setCategory(item); setSelected(null); }}>{item}</button>)}
    </div>
    <div className="float-toolbar"><p className="content-note">A little space to wander. Select a tool to look closer.</p><button type="button" className="float-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume floating" : "Pause floating"}</button></div>
    <div className="expertise-layout">
      <div ref={cosmos} className={`technology-groups technology-cosmos ${paused ? "is-still" : ""}`} role="group" aria-label="Floating technology constellation" onPointerMove={event => {
        if (paused || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        cosmos.current?.style.setProperty("--tilt-x", `${(event.clientY - bounds.top - bounds.height / 2) / bounds.height * -5}deg`);
        cosmos.current?.style.setProperty("--tilt-y", `${(event.clientX - bounds.left - bounds.width / 2) / bounds.width * 7}deg`);
      }} onPointerLeave={() => { cosmos.current?.style.setProperty("--tilt-x", "0deg"); cosmos.current?.style.setProperty("--tilt-y", "0deg"); }}>{skillCategories.filter(item => category === "All" || item === category).map(group => <div className="technology-group" key={group}><h3>{group}</h3><ul>{skills.filter(item => item.category === group).map((item, index) => <li key={item.name} style={{ "--float-delay": `${index * -.8}s`, "--depth": `${(index % 3) * 12}px`, "--drift-x": `${[6, -5, 4, -7][index % 4]}px`, "--drift-y": `${[-8, 5, -6, 7][index % 4]}px`, "--float-duration": `${6 + index % 4}s` } as CSSProperties}><button type="button" aria-pressed={selected === item.name} aria-controls="technology-details" onClick={event => {
        opener.current = event.currentTarget;
        setSelected(item.name);
        if (window.matchMedia("(max-width: 767px)").matches) requestAnimationFrame(() => {
          panel.current?.focus({ preventScroll: true });
          panel.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
        });
      }}><span className="technology-token" data-seed={skills.indexOf(item) + 1}><Image src={item.icon} alt="" width={44} height={44} /><span className="technology-name">{item.name}</span></span></button></li>)}</ul></div>)}</div>
      <div ref={panel} tabIndex={-1} id="technology-details" className="skill-panel" role="region" aria-label="Technology details" aria-live="polite" aria-atomic="true">
        <div key={selected ?? "empty"} className="skill-content"><MacWindow title={skill ? `${skill.name.toLowerCase().replaceAll(" ", "-")}.info` : "toolkit.info"}>
          {skill ? <><Image src={skill.icon} alt={`${skill.name} logo`} width={48} height={48} /><h3>{skill.name}</h3><p className="eyebrow">{skill.category}</p><p>{skill.description}</p><dl className="skill-facts"><dt>How I use it</dt><dd>{skill.usage ?? "Personal usage details are still to be confirmed."}</dd><dt>Learning status</dt><dd>{skill.status ?? "To be confirmed"}</dd></dl><h4>Related projects</h4>{skill.relatedProjects.length ? <ul className="related-projects">{skill.relatedProjects.map(slug => <li key={slug}><a href={`#${slug}-title`}>{projects.find(project => project.slug === slug)?.title}</a></li>)}</ul> : <p className="content-note">No project association confirmed yet.</p>}</> : <><p className="panel-symbol" aria-hidden="true">{"{ ? }"}</p><h3>A closer look.</h3><p>Select a technology to explore its context, learning status and related projects.</p></>}
        </MacWindow></div>
        {skill && <button className="return-to-tools" type="button" onClick={() => {
          opener.current?.focus({ preventScroll: true });
          opener.current?.scrollIntoView({ block: "center", behavior: "instant" });
        }}>↑ Back to technologies</button>}
      </div>
    </div>
  </div>;
}
