"use client";

import { useEffect, useRef } from "react";

type Bubble = { element: HTMLElement; button: HTMLButtonElement; x: number; y: number; vx: number; vy: number; size: number };

export function useBubbleField(category: string, paused: boolean) {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const wake = useRef<() => void>(() => {});
  useEffect(() => { pausedRef.current = paused; wake.current(); }, [paused]);
  useEffect(() => {
    const field = host.current;
    if (!field) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let bubbles: Bubble[] = [];
    let width = 0, height = 0, frame = 0, previous = 0, visible = false;
    const paint = () => bubbles.forEach(bubble => { bubble.element.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`; });
    const initialize = () => {
      cancelAnimationFrame(frame); frame = 0;
      field.dataset.bubbleReady = String(!preference.matches);
      if (preference.matches) { field.style.height = ""; field.dataset.running = "false"; return; }
      width = field.clientWidth;
      const elements = [...field.querySelectorAll<HTMLElement>(".technology-group li")];
      const size = width < 500 ? 88 : 96;
      const columns = Math.max(1, Math.floor((width - 24) / (size + 20)));
      height = Math.max(420, Math.ceil(elements.length / columns) * (size + 20) + 32);
      field.style.height = `${height}px`;
      const placed: Bubble[] = [];
      bubbles = elements.map((element, index) => {
        const angle = index * 2.4 + .7;
        let x = 8, y = 8, best = -1;
        for (let attempt = 0; attempt < 600; attempt++) {
          const candidateX = 8 + Math.random() * Math.max(0, width - size - 16);
          const candidateY = 8 + Math.random() * Math.max(0, height - size - 16);
          const separation = placed.length ? Math.min(...placed.map(other => Math.hypot(candidateX - other.x, candidateY - other.y))) : Infinity;
          if (separation > best) { x = candidateX; y = candidateY; best = separation; }
          if (separation > size + 10) break;
        }
        const bubble = { element, button: element.querySelector("button")!, size, x, y,
          vx: Math.cos(angle) * 15, vy: Math.sin(angle) * 15 };
        placed.push(bubble);
        return bubble;
      });
      paint(); start();
    };
    const frozen = (bubble: Bubble) => bubble.button.matches(":hover, :focus");
    const tick = (now: number) => {
      frame = 0;
      const running = visible && !pausedRef.current && !document.hidden && !preference.matches;
      field.dataset.running = String(running);
      if (!running) return;
      const dt = Math.min((now - previous) / 1000 || .016, .035); previous = now;
      bubbles.forEach((bubble, index) => {
        if (frozen(bubble)) return;
        bubble.vx += Math.sin(now / 3800 + index * 1.7) * dt * 2;
        bubble.vy += Math.cos(now / 4200 + index * 2.1) * dt * 2;
        const speed = Math.hypot(bubble.vx, bubble.vy);
        if (speed > 23) { bubble.vx *= 23 / speed; bubble.vy *= 23 / speed; }
        bubble.x += bubble.vx * dt; bubble.y += bubble.vy * dt;
      });
      for (let a = 0; a < bubbles.length; a++) for (let b = a + 1; b < bubbles.length; b++) {
        const one = bubbles[a], two = bubbles[b];
        const dx = two.x - one.x, dy = two.y - one.y;
        const distance = Math.hypot(dx, dy) || 1, minimum = (one.size + two.size) / 2 + 6;
        if (distance >= minimum) continue;
        const nx = dx / distance, ny = dy / distance, overlap = (minimum - distance) / 2;
        if (!frozen(one)) { one.x -= nx * overlap; one.y -= ny * overlap; }
        if (!frozen(two)) { two.x += nx * overlap; two.y += ny * overlap; }
        const relative = (two.vx - one.vx) * nx + (two.vy - one.vy) * ny;
        if (relative < 0) { one.vx += relative * nx; one.vy += relative * ny; two.vx -= relative * nx; two.vy -= relative * ny; }
      }
      bubbles.forEach(bubble => {
        if (bubble.x < 8 || bubble.x > width - bubble.size - 8) bubble.vx *= -1;
        if (bubble.y < 8 || bubble.y > height - bubble.size - 8) bubble.vy *= -1;
        bubble.x = Math.max(8, Math.min(width - bubble.size - 8, bubble.x));
        bubble.y = Math.max(8, Math.min(height - bubble.size - 8, bubble.y));
      });
      paint(); frame = requestAnimationFrame(tick);
    };
    function start() { if (!frame) { previous = performance.now(); frame = requestAnimationFrame(tick); } }
    wake.current = start;
    const resize = new ResizeObserver(() => { if (Math.abs(field.clientWidth - width) > 1) initialize(); });
    resize.observe(field);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    observer.observe(field);
    preference.addEventListener("change", initialize);
    document.addEventListener("visibilitychange", start);
    initialize();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect(); preference.removeEventListener("change", initialize); document.removeEventListener("visibilitychange", start); wake.current = () => {}; };
  }, [category]);
  return host;
}
