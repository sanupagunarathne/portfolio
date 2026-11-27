import type { ReactNode } from "react";
export function SectionPage({title, children}: {title:string; children:ReactNode}) {
 return <main id="main-content" tabIndex={-1} className="section-page"><h1 className="sr-only">{title}</h1>{children}</main>;
}
