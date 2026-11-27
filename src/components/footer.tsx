import Link from "next/link";
import { SocialIcon } from "./social-icon";
import { Brand } from "./brand";
import { ArrowUpRight } from "lucide-react";
import { personal } from "@/data/personal";
import { socials } from "@/data/socials";

export function Footer() { return (
      <footer className="page-width footer">
        <div className="footer-main">
          <div><Link href="/" className="wordmark" aria-label="Sanupa Gunarathne home"><Brand /></Link><p>Thoughtfully built. Always curious.</p></div>
          <nav className="social-links" aria-label="Social links">
            {socials.map((social) => <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"><SocialIcon name={social.name} />{social.name}<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a>)}
          </nav>
        </div>
        <div className="footer-bottom"><span className="mono">© {new Date().getFullYear()} {personal.name}</span><Link className="back-to-top" href="/">cd ~ / home</Link></div>
      </footer>
); }
