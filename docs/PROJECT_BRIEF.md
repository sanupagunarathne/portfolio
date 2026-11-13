# MASTER CODEX PROMPT — SANUPA GUNARATHNE PORTFOLIO

## 1. Your Role and Mission

You are a senior frontend engineer, creative developer, UI/UX designer, motion designer, and software architect.

Build a complete, production-quality, modern, minimalist, responsive, and interactive personal portfolio website for **Sanupa Gunarathne**, a Software Engineering undergraduate.

You are working directly inside my connected GitHub repository.

Your responsibility is to design and implement the entire portfolio, not just the landing page.

The design should communicate both my software engineering abilities and my creative personality.

### Core design philosophy

**"A calm digital canvas where creativity meets engineering."**

I want the visual quality of a premium creative studio website, with subtle coding-inspired elements.

The website should feel:

- Minimalist and elegant.
- Light, calm, and visually comfortable.
- Modern and premium.
- Interactive but not overwhelming.
- Creative without becoming gimmicky.
- Personal and photography-led.
- Technically impressive.
- Fully responsive.

Avoid generic AI-generated portfolio designs.

---

# 2. Repository Instructions

Before starting:

1. Inspect the connected repository and its existing files.
2. Identify the current framework and dependencies.
3. Preserve any useful existing code.
4. If the repository is empty, initialize a new Next.js application.
5. Use TypeScript throughout the application.
6. Create an `AGENTS.md` file in the repository root.
7. Store the design requirements, personal information, color palette, and implementation rules in `AGENTS.md`.
8. Treat `AGENTS.md` as the project's persistent development reference.
9. Create a `README.md` explaining the application structure and how to run it.
10. Do not overwrite unrelated code or discard existing work without checking.

If appropriate, use a dedicated feature branch and commit changes there. Do not force-push or rewrite shared branch history.

Do not repeatedly ask for confirmation about ordinary implementation decisions. Make thoughtful decisions consistent with this specification.

---

# 3. Technology Stack

Use:

**Core**
- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.

**Animations**
- Motion for React.
- CSS transitions for simple effects.

**3D**
- Three.js.
- React Three Fiber.
- React Three Drei.

**UI**
- Lucide React.
- Custom reusable components.
- Devicon or another reputable source for authentic technology logos.

**Typography**
- Geist or Manrope.
- Geist Mono.
- Doto for occasional dot-matrix typography.

Use compatible current stable versions.

Do not introduce unnecessary UI frameworks.

Make the application compatible with Vercel deployment.

Use client-side rendering only where interactivity requires it.

---

# 4. Personal Information

Use the following information in the portfolio.

**Full name:** Sanupa Gunarathne

**Professional identity:** Software Engineering Undergraduate / Developer

**University:** Informatics Institute of Technology (IIT), Sri Lanka

**Degree:** BSc (Hons) Software Engineering — University of Westminster

**Location:** Sri Lanka

**Interests:**
- Software development.
- Creative web experiences.
- Photography.
- Motorcycling.
- Tennis.
- Graphic design.
- Technology and experimentation.

Write personal descriptions in a natural, confident, professional tone.

Avoid exaggerated claims such as "world-class engineer" or "industry-leading developer."

Do not invent employment experience, awards, qualifications, or achievements.

Store personal information in a dedicated editable configuration file.

---

# 5. Social Media

Use these exact links:

**GitHub**
https://github.com/sanupagunarathne

**LinkedIn**
https://www.linkedin.com/in/sanupagunarathne/

**Instagram**
https://www.instagram.com/sanuoa.p/

Include these where appropriate in the navigation, About, Contact, and Footer sections.

Use genuine platform icons.

All external social links must work and open appropriately.

Do not invent my email address.

Use a clearly labeled placeholder for my contact email until I provide it.

---

# 6. Color Palette — Mandatory

Use exactly these five primary colors:

| Purpose | Hex |
|---|---|
| Stone Gray | #73726E |
| Soft Gray | #E6E5E1 |
| Soft Blush | #F2D9D0 |
| Warm Ivory | #F7F7ED |
| Warm Taupe | #B8B5AE |

### Color guidelines

- Warm Ivory should dominate the background.
- Stone Gray should appear in text, icons, and selected interface elements.
- Soft Gray should be used for cards and secondary surfaces.
- Soft Blush should serve as a subtle accent.
- Warm Taupe should be used for borders and dividers.

Use a darker neutral derived from Stone Gray for primary text where necessary to achieve readable contrast.

Do not introduce neon colors, excessive gradients, or a dark-theme aesthetic.

Create centralized design tokens and use them consistently.

The overall appearance should feel soft, sophisticated, and calm.

---

# 7. Visual Design Language

Take inspiration from modern editorial portfolios, premium creative studios, and minimalist product websites.

### Design characteristics

- Generous whitespace.
- Large, expressive typography.
- Asymmetrical but balanced layouts.
- Subtle borders.
- Soft corners.
- Refined transitions.
- Minimal shadows.
- Premium photography.
- Carefully aligned content.
- Consistent visual hierarchy.

Do not make every section a repetitive grid of cards.

Different sections should have their own compositions while sharing one cohesive design system.

---

# 8. Coding-Inspired Design Identity

This is a software engineer's portfolio.

Introduce subtle programming-inspired elements throughout the design.

Examples:

- Monospaced technical labels.
- Section numbers such as `01 / WORK`.
- Filename-style text such as `about.ts`.
- Small code symbols.
- Dot-matrix typography.
- Tiny dot-grid patterns.
- Subtle status indicators.
- Minimal code snippets.
- Thin outlined UI panels.

### macOS-inspired components

Create reusable macOS-style window components featuring:

- Three small titlebar dots.
- Rounded corners.
- Thin borders.
- Soft gray or ivory backgrounds.
- Monospaced titles.
- Clean internal layouts.

Use these components selectively for:

- Technical information.
- Project previews.
- Expertise details.
- Creative experiments.
- Small code snippets.

Do not wrap the entire website inside macOS windows.

The titlebar buttons can be decorative, but must not falsely suggest functionality.

---

# 9. Complete Website Structure

Build the following sections in order:

1. Hero.
2. Selected Projects.
3. About Me.
4. Expertise and Technologies.
5. My Journey.
6. Creative Playground.
7. Beyond the Screen.
8. Contact.
9. Footer.

Additionally, create dedicated project detail pages.

Each section must be fully responsive and visually consistent.

---

# 10. Hero Section

Create a premium split-screen hero.

### Left side

Use:

Small introduction:
"Hello, I'm Sanupa."

Main headline:
"Building digital experiences that feel different."

Supporting description:
"Software Engineering undergraduate exploring the intersection of technology, creativity, and thoughtful design."

Primary button:
"Explore My Work"

Secondary button:
"About Me"

Add a small location indicator.

### Right side

Use my actual photograph as the main hero visual.

**Important: I will upload my photograph later.**

For now:

- Create a dedicated portrait placeholder.
- Do not use a stock person's photograph.
- Do not create an AI-generated character.
- Do not use animated avatars.
- Make the placeholder easy to replace.
- Maintain the correct responsive layout even without the final image.

The photo should be elegantly integrated into the design rather than placed inside a generic card.

### Animations

- Gentle text reveals.
- Subtle photograph entrance.
- Refined CTA hover transitions.
- Smooth scrolling.

Avoid excessive motion.

---

# 11. Selected Projects

Heading:

`01 / SELECTED WORK`

"A collection of things I've brought to life."

Create a visually distinctive editorial project gallery.

Use one large featured project followed by smaller project layouts.

### Projects

**Project 1 — Paddock Labs**

A karting telemetry and driver performance analysis project involving IoT, sensor data, and machine learning.

Relevant technologies and areas:
- Java.
- Spring Boot.
- PostgreSQL.
- Python.
- Machine Learning.
- ESP32.
- GNSS.
- IMU sensors.

Do not claim the system is completed or deployed unless verified.

**Project 2 — EatWhat**

An interactive application that helps groups decide where or what to eat.

Relevant technologies:
- JavaScript.
- Node.js.
- PostgreSQL.
- Vercel.

**Project 3 — Campus Slot**

A campus room-booking application.

Relevant technologies:
- Java.
- Spring Boot.
- Database design.

**Project 4 — NEX Installer**

A Windows-based offline software and font installer concept.

Relevant technologies:
- C#.
- .NET.
- Windows desktop application development.

Only display features and development statuses that are actually known. Do not present planned work as completed.

### Screenshots

**I will upload project screenshots later.**

For now:

- Create attractive screenshot placeholders.
- Use correctly sized image containers.
- Provide project-specific placeholder labels.
- Do not fabricate application screenshots.
- Keep assets easily replaceable.

### Project interactions

- Smooth image zoom on hover.
- Arrow transitions.
- Subtle cursor-following View Project labels.
- Responsive card animations.
- Clickable project detail pages.

### Project detail pages

Each project should have a dedicated case study.

Include:

- Project title.
- Overview.
- Problem.
- My role.
- Main features.
- Technology stack.
- Development approach.
- Challenges.
- Results or progress.
- Image gallery.
- GitHub/demo links when verified.
- Next-project navigation.

Use editable placeholders for information not yet available.

---

# 12. About Me

Heading:

`02 / ABOUT`

"More than just lines of code."

Use an editorial composition with personal photography and concise storytelling.

Describe my interest in software engineering, creative development, and building practical applications.

Include a short paragraph about my curiosity and personal interests.

### Photography

I will upload additional photographs later.

Prepare an elegant image placeholder.

### Optional developer component

Create a small macOS-style information window called `about-me.ts`.

It can contain a short, stylized introduction.

Keep the information understandable for nontechnical visitors.

### Interactions

- Gentle scroll reveals.
- Subtle image movement.
- Optional small hover annotations.

---

# 13. Interactive Expertise Section

This section must be visually impressive.

Heading:

`03 / EXPERTISE`

"Tools I use to bring ideas to life."

Do not use a plain text list or percentage-based skill bars.

Create a visually appealing technology showcase displaying authentic technology logos.

### Categories

**Programming Languages**
- Java.
- Python.
- JavaScript.
- TypeScript, if verified.
- C#.

**Frontend**
- HTML.
- CSS.
- React.
- Other technologies verified in the project information.

**Backend**
- Node.js.
- Spring Boot.
- ASP.NET Core.

**Databases**
- PostgreSQL.
- MySQL.
- SQLite, where relevant.

**Tools**
- Git.
- GitHub.
- VS Code.
- IntelliJ IDEA.
- Visual Studio.
- Figma.
- Postman.
- Google Colab.

Use editable data so technologies can be added or removed easily.

### Main visual concept

Create an interactive technology constellation or well-organized floating logo composition.

Logos should look visually balanced and attractive.

Possible arrangement:

- Central decorative 3D geometric object.
- Technology logos arranged around the centerpiece.
- Soft shadows and depth.
- Subtle cursor-based motion.
- Clear category selection.

Avoid random logo scattering or overlapping.

### Clicking a technology

When a user selects a logo, display an expanded information panel.

The panel should show:

- Technology name.
- Official logo.
- Category.
- Short description.
- How I use it.
- Learning status.
- Related projects.

Use a beautiful macOS-inspired window for the expanded content.

### Learning status

Support:

- Working With.
- Learning.
- Exploring.

Do not claim mastery based only on familiarity with a technology.

All statuses must be editable.

### 3D interactions

Include a tasteful React Three Fiber element.

Possible object:
- A layered geometric sculpture.
- An abstract technology core.
- A soft glass-like rotating structure.

Use the portfolio color palette.

The user should be able to rotate or interact with it gently.

The 3D experience must not interfere with selecting technology logos.

Provide a static or 2D fallback.

---

# 14. Interactive Timeline

Heading:

`04 / JOURNEY`

"Every experience shapes what comes next."

Create an elegant timeline for my education, projects, and achievements.

### Known educational information

- Previously attended Maliyadeva College.
- Completed foundation studies.
- Currently studying BSc (Hons) Software Engineering at IIT Sri Lanka.

Use editable milestones for additional achievements and experience.

Do not invent dates.

### Timeline design

Use:

- Thin connecting lines.
- Interactive milestone circles.
- Large year labels.
- Concise milestone titles.
- Soft hover highlighting.

### Hover interactions

On desktop:

- Highlight the hovered milestone.
- Slightly enlarge the point.
- Emphasize its connecting line.
- Reveal a small summary tooltip.

### Click interactions

When clicked:

- Expand a detailed milestone panel.
- Show additional information.
- Maintain a selected state.

### Mobile

- Use a vertical timeline.
- Tap to expand.
- No hover-only content.
- Avoid overflow.

The timeline should look elegant and lightweight.

---

# 15. Creative Playground

Heading:

`05 / PLAYGROUND`

"Small experiments. Big curiosity."

Build an interactive showcase for creative frontend experiments.

Possible items:

- Typography experiment.
- Custom hover interaction.
- Interactive UI component.
- Small geometric animation.
- 3D experiment.
- Minimal coding-inspired interaction.

Use a modern editorial grid with variable item sizes.

### 3D element

Include a second small React Three Fiber experience if it improves the design.

Use a soft geometric object in the palette colors.

Avoid full-screen heavy 3D environments.

The experiments should be real, functional interactions rather than static fake demos.

---

# 16. Beyond the Screen

Heading:

`06 / BEYOND THE SCREEN`

"There's more to me than code."

Show my interests outside software engineering.

Categories:

- Photography.
- Motorcycling.
- Tennis.
- Creative design.

Create a minimal editorial photo gallery.

**Personal photographs will be uploaded later.**

For now, use clean image placeholders with the correct aspect ratios.

Avoid random stock photography.

### Interactions

- Hover to reveal captions.
- Click to view photographs.
- Smooth gallery transitions.
- Mobile-friendly interaction.

---

# 17. Contact

Create a large, premium closing section.

Suggested headline:

"Let's make something meaningful together."

Include:

- GitHub.
- LinkedIn.
- Instagram.
- Resume placeholder.
- Contact email placeholder.

Use a clean primary CTA.

Do not invent an email address.

Use a subtle Soft Blush background treatment.

Include small hover effects and refined typography.

---

# 18. Footer

Keep the footer minimal.

Include:

- `sanupa.` wordmark.
- Short tagline.
- Social links.
- Copyright information.
- Back-to-top interaction.

Use the current year dynamically.

---

# 19. 3D Design Rules

Use 3D selectively.

Recommended locations:

1. Expertise section — primary 3D experience.
2. Creative Playground — secondary optional 3D experiment.

Avoid:

- Full-screen 3D backgrounds.
- Heavy 3D navigation.
- Excessive spinning.
- Large GPU-intensive scenes.
- 3D elements obscuring content.

3D should enhance the website rather than dominate it.

Implement:

- Responsive scene sizing.
- Lazy loading.
- Interaction controls.
- Reduced-motion behavior.
- Fallback visuals.
- Sensible rendering performance.

Keep real personal photography as the primary visual identity.

---

# 20. Animation and Microinteractions

Use Motion for React and CSS transitions.

Implement:

- Smooth section reveals.
- Gentle staggered typography.
- Project image hover effects.
- Expandable technology panels.
- Timeline highlighting.
- Subtle navigation transitions.
- Button hover effects.
- Small 3D interactions.

Respect `prefers-reduced-motion`.

Avoid excessive animation and scroll hijacking.

---

# 21. Responsiveness

The website must be carefully designed for:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

### Desktop

Use generous whitespace, split layouts, large project imagery, and rich interactions.

### Tablet

Adapt grid proportions, typography, and spacing.

### Mobile

- Maintain a prominent personal photo.
- Stack content logically.
- Use accessible mobile navigation.
- Display projects in a readable single column.
- Adapt technology logos into a touch-friendly arrangement.
- Use tap-to-expand timeline details.
- Reduce 3D complexity.
- Prevent horizontal overflow.

Do not simply shrink desktop layouts.

---

# 22. Project Architecture and Maintainability

Separate content from UI components.

Create editable data/configuration files such as:

- `personal.ts`
- `projects.ts`
- `skills.ts`
- `timeline.ts`
- `interests.ts`
- `socials.ts`

Create reusable components for:

- Navigation.
- Section headings.
- Project cards.
- macOS-style windows.
- Skill icons.
- Skill detail panels.
- Timeline milestones.
- 3D scenes.
- Image placeholders.
- Gallery.
- Contact links.
- Footer.

All future content should be easy to update without redesigning components.

---

# 23. Future Asset Requirements

I will provide the following later:

1. Hero photograph.
2. About section photograph.
3. Project screenshots.
4. Additional personal photographs.
5. Verified technology proficiency details.
6. Additional projects.
7. Resume.
8. Contact email.

For now, create clearly labeled placeholders.

Keep the correct layout and visual structure.

Document the exact asset paths where these files should be placed.

Do not generate fake personal photographs.

Do not invent project screenshots.

---

# 24. SEO and Accessibility

Implement:

- Semantic HTML.
- Descriptive metadata.
- Open Graph metadata.
- Accessible navigation.
- Keyboard interactions.
- Clear focus indicators.
- Meaningful alt text.
- Readable color contrast.
- Reduced-motion support.
- Optimized image loading.
- Responsive typography.
- Appropriate heading hierarchy.
- Sitemap and robots configuration where appropriate.

The portfolio must remain accessible even when JavaScript-intensive 3D scenes are unavailable.

---

# 25. Development Workflow

Work in the following order.

### Phase 1 — Project Foundation

- Inspect the repository.
- Initialize or adapt Next.js.
- Configure TypeScript and Tailwind CSS.
- Install necessary libraries.
- Create `AGENTS.md`.
- Set up colors, fonts, and spacing.
- Create the global layout.
- Implement responsive navigation.

### Phase 2 — Complete Website Structure

Implement every homepage section with realistic, editable content or clearly labeled placeholders.

Do not stop at the hero.

### Phase 3 — Core Interactions

Implement:

- Navigation interactions.
- Project card animations.
- Expandable expertise section.
- Timeline hover and click interactions.
- macOS-style windows.
- Photo gallery interactions.

### Phase 4 — 3D Experiences

Implement:

- Expertise 3D component.
- Optional Playground 3D experiment.
- Responsive adaptations.
- Loading and fallback behavior.

### Phase 5 — Dedicated Project Pages

Create dynamic project detail pages.

Use editable data.

### Phase 6 — Quality Assurance

- Verify desktop and mobile layouts.
- Test navigation.
- Check accessibility.
- Validate project links.
- Verify skill interactions.
- Verify timeline interactions.
- Check 3D performance.
- Run TypeScript checks.
- Run lint.
- Run production build.
- Fix errors.

Do not report checks as passing unless they have actually been run successfully.

---

# 26. Important Design Restrictions

Do not use:

- Dark themes.
- Neon colors.
- Generic animated developer avatars.
- Heavy gradient backgrounds.
- Repetitive SaaS-style cards.
- Large glowing effects.
- Excessive glassmorphism.
- Fake testimonials.
- Fake project statistics.
- Generic stock photos presented as personal images.
- Skill percentage bars.
- Unnecessary carousels.
- Excessive scrolling animations.
- Nonfunctional decorative buttons.
- Fake application screenshots.

The portfolio should feel personal, visually distinctive, and thoughtfully designed.

---

# 27. Persistent Project Memory

Create an `AGENTS.md` file in the repository root.

Include:

- Project purpose.
- Exact color palette.
- Chosen technology stack.
- Personal information.
- Social links.
- All nine website sections.
- Photography requirements.
- Expertise interactions.
- Timeline interactions.
- Selective 3D requirements.
- Coding-inspired design elements.
- macOS component rules.
- Responsive requirements.
- Project content.
- Future asset placeholders.
- Accessibility requirements.
- Development conventions.

This file should be the persistent reference for future Codex sessions.

Do not assume ChatGPT memory is automatically accessible from Codex.

The repository must contain the important information needed to continue development independently.

Also maintain a `PROJECT_STATUS.md` file documenting completed features, unfinished features, placeholder assets, known issues, and next steps.

Update it after meaningful implementation milestones.

---

# 28. Completion Requirements

The initial build must include:

- A complete homepage.
- All nine sections.
- Functional responsive navigation.
- Working project detail pages.
- Interactive technology logos.
- Expandable expertise information.
- Interactive timeline.
- Selective working 3D experiences.
- Reusable macOS-inspired components.
- Placeholder photography and screenshots.
- Working social links.
- Responsive layouts.
- Accessible interactions.
- Organized configuration files.
- `AGENTS.md`.
- `PROJECT_STATUS.md`.
- `README.md`.

Run the application and verify that the production build succeeds.

If any requirement cannot be completed, document it explicitly rather than silently omitting it.

---

# FINAL INSTRUCTION

Build this as a distinctive personal software engineering portfolio, not a generic template.

Prioritize design quality, usability, responsiveness, and maintainability.

Use my actual provided information and prepare placeholders for missing assets.

The design should look like a premium light-themed creative portfolio with subtle engineering references.

The website must feel alive through carefully designed interactions, but remain calm and minimalist.

**Start by inspecting the connected GitHub repository. Then create the project instructions and implement the complete website structure. Continue through the implementation phases, testing what you build and documenting any remaining work.**
