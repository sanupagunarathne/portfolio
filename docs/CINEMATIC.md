> Structure update: the later minimal-Home request moves this experience to `/work` and the portrait/orbits to `/about`. The old homepage coupling and `/work` redirect described below are historical. See [current route map](PAGE-STRUCTURE.md); camera/rendering details remain relevant within Work.

# Continuous portfolio journey

The homepage now owns Work. `/work` is a compatibility redirect to `/#work`, forwarding an optional project slug. Case-study return links go directly to `/?project=<slug>#work`. No route change occurs when pressing Enter on the homepage.

## One scroll timeline

`src/lib/journey.ts` defines the camera and project-depth functions. `CinematicWork` measures the native scroll position against the section's available travel distance and writes one normalized progress value into a shared controller. There are no wheel/touch interception handlers, body scroll locks, artificial scroll resets or competing camera springs. Browser-native scroll, keyboard, touch and trackpad input all drive the same value. Enter and destination buttons use native smooth scrolling to positions along that timeline.

An 800svh document section contains one sticky viewport. Its arrival mask blends the Hero into space. The camera travels from z=30 to z=-80 through an entrance ring and four fixed-depth objects. Each object grows through perspective and clips naturally against the camera frustum; there are no capped mesh scales, screen-coordinate clamps or arbitrary mesh visibility cutoffs. HTML project information fades in close to its associated object. Objects continue rendering after their information fades, until they leave the frustum. The camera passes the last project before the final portion dissolves into the site's theme and About continues in normal document flow. Reverse scrolling reverses the same calculations.

`JourneyScene` uses existing React Three Fiber and Three.js. Project identities are a faceted rocky world/moon, an atomic system, a crystalline octahedron and a torus-knot/wireframe data form. Low-cost stars, a satellite and a small dissolving halo retain ambient life. One animation clock handles rotations and ambient effects; it advances by capped delta time rather than frame count. Demand rendering stops when offscreen, in a background tab or when paused, and scroll changes invalidate a frame. DPR is capped at 1.5; materials and geometry remain local with no model downloads, shadows or postprocessing. No new runtime dependencies were added.

## Hero and navigation

The transparent WebP is a background-removal edit of the user's existing halftone photo. The previous image is retained for easy comparison/replacement. Ten local SVG platform logos follow independent phase, speed, radius, inclination and depth-scaling calculations around the portrait. Depth controls whether each logo passes in front or behind. Explicit pause, keyboard-focus pause, focus foregrounding, reduced motion and offscreen/background suspension are supported. These are decorative platform references, not claims of expertise or endorsements. Asset credits are in ATTRIBUTIONS.md.

The floating rounded navbar retains all links, theme/audio preferences and mobile keyboard controls. Its glass surface changes to a readable dark surface over the universe. Opaque/no-blur preferences remain supported. Sticky case-study offsets include the navbar's floating top gap.

## Fallback and validation limits

Server-rendered project links remain available without scripts. Reduced motion or unavailable/lost WebGL selects the normal-flow static project layout; image and logo content remains accessible. Ambient pause stops rotation while allowing intentional scroll travel. Invisible project/entrance/exit controls are removed from keyboard interaction. Changing motion preferences or losing the graphics context necessarily replaces the long cinematic layout with the accessible normal-flow fallback.

Automated rendering uses Chromium; software WebGL evidence does not establish physical GPU frame rates or Safari/real-device behavior. There is no measured 60 FPS guarantee. The cutout comes from the already edited halftone image available in the checkout, not an untouched original upload.
