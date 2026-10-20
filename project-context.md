# Portfolio Project Context

*Last updated: 2026-10-12*

## 1. Project purpose

This is an independent personal Portfolio built with Angular. It
presents the owner's background, experience, projects, skills, and
contact information. The design and content will be improved
incrementally, section by section.

**Portfolio root (Windows):**
`C:\Users\abirn\OneDrive\Desktop\portfolio`

**Git:** independent repository, remote `origin`
`https://github.com/Abir-Nova/portfolio.git`, branch `dev`.

## 2. Digital Resume source

The existing Epitech DIT Digital Resume is the source of content to
reuse.

**Actual source directory:**
`C:\Users\abirn\OneDrive\Desktop\DIT\web\day4+5 resume`

> Note: the path previously recorded as `...\day4+5` does not exist.
> The real folder is named `day4+5 resume`.

Treat the source as read-only. Files were only read/copied; the source
folder was not modified by this work.

## 3. Integration principle

The Digital Resume is a **content source**, not a separate page or
feature inside the Portfolio. No `/digital-resume` route, iframe, or
second website was created. The Portfolio remains one Angular
application.

## 4. Content mapping (verified for this integration)

| Resume information | Portfolio destination |
| --- | --- |
| Name, identity, hero intro, CV link, profile photo | Home `/` (hero) |
| Featured projects | Home `/` (featured work) |
| Biography, motivation, motto, languages | About `/about` |
| Facts (Bac 18.17, years of study, 3 languages) | About `/about` (stats) |
| Education (teachers timeline) | About `/about` (Education) |
| Skills groups (programming, tools, project, transversal, languages) | About `/about` (Toolkit) |
| Certifications | About `/about` (Certificates) |
| MarocSphere, OMB forum, hospital internship | Experience `/experience` |
| MarocSphere, Graphical Hangman, Smart Reader, RIHANNA, Portfolio | Projects `/projects` |
| Email, phone, LinkedIn, GitHub, CV | Contact `/contact` |

**Status: Integration completed 2026-10-12.** Verified against the
source `index.html` and against the production build output.

## 5. Angular files and routing

The Portfolio is Angular 22 with SSR/prerender (`@angular/ssr`,
Express server). Routes (lazy-loaded) in `src/app/app.routes.ts`:

- `''` → `./pages/home/home` (Home)
- `about` → `./pages/about/about`
- `contact` → `./pages/contact/contact`
- `experience` → `./pages/experience/experience`
- `projects` → `./pages/projects/projects`

`src/app/app.html` previously held the default Angular welcome
placeholder; it now contains only `<router-outlet />`.

### Files modified during content integration

- `src/styles.scss` — palette tokens + shared base/component styles
- `src/index.html` — title, description, theme-color, font links
- `src/app/app.html` — removed Angular placeholder
- `src/app/pages/home/home.html`, `home.ts`
- `src/app/pages/about/about.html`, `about.ts`
- `src/app/pages/experience/experience.html`, `experience.ts`
- `src/app/pages/projects/projects.html`, `projects.ts`
- `src/app/pages/contact/contact.html`, `contact.ts`
- `project-context.md`

### Files created

- `public/assets/Abir_Nassif_CV_2026.pdf`
- `public/assets/my_profile_pic.jpg`
- `public/assets/Abir_AIESEC.jpeg`
- `public/assets/marocsphere.png`
- `public/assets/RIHANNA.png`

The `public/` folder is the configured asset input in `angular.json`;
files are served at the site root (e.g. `assets/my_profile_pic.jpg`).

Page `*.scss` component files remain empty; shared styling lives in the
global stylesheet. Shared placeholder components (`navbar`, `footer`,
`button`, `project-card`, `section-title`) are still unused stubs.

## 6. Design system and color palette

Palette is centralized as CSS custom properties in the global
stylesheet:

**Location:** `src/styles.scss` → `:root { ... }`

```
--color-background: #f5eee8;   --color-text: #3d2925;
--color-burgundy: #6b2638;     --color-salmon: #d9826b;
--color-surface: #ffffff;      --color-soft-background: #ead4cc;
--color-border: #c9aaa0;       --color-muted: #8b7068;
--color-code-background: #292526; --color-quote-text: #4a302b;
--color-hover-background: #ead8d0; --color-hover-accent: #f4b6a6;
```

Typography tokens: `--font-body` (Manrope), `--font-display`
(Playfair Display), `--font-mono` (DM Mono), loaded via Google Fonts in
`src/index.html`.

> The green-themed styling referred to in the request lives in the
> **source resume CSS**, not in the Portfolio. The Portfolio had no
> pre-existing colour theme to remove; the previous Angular welcome
> placeholder (red/pink/purple) was deleted with `app.html`.

## 7. Assets and CV PDF (verified)

- CV PDF: `public/assets/Abir_Nassif_CV_2026.pdf` — linked from Home
  hero and Contact page as `assets/Abir_Nassif_CV_2026.pdf`.
- Profile image: `public/assets/my_profile_pic.jpg` (Home hero).
- About portrait: `public/assets/Abir_AIESEC.jpeg`.
- Project images: `public/assets/marocsphere.png`, `public/assets/RIHANNA.png`.
- Site favicon: `public/favicon.ico` (unchanged).

> Size note: `my_profile_pic.jpg` (~5.5 MB) and `marocsphere.png`
> (~2.5 MB) are large. Optimising these is a candidate for the future
> redesign pass.

## 8. Functionality to preserve

- Existing Angular routes and page navigation (kept; internal links
  converted from `*.html` hrefs to `routerLink` so SPA navigation works).
- Responsive behavior (global breakpoints at 900px and 600px).
- Working buttons, links, form (contact form uses `mailto:`).
- Image, PDF and project-card destinations.

## 9. Current state and future redesign

Content integration for this task is complete and the palette
foundation is in place. Planned future work (not done here) remains:
visual hierarchy, spacing, typography, purposeful animations and
transitions, richer hover interactions, project presentations and
responsive refinements.

## 10. Known issues, contradictions and outstanding tasks

- **LinkedIn URL:** the old Portfolio link was
  `www.linkedin.com/in/abirnassif` (missing protocol, would resolve as a
  relative URL). The source resume has
  `https://www.linkedin.com/in/abirnassif`. The Contact page now uses the
  correct absolute URL.
- **Phone number** `+212 690-137848` was present only in the source
  resume; added to Contact.
- **Experience dates:** source resume lists hospital internship as
  `2023 — 2024`, while other entries use `2026`. These were copied
  as-is; verify they are current.
- Angular version/architecture and build script were verified:
  `npm run build` (`ng build`).
- Remaining: run `npm start` for interactive browser checks (dev server
  not launched in this session), optimise large images, decide whether to
  adopt the unused shared components.

## 11. Development commands

```powershell
cd "C:\Users\abirn\OneDrive\Desktop\portfolio"
npm install        # dependencies already present
npm start          # dev server (ng serve)
npm run build      # production + SSR build (verified working)
```

## 12. Git and repository boundaries

- Portfolio stays independent of the DIT coursework repository.
- No commits, pushes, remote changes, or config changes were made.
- Pre-existing uncommitted Portfolio change to
  `src/app/pages/home/home.html` was superseded by this integration.
- Pre-existing unrelated DIT changes (`web/day06/...`) were left
  untouched.
- The `day4+5 resume` source files were not modified.

## 13. Instructions for future OpenCode sessions

1. Read this file before making changes.
2. Inspect the actual source code; this document is context, not a
   substitute for verification.
3. Preserve the existing Angular architecture and repository
   boundaries.
4. Use the Digital Resume only as a source of accurate content.
5. Integrate content into existing Portfolio sections; do not add a
   standalone Digital Resume page.
6. Follow the specified color palette (`src/styles.scss`).
7. Make only changes relevant to the current request.
8. Run appropriate checks and report what was actually tested.
9. Update this document when routes, file paths, palette
   implementation, integration status, or known issues change.
