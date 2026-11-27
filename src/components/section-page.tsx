import type { ReactNode } from "react";
export function SectionPage({title, children}: {title:string; children:ReactNode}) {
 return <main id="main-content" tabIndex={-1} className="section-page"><header className="route-heading page-width"><p className="route-file" aria-hidden="true">~/{title.toLowerCase()}</p><h1>{title}</h1></header>{children}</main>;
}
