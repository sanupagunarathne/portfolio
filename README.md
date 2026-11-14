# Sanupa Gunarathne — portfolio

A calm digital canvas where creativity meets engineering. Built with Next.js App Router, React, TypeScript and Tailwind CSS. The full homepage and four project case studies include interactive technologies, journey, playground, glass styling and selective 3D. Phase 6 adds accessibility/regression audits, contact fixes and configurable SEO.

## Development

Use Node.js 24.22.1 (`nvm use` if installed) and npm. No environment variables are required for local preparation/copy mode. Public indexing and real contact delivery are optional configured integrations.

```sh
cd /workspace/portfolio # or your local checkout directory
npm ci
npm run dev
```

The development server uses port 3000. Fonts are bundled locally through Fontsource. npm caches packages in ignored `.npm-cache/` so setup works with restricted home directories.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

## Browser checks

Build first. Playwright starts a production server if port 3000 is free. Stop unrelated servers to ensure the current build is tested.

```sh
npx playwright install chromium
npm run test:e2e
```

This cloud machine has Chromium already installed:

```sh
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e
```

If the home cache is unwritable and browser download is needed, use `PLAYWRIGHT_BROWSERS_PATH=/tmp/portfolio-playwright npx playwright install chromium` and set the same variable when testing. Tests cover desktop/mobile workflows, all project routes, accessibility scans, responsive widths, links, reduced motion, contact mocks and actual 3D draw/pause/fallback behavior using SwiftShader. See docs/QA.md for scope and limitations.

## Structure

- `src/app/`: server-rendered layout/page, metadata and centralized design tokens.
- `src/components/`: reusable UI; navigation uses client disclosure state.
- `src/data/`: editable personal details, socials, projects, skills, education milestones and interests.
- `tests/`: Playwright tests against the production build.
- `docs/PROJECT_BRIEF.md`: complete original specification.
- `docs/PHASES.md`: plan, branch names and acceptance checkpoints.
- `docs/ASSETS.md`: exact media paths and replacement guidance.
- `AGENTS.md`: persistent implementation and Git rules.
- `PROJECT_STATUS.md`: completed scope, validation, limitations and next step.

The homepage contains Hero, Selected Work, About, Expertise, Journey, Playground, Beyond the Screen, Contact and Footer. Playground includes a real editable Doto typography experiment and a hover/focus geometric study. Technology logos are authentic, locally stored Devicon assets; see docs/ATTRIBUTIONS.md. Per-technology learning statuses remain unconfirmed. Motion and lazy 3D include reduced-motion/static fallbacks.

## Version control

Use `feat/phase-N-description`, `fix/description`, or `bug/description` as appropriate and conventional commits. **Sanupa alone merges to main and pulls main.** At each phase end the assistant provides the branch, checks and remaining items, then waits for confirmation of the merge/pull. No automatic merges, pulls, force pushes or shared-history rewrites.

## Content and deployment

Update files in `src/data/` for supplied content. `personal.ts` controls portraits, email and résumé; `projects.ts` controls summaries, screenshots and verified URLs; `skills.ts`, `timeline.ts` and `interests.ts` control the other sections. Email, résumé and photo fields remain null until provided. Never fabricate details, photos or project screenshots. See the asset guide before replacing placeholders.

Compatible with the standard Next.js/Vercel build (`npm run build`), with no custom services. Connect on Vercel when deployment is authorized. See [deployment instructions](docs/DEPLOYMENT.md) for SITE_URL, robots/sitemap, indexing and optional contact delivery. No domain has been invented.

Phase 2 was explicitly requested while remote main still held the initial README. `feat/phase-2-homepage` therefore depends on Phase 1 commit `f3a79ad`; merge Phase 1 first, then review Phase 2. No merge or pull was performed by the assistant.

## Phase 3 interactions

- Filter technologies by category and select a logo to see its description, editable usage/learning status, and related-project anchors. Unknown usage and proficiency remain explicitly unconfirmed.
- Expand journey milestones with a click, tap, Enter or Space; selecting another closes the previous detail.
- Project previews open inline project notes, with gentle zoom/arrow effects and mouse-only cursor labels. Case-study links are available alongside inline notes.
- Photo gallery buttons appear only when an interest has a real image path. The native modal supports Escape, close button, backdrop click, contained focus and focus restoration. Placeholders remain noninteractive.
- Motion reveals keep server-rendered content visible before hydration and when JavaScript is unavailable. Reduced motion removes movement. Glass surfaces use opaque defaults when backdrop blur is unsupported and respect reduced transparency where supported.
- Navigation highlights the current major section; footer social links and dotted hero typography are preserved.

`tests/gallery.spec.ts` tests the actual gallery component in Chromium using a test-only fixture and an esbuild bundle. Only Next Image's loader is replaced with a native image; native dialog behavior and React events run in the browser. No test artwork enters portfolio content.

Phase 3 was explicitly requested before main incorporated the earlier phases. `feat/phase-3-interactions` depends on Phase 2 commit `8c408c3`. Merge the earlier phases first; merging/pulling main remains the user's responsibility.

## Phase 4 sculpture

The Expertise section contains an abstract layered sculpture using React Three Fiber, Drei and Three.js. No models, textures, HDR files or network assets are required. The existing Playground remains intentionally lightweight.

- The scene chunk loads only near the viewport, after checking motion preferences and WebGL2 support. Static SVG is available during SSR and loading.
- Drag gently to rotate, or use the labeled left/right buttons. Reset restores the object/camera. Animate is opt-in; Pause stops it. Static view unloads Canvas and can be toggled back.
- Demand rendering avoids continuous frames while still. Optional animation pauses offscreen and in background tabs. Pixel ratio is 1 on mobile and capped at 1.5 on desktop; pan and zoom are disabled. Vertical touch scrolling is preserved.
- Reduced motion uses the SVG and never loads Canvas. Missing/unsuitable WebGL2, context loss, scene errors and a loading timeout all leave the fallback and toolkit usable.
- The WebGL tests use Chromium's software renderer and permit it in the capability probe only within the test. They assert real renderer draw calls, controls, pause/resume, static mode and context-loss recovery. Production rejects major performance caveats and may intentionally use the fallback on machines without suitable graphics support.

Phase 4 depends on Phase 3 commit `6473ce6`. Main included Phase 1 when Phase 4 was requested; merge Phases 2 and 3 before Phase 4. The assistant has not merged or pulled main.

## Phase 5 case studies

All four `/projects/[slug]` routes are statically generated from `src/data/projects.ts`. Detailed content is in `src/data/case-studies.ts`: problem, role, features, approach, challenges, progress and gallery. Override the shared null defaults on each individual study when confirmed content is supplied. Null values render explicitly labeled documentation placeholders; they never imply completed work.

Set `project.screenshot` for the overview/thumbnail. Set each study's `gallery[].image` to its real public image path and replace `gallery[].alt`/`caption` with descriptions of the supplied screenshot. Native image dialogs distinguish project screenshots from personal photographs. Placeholders never open a fake gallery. Verified external links can be supplied in `project.github` and `project.demo`; absent links produce text rather than inactive buttons.

Project pages have individual title, description, Open Graph and Twitter metadata, a table of contents and next-project links (the last returns to the first). Shared header links point to homepage sections from a case study; shared footer and social links appear on every page. Unknown slugs return 404 with a recovery link. Main content and navigation remain available without JavaScript.

Phase 5 depends on Phase 4 commit `9252149`; earlier unmerged phases must be merged first by Sanupa. No merge or pull was performed. Phase 6 provides configurable public-domain canonical URLs, sitemap and cross-page QA.

## Interface refinement after Phase 5

Full-name branding and the rounded bot mark now appear in header/footer. All homepage sections have rounded navigation states, the Doto hero is uppercase, and section gaps are reduced. Technologies appear in a CSS 3D constellation with genuine Devicon logos, floating icon motion, depth and pointer tilt. Hit areas stay still; reduced-motion and coarse-pointer settings keep icons still. The existing lazy WebGL sculpture is retained.

The contact form validates name, email, topic and message. With no delivery configuration it explicitly prepares an unsent message for copying and offers LinkedIn as a real contact route. No local storage or message database is used. A server-side Resend adapter is ready in /api/contact, with input/body/origin checks, a honeypot, timeout and honest error responses. No real email was sent during testing; provider success/failure is mocked in tests.

To activate delivery after choosing Resend, securely configure RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in deployment/environment settings. The sender must belong to a Resend-verified domain; the recipient must be provided by Sanupa. Outbound access to api.resend.com is required. See .env.example for variable names; never commit real values. The homepage reads the configured availability on each server request. Other form providers require replacing the server adapter. Provider-side abuse controls and real delivery should be verified before public activation; there is no persistent distributed rate limiter in this implementation.

The refinement branch feat/interface-refinements depends on Phase 5 commit 5723348. Merge/pull main remains Sanupa's responsibility. These changes do not automatically begin Phase 6.


## Corrective complete-site branch

`fix/restore-complete-portfolio` restores the full site and interface refinements from `feat/interface-refinements` (`effd5d0`) on top of main (`00ab4d4`). It supersedes the foundation-only `fix/portfolio-layout-contact-technologies` branch. All homepage sections and the four project case studies are retained. Contact preparation works without credentials; actual delivery still requires the configuration described above.

## Phase 6 quality checks

Automated axe checks run against the homepage and all four project pages on desktop/mobile. Route layout checks cover 320, 390, 768, 1024 and 1440px widths. Floating icons have an explicit pause control. Prepared contact drafts invalidate on edits, and unexpected HTTP success payloads do not erase messages or claim delivery. See [QA evidence](docs/QA.md) and [deployment handoff](docs/DEPLOYMENT.md).
