# Sanupa Gunarathne — portfolio

A calm digital canvas where creativity meets engineering. Built with Next.js App Router, React, TypeScript and Tailwind CSS. Delivered in six phases; **Phase 1 is a foundation preview**, not the complete portfolio.

## Development

Use Node.js 24.22.1 (`nvm use` if installed) and npm. No API keys or environment variables are required for the foundation.

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

If the home cache is unwritable and browser download is needed, use `PLAYWRIGHT_BROWSERS_PATH=/tmp/portfolio-playwright npx playwright install chromium` and set the same variable when testing. Tests cover desktop/mobile rendering, navigation, keyboard access, overflow and reduced motion; they do not certify unfinished sections or 3D.

## Structure

- `src/app/`: server-rendered layout/page, metadata and centralized design tokens.
- `src/components/`: reusable UI; navigation uses client disclosure state.
- `src/data/`: editable personal/social data; more datasets follow in Phase 2.
- `tests/`: Playwright tests against the production build.
- `docs/PROJECT_BRIEF.md`: complete original specification.
- `docs/PHASES.md`: plan, branch names and acceptance checkpoints.
- `docs/ASSETS.md`: exact media paths and replacement guidance.
- `AGENTS.md`: persistent implementation and Git rules.
- `PROJECT_STATUS.md`: completed scope, validation, limitations and next step.

Motion, Three.js, React Three Fiber/Drei and Lucide are installed. 3D and animated sections are scheduled for later phases.

## Version control

Use `feat/phase-N-description`, `fix/description`, or `bug/description` as appropriate and conventional commits. **Sanupa alone merges to main and pulls main.** At each phase end the assistant provides the branch, checks and remaining items, then waits for confirmation of the merge/pull. No automatic merges, pulls, force pushes or shared-history rewrites.

## Content and deployment

Update `src/data/personal.ts` and `socials.ts` for supplied content. Email, résumé and photo fields remain null until provided. Never fabricate details, photos or project screenshots. See the asset guide before replacing placeholders.

Compatible with the standard Next.js/Vercel build (`npm run build`), with no custom services. Connect on Vercel when deployment is authorized. Public origin, sitemap/robots configuration and full case-study SEO follow in later phases; no domain has been invented.

## Layout and contact refinement

The header and footer use the full name and a shared rounded bot mark. Navigation highlights the current section and includes every currently implemented section. The hero headline is uppercase; section spacing is more compact.

`src/data/skills.ts` supplies the technology categories and project associations. The light constellation uses local Devicon artwork (license in `public/technology/`) and accessible logo selectors. Floating motion can be paused and respects reduced motion. “Explore in 3D” loads React Three Fiber on demand; drag to orbit. It renders only when needed, with a 2D selector available independently of WebGL. Learning status remains unconfirmed rather than asserting proficiency.

The Contact section validates name, email and message, prepares a reviewable draft, and offers copy/download. Editing the form invalidates the old preview. It sends no data to a server or browser storage. Direct delivery is pending a verified email or form service; no success message claims delivery. Setting `personal.email` enables an explicit “Open email app” handoff after preparing the draft; it does not create a server-side mail service.

Run `npm run test:e2e` after building for the foundation and refinement checks, including navigation, form validation/download, technology filters and narrow-screen overflow.
