"use client";

import { useState } from "react";
import { timeline } from "@/data/timeline";

export function Journey() {
  const [selected, setSelected] = useState<string | null>(null);
  return <ol className="journey-list">{timeline.map((milestone, index) => {
    const expanded = selected === milestone.id;
    return <li key={milestone.id} className={expanded ? "milestone-selected" : ""}>
      <span className="journey-point" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div><p className="eyebrow">{milestone.label}</p><h3><button type="button" className="milestone-toggle" aria-expanded={expanded} aria-controls={`milestone-${milestone.id}`} onClick={() => setSelected(expanded ? null : milestone.id)}>{milestone.title}<span aria-hidden="true">{expanded ? "−" : "+"}</span></button></h3>
      <p className="milestone-summary">{milestone.summary}</p><div id={`milestone-${milestone.id}`} hidden={!expanded}><p className="milestone-detail">{milestone.detail}</p></div></div>
    </li>;
  })}</ol>;
}
