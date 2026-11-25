import Link from "next/link";
export function BackLink({href="/", destination="Home"}: {href?: string; destination?: string}) {
 return <Link className="terminal-back" href={href} aria-label={`cd .. — Back to ${destination}`} title={`Go up one level to ${destination}`}><code>cd ..</code><span className="back-destination">/ {destination.toLowerCase()}</span></Link>;
}
