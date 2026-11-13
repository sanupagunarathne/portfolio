# Reserved assets

No personal images, screenshots, email or résumé have been supplied. Keep visible labeled placeholders until real files exist. Content fields should use null for unavailable media; only render an image when a supplied path is configured. Asset files alone do not enable UI: set the corresponding editable content field too.

| Asset | Intended public path |
| --- | --- |
| Hero portrait (portrait 4:5) | /images/portraits/hero.webp |
| About photograph (portrait 4:5) | /images/portraits/about.webp |
| Paddock Labs screenshots (landscape 16:10) | /images/projects/paddock-labs-01.webp, -02.webp |
| EatWhat screenshots (landscape 16:10) | /images/projects/eatwhat-01.webp, -02.webp |
| Campus Slot screenshots (landscape 16:10) | /images/projects/campus-slot-01.webp, -02.webp |
| NEX Installer screenshots (landscape 16:10) | /images/projects/nex-installer-01.webp, -02.webp |
| Interest photos | /images/interests/photography.webp, motorcycling.webp, tennis.webp, design.webp |
| Résumé | /resume/sanupa-gunarathne.pdf |

Put files under public/ using these paths. Provide meaningful alt text based on actual image content. Keep photographs authentic; do not generate substitutes. Set contact email in src/data/personal.ts once provided. Project links, roles, milestones and statuses still require verification.

## Editable fields

Hero/about portraits: `personal.heroPortrait` / `personal.aboutPortrait`. Project screenshots: each entry's `screenshot` field in projects.ts. Interest photos: each `image` field in interests.ts. All use local paths under public/ and render through Next Image once configured; existing placeholders remain until then. Multiple case-study screenshots will be connected in Phase 5.
