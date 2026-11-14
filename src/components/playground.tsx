"use client";

import { useState } from "react";
import { MacWindow } from "./mac-window";

export function Playground() {
  const [text, setText] = useState("hello, world.");
  const [weight, setWeight] = useState(600);
  return <div className="playground-grid">
    <MacWindow title="type-lab.tsx"><label htmlFor="type-input">A thought, in dots.</label><input id="type-input" value={text} maxLength={32} onChange={event => setText(event.target.value)} autoComplete="off" spellCheck={false} /><div className="type-preview" style={{ fontWeight: weight }} aria-hidden="true">{text || "Your words here."}</div><label className="range-label" htmlFor="type-weight">Font weight <output htmlFor="type-weight">{weight}</output></label><input id="type-weight" type="range" min="100" max="900" step="100" value={weight} onChange={event => setWeight(Number(event.target.value))} /><p className="content-note">Type something. Give it a little weight.</p></MacWindow>
    <MacWindow title="interaction.css"><div className="orbit-study" role="img" tabIndex={0} aria-label="Geometric composition. Hover or focus to rearrange the shapes."><span /><span /><span /></div><p className="content-note">A study in balance. Hover or focus the composition.</p></MacWindow>
  </div>;
}
