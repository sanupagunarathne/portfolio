import { TypedText } from "./typed-text";

export function HeroHeadline({ text }: { text: string }) {
  return <h1 id="hero-title" className="typing-text" data-typed="true" aria-label={text}><TypedText text={text} /></h1>;
}
