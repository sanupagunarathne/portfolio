"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SculptureFallback } from "./sculpture-fallback";

const Scene = dynamic(() => import("./sculpture-scene"), { ssr: false, loading: () => null });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ExpertiseSculpture() {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [compact, setCompact] = useState(true);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [still, setStill] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [turn, setTurn] = useState(-.4);
  const [reset, setReset] = useState(0);
  const onReady = useCallback(() => setReady(true), []);
  const onLost = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const screen = window.matchMedia("(max-width: 767px)");
    const update = () => { setReduced(motion.matches); setCompact(screen.matches); };
    const visibility = () => setForeground(document.visibilityState === "visible");
    update(); visibility();
    motion.addEventListener("change", update); screen.addEventListener("change", update);
    document.addEventListener("visibilitychange", visibility);
    const proximity = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setNear(true); }, { rootMargin: "150px" });
    const viewport = new IntersectionObserver(entries => setVisible(entries[0].isIntersecting));
    if (host.current) { proximity.observe(host.current); viewport.observe(host.current); }
    return () => {
      motion.removeEventListener("change", update); screen.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility); proximity.disconnect(); viewport.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!near || reduced || still || available !== null) return;
    const frame = requestAnimationFrame(() => {
    const canvas = document.createElement("canvas");
    try {
      const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
      setAvailable(Boolean(context));
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch { setAvailable(false); }
    });
    return () => cancelAnimationFrame(frame);
  }, [near, reduced, still, available]);

  const enabled = near && !reduced && !still && available === true && !failed;
  useEffect(() => {
    if (!enabled || ready) return;
    const timeout = window.setTimeout(onLost, 12_000);
    return () => window.clearTimeout(timeout);
  }, [enabled, ready, onLost]);
  const interactive = enabled && ready;
  const status = reduced ? "A still moment. Reduced motion is respected." : still ? "Static view selected." : failed || available === false ? "Static view. Interactive graphics are unavailable." : interactive ? "Drag to explore, or use the rotation buttons. Auto-rotation can be paused." : "A retro computer, built in code.";

  return <div ref={host} className="expertise-sculpture" role="group" aria-label="Retro computer">
    <div className="sculpture-stage">
      {!interactive && <SculptureFallback />}
      {enabled && <SceneBoundary onError={onLost}><div className={`sculpture-canvas ${ready ? "is-ready" : ""}`}><Scene compact={compact} animate={animate && visible && foreground} turn={turn} reset={reset} onReady={onReady} onLost={onLost} /></div></SceneBoundary>}
    </div>
    <p className="sculpture-status" role="status">{status}</p>
    <div className="sculpture-controls" role="group" aria-label="Sculpture controls">
      {interactive && <><button type="button" aria-label="Rotate sculpture left" onClick={() => setTurn(value => value - Math.PI / 8)}>←</button><button type="button" aria-label="Rotate sculpture right" onClick={() => setTurn(value => value + Math.PI / 8)}>→</button><button type="button" onClick={() => { setTurn(-.4); setReset(value => value + 1); setAnimate(false); }}>Reset</button><button type="button" aria-pressed={animate} onClick={() => setAnimate(!animate)}>{animate ? "Pause" : "Animate"}</button></>}
      {!reduced && available === true && !failed && <button type="button" aria-pressed={still} onClick={() => { setStill(!still); setReady(false); setAnimate(true); }}>{still ? "Interactive view" : "Static view"}</button>}
    </div>
  </div>;
}
