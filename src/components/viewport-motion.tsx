"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: content is visible in SSR, with no JavaScript,
// and if IntersectionObserver/animation APIs are unavailable.
export function ViewportMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        element.dataset.revealed = "true";
        const heading = element.querySelector(".phrase-heading");
        heading?.setAttribute("data-typed", "true");
        if (preference.matches || element.contains(document.activeElement)) continue;
        const animation = element.animate([{ opacity: .25, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      }
    }, { threshold: .05 });
    document.querySelectorAll(".section-heading, .about-layout, .expertise-intro, .expertise-browser, .journey-list, .playground-grid, .interests-gallery, .contact-layout, .case-story section > :not(h2)").forEach(element => observer.observe(element));
    const stop = () => { if (preference.matches) animations.forEach(animation => animation.cancel()); };
    preference.addEventListener("change", stop);
    return () => { observer.disconnect(); preference.removeEventListener("change", stop); animations.forEach(animation => animation.cancel()); };
  }, [pathname]);
  return null;
}
