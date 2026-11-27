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

## Compact menu refinement

The shared navigation is now a bottom-centered pill (352px maximum), with an expandable two-column route menu, current-page link and theme/sound controls inside the panel. Escape restores toggle focus, outside clicks dismiss it, and choosing a route closes it. The menu remains nonmodal; other page content stays usable. No-JavaScript links remain available. Project openings still hide portfolio navigation.

`PageFade` keys the page-content wrapper to the pathname for a 650ms opacity entrance on initial load and route changes, including between project slugs. It does not transform the wrapper or intercept scrolling. Reduced motion disables this animation and the menu entrance. The Home note retains the supplied wording with lighter Geist typography. Subtle layered glass surfaces follow both themes and fall back to opaque surfaces for reduced transparency.

The collapsed dock deliberately contains only Menu and the current destination. Open Menu for all eight routes and preferences on both desktop and phone. Fixed bottom placement reserves footer clearance and safe-area spacing; the Home composition has no top header footprint.

## Editorial About and planetary Work

The latest request replaces the rotating About paragraph/profile window with a static editorial introduction, portrait on the right, redesigned signature and local origami-bird scene. The image in `public/images/portraits/sanupa-signature.png` was generated as an original interpretation of the supplied signature: white lines and a crimson orbit, not a scanned authentication signature. The bird follows an arrival/perch/departure loop, responds to pointer position, and unmounts offscreen, in background tabs and for reduced motion; a rendering error leaves the text/portrait intact. AI logos continue orbiting without a visible pause control. Home's note uses the existing Doto font.

The dock shortcut always points Home. Section headers no longer show terminal back controls; case studies retain a plainly labeled Back to Work link. The earlier `cd ..`/`cd ~` conventions are superseded.

Work now has alternating planetary positions with 26 depth units between projects, locally generated Jupiter/Saturn/Neptune/Mars-inspired surface maps, Saturn's rings, Mars crater/shadow details and small light glints. These are stylized local models, not astronomical scans. Entry rings and selected-work counters are removed; meteor debris, star bursts and the satellite remain. Planet selection eases the camera toward the selected sphere for 850ms before navigating to the actual project page. Modified clicks and reduced-motion/no-WebGL/no-JavaScript links retain ordinary navigation. Controls remain above the fixed dock. There is no manual universe pause button; reduced motion and visibility suspension remain.

Fine-pointer devices use a local black arrow cursor with a white outline; touch and text inputs retain appropriate native behavior.
