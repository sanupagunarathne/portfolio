import { CinematicWork } from "@/components/cinematic-work";
import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/lib/section-metadata";
export const metadata=sectionMetadata("Work","/work");
export default function WorkPage(){return <SectionPage title="Work"><CinematicWork /></SectionPage>;}
