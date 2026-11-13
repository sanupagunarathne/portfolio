# Delivery and version control

Each phase is a separate reviewable branch. Sanupa owns every merge into main and every pull of main. At each handoff the assistant stops, reports checks and outstanding work, and waits for confirmation before starting the next phase from the merged main commit. The assistant does not merge or pull. No force pushes or history rewrites.

| Phase | Branch | Deliverable / acceptance |
| --- | --- | --- |
| 1 — Foundation | feat/phase-1-foundation | Next.js/TS/Tailwind, libraries, local fonts/tokens, global layout, responsive accessible navigation, persistent instructions, reproducible setup; lint/types/build and navigation smoke pass. |
| 2 — Complete structure | feat/phase-2-homepage | All nine homepage sections, editable project/skill/timeline/interest data, reusable headings/windows/placeholders, asset paths and honest content. Verify responsive section order and links. |
| 3 — Core interactions | feat/phase-3-interactions | Motion reveals, project hover labels, logo categories/details, keyboard/tap timeline, functional playground and supplied-photo gallery. Check keyboard, touch and reduced motion. |
| 4 — 3D | feat/phase-4-3d | Lazy expertise sculpture, gentle controls, responsive sizing, reduced motion, WebGL loading/error/2D fallback. Verify content and skill selection with and without WebGL. |
| 5 — Project pages | feat/phase-5-case-studies | Four data-driven case studies, honest unknown fields, image galleries, verified links only, next-project navigation, metadata and missing-project handling. Build and route checks. |
| 6 — QA | feat/phase-6-quality | Desktop/tablet/mobile browser checks, accessibility, links, motion, 3D, metadata, production build and deployment documentation. Fix verified defects and document remaining asset needs. |

Use fix/description for standalone fixes and bug/description for investigations as needed. Changes necessary to finish a phase remain on its feature branch. Use focused conventional commits; do not create branches merely to satisfy a naming pattern.

At each handoff include branch + commit, scope, executed checks, limitations, and the next phase. Open questions should identify the exact missing decision. Missing photos/email/résumé are already authorized placeholders and do not block these phases.

## Phase 2 branch dependency

The user explicitly requested Phase 2 before remote main included Phase 1. Phase 2 is transparently based on `f3a79ad` from `feat/phase-1-foundation`, rather than the initial main commit. Merge Phase 1 first; then review Phase 2 relative to Phase 1 (or main after that merge). The assistant has not merged or pulled main. This exception does not authorize later phases automatically.
