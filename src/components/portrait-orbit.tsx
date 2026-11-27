"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
const platforms = [ ["OpenAI", "openai"], ["Claude", "claude"], ["Gemini", "gemini"], ["GitHub Copilot", "copilot"], ["Perplexity", "perplexity"], ["DeepSeek", "deepseek"], ["Grok", "grok"], ["Meta AI", "meta"], ["Mistral AI", "mistral"], ["Hugging Face", "huggingface"] ];
export function PortraitOrbit() {
  const host = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    const element = host.current; if (!element) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, last = 0, time = elapsed.current, visible = false;
    const draw = (now: number) => {
      frame = 0; const dt = last ? Math.min(now-last,50) : 0; last = now;
      if (!media.matches && !element.matches(":focus-within")) time += dt / 1000;
      elapsed.current = time;
      element.dataset.ready = "true";
      const w = element.clientWidth, h = element.clientHeight;
      element.querySelectorAll<HTMLElement>(".ai-orbiter").forEach((logo,i) => {
        const angle = i * Math.PI * 2 / platforms.length + time * (.13 + i % 3 * .025);
        const inclination = [-.35, .35, -.15][i%3];
        const x = Math.cos(angle) * w * (.38 + i % 3 * .045);
        const z = Math.sin(angle);
        const y = Math.sin(angle) * h * (.16 + i % 3 * .04) + x * inclination;
        const scale = .8 + (z + 1) * .16;
        logo.style.transform = `translate(-50%,-50%) translate(${x}px,${y}px) scale(${scale})`;
        logo.style.zIndex = z > 0 ? "4" : "0";
      });
      if (visible && !document.hidden && !media.matches) frame = requestAnimationFrame(draw);
    };
    const wake = () => { cancelAnimationFrame(frame); frame = 0; last = 0; if (!document.hidden) frame = requestAnimationFrame(draw); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else {cancelAnimationFrame(frame); frame=0;} }); observer.observe(element);
    const visibility = () => { if (document.hidden) {cancelAnimationFrame(frame); frame=0;} else if (visible) wake(); };
    const resize = new ResizeObserver(wake); resize.observe(element);
    media.addEventListener("change",wake); document.addEventListener("visibilitychange",visibility);
    wake(); return () => {cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();media.removeEventListener("change",wake);document.removeEventListener("visibilitychange",visibility);};
  }, []);
  return <div ref={host} className="portrait-orbits" role="group" aria-label="Orbiting AI platforms"><span className="ai-orbit-path" aria-hidden="true" />{platforms.map(([name, file]) => <span className="ai-orbiter" key={name} tabIndex={0}><Image src={`/images/ai/${file}.svg`} width={26} height={26} alt={name} /><span className="ai-tooltip">{name}</span></span>)}</div>;
}
