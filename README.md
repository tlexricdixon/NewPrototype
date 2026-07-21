# Illinois State Police Website Prototype

> **DEMONSTRATION ONLY.** This project is not an official Illinois State Police website. Its AMBER Alert banner, press releases, names, dates, events, and statistics are fictional demonstration content.

This repository contains four responsive homepage concepts for an Illinois State Police website redesign. The prototype uses Piranha CMS for web-first press releases so Public Information Office staff can publish accessible HTML without producing a PDF.

## Highlights

- Four visually distinct, mobile-first homepage concepts.
- A prominent, unmistakably fictional AMBER Alert demonstration banner.
- Four primary service areas: About, Become a Trooper, Public Services, and Law Enforcement Services.
- A responsive photo reel with pause and resume controls.
- A two-level agency and State of Illinois footer.
- An HTML-first press-release type and public news archive.
- A hierarchical Citizen Resources section with reusable child pages.
- Homepage cards populated from the latest published Piranha releases.
- A Google-enhanced search form restricted to `isp.illinois.gov`.
- Virtual Kim, a controlled 31-intent demonstration assistant using approved responses and destinations only.
- Shared accessibility defaults for skip links, focus indicators, touch targets, semantic labels, reduced motion, color contrast, and Windows High Contrast Mode.

## Technology

- .NET 10 / ASP.NET Core MVC
- Piranha CMS 12.2
- SQLite
- Bootstrap 5
- Razor views and shared partials

## Run locally

Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0), then run:

```powershell
dotnet restore
dotnet run
```

The development launch profile uses:

- `https://localhost:63747`
- `http://localhost:63748`

The public homepage opens directly without requiring a manager login. The Piranha manager remains available at `/manager`.

## Demo routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage Concept 1 — Command |
| `/Home/Index2` | Homepage Concept 2 — Service |
| `/Home/Index3` | Homepage Concept 3 — Editorial |
| `/Home/Index4` | Homepage Concept 4 — Civic |
| `/news` | Published press-release archive |
| `/citizen-resources` | CMS-managed Citizen Resources section and child-page directory |
| `/manager` | Piranha content manager |

## Press-release workflow

The `PressRelease` content type is designed for a PIO staff member working under deadline:

1. Sign in at `/manager`.
2. Open the News archive and create a Press release.
3. Enter the headline, excerpt, dateline, release body, optional legal notice, and contact information.
4. Use Heading 2 or lower within the body; the release title is already the page Heading 1.
5. Select **Publish** when the release is ready.

Once published, the release becomes an accessible HTML page, appears in `/news`, and can appear automatically in each homepage's Latest News card. No PDF is required.

On startup, the demonstration seeder creates the News archive and four clearly labeled fictional good-news releases when they do not already exist.

## Citizen Resources workflow

`Citizen Resources` is a parent page in the Piranha site tree. Its published, visible child pages appear automatically as cards on `/citizen-resources`.

1. Sign in at `/manager`.
2. Create a page using **Citizen Resource page**.
3. Place it beneath **Citizen Resources** in the site tree.
4. Add its title, summary, body blocks, and optional primary image.
5. Publish the page.

The starter hierarchy includes Forms, Domestic Violence Resources, Scam and Fraud Resources, and Transparency. Editors can revise or remove the demonstration copy. One reusable page type renders every child; a new Razor view or controller action is not required for each resource.

The landing page also includes representative overview, CALEA accreditation, and Language Access Plan text adapted from the current public Citizen Resources page so the prototype has realistic content volume. This is demonstration reference copy, not a validated content migration. Content owners must review its dates, links, legal language, and current accuracy before production use.

The tracked demonstration SQLite database includes the editor-authored content currently published on the Forms, Domestic Violence Resources, Scam and Fraud Resources, and Transparency child pages. Keeping `piranha.db` with the prototype allows another checkout to reproduce the reviewed demo; production environments must instead use approved persistent storage, backups, deployment-safe migrations, and formal content governance.

Citizen Resource detail pages allow structured content such as wide tables to use the available page width, while direct paragraphs and lists remain constrained to a readable line length. The shared template applies this behavior to every resource page without page-specific layout code.

## Accessibility notes

Accessibility is treated as a design constraint rather than a cleanup step. Current work includes:

- semantic landmarks and heading structure;
- a keyboard-accessible skip link;
- visible keyboard focus indicators;
- accessible carousel controls and reduced-motion behavior;
- properly associated search labels;
- enhanced touch targets on important controls;
- responsive layouts for iPhone-sized screens;
- WCAG AA-conscious text and component contrast;
- forced-colors support for the search component; and
- web-first release content that avoids inaccessible PDF-only publishing.

These measures do not constitute a complete WCAG conformance claim. The prototype should still receive automated and manual testing with keyboard navigation, screen readers, zoom/reflow, and representative mobile devices before production use.

## Important demo and production notes

- The AMBER Alert is intentionally filled with the word **DEMO** so it cannot reasonably be mistaken for a live alert.
- The sample press releases are labeled **DEMO — NOT AN ACTUAL PRESS RELEASE**.
- The search form sends queries to Google and restricts results to the current official ISP domain. A production implementation should use the State's approved search service and privacy configuration.
- SQLite and seeded local-manager configuration are appropriate for this prototype, not a production deployment plan.
- Piranha 12.2 currently resolves AutoMapper 12.0.1 transitively, which produces NuGet advisory `GHSA-rvv3-g6hj-g44x`. This accepted demo limitation must be resolved before any production deployment; do not assume the .NET 10 target removes it.
- Production hosting will require approved identity, secrets management, persistent storage, monitoring, backup, security review, content governance, and an operational alert-publishing process.

## Virtual Kim demo

**Virtual Kim** is a deliberately limited virtual PIO coordinator available from the floating **Ask Kim** button throughout the prototype. She uses phrase matching against a curated catalog—not a generative AI service—and can answer only with approved copy and approved links.

The demonstration includes:

- 31 controlled intents covering Citizen Resources, common ISP services, reporting destinations, state-agency referrals, news, and homepage concepts;
- four visible quick actions for Citizen Resources and ISP services, reporting, careers, and other state services;
- awareness of the current homepage concept and links for switching among all four concepts;
- links to the seeded demonstration press releases and full `/news` archive;
- in-app links to the Citizen Resources landing page and its Forms, Domestic Violence, Scam and Fraud, and Transparency children;
- session continuity when a visitor switches concepts; and
- a friendly fallback that returns visitors to common topics or the normal site search.

Kim's boundary is intentionally narrow:

- clearly identifying itself as a demonstration assistant;
- answering only from approved prototype content;
- linking users to the source page for each answer;
- directing emergencies to 911 without offering emergency advice;
- refusing unsupported, investigative, legal, and general-purpose questions;
- never accepting reports or requesting personal information;
- never presenting a demonstration alert as live information; and
- providing a clear fallback to ISP contact and emergency channels.

The panel is non-modal and does not open on an initial visit. It uses a labeled complementary region, real buttons and links, polite message announcements, visible focus, Escape-to-close behavior, no focus trap, and mobile-safe positioning. To preserve continuity without collecting questions, session storage retains only approved response identifiers and the user-selected open or closed state; typed questions are not persisted or sent to a server.

See [CHANGELOG.md](CHANGELOG.md) for the current prototype history.
