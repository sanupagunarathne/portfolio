import { ExpertiseContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("Expertise", "/expertise");
export default function Page() { return <SectionPage title="Expertise"><ExpertiseContent /></SectionPage>; }
