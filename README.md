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
- Homepage cards populated from the latest published Piranha releases.
- A Google-enhanced search form restricted to `isp.illinois.gov`.
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

## Next milestone: Virtual Kim

The next planned demonstration is **Virtual Kim**, a deliberately limited virtual PIO coordinator. Its answers will be restricted to the small set of approved pages and press releases included in this prototype.

Planned guardrails include:

- clearly identifying itself as a demonstration assistant;
- answering only from approved prototype content;
- linking users to the source page for each answer;
- refusing unsupported, emergency, investigative, legal, and general-purpose questions;
- never presenting a demonstration alert as live information; and
- providing a clear fallback to ISP contact and emergency channels.

See [CHANGELOG.md](CHANGELOG.md) for the current prototype history.
