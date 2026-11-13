"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    media.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className="site-header">
      <nav className="page-width nav-bar" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Sanupa home" onClick={() => setOpen(false)}>
          sanupa<span>.</span>
        </Link>
        <div className="desktop-links">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </div>
        <span className="nav-note">Engineering × creativity</span>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>
      <div id="mobile-navigation" className="mobile-links page-width" hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => {
            setOpen(false);
            document.querySelector<HTMLElement>(link.href)?.focus({ preventScroll: true });
          }}>{link.label}</a>
        ))}
      </div>
    </header>
  );
}
