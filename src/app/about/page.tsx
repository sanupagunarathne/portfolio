import { AboutContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("About", "/about");
export default function Page() { return <SectionPage title="About"><AboutContent /></SectionPage>; }
