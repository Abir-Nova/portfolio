# Task: Fix CSS Conflicts and Restore the Original Portfolio Design

You are an experienced Angular, SCSS, CSS architecture, and Tailwind CSS developer.

I have an Angular standalone portfolio project. I migrated several pages from an existing website and copied their HTML and CSS/SCSS into Angular components. The pages render, but some of their styling is being overwritten by global styles, Tailwind CSS, duplicated CSS variables, and conflicting selectors.

## Objective

Inspect and fix the entire project so that every page retains its intended original design without breaking routing, functionality, responsive behavior, or shared components.

### 1. Inspect the project before editing

Read the relevant files, including:

- `package.json` and Angular configuration
- Global stylesheets such as `src/styles.scss`, `src/app/app.scss`, and any other imported global styles
- The root app component and routing configuration
- All page HTML, TypeScript, and SCSS files, especially Home, About, Experience, Projects, Contact, and Skills
- Shared header, navbar, footer, and reusable components
- Tailwind CSS configuration and imports, including any Tailwind v4 `@theme`, `@custom-variant`, and `@apply` usage
- Font imports and image asset paths

Determine the actual stylesheet loading order and Angular style encapsulation configuration before changing code.

Do not assume that every file mentioned exists. Discover the actual project structure.

### 2. Establish clear CSS ownership

Keep global styles limited to genuinely shared elements, such as:

- Body and HTML defaults
- Shared typography defaults
- Header and navigation
- Footer
- Common buttons and links
- Shared animations and utility classes
- One centralized Tailwind theme configuration, if required

Move page-specific styling into the appropriate component stylesheet.

Give each page a unique root class, for example:

- `.home-page`
- `.about-page`
- `.experience-page`
- `.projects-page`
- `.contact-page`
- `.skills-page`

Scope page-specific selectors beneath their page root. Avoid changing the appearance of unrelated pages.

### 3. Fix the Experience page first

The original Experience page is a carefully composed editorial design with:

- A cream paper-textured background
- A large serif heading: “From ideas to execution.”
- A decorative Moroccan photo collage on the left
- A vertical timeline with dates and red dots
- Rounded experience cards on the right
- Green icons and labels
- Decorative architectural illustrations, olive branches, shapes, and sparkles

The original design is available in the reference screenshot at `localhost:3000/#about`. The Angular version is at `localhost:4200/experience`.

The Angular version currently has a heading clipped beneath the fixed header, altered typography and spacing, and differences in some decorative elements.

Inspect the actual HTML and SCSS, then restore the original layout and appearance.

Important details:

- The original `.stage` uses a 1672 × 941 design coordinate system and the `--u` scaling variable.
- Preserve the intended relative positions of the heading, collage, decorations, timeline, and cards.
- Correct the relationship between the fixed header and the stage so the heading is not hidden.
- Preserve the desktop composition while implementing a sensible mobile layout.
- Do not arbitrarily change the stage's aspect ratio or individual element coordinates before understanding the layout.
- Replace global `:root` page variables with locally scoped variables where appropriate.
- Review the `.stage * { position: absolute; }` rule and its exceptions. Preserve intentional positioning, but ensure normal-flow content and nested elements are not accidentally positioned absolutely.
- Verify that the original fonts load and that the intended serif, sans-serif, monospaced, and handwritten font roles are preserved.
- Keep all existing experience entries, descriptions, dates, tags, icons, and decorative assets.

### 4. Audit every other page

Apply the same analysis to About, Home, Projects, Contact, and Skills.

Look for:

- Generic `.card`, `.title`, `.icon`, `.section`, `.timeline`, `.container`, `.header`, `.tags`, and similar selectors colliding across pages
- Duplicate `:root` variables with different values
- Global selectors that override component-specific styles
- Tailwind Preflight/base styles changing existing margins, headings, lists, or buttons
- Duplicate or conflicting font declarations
- Unexpected margins, padding, widths, heights, positioning, overflow, and z-index
- Global responsive rules affecting page-specific layouts
- Fixed headers covering page content
- Incorrect image paths or missing assets
- Component styles that accidentally became global through `ViewEncapsulation.None` or global imports

Use Angular's default emulated style encapsulation unless there is a demonstrated reason not to.

### 5. Centralize Tailwind correctly

Determine whether this project uses Tailwind v3 or v4 from its installed dependencies and configuration.

Keep the correct Tailwind entry point and theme setup in one appropriate global stylesheet. Do not duplicate Tailwind theme configuration in every page SCSS file.

Do not remove Tailwind or shadcn dependencies that the project actually needs. Fix invalid imports only after verifying the installed packages and their supported setup.

Avoid using `!important` as a blanket fix. Resolve conflicting rules at their source.

### 6. Preserve functionality

Do not rewrite the application from scratch.

Do not remove page content, change route paths, replace images with placeholders, delete working animations, or break standalone component imports.

Preserve navigation, responsive behavior, forms, links, animations, and all existing page content.

### 7. Implement and verify

Make the actual code changes in the existing project.

Then:

1. Run the available build command.
2. Run Angular's development server or use the existing browser preview if available.
3. Fix every compilation error, missing stylesheet, invalid Tailwind import, and asset path issue introduced or discovered.
4. Check that all routes render correctly.
5. Verify that shared navigation and footer styles remain consistent.
6. Verify that fixing one page has not broken another page.
7. Report the files changed, the root cause of each conflict, and any remaining issue that cannot be verified.

Do not merely provide recommendations or sample CSS. Inspect the real files, make targeted changes, and validate the result.

If a visual comparison tool is available, compare the Angular pages against the provided original screenshots before considering the task complete.