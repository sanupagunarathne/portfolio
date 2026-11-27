import { AboutContent } from "@/components/portfolio-pages";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("About", "/about");
export default function Page() { return <main id="main-content" tabIndex={-1}><h1 className="sr-only">About</h1><AboutContent /></main>; }
