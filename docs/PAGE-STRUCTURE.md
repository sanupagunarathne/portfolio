# Minimal Home and section pages

The latest user direction replaces the long homepage with a compact identity page. Home contains the name and existing personal introduction, a fading dot pattern and the shared navbar. It loads neither the portrait/orbits nor Work/Expertise renderers. Footer content is hidden on Home to keep that composition minimal.

| Route | Content |
| --- | --- |
| `/` | Name and short note |
| `/work` | Existing project universe, with direct case-study links |
| `/about` | Existing portrait, AI orbits, About loop and personal details |
| `/expertise` | Local retro computer and technology browser |
| `/journey` | Education/experience timeline |
| `/playground` | Interactive experiments |
| `/beyond` | Interests/gallery |
| `/contact` | Existing contact form, email-app handoff and availability |
| `/projects/[slug]` | Existing actual site captures, Visit links and sourced case studies |

`SectionPage` shares a route heading and `BackLink`; existing content is retained in server-rendered `portfolio-pages.tsx` functions with interactive client leaves. The navbar uses Next Links and path-derived active states. Back links show the real terminal command `cd ..` alongside the destination and have an accessible destination name. They use deterministic destinations rather than browser history, so visiting a page directly never sends someone to an unrelated external website. `cd ~` in the footer returns Home. The former face mark is removed from the shared brand.

The Work camera remains driven by native scrolling inside its own page. Its entry, project selection, pause and fallback behavior are retained; its final About link is now an explicit page navigation. Project return links preserve the selected destination using `/work?project=<slug>`. There is no longer a Hero/Work transition on Home.

Old `/#about`/`/#work`/other known section hashes are client-redirected to the new routes, preserving query strings. Without JavaScript, the header supplies plain route links, and all new route content/case studies remain server-rendered. The old hash redirect itself requires JavaScript; the new URLs do not. Metadata and the configured-origin sitemap include every route. Unknown paths still return 404.

The reference image informed the minimal composition only; no other person's identity or claims were copied. Existing personal content, crimson accent, theme preference and accessibility/motion controls remain.
