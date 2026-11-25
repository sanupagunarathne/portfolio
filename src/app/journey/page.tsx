import { JourneyContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("Journey", "/journey");
export default function Page() { return <SectionPage title="Journey"><JourneyContent /></SectionPage>; }
