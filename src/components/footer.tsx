import { SocialIcon } from "./social-icon";
import { personal } from "@/data/personal";
import { socials } from "@/data/socials";
export function Footer() { return <footer className="page-width footer compact-footer"><span>© {new Date().getFullYear()} {personal.name}</span><nav className="social-links" aria-label="Social links">{socials.map(social=><a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={`${social.name} (opens in a new tab)`}><SocialIcon name={social.name}/></a>)}</nav></footer>; }
