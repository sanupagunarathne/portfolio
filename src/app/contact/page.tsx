import { ContactContent } from "@/components/portfolio-pages";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata = sectionMetadata("Contact", "/contact");
export const dynamic = "force-dynamic";
export default function Page() { return <SectionPage title="Contact"><ContactContent /></SectionPage>; }
