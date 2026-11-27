# Phase 6 QA evidence

Branch: `feat/phase-6-quality`, based on merged main `c2e0c85` (includes complete-site restoration `1572eb9`). The supplied master prompt was reviewed alongside AGENTS.md and docs/PHASES.md. Existing content and case studies are preserved; latest user typography/branding/glass refinements remain in force.

## Defects corrected

- About and case-study definition labels used Stone Gray on Ivory at approximately 4.46:1, below AA for small text. They now use the existing ink color. Primary hover and social hover styles also retain readable text contrast.
- Sculpture controls and the geometric Playground study had labels on generic divs. They now expose appropriate group/image roles. The technology constellation is a named group.
- Floating technology icons now have an explicit pause/resume button, independent of OS reduced motion. Pointer tilt stops in paused mode; all selectors remain available.
- Prepared contact drafts invalidate after edits. Inputs disable while sending so a late response cannot erase newly edited fields. Successful HTTP status alone no longer claims acceptance; the expected JSON acceptance flag is required. Failed/unexpected responses preserve text.

## Validation scope

- Locked dependency setup and lint, standalone type checking, production build and whitespace checks.
- Existing desktop/mobile regression suite: complete homepage, navigation/keyboard, all four case studies, real unknown-route 404, no-JavaScript case-study content, toolkit filters/details, journey selection, Playground, gallery modal/focus, contact mocks and failure preservation.
- Axe WCAG A/AA tagged scans of homepage and all four case studies on Chromium desktop and mobile; additional selected-technology/hovered-action audit. No rules disabled. These scans are automated evidence, not a full accessibility-conformance certification or a screen-reader audit.
- Every public page checked for horizontal document overflow at 320, 390, 768, 1024 and 1440px. Fragment targets and local navigation destinations checked across all pages. Social URLs remain the supplied destinations; remote social account availability is not asserted.
- Existing 3D tests verify actual software-renderer draw calls, demand rendering, opt-in animation, pause offscreen, controls/reset, static view, context-loss recovery and reduced-motion/missing-WebGL fallback. Physical GPU, battery and real-device performance measurements are not claimed.
- Desktop (1440px), tablet (768px) and mobile Contact (390px) screenshots inspected. Portraits, project screenshots and personal photos remain labeled placeholders.
- Production SEO tested in a separate local build with a temporary `portfolio.example` test origin: all five canonical and Open Graph URLs, index metadata, robots sitemap declaration and five sitemap entries. URL comparison accounts for Next.js's normalized root trailing slash. No requests were sent to that example origin. Preview/unset/invalid origin behavior covered by tests. Default local build restored afterwards.

## Release limits

No deployment or merge was performed. Real domain, portraits/photos/screenshots, résumé, email, verified repository/demo links, personal roles/results and learning statuses still require supplied content. Real contact delivery is unconfigured; tests use provider mocks and never send real email. See DEPLOYMENT.md for activation, indexing, abuse controls and post-deployment verification. Firefox/Safari, real-device assistive technology and live provider delivery have not been validated in this task.

## Final results

`npm run lint`, `npm run typecheck`, `npm run build` and `git diff --check` passed. The final command `CI=1 PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e` completed with **74 passed, 0 failed, 0 skipped**, across desktop and mobile. The configured-origin local production smoke passed separately. Initial axe violations were corrected and all final scans pass. The final on-disk build uses the unset-origin/noindex configuration.

## Subsequent motion/navigation regression pass

`fix/motion-and-centered-navigation`, based on merged Phase 6 main `6a68728`, implements the effects in docs/MOTION.md. Its final production regression run reports **82 passed, 0 failed, 0 skipped**, including the retained Phase 6 audits. Lint, type checking, build and whitespace checks pass. It preserves full content, case studies and release configuration; missing real assets/integrations and the real-device limitations above remain unchanged.

## Bubble/theme refinement

`feat/bubble-field-theme-polish` starts from merged main `8e7e2fd`. Full regression: 88 passed; final randomized-placement and anchor-focus refinements were rebuilt and covered by affected 14-check motion/theme and 14-check navigation/theme reruns, all passed. Dark-mode axe scans/persistence, moving-field bounds/pause/selection, typing activation and real sidebar clearance were added. See docs/BUBBLES-AND-THEMES.md. Real assets, live email/domain and deployment limits remain as above.

## Caret, dark default, social logos and retro computer

`feat/caret-retro-computer-contact`, based on merged main `325c4bc`: full regression **88 passed**, followed by rebuilt **4 affected tests passed** after a final LinkedIn SVG contrast/knockout adjustment. Lint, standalone types, build and whitespace checks passed. Runtime 3D now uses the explicitly loaded Sketchfab computer; old local-sculpture draw-call tests were replaced with mocked iframe/attribution/load/unload tests. Do not read historical SwiftShader coverage as verification of the new third-party model. External model/pricing access was blocked, and no live email was sent. Confirmed public recipient is sanupar07@gmail.com; see EMAIL-SETUP.md.

## Local retro computer and About loop

`feat/local-retro-computer-about-loop` starts from merged main `2d99841`. Runtime removes the Sketchfab iframe and renders local procedural CRT/desktop/keyboard/mouse geometry, automatically near the viewport and automatically rotating when visible. GPU tests again assert actual SwiftShader draw calls, pause/offscreen resume, controls, static selection and context-loss fallback for the new local model. A rendered computer screenshot was inspected; the page had zero iframes. No remote mesh or exact reproduction is claimed.

The About loop holds 12 fact-grounded paragraphs. Clock-controlled tests verify caret typing, a five-second completed-text hold, 450ms fade and advance, pause, manual wrapping and reduced-motion static behavior. The test freezes the clock before resetting the first paragraph to eliminate real-time setup drift. Screen readers get a single text paragraph and no repeatedly announcing live region; hidden measurement text reserves height and is excluded from accessibility.

Final local-computer/About validation: **96 passed, 0 failed, 0 skipped** in the full production Playwright run. Lint, standalone types, production build and whitespace checks passed. The local model rendered successfully in Chromium/SwiftShader and was visually inspected; automatic rotation and lifecycle checks assert real draw calls. Physical-device performance and exact replication of the Sketchfab reference are not claimed. About tests verify the completed-text five-second hold, fade/advance, pause and manual wrapping with a frozen deterministic clock.

## Crimson workspace universe

`feat/crimson-work-universe`, based on merged main `bfa6ca8`: lint, standalone types, production build and whitespace checks passed. Full production regression: **108 passed, 0 failed, 0 skipped**. The final localized intro-fade cleanup was rebuilt and covered by a further **14 passing** workspace/input/audio/fallback/accessibility/responsive checks on desktop/mobile. New route `/work` is included in axe and five-width route/layout checks and in the configured-origin sitemap tests. Supplemental light-mode axe checks on `/` and `/projects/paddock-labs` reported zero violations. Inspected hero/halftone portrait, doorway, case study and workspace screenshots at desktop/mobile, 320px and landscape sizes. Browser tests verify audio oscillator creation and muting, not a physical speaker listening test. Existing physical-device/GPU and live-email limitations remain.

## Continuous cinematic homepage

`feat/cinematic-portfolio` replaces the separate Work page with native-scroll same-scene travel. Lint, type checking, production build and whitespace checks passed. Full production desktop/mobile regression: **104 passed**. Final affected journey/accessibility/layout rerun: **12 passed**; final added native wheel/touch regressions: **2 passed**. Camera checks exercise every project forward and backward, verify actual draw calls/camera coordinates, test rapid seeking and exit into About. Logo independence/pause, no-JS/reduced-motion and missing-WebGL behavior are covered. Direct mobile CDP touch input, exit/re-entry and actual context-loss recovery were verified separately with zero page errors. Software-renderer screenshots were inspected across Hero, entrance, project objects, exit and mobile layouts. The intermediate mobile Enter/seek race was corrected before the final no-retry affected run. This is Chromium/software-GPU evidence; real-device/Safari frame-rate guarantees are not claimed. See CINEMATIC.md for architecture and fallback limits.

Final mobile smoke checks also passed: query-based case-study return restoration, pausing after traveling without resetting to the original return destination, and opening a case study by clicking the near object's HTML hit region.

## Website-first case-study preparation

The shared project opening and proposal-derived Paddock content were built and checked with lint and standalone types. The exact hero-image asset remains blocked: the inline image has no accessible file reference, and network policy prevents live capture. Layout/Visit/provenance tests do not establish that the actual screenshot is integrated or that the external website can be reached. Website-first navigation tests now return through All projects; theme preferences are changed on the homepage because project openings intentionally hide portfolio navigation.

Final affected run: **40 passed, 0 failed, 0 skipped** across Chromium desktop/mobile (case studies, quality and bubble/theme regressions). Lint, types, build and whitespace checks passed. No actual-image or live-site-rendering readiness claim is made while that source asset is unavailable.

## Paddock and EatWhat screenshots connected

The authentic user-supplied captures are now integrated at their measured intrinsic dimensions. Final affected desktop/mobile browser run: **44 passed, 0 failed, 0 skipped**. Checks include actual image loading and uncropped ratios, safe Visit URLs, EatWhat README provenance/architecture and distinct diagram labels, responsive routes, axe, no-JS content and existing navigation/theme behavior. Lint, types and build passed; final copy edits were rebuilt. Both desktop openings and the mobile EatWhat opening were visually inspected. The previous missing-image limitation is resolved for these projects. External service operation remains outside these portfolio checks.

## Minimal Home and dedicated pages

`feat/terminal-page-structure`, based on merged main `97807e4`, separates the seven sections into routes and keeps Home to name/note/fading dots. Lint, standalone types, production build and `git diff --check` passed. The full desktop/mobile production regression returned **126 passed, 2 failed**; both failures were a strict test selector matching the About control and the new About exit link. After selecting the exact control label, the focused camera-travel rerun returned **2 passed**. All **128 checks** have therefore passed across these runs, with no skipped checks. The exact-label adjustment changes test selection only.

Coverage includes all twelve public routes in axe and responsive checks, minimal Home without portrait/3D mounting, active route navigation, mobile menu/keyboard focus, deterministic `cd ..` destinations, legacy hash/query routing, JavaScript-disabled phone navigation, About/orbit controls, actual Work camera/draw calls, local-computer lifecycle, case-study captures/content, contact and SEO. Supplemental light-theme Home/About axe scans reported zero violations. Desktop Home/About and phone Home screenshots were inspected. This remains Chromium/software-renderer evidence; real-device/Safari performance and live email operation are not established by these checks. No deployment or main merge/pull was performed.

## Compact menu and page fade

Lint, standalone types, final production build and whitespace checks passed. The initial full run completed 124 passes, three retry passes and one outdated closed-menu theme assertion. The corrected theme interaction and final rebuilt affected suite completed **68 checks: 67 passed directly, one About animation timing check passed on retry, zero final failures**. This run covers all twelve route axe scans, five-width responsiveness, keyboard/outside dismissal, no-JavaScript navigation, current-route/menu behavior, reduced-motion fade, preferences and Work camera travel. It includes the fix positioning universe controls above the bottom dock. Supplemental expanded-menu axe scans reported zero violations in dark desktop and light mobile. Screenshots were inspected in desktop dark and phone dark/light layouts. Separate Playwright runs must use separate artifact directories or run sequentially; an initial overlapping supplemental run caused artifact-file cleanup races. No real-device/Safari or live-email verification is claimed.

## Editorial About and planetary Work

`feat/planetary-about-experience` starts from merged main `2f8427f`. Lint, standalone types and production builds passed. The first full run returned 121 passing checks and nine failures: duplicate Work link names, missing bird image role, narrow orbit overflow, and a mobile orbit test that had not scrolled the relocated portrait into view. Those were corrected. The rebuilt affected run returned **70 passed**, including route axe/layout audits, About signature/right-column layout, actual bird draw calls and reduced-motion teardown, case-study media/content/links and Work navigation. The final mesh-interaction refinement returned **12 passed** across desktop/mobile after removing the previous renderer's pointer-event disable and invisible enlarged link target. Tests now click the sphere surface to trigger the zoom rather than relying only on the text link; native wheel/touch scrolling remains covered. Subsequent localized camera-heading and still-planet fallback styling were rebuilt and checked with the affected zoom/fallback checks.

Inspected desktop About/Work, the redesigned signature and narrow About screenshots. Confirmed 320px scroll width at a 320px viewport. Planet surfaces are procedural interpretations; the signature is a newly generated design based on the user's supplied reference. Bird/model behavior is Chromium/software-renderer evidence, not a physical-GPU or Safari performance claim. No deployment, merge or live email was performed.

Final delivery build passed; the localized zoom and reduced-motion/no-JavaScript regression returned **4 passed, zero failed/skipped**.
