"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { cameraZ, projectZ, projectProgress, smooth, clamp01, JourneyState } from "@/lib/journey";
const Scene = dynamic(() => import("./journey-scene"), {ssr:false});
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = {failed:false};
  static getDerivedStateFromError() { return {failed:true}; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
export function CinematicWork() {
  const host = useRef<HTMLElement>(null);
  const requestedHandled = useRef(false);
  const state = useRef(new JourneyState());
  const [capable, setCapable] = useState(false);
  const router = useRouter();
  const launch = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (launch.current) clearTimeout(launch.current); }, []);
  const [simplified, setSimplified] = useState(false);
  const openProject = useCallback((index:number) => {
    const url=`/projects/${projects[index].slug}`;
    if (launch.current) return;
    if (!capable || simplified) { router.push(url); return; }
    state.current.focus=index; state.current.zoom=performance.now();
    host.current?.setAttribute("data-launching","true");
    router.prefetch(url);
    launch.current=setTimeout(()=>router.push(url),850);
  }, [router, capable, simplified]);
  const fail = useCallback(() => setCapable(false), []);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      let supported = false;
      if (!media.matches) { try { const gl = document.createElement("canvas").getContext("webgl2"); supported = !!gl; gl?.getExtension("WEBGL_lose_context")?.loseContext(); } catch {} }
      setCapable(supported); setSimplified(media.matches);
    };
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const go = useCallback((progress: number) => {
    const element = host.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top + scrollY;
    window.scrollTo({top: top + progress * (element.offsetHeight - innerHeight), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"});
  }, []);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = clamp01(-rect.top / Math.max(1, element.offsetHeight - innerHeight));
      const arrival = smooth(0, 1, (innerHeight - rect.top) / innerHeight);
      const visible = rect.top < innerHeight && rect.bottom > 0;
      state.current.progress = progress;
      state.current.visible = visible && !document.hidden;
      state.current.running = visible && !document.hidden && !simplified;
      state.current.invalidate();
      element.dataset.progress = progress.toFixed(4);
      element.dataset.cameraZ = cameraZ(progress).toFixed(2);
      element.dataset.running = String(state.current.running);
      element.style.setProperty("--arrival", String(arrival));
      element.style.setProperty("--exit", String(smooth(.88, 1, progress)));
      element.style.setProperty("--entrance", String(1 - smooth(.035, .18, progress)));
      document.querySelector(".site-header")?.classList.toggle("over-space", capable && !simplified && rect.top <= 100 && progress < .95 && visible);
      const exit = element.querySelector<HTMLElement>(".journey-exit");
      if (exit) exit.inert = !capable || simplified || progress < .92;
      const entrance = element.querySelector<HTMLElement>(".journey-entrance");
      const controls = element.querySelector<HTMLElement>(".journey-controls");
      if (controls) controls.inert = capable && !simplified && progress > .98;
      if (entrance) entrance.inert = capable && !simplified && progress > .18;
      element.querySelectorAll<HTMLElement>(".journey-project").forEach((node, index) => {
        const distance = cameraZ(progress) - projectZ(index);
        const alpha = smooth(1, 4, distance) * (1 - smooth(12, 18, distance));
        node.style.setProperty("--project-opacity", String(alpha));
        node.inert = capable && !simplified && alpha < .01;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule); observer.observe(element);
    window.addEventListener("scroll", schedule, {passive:true}); window.addEventListener("resize", schedule); document.addEventListener("visibilitychange", schedule);
    schedule();
    const requested = new URLSearchParams(location.search).get("project");
    const index = projects.findIndex(p => p.slug === requested);
    if (index >= 0 && capable && !simplified && !requestedHandled.current) { const timer = setTimeout(() => { requestedHandled.current = true; go(projectProgress(index)); }, 100); return () => {clearTimeout(timer); cleanup();}; }
    return cleanup;
    function cleanup() { cancelAnimationFrame(frame); observer.disconnect(); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); document.removeEventListener("visibilitychange", schedule); document.querySelector(".site-header")?.classList.remove("over-space"); }
  }, [capable, simplified, go]);
  return <section ref={host} id="work" tabIndex={-1} className="cinematic-work" data-enhanced={capable && !simplified ? "true" : undefined} aria-labelledby="work-title">
    <div className="journey-viewport">
      {capable && !simplified && <div className="journey-renderer"><SceneBoundary onError={fail}><Scene state={state} onLost={fail} onSelect={openProject} /></SceneBoundary></div>}
      <header className="journey-entrance"><h2 id="work-title">A few ideas.<br />Their own universe.</h2><p>A collection of things I&apos;m building. Follow your curiosity.</p><button className="button primary" onClick={() => go(projectProgress(0))}>Enter my workspace <ArrowDown size={16} aria-hidden="true" /></button></header>
      <div className="journey-projects">{projects.map((project,index) => <article key={project.slug} className="journey-project" aria-labelledby={`${project.slug}-title`}><span className={`static-world world-${index}`} aria-hidden="true" /><h3 id={`${project.slug}-title`}>{project.title}</h3><p className="journey-stack">{project.technologies.slice(0,3).join(" · ")}</p><Link className="text-link" href={`/projects/${project.slug}`} onClick={event => { if (!capable || simplified || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || launch.current) return; event.preventDefault(); openProject(index); }}>Explore {project.title} <ArrowUpRight size={16} aria-hidden="true" /></Link></article>)}</div>
      <div className="journey-controls"><Link href="/about" className="text-link">About <ArrowDown size={14} aria-hidden="true" /></Link></div>
      <div className="journey-exit"><span>Beyond the work.</span><Link className="text-link" href="/about">About →</Link></div>
    </div>
  </section>;
}
