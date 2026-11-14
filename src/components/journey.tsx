"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { timeline } from "@/data/timeline";

export function Journey() {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  return <ol className="journey-list">{timeline.map((milestone, index) => {
    const expanded = selected === milestone.id;
    return <motion.li initial={false} whileInView={reduced ? undefined : { opacity: [.65, 1], x: [-10, 0] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: index * .07 }} key={milestone.id} className={expanded ? "milestone-selected" : ""}>
      <span className="journey-point" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><p className="eyebrow">{milestone.label}</p><h3><button type="button" className="milestone-toggle" aria-expanded={expanded} aria-controls={`milestone-${milestone.id}`} onClick={() => setSelected(expanded ? null : milestone.id)}>{milestone.title}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button></h3>
      <p className="milestone-summary">{milestone.summary}</p><div id={`milestone-${milestone.id}`} className="milestone-expansion" data-expanded={expanded} inert={!expanded}><div><p className="milestone-detail">{milestone.detail}</p></div></div></div>
    </li>;
  })}</ol>;
}
