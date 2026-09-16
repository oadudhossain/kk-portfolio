This is the Vercel-configured export. Read VERCEL-DEPLOYMENT.md first. The default dev/build/start commands in this copy run Next.js.

# Kaniz Sadia Kabita portfolio

A responsive single-page academic portfolio with a burgundy and ivory identity, six supplied photographs, academic timeline, research interests, sample project topics, accessible photo lightbox, mobile navigation, and email-draft form.

## Run with Next.js

Requirements: Node.js 22.13 or newer and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev:next
pnpm build:next
pnpm start:next
```

The App Router application lives in `app/`. The hosted Sites version uses the included Vinext compatibility build for Cloudflare Workers. This export changes `dev`, `build`, and `start` to standard Next.js commands. The hosted source keeps its own build configuration.

## Content editing

| Content | Where to edit |
| --- | --- |
| Name, email, bio, university, locations, portrait | `data/profile.ts` |
| LinkedIn, Facebook, ResearchGate | `socials` in `data/profile.ts`; empty URLs are hidden |
| Academic semesters and CGPA | `data/education.ts`; blank grades are hidden |
| Gallery photos and captions | `data/gallery.ts` |
| Research interests | `data/research.ts` |
| Projects, methods, PDFs, external links | `data/projects.ts` |
| Skills and digital tools | `data/skills.ts` |
| Experience and engagement | `data/experience.ts` |
| Certificates and achievements | `data/certificates.ts` |

The portrait is `public/images/portrait.webp`. All six original photographs are included in optimized WebP form under `public/images/`. The portrait also appears as the sixth lightbox item, with the five other photographs in the gallery grid. Replace files at those paths or update the data. Add gallery records as needed, then adjust the grid if extending the gallery substantially.

Add the final CV at `public/kaniz-sadia-kabita-cv.pdf` and set `cvAvailable: true` in `data/profile.ts`. Until then, its button is disabled and shows “CV coming soon”.

The four projects are explicitly marked sample topics. Replace them with real work and set `sample: false` when verified. Optional year, image, long description, PDF, external URL, tags, and details URL are supported by the project data model. No achievements or numerical grades were invented. Experience, certificates, digital proficiency, and social links remain hidden until supplied and published. Set `published: true` on verified records to show them.

## Contact form

The form validates required fields, email format, lengths, and whitespace. It creates an encoded email draft and offers an “Open email app” link. It does not send, store, or claim to deliver any message. Visitors send the draft in their own email application.

To add direct delivery, replace the `prepareEmail` adapter and submit handler in `components/portfolio-interactions.tsx` with a call to a server-side route, such as `app/api/contact/route.ts`. Configure your email provider, recipient, server-side validation, spam/rate protection, and server-only credentials there. Show success only after the provider confirms acceptance. Never expose service credentials in client code.

## Brand and metadata

The vector logo is `public/brand/logo.svg`. The favicon is `public/favicon.svg`, with ICO and Apple PNG fallbacks. The separate brand kit contains transparent PNG and light-background/dark-background vector versions with outlined lettering.

SEO metadata lives in `app/layout.tsx`, and Person structured data is in `app/page.tsx`. Set `NEXT_PUBLIC_SITE_URL` to the final public origin to enable canonical URLs. No invented social sharing image is included. Fonts are served locally using URW Base35 fonts; license and notices are included under `public/fonts/`.

## Validation

The hosted production build and TypeScript checks passed. Browser review covered desktop, tablet, and mobile layouts. Width checks included 320, 375, 390, 768, 1024, 1280, and 1440 pixels. Navigation, the photo lightbox, form validation, and email draft preparation were checked. No site-generated console errors were found. Browser extension errors were unrelated to the portfolio.
