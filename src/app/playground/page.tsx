import { PlaygroundContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("Playground", "/playground");
export default function Page() { return <SectionPage title="Playground"><PlaygroundContent /></SectionPage>; }
