import type { CSSProperties } from "react";
import { Reveal } from "./reveal";

export function PhraseHeading({ title, id }: { title: string; id: string }) {
  return <h2 id={id} className="phrase-heading" aria-label={title}>{title.split(" ").map((word, index) => <span key={index} aria-hidden="true"><span className="phrase-word" style={{ "--word-index": index } as CSSProperties}>{word}</span>{" "}</span>)}</h2>;
}

export function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <Reveal><header className="section-heading"><p className="eyebrow">{number} / {label}</p><PhraseHeading title={title} id={id} /></header></Reveal>;
}
