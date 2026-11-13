# Sanupa Gunarathne — portfolio

A calm digital canvas where creativity meets engineering. Built with Next.js App Router, React, TypeScript and Tailwind CSS. Delivered in six phases. **Phase 2 provides the complete homepage structure**; advanced interactions, 3D, case studies and final QA follow in later phases.

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
- `src/data/`: editable personal details, socials, projects, skills, education milestones and interests.
- `tests/`: Playwright tests against the production build.
- `docs/PROJECT_BRIEF.md`: complete original specification.
- `docs/PHASES.md`: plan, branch names and acceptance checkpoints.
- `docs/ASSETS.md`: exact media paths and replacement guidance.
- `AGENTS.md`: persistent implementation and Git rules.
- `PROJECT_STATUS.md`: completed scope, validation, limitations and next step.

The homepage contains Hero, Selected Work, About, Expertise, Journey, Playground, Beyond the Screen, Contact and Footer. Playground includes a real editable Doto typography experiment and a hover/focus geometric study. Technology logos are authentic, locally stored Devicon assets; see docs/ATTRIBUTIONS.md. Per-technology learning statuses remain unconfirmed. Motion and 3D enhancements follow in later phases.

## Version control

Use `feat/phase-N-description`, `fix/description`, or `bug/description` as appropriate and conventional commits. **Sanupa alone merges to main and pulls main.** At each phase end the assistant provides the branch, checks and remaining items, then waits for confirmation of the merge/pull. No automatic merges, pulls, force pushes or shared-history rewrites.

## Content and deployment

Update files in `src/data/` for supplied content. `personal.ts` controls portraits, email and résumé; `projects.ts` controls summaries, screenshots and verified URLs; `skills.ts`, `timeline.ts` and `interests.ts` control the other sections. Email, résumé and photo fields remain null until provided. Never fabricate details, photos or project screenshots. See the asset guide before replacing placeholders.

Compatible with the standard Next.js/Vercel build (`npm run build`), with no custom services. Connect on Vercel when deployment is authorized. Public origin, sitemap/robots configuration and full case-study SEO follow in later phases; no domain has been invented.

Phase 2 was explicitly requested while remote main still held the initial README. `feat/phase-2-homepage` therefore depends on Phase 1 commit `f3a79ad`; merge Phase 1 first, then review Phase 2. No merge or pull was performed by the assistant.
