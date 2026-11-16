import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function WorkPortal() {
  return <div className="work-portal">
    <div className="portal-stars" aria-hidden="true" />
    <div className="portal-orbit" aria-hidden="true"><span /><i /></div>
    <div className="portal-copy">
      <p className="eyebrow"><span className="status-dot" /> FOUR PROJECTS. ONE UNIVERSE.</p>
      <h3>A small step.<br />A whole new space.</h3>
      <p>Ideas, experiments, and things I&apos;m building.<br />Follow your curiosity.</p>
      <Link href="/work" className="button primary portal-enter">Enter my workspace <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </div>
    <span className="portal-coordinate" aria-hidden="true">SG — EXPLORATION 001</span>
    <span className="portal-caption" aria-hidden="true">THERE&apos;S MORE OUT THERE ↗</span>
  </div>;
}
