import Link from "next/link";
export function BackLink({href="/", destination="Home"}: {href?: string; destination?: string}) {
 return <Link className="terminal-back" href={href} aria-label={`Back to ${destination}`} title={`Go up one level to ${destination}`}><span aria-hidden="true">←</span><span>{destination}</span></Link>;
}
