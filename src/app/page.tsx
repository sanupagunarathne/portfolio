import { HomeBird } from "@/components/home-bird";
import { personal } from "@/data/personal";
import { sectionMetadata } from "@/lib/section-metadata";
import { LegacySectionLink } from "@/components/legacy-section-link";
export const metadata = {...sectionMetadata("Sanupa Gunarathne", "/"),title:{absolute:"Sanupa Gunarathne — Portfolio"}};
export default function Home() { return <main id="main-content" tabIndex={-1} className="minimal-home"><LegacySectionLink /><div className="home-intro"><h1>{personal.name}</h1><p>{personal.description}</p><HomeBird/></div></main>; }
