"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Content stays visible during SSR and with JavaScript unavailable.
export function Reveal({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div className="reveal" initial={false} whileInView={reduced ? undefined : { y: [12, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, ease: "easeOut" }}>{children}</motion.div>;
}
