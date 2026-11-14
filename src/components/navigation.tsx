"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./brand";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const links = [
  { href: "#hero", label: "Home" }, { href: "#work", label: "Work" },
  { href: "#about", label: "About" }, { href: "#expertise", label: "Expertise" },
  { href: "#journey", label: "Journey" }, { href: "#playground", label: "Playground" },
  { href: "#beyond", label: "Beyond" }, { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const home = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const anchorTarget = useRef<string | null>(null);
  const desktop = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
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

  useEffect(() => {
    const update = () => {
      if (open || anchorTarget.current) return;
      const sections = links.map(link => document.getElementById(link.href.slice(1))).filter((section): section is HTMLElement => Boolean(section));
      const offset = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 140;
      const passed = sections.filter(section => section.getBoundingClientRect().top <= offset + 80);
      setActive(passed.at(-1)?.id ?? sections[0]?.id ?? null);
    };
    let frame = 0;
    const scroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const unlock = () => { anchorTarget.current = null; scroll(); };
    const key = (event: KeyboardEvent) => { if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) unlock(); };
    const outsideClick = (event: MouseEvent) => { if (event.target instanceof Element && !event.target.closest(".site-header")) unlock(); };
    window.addEventListener("click", outsideClick);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchmove", unlock, { passive: true });
    window.addEventListener("keydown", key);
    window.addEventListener("popstate", unlock);
    scroll(); window.addEventListener("scroll", scroll, { passive: true }); window.addEventListener("resize", scroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", scroll); window.removeEventListener("wheel", unlock); window.removeEventListener("touchmove", unlock); window.removeEventListener("keydown", key); window.removeEventListener("popstate", unlock); window.removeEventListener("click", outsideClick); };
  }, [pathname, open]);

  useEffect(() => {
    const container = desktop.current;
    const marker = indicator.current;
    if (!container || !marker) return;
    const update = () => {
      const link = container.querySelector<HTMLElement>('a[aria-current="location"]');
      if (!link) { marker.style.opacity = "0"; return; }
      marker.style.width = `${link.offsetWidth}px`;
      marker.style.height = `${link.offsetHeight}px`;
      marker.style.transform = `translate(${link.offsetLeft}px, ${link.offsetTop}px)`;
      marker.style.opacity = "1";
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    document.fonts.ready.then(update);
    return () => observer.disconnect();
  }, [active, pathname]);

  return (
    <header className="site-header">
      <nav className="page-width nav-bar" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Sanupa Gunarathne home" onClick={() => { anchorTarget.current = null; setActive("hero"); setOpen(false); }}>
          <Brand />
        </Link>
        <div ref={desktop} className="desktop-links">
          <span ref={indicator} className="nav-indicator" aria-hidden="true" />
          {links.map((link) => <a key={link.href} onClick={() => { anchorTarget.current = null; }} href={home ? link.href : `/${link.href}`} aria-current={home && active === link.href.slice(1) ? "location" : undefined}>{link.label}</a>)}
        </div>
        <span className="nav-note">{"// developer & creative"}</span>
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
        {links.map((link, index) => (
          <a key={link.href} style={{ "--link-index": index } as CSSProperties} href={home ? link.href : `/${link.href}`} aria-current={home && active === link.href.slice(1) ? "location" : undefined} onClick={event => {
            setOpen(false);
            if (home) {
              event.preventDefault();
              anchorTarget.current = link.href.slice(1);
              setActive(link.href.slice(1));
              history.pushState(null, "", link.href);
              requestAnimationFrame(() => {
                const section = document.querySelector<HTMLElement>(link.href);
                section?.scrollIntoView({ block: "start", behavior: "instant" });
                section?.focus({ preventScroll: true });
                setActive(link.href.slice(1));
              });
            }
          }}>{link.label}</a>
        ))}
      </div>
    </header>
  );
}
