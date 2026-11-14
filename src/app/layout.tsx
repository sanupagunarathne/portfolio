import type { Metadata } from "next";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "@fontsource-variable/doto";
import "./globals.css";
import { Footer } from "@/components/footer";
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
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
