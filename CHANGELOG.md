# Changelog

All notable changes to the Illinois State Police website prototype are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). This is a demonstration project and does not currently use formal semantic-version releases.

## Unreleased

### Added

- Added **Virtual Kim**, a persistent non-modal demonstration assistant shared by all four homepage concepts.
- Added a curated catalog of 30 supported intents with phrase matching, approved responses, and approved destination URLs.
- Added quick actions for finding ISP services, reporting destinations, careers, and other Illinois agencies.
- Added controlled referrals for Secretary of State, ABE/DHS, IDES, Department of Revenue, and IDOT services.
- Added current-concept awareness, concept-switching links, seeded press-release awareness, and a friendly unsupported-question fallback.
- Added session continuity that stores approved response identifiers and panel state without persisting typed questions.

### Changed

- Upgraded the application target framework from .NET 9 to .NET 10.
- Updated local-development documentation to require the .NET 10 SDK.

### Accessibility

- Implemented Kim as a labeled complementary region that does not open on an initial visit and does not trap focus.
- Added keyboard operation, visible focus, an accessibly named close button, Escape-to-close support, polite message announcements, real buttons and links, mobile-safe layout, and forced-colors support.
- Kept normal navigation and Google-enhanced site search available independently of Kim.

### Known limitations

- Piranha 12.2 transitively resolves vulnerable AutoMapper 12.0.1 (`GHSA-rvv3-g6hj-g44x`). The demo retains this dependency because incompatible CMS-package upgrades are outside the demonstration scope; production release remains blocked on remediation.

## 2026-07-18

### Added

- Four responsive ISP homepage concepts: Command, Service, Editorial, and Civic.
- Shared prototype header, photo reel, service navigation, About menu, and double footer.
- A highly visible fictional AMBER Alert banner with repeated DEMO labeling.
- Piranha `PressRelease` and `PressReleaseArchive` content types.
- Accessible HTML press-release and archive views.
- Four fictional, positive, clearly labeled demonstration releases.
- An idempotent startup seeder for the `/news` archive and sample releases.
- Latest News cards that display the three newest published releases on every homepage concept.
- A Google-enhanced header search restricted to `isp.illinois.gov`.
- Search labeling, large touch targets, keyboard focus treatment, forced-colors support, and responsive mobile presentation.
- Shared accessibility defaults and Tag Helpers for focus rings, skip links, labels, and target sizing.

### Changed

- Routed `/` directly to the public MVC homepage while retaining Piranha routing for News and press releases.
- Kept the Piranha manager isolated at `/manager` rather than using it as the public landing page.
- Replaced the old header Search link with a full search field beneath the navigation links.
- Added a permanent black search-field outline to the Editorial concept.
- Replaced low-contrast decorative Google lettering with accessible dark text.
- Limited TinyMCE body headings so authors do not add a second Heading 1 inside a press release.

### Accessibility

- Kept press releases web-first so accessibility is handled by the shared page template instead of a midnight PDF-production workflow.
- Added semantic page landmarks, accessible carousel controls, reduced-motion behavior, responsive reflow, visible keyboard focus, and contrast-conscious colors.
- Added prominent warnings to prevent demonstration alerts and releases from being mistaken for live public-safety information.
