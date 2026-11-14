"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Never hide server content or leave it waiting for hydration.
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className="reveal" initial={false} whileInView={reduced !== false ? undefined : { y: [20, 0], opacity: [0.25, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, ease: "easeOut" }}>{children}</motion.div>;
}
