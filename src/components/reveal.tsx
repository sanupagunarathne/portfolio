"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Never hide server content or leave it waiting for hydration.
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={`reveal ${className}`} initial={false} whileInView={reduced ? undefined : { y: [16, 0], opacity: [.65, 1] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export function HeroHeadline({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return <h1 id="hero-title">{text.split(" ").map((word, index) => <span key={index}><motion.span className="hero-word" initial={false} whileInView={reduced ? undefined : { y: [14, 0], opacity: [.6, 1] }} viewport={{ once: true }} transition={{ duration: .65, delay: index * .055, ease: [.22, 1, .36, 1] }}>{word}</motion.span>{" "}</span>)}</h1>;
}
