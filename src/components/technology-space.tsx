"use client";

import { Component, useState, type CSSProperties, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { categories, skills, type Category } from "@/data/skills";

const TechnologyScene = dynamic(() => import("./technology-scene"), { ssr: false, loading: () => <p className="scene-loading">Loading the constellation…</p> });
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="scene-loading">3D is unavailable here. Explore every technology using the logo buttons below.</p> : this.props.children; }
}

export function TechnologySpace() {
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState(skills[0]);
  const [threeD, setThreeD] = useState(false);
  const [paused, setPaused] = useState(false);
  const visible = skills.filter((skill) => category === "All" || skill.category === category);

  return <div className="technology-space">
    <div className="technology-toolbar"><div className="category-filters" role="group" aria-label="Technology categories">{categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setSelected(skills.find((skill) => item === "All" || skill.category === item)!); }}>{item}</button>)}</div>
      <div className="space-controls"><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume floating" : "Pause floating"}</button><button type="button" aria-pressed={threeD} onClick={() => setThreeD(!threeD)}>{threeD ? "Use 2D view" : "Explore in 3D"}</button></div>
    </div>
    <div className="technology-layout">
      <div className={`constellation ${paused ? "is-paused" : ""} ${threeD ? "has-scene" : ""}`}>
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        {threeD && <div className="technology-canvas" role="img" aria-label="Interactive 3D technology logos. Drag to rotate; use the buttons below for technology details."><SceneBoundary><TechnologyScene icons={visible.map((skill) => skill.icon)} /></SceneBoundary></div>}
        <div className="floating-logos" role="group" aria-label="Select a technology">{visible.map((skill, index) => <button className="technology-logo" key={skill.name} type="button" style={{ "--float-delay": `${index * -.7}s`, "--tilt": `${(index % 3 - 1) * 8}deg` } as CSSProperties} aria-pressed={selected.name === skill.name} aria-controls="technology-details" onClick={() => setSelected(skill)}><span className="logo-surface"><Image src={`/technology/${skill.icon}.svg`} alt="" width={48} height={48} /></span><span>{skill.name}</span></button>)}</div>
        <p className="space-caption">{threeD ? "Drag the scene to orbit · select a logo below" : "A small universe of languages, frameworks & tools"}</p>
      </div>
      <aside id="technology-details" className="technology-details" aria-live="polite" aria-atomic="true">
        <div className="window-bar"><span aria-hidden="true">● ● ●</span><span>technology.info</span></div>
        <div className="technology-detail-body"><Image src={`/technology/${selected.icon}.svg`} alt="" width={56} height={56} /><p className="eyebrow">{selected.category}</p><h3>{selected.name}</h3><p>{selected.description}</p><h4>In my projects</h4><p>{selected.usage}</p><p className="learning-status">{selected.status}</p><h4>Related projects</h4><ul>{selected.projects.map((project) => <li key={project}>{project}</li>)}</ul></div>
      </aside>
    </div>
  </div>;
}
