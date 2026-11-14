"use client";

import { useRef, useState } from "react";
import { MacWindow } from "./mac-window";

export function Playground() {
  const shapes = useRef<HTMLButtonElement>(null);
  const [shifted, setShifted] = useState(false);
  const [text, setText] = useState("hello, world.");
  const [weight, setWeight] = useState(600);
  return <Reveal className="playground-grid">
    <MacWindow title="type-lab.tsx"><label htmlFor="type-input">A thought, in dots.</label><input id="type-input" value={text} maxLength={32} onChange={event => setText(event.target.value)} autoComplete="off" spellCheck={false} /><div className="type-preview" style={{ fontWeight: weight }} aria-hidden="true">{text || "Your words here."}</div><label className="range-label" htmlFor="type-weight">Font weight <output htmlFor="type-weight">{weight}</output></label><input id="type-weight" type="range" min="100" max="900" step="100" value={weight} onChange={event => setWeight(Number(event.target.value))} /><p className="content-note">Type something. Give it a little weight.</p></MacWindow>
    <MacWindow title="interaction.css"><button ref={shapes} className="orbit-study" type="button" data-shifted={shifted} aria-pressed={shifted} aria-label="Rearrange geometric composition" onClick={() => setShifted(!shifted)} onPointerMove={event => {
      if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      shapes.current?.style.setProperty("--pointer-x", `${(event.clientX - bounds.left - bounds.width / 2) * .06}px`);
      shapes.current?.style.setProperty("--pointer-y", `${(event.clientY - bounds.top - bounds.height / 2) * .06}px`);
    }} onPointerLeave={() => { shapes.current?.style.setProperty("--pointer-x", "0px"); shapes.current?.style.setProperty("--pointer-y", "0px"); }}><span /><span /><span /></button><p className="content-note">A study in balance. Move your pointer, tap, or press Enter to rearrange.</p></MacWindow>
  </div>;
}
