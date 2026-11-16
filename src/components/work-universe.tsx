"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, List, Pause, Play, X } from "lucide-react";
import { projects } from "@/data/projects";
import { InterfaceSoundToggle } from "./interface-sounds";

const END = 3500;
const destinations = [200, 1300, 2400, 3500];
const coordinates = [[-.33, .14], [.32, -.13], [-.3, -.07], [.29, .1]];
const clamp = (value: number) => Math.max(0, Math.min(END, value));

export function WorkUniverse() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const depth = useRef(0);
  const target = useRef(0);
  const ambientTime = useRef(0);
  const navigate = useRef<(value: number) => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [indexOpen, setIndexOpen] = useState(false);
  const indexToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const scene = root.current;
    const surface = canvas.current;
    if (!scene || !surface) return;
    const context = surface.getContext("2d");
    if (!context) return; // Semantic project links remain available without Canvas.
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...scene.querySelectorAll<HTMLAnchorElement>(".universe-node")];
    const introduction = scene.querySelector<HTMLElement>(".universe-intro")!;
    const slider = scene.querySelector<HTMLInputElement>("#universe-depth")!;
    const readout = scene.querySelector<HTMLOutputElement>(".depth-value")!;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let width = 0, height = 0, frame = 0, last = 0, elapsed = ambientTime.current;
    let reduced = preference.matches;
    let lastDraw = 0;
    // A reproducible star field. Ambient events get different positions each cycle.
    let seed = 41;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    const stars = Array.from({ length: 380 }, () => ({ x: (random() - .5) * 6800, y: (random() - .5) * 4400, z: random() * 6000, size: .5 + random() * 1.1 }));
    const debris = Array.from({ length: 9 }, () => ({ x: random(), y: random(), r: 1 + random() * 2, speed: .3 + random() * .6 }));

    const draw = (time: number) => {
      frame = 0;
      if (document.hidden) { last = 0; return; }
      const dt = last ? Math.min(time - last, 50) : 16;
      last = time;
      if (!paused && !reduced) elapsed += dt;
      ambientTime.current = elapsed;
      const difference = target.current - depth.current;
      depth.current = reduced || paused || Math.abs(difference) < .15 ? target.current : depth.current + difference * (1 - Math.exp(-dt / 170));
      const moving = Math.abs(target.current - depth.current) > .15;
      // Cap the decorative render loop at 30fps. DOM depth remains smooth while traveling.
      if (time - lastDraw > 30 || moving || reduced || paused) {
        lastDraw = time;
        context.clearRect(0, 0, width, height);
        const focal = Math.min(width, height) * .9;
        for (const star of stars) {
          const distance = ((star.z - depth.current) % 6000 + 6000) % 6000 + 55;
          const scale = focal / distance;
          const x = width / 2 + star.x * scale, y = height / 2 + star.y * scale;
          if (x < 0 || x > width || y < 0 || y > height) continue;
          context.globalAlpha = Math.min(.82, .22 + scale * .36);
          context.fillStyle = "#e9e3d8";
          context.beginPath(); context.arc(x, y, Math.min(1.7, star.size * Math.max(.45, scale)), 0, Math.PI * 2); context.fill();
        }
        context.globalAlpha = 1;
        // Slow fragments drift independently; no external models, textures or downloads.
        for (const piece of debris) {
          const x = ((piece.x * width + elapsed * .006 * piece.speed) % (width + 80)) - 40;
          const y = piece.y * height + Math.sin(elapsed * .00013 + piece.x * 9) * 16;
          context.save(); context.translate(x, y); context.rotate(piece.x * 8 + elapsed * .00003);
          context.fillStyle = "#807c7766";
          context.beginPath(); context.moveTo(-piece.r, 0); context.lineTo(0, -piece.r * 1.8); context.lineTo(piece.r * 1.8, 1); context.lineTo(0, piece.r); context.closePath(); context.fill(); context.restore();
        }
        // One quiet satellite crossing, then a small distant star dissolves. Never full-screen flashes.
        if (!reduced) {
          const intervals = [18000, 23700, 15300, 26100];
          const period = intervals.reduce((sum, interval) => sum + interval, 0);
          let local = elapsed % period, event = 0;
          while (local >= intervals[event]) { local -= intervals[event]; event++; }
          const cycle = Math.floor(elapsed / period) * intervals.length + event;
          const phase = local / intervals[event];
          const band = .24 + (cycle % 3) * .18;
          if (phase < .5) {
            const x = -55 + (width + 110) * phase * 2, y = height * band + Math.sin(phase * 5) * 35;
            context.save(); context.translate(x, y); context.rotate(-.32);
            context.strokeStyle = "#a9a6a099"; context.lineWidth = .8;
            context.strokeRect(-4, -4, 8, 8); context.strokeRect(-20, -5, 12, 10); context.strokeRect(8, -5, 12, 10);
            context.beginPath(); context.moveTo(-8, 0); context.lineTo(8, 0); context.moveTo(0, -4); context.lineTo(2, -11); context.stroke(); context.restore();
          }
          if (phase > .68 && phase < .83) {
            const age = (phase - .68) / .15;
            const x = width * (.68 - (cycle % 3) * .2), y = height * (.3 + (cycle % 2) * .3);
            context.strokeStyle = `rgba(194,112,126,${(1 - age) * .5})`;
            context.beginPath(); context.arc(x, y, 2 + age * 24, 0, Math.PI * 2); context.stroke();
            for (let i = 0; i < 7; i++) {
              const angle = i * Math.PI * 2 / 7;
              context.fillStyle = `rgba(227,214,205,${(1 - age) * .6})`;
              context.fillRect(x + Math.cos(angle) * age * 35, y + Math.sin(angle) * age * 35, 1.2, 1.2);
            }
          }
        }
        nodes.forEach((node, index) => {
          const distance = 900 + index * 1100 - depth.current;
          const visible = distance > 180 && distance < 1900 && (index === 0 && height >= 560 || depth.current > 450);
          const scale = Math.min(1.3, 700 / Math.max(90, distance));
          const [nx, ny] = coordinates[index];
          const margin = width < 600 ? 110 : 150;
          const x = Math.max(margin, Math.min(width - margin, width / 2 + nx * Math.min(width, 1100) * scale));
          const y = Math.max(180, Math.min(height - 160, height / 2 + ny * Math.min(height, 850) * scale));
          node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
          node.style.setProperty("--node-scale", String(Math.max(.65, scale)));
          node.style.visibility = visible ? "visible" : "hidden";
          node.style.opacity = "1";
          node.tabIndex = visible ? 0 : -1;
        });
        introduction.style.opacity = depth.current > 180 ? "0" : "1";
        introduction.style.visibility = depth.current > 180 ? "hidden" : "visible";
        slider.value = String(Math.round(depth.current));
        readout.value = `${String(Math.round(depth.current / END * 100)).padStart(2, "0")}%`;
        slider.setAttribute("aria-valuetext", `${Math.round(depth.current / END * 100)} percent into the workspace`);
        scene.dataset.depth = String(Math.round(depth.current));
        scene.dataset.running = String(!paused && !reduced);
      }
      if ((!paused && !reduced) || moving) frame = requestAnimationFrame(draw);
    };
    const wake = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(draw); };
    const go = (value: number) => { target.current = clamp(value); wake(); };
    navigate.current = go;
    const resize = () => {
      const bounds = scene.getBoundingClientRect(); width = bounds.width; height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * dpr); surface.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDraw = -100; wake();
    };
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.target instanceof Element && event.target.closest(".universe-index")) return;
      event.preventDefault();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? height : 1);
      go(target.current + Math.max(-500, Math.min(500, delta)) * .85);
    };
    const key = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest("input, button, a")) return;
      const actions: Record<string, number> = { ArrowDown: 250, ArrowRight: 250, ArrowUp: -250, ArrowLeft: -250, PageDown: 850, PageUp: -850, " ": 850 };
      if (event.key in actions) { event.preventDefault(); go(target.current + actions[event.key]); }
      if (event.key === "Home" || event.key === "End") { event.preventDefault(); go(event.key === "Home" ? 0 : END); }
    };
    let touchY: number | null = null;
    const touchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1 || event.target instanceof Element && event.target.closest("input, button, .universe-index")) { touchY = null; return; }
      touchY = event.touches[0].clientY;
    };
    const touchMove = (event: TouchEvent) => {
      if (touchY === null || event.touches.length !== 1) return;
      const y = event.touches[0].clientY;
      event.preventDefault(); go(target.current + (touchY - y) * 4); touchY = y;
    };
    const visibility = () => { cancelAnimationFrame(frame); frame = 0; last = 0; if (document.hidden) scene.dataset.running = "false"; else wake(); };
    const change = () => { reduced = preference.matches; scene.dataset.reduced = String(reduced); lastDraw = -100; wake(); };
    const initialSlug = new URLSearchParams(window.location.search).get("project");
    const initialIndex = projects.findIndex(project => project.slug === initialSlug);
    if (initialIndex >= 0 && depth.current === 0) depth.current = target.current = destinations[initialIndex];
    scene.dataset.enhanced = "true"; scene.dataset.reduced = String(reduced);
    resize();
    const observer = new ResizeObserver(resize); observer.observe(scene);
    scene.addEventListener("wheel", wheel, { passive: false });
    scene.addEventListener("touchstart", touchStart, { passive: true });
    scene.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    preference.addEventListener("change", change);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); document.body.style.overflow = previousOverflow;
      scene.removeEventListener("wheel", wheel); scene.removeEventListener("touchstart", touchStart); scene.removeEventListener("touchmove", touchMove);
      window.removeEventListener("keydown", key); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", change);
      navigate.current = () => {};
    };
  }, [paused]);

  useEffect(() => {
    if (!indexOpen) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setIndexOpen(false); indexToggle.current?.focus(); } };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [indexOpen]);

  const travel = (direction: number) => {
    const next = direction > 0 ? destinations.find(value => value > target.current + 30) ?? END : [...destinations].reverse().find(value => value < target.current - 30) ?? 0;
    navigate.current(next);
  };
  return <main ref={root} id="main-content" tabIndex={-1} className="work-universe" aria-label="Project universe">
    <canvas ref={canvas} className="universe-stars" aria-hidden="true" />
    <div className="universe-nebula" aria-hidden="true" />
    <header className="universe-header">
      <Link href="/#work" className="universe-back"><ArrowLeft size={16} aria-hidden="true" /><span>Back to earth</span></Link>
      <span className="universe-wordmark">SG<span aria-hidden="true"> / </span><span>THE WORKSPACE</span></span>
      <div className="universe-tools"><InterfaceSoundToggle /><button type="button" aria-label={paused ? "Resume universe animation" : "Pause universe animation"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}</button><button ref={indexToggle} type="button" aria-label="Project index" aria-expanded={indexOpen} aria-controls="universe-index" onClick={() => setIndexOpen(!indexOpen)}>{indexOpen ? <X size={18} aria-hidden="true" /> : <List size={18} aria-hidden="true" />}</button></div>
    </header>
    <div className="universe-intro">
      <p className="eyebrow">A FIELD OF POSSIBILITIES</p>
      <h1>A few ideas.<br />Their own universe.</h1>
      <p>Keep exploring. See where it takes you.</p>
      <button type="button" className="universe-begin" onClick={() => navigate.current(650)}>Scroll to drift deeper <ArrowDown size={14} aria-hidden="true" /></button>
    </div>
    <div className="universe-projects" aria-label="Project destinations">
      {projects.map((project, index) => <Link key={project.slug} href={`/projects/${project.slug}`} className={`universe-node node-${index + 1}`} aria-label={`Explore ${project.title} project`}>
        <span className="node-orb" aria-hidden="true"><i /><span className="node-ring" /></span>
        <span className="node-label"><span className="node-number" aria-hidden="true">0{index + 1} /</span><span className="node-name">{project.title}<ArrowUpRight size={15} aria-hidden="true" /></span><span className="node-stack">{project.technologies.slice(0, 3).join(" · ")}</span></span>
      </Link>)}
    </div>
    <nav id="universe-index" className="universe-index" aria-label="Project index" hidden={!indexOpen}>
      <p className="eyebrow">CHOOSE A DESTINATION</p>
      {projects.map((project, index) => <div key={project.slug}><button type="button" aria-label={`Travel to ${project.title}`} onClick={() => { navigate.current(destinations[index]); setIndexOpen(false); indexToggle.current?.focus(); }}><span>0{index + 1}</span>{project.title}</button><Link href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}><ArrowUpRight size={18} aria-hidden="true" /></Link></div>)}
    </nav>
    <footer className="universe-footer">
      <span className="universe-hint">SCROLL / SWIPE / ↓<span className="reduced-hint">Motion reduced — choose a destination</span></span>
      <div className="depth-control"><label htmlFor="universe-depth">DEPTH <output className="depth-value" htmlFor="universe-depth">00%</output></label><input id="universe-depth" type="range" min="0" max={END} step="10" defaultValue="0" aria-label="Universe depth" onChange={event => navigate.current(Number(event.target.value))} /></div>
      <div className="universe-travel"><button type="button" aria-label="Previous destination" onClick={() => travel(-1)}><ArrowLeft size={17} aria-hidden="true" /></button><button type="button" aria-label="Next destination" onClick={() => travel(1)}><ArrowRight size={17} aria-hidden="true" /></button></div>
    </footer>
  </main>;
}
