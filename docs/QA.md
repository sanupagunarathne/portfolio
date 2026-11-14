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
