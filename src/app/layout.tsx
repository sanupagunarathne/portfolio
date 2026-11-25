import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/doto";
import "./globals.css";
import "./motion.css";
import "./polish.css";
import "./refinement.css";
import "./cinematic.css";
import "./project-sites.css";
import "./page-structure.css";
import { ViewportMotion } from "@/components/viewport-motion";
import { Footer } from "@/components/footer";
import { InterfaceSoundProvider } from "@/components/interface-sounds";
import { Navigation } from "@/components/navigation";
import { personal } from "@/data/personal";

import { getSiteOrigin } from "@/lib/site";

const origin = getSiteOrigin();

export const metadata: Metadata = {
  title: { default: "Sanupa Gunarathne — Developer & Creative", template: "%s — Sanupa Gunarathne" },
  metadataBase: origin,
  robots: origin ? { index: true, follow: true } : { index: false, follow: false },
  description: personal.description,
  openGraph: {
    title: "Sanupa Gunarathne — Developer & Creative",
    description: personal.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("portfolio-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}` }} /></head>
      <body><InterfaceSoundProvider>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navigation />
        <ViewportMotion />
        {children}
        <Footer />
      </InterfaceSoundProvider></body>
    </html>
  );
}
