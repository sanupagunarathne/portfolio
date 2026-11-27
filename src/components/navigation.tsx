"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { InterfaceSoundToggle } from "./interface-sounds";

const links = [["/", "Home"], ["/work", "Work"], ["/about", "About"], ["/expertise", "Expertise"], ["/journey", "Journey"], ["/playground", "Playground"], ["/beyond", "Beyond"], ["/contact", "Contact"]];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const active = (href: string) => pathname === href || (href === "/work" && pathname.startsWith("/projects/"));
  const current = links.find(([href]) => active(href)) ?? links[0];

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", escape);
    window.addEventListener("pointerdown", outside);
    document.documentElement.style.setProperty("--header-height", "0px");
    return () => { window.removeEventListener("keydown", escape); window.removeEventListener("pointerdown", outside); };
  }, [open]);

  return <header ref={header} className="site-header compact-dock">
    <nav aria-label="Main navigation" className="dock-bar">
      <button ref={toggle} className="dock-toggle" aria-expanded={open} aria-controls="dock-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
        <span>Menu</span>{open ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
      </button>
      <Link href={current[0]} className="dock-current" aria-current="page" onClick={() => setOpen(false)}>{current[1]}</Link>
    </nav>
    <div id="dock-navigation" className="dock-panel" hidden={!open}>
      <p className="dock-caption">~/ explore</p>
      <nav aria-label="Portfolio pages">{links.map(([href, label]) => <Link key={href} href={href} aria-current={active(href) ? "page" : undefined} onClick={() => setOpen(false)}><span>{label}</span><ArrowUpRight size={14} aria-hidden="true" /></Link>)}</nav>
      <div className="dock-preferences"><span>Make yourself at home.</span><InterfaceSoundToggle /><ThemeToggle /></div>
    </div>
    <noscript><nav className="no-script-navigation" aria-label="Pages without JavaScript">{links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}</nav></noscript>
  </header>;
}
