"use client";

import { useState, type CSSProperties } from "react";
import { Reveal } from "./reveal";
import { MacWindow } from "./mac-window";

export function Playground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [turned, setTurned] = useState(false);
  const reset = () => { setOffset({ x: 0, y: 0 }); setTurned(false); };
  const [text, setText] = useState("hello, world.");
  const [weight, setWeight] = useState(600);
  return <Reveal className="playground-grid">
    <MacWindow title="type-lab.tsx"><label htmlFor="type-input">A thought, in dots.</label><input id="type-input" value={text} maxLength={32} onChange={event => setText(event.target.value)} autoComplete="off" spellCheck={false} /><div className="type-preview" style={{ fontWeight: weight }} aria-hidden="true">{text || "Your words here."}</div><label className="range-label" htmlFor="type-weight">Font weight <output htmlFor="type-weight">{weight}</output></label><input id="type-weight" type="range" min="100" max="900" step="100" value={weight} onChange={event => setWeight(Number(event.target.value))} /><p className="content-note">Type something. Give it a little weight.</p></MacWindow>
    <MacWindow title="interaction.css"><div className={`orbit-study free-study${turned ? " is-turned" : ""}`} role="button" tabIndex={0} aria-label="Geometric composition. Move your pointer or use arrow keys to reshape. Enter turns the shapes; Escape resets." style={{ "--study-x": `${offset.x}px`, "--study-y": `${offset.y}px` } as CSSProperties} onPointerMove={event => {
      if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      setOffset({ x: (event.clientX - bounds.left - bounds.width / 2) * .12, y: (event.clientY - bounds.top - bounds.height / 2) * .12 });
    }} onPointerLeave={() => setOffset({ x: 0, y: 0 })} onClick={() => setTurned(!turned)} onKeyDown={event => {
      if (event.key === "Escape") reset();
      if (["Enter", " "].includes(event.key)) { event.preventDefault(); setTurned(!turned); }
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setOffset(previous => ({ x: Math.max(-24, Math.min(24, previous.x + (event.key === "ArrowRight" ? 6 : event.key === "ArrowLeft" ? -6 : 0))), y: Math.max(-24, Math.min(24, previous.y + (event.key === "ArrowDown" ? 6 : event.key === "ArrowUp" ? -6 : 0))) }));
      }
    }}><span /><span /><span /></div><p className="content-note">Move to reshape. Tap or press Enter to turn. Arrow keys move the composition.</p><button type="button" className="text-link" onClick={reset}>Reset shapes</button></MacWindow>
  </Reveal>;
}
