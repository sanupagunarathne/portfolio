import type { CSSProperties } from "react";

export function HeroHeadline({ text }: { text: string }) {
  return <h1 id="hero-title" aria-label={text}>{text.split(" ").map((word, index) => <span key={index} aria-hidden="true"><span className="hero-word" style={{ "--word-index": index } as CSSProperties}>{word}</span>{" "}</span>)}</h1>;
}
