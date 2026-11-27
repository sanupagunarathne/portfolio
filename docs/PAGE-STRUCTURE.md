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

## Spacing and blue-bird refinement

Repeated route headings are removed visually while each route keeps a screen-reader h1. Typography is smaller, with normalized word spacing and restrained tracking. About uses concise copy linking verified project tools to their documentation, a larger right-hand portrait and signature beside the contact link. The footer is one copyright/social-logo row, with accessible platform names and no visit arrows. Work has a centered entry action and no numbered travel buttons; native travel and direct project links remain.

The old About origami scene is removed. A small local SVG blue bird visits Home, perches and departs on a 24-second cycle. Hover/focus/click can play a synthesized two-note chirp only when the shared sound preference is enabled; the departure timer follows the flight cycle. Background/offscreen audio is suppressed, reduced motion keeps the bird still and disables timed chirps, and unmount closes its audio context. No downloaded audio or third-party model is needed. Fine pointers use a smaller 16×20px outlined cursor.

## Compute Birds adaptation

The user's supplied Three.js Compute Birds HTML is source material, not a page shell to inject. Runtime adapts its three-triangle bird mesh, phase-based wing flap and separation/alignment/cohesion/pointer-repulsion behavior in `src/lib/home-flock.ts`. For the compact Home space, 16 mobile / 24 desktop agents run as a bounded CPU simulation with Three.js WebGL rendering, rather than the example's 8,192-agent WebGPU/TSL all-pairs compute workload. This is a portability adaptation, not a claim to run the supplied WebGPU backend verbatim. Source reference: https://threejs.org/examples/webgpu_compute_birds.html (Three.js contributors, MIT). No inspector, full-window sky or camera orbit UI is mounted. Renderer lifetime follows Home, document visibility, intersection and reduced motion; resources and listeners are disposed. Missing WebGL, context loss and reduced motion retain the static bird. Shared sound opt-in remains.

Removed residual top padding from section routes, About and case-study shells. Home remains intentionally centered. Expertise remains the existing implementation pending the user's choice of a new design direction.

## Name habitat and design previews

The Home flock is larger and follows a wide elliptical habitat around the name. NameCycle keeps the English identity for seven seconds, fades 450ms, then reveals the next script over 1.5 seconds, holds five seconds and repeats across English/Sinhala/Tamil/Hindi/Arabic/Japanese/Chinese. Spellings in `name-cycle.tsx` are editable phonetic transliterations for owner review, not verified official spellings. The accessible h1 remains the English name without repeated announcements. Reduced-motion initial loads stay static. Non-Latin text reveals as intact shaped strings rather than splitting Arabic/Indic joins into character elements. Subset Noto fonts are bundled locally with license notices. About removes the enlarged-image clipping and reserves headroom for the crown.

`/concepts` is an unindexed design-review gallery, separate from the current Expertise/Playground routes. It contains eight rotatable Three.js visual sketches and a proposed catalogue of thirty advanced experiments in six groups of five. Descriptions explain proposed full mechanics; the sketches are not thirty completed experiments. Only the selected scene runs; rendering suspends when the stage is offscreen/hidden and respects reduced motion. Suggested final catalogue: category/search index, favourites, one active experiment, keyboard controls, compact return-to-index.

`public/concept-board.html` is a standalone, offline CSS concept board with all eight Expertise concepts and the full thirty-item Playground proposal. Actual Three.js preview captures and board screenshots are in `docs/previews`. This review material does not replace the live Expertise/Playground experiences or add them to the main navbar.
