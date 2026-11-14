"use client";

import Link from "next/link";
import { Brand } from "./brand";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Technologies" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const update = () => {
      const section = [...links].reverse().find(({ href }) => {
        const element = document.querySelector(href);
        return element && element.getBoundingClientRect().top <= 180;
      });
      setActive(section?.href ?? "#home");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
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
        <Link className="wordmark" href="/" aria-label="Sanupa Gunarathne home" onClick={() => setOpen(false)}>
          <Brand />
        </Link>
        <div className="desktop-links">
          {links.map((link) => <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined}>{link.label}</a>)}
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => { toggle.current?.focus({ preventScroll: true }); setOpen(!open); }}
        >
          {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>
      </nav>
      <div id="mobile-navigation" className="mobile-links page-width" hidden={!open}>
        {links.map((link) => (
          <a key={link.href} href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={(event) => {
            event.preventDefault();
            setOpen(false);
            window.history.pushState(null, "", link.href);
            const target = document.querySelector<HTMLElement>(link.href);
            target?.focus({ preventScroll: true });
            target?.scrollIntoView();
          }}>{link.label}</a>
        ))}
      </div>
    </header>
  );
}
