import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="page-width not-found"><p className="eyebrow">404 / NOTHING HERE YET</p><h1>Page not found.</h1><p>This address doesn&apos;t match a page in the portfolio.</p><Link className="button primary" href="/#work">Explore selected work ↗</Link></main>;
}
