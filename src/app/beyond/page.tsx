import { BeyondContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("Beyond", "/beyond");
export default function Page() { return <SectionPage title="Beyond"><BeyondContent /></SectionPage>; }
