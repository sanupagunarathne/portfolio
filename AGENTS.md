# Sanupa portfolio — persistent development reference

Read `docs/PROJECT_BRIEF.md` for the complete user specification and `PROJECT_STATUS.md` for current progress. Do not silently reduce that scope.

## Workflow and ownership

- Work in the existing checkout; do not create a worktree unless requested.
- The user alone merges into main and pulls main. Never merge, pull, reset, force-push, or rewrite shared history for them. Never commit directly to main.
- Implement one phase at a time. At its end, run relevant checks, update PROJECT_STATUS.md, commit focused changes, and hand over the branch with validation and remaining issues. Wait for the user to confirm their merge/pull before the next phase. Verify that the next phase starts from the merged commit; do not silently stack phases.
- Use `feat/phase-N-description` for phase features, `fix/description` for corrective work, and `bug/description` for isolated bug investigations. Keep fixes on the active phase branch when they are part of completing it. Use conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
- Ask about blocking product/content decisions; make routine implementation decisions independently. Never invent personal claims, proficiency, dates, achievements, demo URLs, or credentials.
- Preserve unrelated work. Push only the feature branch when delivery calls for it; never publish/deploy without authorization.

## Purpose, design and stack

A complete premium, light editorial portfolio for Sanupa Gunarathne: “A calm digital canvas where creativity meets engineering.” Use Next.js App Router, React, TypeScript, Tailwind CSS, Motion for React, Three.js, React Three Fiber/Drei, and Lucide. Compatible stable versions are locked in package-lock.json; install with npm ci. Geist, Geist Mono, and Doto are bundled locally; Doto is the hero display face and Geist Mono carries the supporting typography.

Mandatory palette: Stone Gray #73726E; Soft Gray #E6E5E1; Soft Blush #F2D9D0; Warm Ivory #F7F7ED; Warm Taupe #B8B5AE. Ivory dominates; darker stone-derived neutral is allowed for contrast. Tokens live in src/app/globals.css. Generous whitespace, expressive typography, varied balanced layouts, thin borders, minimal shadows. Avoid neon, dark themes, excessive gradients/glass, repetitive card grids, skill percentages, fake screenshots or decorative fake controls.

Typography revision: use Doto for the entire hero headline, with one consistent weight/style and no serif italic emphasis. Use Geist Mono for supporting typography, navigation and section headings to emphasize the programming identity. Keep labels and supporting text readable (generally 14px minimum). Social links belong in the footer. Preserve these preferences in later phases.

Use mono section numbers, filename labels, restrained dot grids and code references. Reusable macOS windows have decorative noninteractive titlebar dots, thin borders and soft corners; use selectively, never as the entire site.

## Content

Sanupa Gunarathne is a Software Engineering undergraduate / developer in Sri Lanka, studying BSc (Hons) Software Engineering — University of Westminster at IIT Sri Lanka. Previously attended Maliyadeva College and completed foundation studies; no dates supplied. Interests: software, creative web, photography, motorcycling, tennis, graphic design and experimentation.

Exact links: https://github.com/sanupagunarathne ; https://www.linkedin.com/in/sanupagunarathne/ ; https://www.instagram.com/sanuoa.p/ . Email and résumé are unknown: show labeled unavailable placeholders, never fake links or mailto addresses.

Homepage order: Hero; Selected Projects; About; Expertise and Technologies; My Journey; Creative Playground; Beyond the Screen; Contact; Footer. Dedicated editable project case studies must follow.

Projects: Paddock Labs (kart telemetry/performance, Java/Spring Boot/PostgreSQL/Python/ML/ESP32/GNSS/IMU); EatWhat (group food decisions, JavaScript/Node.js/PostgreSQL/Vercel); Campus Slot (campus room booking, Java/Spring Boot/databases); NEX Installer (offline Windows software/font installer concept, C#/.NET). Completion, deployment, roles, challenges, results and repository/demo URLs are unverified: label missing information explicitly.

Keep editable content separate from UI in src/data: personal.ts, socials.ts, then projects.ts, skills.ts, timeline.ts, interests.ts as phases require. Skills use authentic logos, category filters and accessible selectable information panels with description, usage, editable learning status and related projects. Do not infer mastery. The timeline supports hover summaries AND keyboard/tap selection with expanded details; never invent years.

## Media, motion and accessibility

Use clearly labeled, correctly sized portrait and screenshot placeholders until actual assets arrive. No stock people, generated avatars, fabricated screenshots or personal photography. Exact reserved asset paths are in docs/ASSETS.md; do not reference absent files as loaded images.

Use selective lazy 3D in Expertise (optional second Playground experience), gentle controls, sensible GPU usage, reduced motion and a 2D fallback. Technology selection must work independently of WebGL. Playground experiments must actually respond to interaction. Gallery viewing applies to supplied photos; do not simulate viewing missing assets.

Use semantic HTML, heading order, keyboard controls, visible focus, sufficient contrast, reduced-motion support, alt text, responsive image loading and metadata. Mobile needs a real accessible menu, stacked layouts and no horizontal overflow. Client components only for interactivity. No scroll hijacking. Bundle fonts locally to avoid build-time Google access.

## Quality

Run npm run lint, npm run typecheck, npm run build and the relevant Playwright checks. Report commands actually executed and distinguish failures/skips. Next.js-generated next-env.d.ts is expected. Update README and PROJECT_STATUS at meaningful milestones. No merges or pulls by the assistant.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
