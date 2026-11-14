# Motion and centered navigation

Based on merged main `6a68728` (includes Phase 6). All full-site content, case studies and release configuration are retained.

## Why effects were easy to miss

The hero previously shared a single reveal rather than word/portrait entrances. Many section bodies were not observed, while headings had only a small reveal. Several UI panels and gallery dialogs switched immediately. All technology icons shared the same vertical keyframe; a blanket hover/focus rule paused every logo as soon as the pointer entered the constellation, and coarse-pointer devices disabled them entirely. Navigation used `space-between` across a full-width row. Some effects already existed (project image hover, the explicit icon pause button and opt-in 3D animation); those are preserved and tested alongside the additions.

## Effects

| Element | Behavior |
| --- | --- |
| Hero headline | Word-by-word opacity/upward entrance with an 85ms stagger; words wrap independently. The heading retains one accessible name. |
| Portrait | Soft fade/upward entrance on the existing portrait or labeled placeholder. |
| Sections | Heading reveals plus one-time viewport entrances for section bodies and case-study sections. |
| Technology logos | Independent horizontal/vertical vectors, phase and duration; buttons remain in their layout slots. Individual hover/focus can pause that icon. |
| Icon control | Explicit pause/resume stops floating and pointer tilt, including touch devices. |
| Navigation | Compact centered link group, identical padding per link and one rounded marker that transitions between active links. Width/position refresh on resize and font loading. |
| Project previews | Slight frame/image zoom, border emphasis and directional arrow motion on hover/focus, including placeholder frames. |
| Buttons/social links | Small SVG movement and readable color/background transitions. |
| Expertise details | New content enters smoothly while the labeled live region and focus target remain stable. |
| Journey | Selected-milestone emphasis and animated grid-height expansion. Collapsed details are inert and visually hidden. |
| Mobile menu | Short stagger for its eight links; semantic disclosure and Escape/focus behavior retained. |
| Gallery | Dialog/backdrop entrance and photograph fade/scale on opening real supplied-image dialogs. Missing assets remain noninteractive. |
| Contact | Border/ring focus transition and status entrance, with a stable live-region container. |
| Playground | Mouse-position offsets and a real tap/Enter/Space toggle for rearranging shapes. |
| 3D | Existing slow opt-in animation, pause, demand rendering, offscreen/background suspension, controls/reset and static fallback retained. |

## Preferences, access and performance

Reduced motion disables CSS animation/transitions, skips viewport movement, cancels active viewport animations on preference changes and keeps the 3D fallback. Effects are progressive enhancement: SSR/no-JavaScript content is visible, and CSS entrances finish without JavaScript. Section observers unobserve after entrance and clean up on route changes. Floating logos animate only transforms; automatic floating remains user-pausable. No external animation assets, fake photos or screenshots are added.

Gallery motion is exercised with the real component and explicitly test-only media because personal media has not been supplied. WebGL validation uses existing SwiftShader draw-call and lifecycle tests, not a claim of physical GPU/device performance. A moving nav marker has no interactive or screen-reader role; links retain aria-current and focus indicators.

## Validation

Lint, standalone types, production build and whitespace checks passed. The final production Playwright suite reports **82 passed, 0 failed, 0 skipped**. Added tests verify word stagger, portrait/viewport entrances, independent rendered drift vectors, pause/resume, centered equal-padding nav geometry/marker, panel/timeline/status/tap transitions and gallery dialog/photo entrances; retained quality/accessibility/3D tests pass. Desktop/tablet/mobile screenshots were inspected and 320–1440px document-overflow checks pass. Merge and deployment remain separate from this branch's push.

## Caret/computer update

Latest direction uses continuous character typing with one advancing caret, not independent word entrances. Word wrappers only reserve layout and preserve wrapping; character/caret timing advances globally across the phrase. Reduced motion keeps all text visible and hides the caret. Dark is now the default. Runtime Expertise replaces the local abstract sculpture with the attributed, user-supplied Sketchfab Retro computer by Urpo; the previous local renderer is not mounted. External viewing is explicitly loaded/closed, with credit and a direct link. Live provider rendering was blocked from independent inspection here; tests mock the iframe response instead of claiming real WebGL draw/performance coverage for Sketchfab.
