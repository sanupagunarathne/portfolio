"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { aboutParagraphs } from "@/data/about";
import { TypedText } from "./typed-text";

const subscribe = (callback: () => void) => { const media = matchMedia("(prefers-reduced-motion: reduce)"); media.addEventListener("change", callback); return () => media.removeEventListener("change", callback); };
const reducedSnapshot = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export function AboutLoop() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "out">("typing");
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const reduced = useSyncExternalStore(subscribe, reducedSnapshot, () => true);
  const host = useRef<HTMLDivElement>(null);
  const clock = useRef({ key: "", remaining: 0 });
  const text = aboutParagraphs[index];
  const running = visible && foreground && !paused && !reduced;
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (host.current) observer.observe(host.current);
    const update = () => setForeground(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    const key = `${index}-${phase}`;
    if (clock.current.key !== key) clock.current = { key, remaining: phase === "typing" ? [...text].length * 35 + 2 : phase === "holding" ? 5000 : 450 };
    if (!running) return;
    const start = performance.now();
    const timer = setTimeout(() => {
      if (phase === "typing") setPhase("holding");
      else if (phase === "holding") setPhase("out");
      else { setIndex(value => (value + 1) % aboutParagraphs.length); setPhase("typing"); }
    }, clock.current.remaining);
    return () => { clearTimeout(timer); clock.current.remaining = Math.max(0, clock.current.remaining - (performance.now() - start)); };
  }, [index, phase, running, text]);
  const move = (direction: number) => { setIndex(value => (value + direction + aboutParagraphs.length) % aboutParagraphs.length); setPhase("typing"); };
  return <div ref={host} className="about-loop" role="region" aria-label="About Sanupa paragraphs" data-phase={phase} data-running={running}>
    <div className={`about-paragraph ${phase === "out" && !reduced ? "is-leaving" : ""}`}>
      {aboutParagraphs.map((paragraph, number) => <p key={`measure-${number}`} className="about-measure" aria-hidden="true">{paragraph}</p>)}
      <p key={index} className={`typing-text ${running ? "" : "typing-paused"}`} data-typed={reduced ? undefined : "true"} ><span className="sr-only">{text}</span><TypedText text={text} /></p>
    </div>
    <div className="about-loop-controls"><button type="button" className="secondary button" aria-label="Previous About paragraph" onClick={() => move(-1)}>←</button><span>{index + 1} / {aboutParagraphs.length}</span><button type="button" className="secondary button" aria-label="Next About paragraph" onClick={() => move(1)}>→</button><button type="button" className="text-link" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Resume About loop" : "Pause About loop"}</button></div>
  </div>;
}
