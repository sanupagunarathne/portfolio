"use client";

import { useEffect, useRef, type RefObject } from "react";

// Independent frequencies create bounded, wandering motion rather than an orbit.
// Only the visual inside each stationary button moves; React does not render per frame.
export function useFreeFloat(ref: RefObject<HTMLDivElement | null>, paused: boolean, category: string) {
  const clock = useRef({ elapsed: 0, x: 0, y: 0 });
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const tokens = Array.from(root.querySelectorAll<HTMLElement>(".technology-token"));
    let visible = false;
    let frame = 0;
    let last = 0;
    let elapsed = clock.current.elapsed;
    let x = clock.current.x, y = clock.current.y, targetX = 0, targetY = 0;
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, .05) : 0;
      last = now;
      elapsed += dt;
      clock.current.elapsed = elapsed;
      const blend = 1 - Math.exp(-dt * 4);
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      clock.current.x = x;
      clock.current.y = y;
      tokens.forEach(token => {
        const seed = Number(token.dataset.seed);
        const phase = seed * 2.399963;
        const t = elapsed * (.35 + (seed % 7) * .021);
        const entrance = Math.min(elapsed / 1.5, 1);
        const dx = Math.sin(t + phase) * 5 + Math.sin(t * .613 + phase * 1.7) * 3;
        const dy = Math.cos(t * .773 + phase) * 7 + Math.sin(t * 1.137 + phase * .4) * 4;
        const z = Math.sin(t * .457 + phase) * 5;
        const depth = .4 + (seed % 4) * .15;
        token.style.transform = `translate3d(${dx * entrance + x * depth}px, ${dy * entrance + y * depth}px, ${z * entrance}px) rotate(${Math.sin(t * .529 + phase) * 2}deg)`;
      });
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      const allowed = !paused && !reduced.matches && fine.matches;
      const running = allowed && visible && !document.hidden;
      root.dataset.floating = running ? "running" : "paused";
      if (reduced.matches || !fine.matches) tokens.forEach(token => { token.style.transform = ""; });
      if (running) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = root.getBoundingClientRect();
      targetX = ((event.clientX - bounds.left) / bounds.width - .5) * 8;
      targetY = ((event.clientY - bounds.top) / bounds.height - .5) * 8;
    };
    const leave = () => { targetX = 0; targetY = 0; };
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(root);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, [ref, paused, category]);
}
