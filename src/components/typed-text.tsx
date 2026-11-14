import type { CSSProperties } from "react";

// Layout is reserved from SSR; one character and caret advance at a time.
export function TypedText({ text }: { text: string }) {
  let character = 0;
  return <>{text.split(" ").map((word, index, words) => {
    const letters = [...word].map((letter, offset) => <span className="type-character" key={offset} style={{ "--character": character++ } as CSSProperties}>{letter}</span>);
    const space = index < words.length - 1 ? <span className="type-character type-space" style={{ "--character": character++ } as CSSProperties}>{" "}</span> : null;
    return <span key={index} aria-hidden="true"><span className="type-word">{letters}</span>{space}</span>;
  })}</>;
}
