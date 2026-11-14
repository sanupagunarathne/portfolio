# Deployment and content handoff

Deployment is a separate user-authorized action. This branch does not deploy or merge main.

## Runtime and build

Use Node.js 24.22.1 from `.nvmrc`. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, then `npm run start`. The project needs a Next.js server (or Vercel's Next.js runtime), not a static `out/` upload: homepage availability and the contact API run on the server. Fonts and technology icons are local. There is no database or external 3D asset service.

On Vercel select the Next.js preset, repository root, the pinned Node major (24), `npm ci` as install command and `npm run build` as build command. Let Next.js manage output. Publish only after Sanupa authorizes deployment.

## Public origin and indexing

Set server variable `SITE_URL` to the verified public HTTPS origin, without a path, credentials, query or fragment. No public domain has been supplied, so it remains unset in this repository. Rebuild after adding or changing it because metadata, robots and sitemap are generated at build time.

When configured for production, each public page has its own canonical and Open Graph URL. `/sitemap.xml` includes the homepage and four case studies; `/robots.txt` advertises that sitemap and disallows the API. No artificial modification dates, personal claims or absent preview images are generated. Without an origin, metadata is noindex/nofollow, robots disallows crawling and sitemap contains no URLs. Vercel preview/development environments retain that behavior even if SITE_URL is inherited. Other hosts should leave SITE_URL unset for previews and enable host-level preview protection if needed. Robots directives are crawler guidance, not access control.

## Optional contact delivery

The form works in clearly labeled preparation/copy mode without credentials. To activate the provisional Resend adapter, configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` securely in deployment settings. The owner must supply the recipient; use a sender on a Resend-verified domain. Allow outbound HTTPS to `api.resend.com`. Keep credentials out of Git and chat. Setting `personal.email` alone does not configure the API.

Before public activation, configure hosting/provider abuse and rate controls (there is no shared application rate limiter), then authorize and verify a real message to the receiving inbox. Tests mock provider acceptance/failure; they do not establish live delivery. Inputs lock while sending, failed attempts preserve the message, and success requires an explicit API acceptance response. Editing a prepared draft invalidates its old copy.

## Content still needed

Use `docs/ASSETS.md` for portrait, project screenshot and personal photo paths. Supply actual media, résumé, public email, verified project repository/demo links, contributions/results, dates and individual learning statuses. Null values remain labeled placeholders. Do not replace them with invented assets or claims. `src/data/` controls all content.

## Release verification

Run the documented checks and the production Playwright suite. After an authorized deployment verify the real homepage, all four case studies, unknown-route 404, canonical URLs, robots and sitemap. Check desktop/mobile navigation, keyboard focus, filters, journey, playground, reduced motion and 3D fallback on representative real devices. Review social destinations manually; local checks validate their exact configured URLs without claiming remote account availability. Check real image loading and descriptions when assets arrive. Real-device assistive technology, physical GPU performance and live email delivery remain separate from automated Chromium/SwiftShader evidence.
