import { TypedText } from "./typed-text";
import { Reveal } from "./reveal";

export function PhraseHeading({ title, id }: { title: string; id: string }) {
  return <h2 id={id} className="phrase-heading typing-text" aria-label={title}><TypedText text={title} /></h2>;
}

export function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <Reveal><header className="section-heading"><p className="eyebrow">{number} / {label}</p><PhraseHeading title={title} id={id} /></header></Reveal>;
}
