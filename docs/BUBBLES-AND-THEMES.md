# Bubble field, themes and layout refinement

Based on merged main `8e7e2fd`. This user-requested dark-theme option supersedes the original light-only restriction; light remains the default.

Technology logos now travel through a bounded field rather than oscillating around fixed slots. A lightweight animation loop updates their positions without React rendering each frame. Independent velocities and slow steering allow roaming; edge reflections and pair separation keep the bubbles within the area. A sheen, rim and inset highlights give them a water-bubble appearance. This is a CSS-rendered interactive field, not a WebGL fluid simulation. Categories, technology descriptions and project associations remain editable and unchanged.

Pause freezes positions. Hover/focus freezes the individual target for reliable mouse/keyboard selection; on touch, a tap selects its details in the separate panel. Tab order remains content order. Offscreen/hidden-document motion suspends; reduced motion switches to a static readable layout. The static layout also works before hydration/without JavaScript. Filtering/resizing rebuilds the field to fit the available space. Long mobile fields accommodate all logos without shrinking the labels; category filters reduce the field to a smaller subset.

Main section phrases (including Contact) get a stepped word-by-word typing reveal when first entering the viewport. Words have their full layout width throughout, avoiding page reflow. Reduced motion and no JavaScript retain readable headings.

The navigation's right-side theme button switches light/dark and stores only the theme preference in localStorage. The saved value is restored before the body paints; unavailable storage still allows toggling. Light is the initial default. Theme colors use shared tokens, with explicit dark glass/menu surfaces and readable controls. The existing contact form still stores no personal message in the browser.

The actual header height now supplies the sticky sidebar/skill-panel offset. Case-study contents clear the header, have a viewport-limited scroll area, and return to normal flow below 900px. Case-study titles and section headings are scaled down, sculpture stages are 240px, and small labels remain 14px. Section/project borders remain visible in default, hover and focus states; content reveals no longer fade case-study section borders. Focus outlines remain intentionally visible for keyboard access.

Tests cover bubble movement/bounds/pause/selection, reduced-motion fallback, theme persistence, dark-mode axe audits, typing activation, sidebar clearance, and the retained full-site regression suite. No new photos, project claims or delivery configuration are invented; merge and deployment remain the user's actions.

The intermittent full-section rectangles also came from the global focus-visible outline on programmatically focused anchor targets. Noninteractive main/section targets now use an underlined heading cue; buttons, links and other interactive controls keep their normal visible focus outlines. This removes the large temporary box without removing keyboard orientation.

Validation: full 88-check production regression passed; final localized adjustments were followed by rebuilt affected suites (14 bubble/theme/motion checks and 14 foundation/navigation/bubble/theme checks), all passing without skips. Lint, type checking, build and whitespace checks passed. Dark homepage/NEX Installer axe scans, preference persistence, field bounds/selection, and actual scrolled-sidebar clearance are exercised. Light scattered bubbles and dark desktop/mobile visuals were inspected.
