export function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <header className="section-heading"><p className="eyebrow">{number} / {label}</p><h2 id={id}>{title}</h2></header>;
}
