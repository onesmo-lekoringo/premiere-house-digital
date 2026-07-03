# AURELIA — A Film-Launch House

A premium, cinematic marketing site for a fictional launch house that unveils and premieres films. Art direction is a close homage to **singsing.movie**: pure-black canvas, oversized editorial typography, high-contrast film-still grids, ultra-minimal nav, restrained motion.

## Stack note (important)
This environment runs **TanStack Start (React) + Vite**, not Next.js/Laravel. Per your choice, the site is **frontend-only with a mock API layer**: a typed data module wrapped in an async `fetchFilms()` / `fetchFilm(slug)` / `submitSignup()` interface that simulates network latency and can return success *or* error states. This mimics a real HTTP API and is structured so it can be swapped for a real Next+Laravel backend later by replacing one file. Nothing is read inline in components — everything flows through the "API".

## The fiction

**Company: AURELIA** — a launch house whose entire craft is making a premiere feel like an event. Tagline: *"We do not release films. We reveal them."*
Voice: hushed, ceremonial, exacting — like the lights going down.

**Films (flagship + 4):**
1. **The Glass Ledger** *(flagship)* — Existential/surrealist. Memories are physical translucent glass shards traded on a cosmic exchange; a rogue auditor absorbs the first machine-dreamed memory and sees reality's failing backend before a cosmic wipe. Frosted-glass worlds, hyper-accelerated trading sequences.
2. **Northlight** — A lighthouse keeper on a vanishing coast begins receiving broadcasts from a version of herself that never left.
3. **The Understudy** — A stage actress realizes her replacement is slowly becoming her, scene by scene.
4. **Salt & Static** — Documentary-fiction hybrid about a town that can only remember in radio waves.
5. **Vermilion** — A restorer of forbidden paintings discovers one canvas is repainting itself each night.

Each gets: poster art, premiere date, logline, synopsis, cast list, and a trailer embed link.

## Art direction

- **Palette:** near-black `#0A0A0A` canvas, bone-white `#F4F1EA` type, single warm accent (amber/gold `#C8A24B`) used sparingly for CTAs and dates. All as semantic tokens in `src/styles.css` (oklch).
- **Type:** bold expanded grotesque for oversized display (headline stacks like "Watch / Mini / Doc"), a serif (Times-like) for editorial body and captions — the exact singsing pairing. Loaded via `@fontsource` (e.g. Archivo/Archivo Expanded + Newsreader).
- **Motion:** slow reveal fades on scroll, subtle image scale on hover, a marquee ribbon, and an animated countdown to the nearest premiere. Tasteful, never busy.
- **Layout:** asymmetric still grids, generous negative space, minimal `AURELIA — GET TICKETS ↗ MENU` style header, full-width cinematic sections.

## Pages / routes

- `/` **Landing** — full-bleed hero selling a premiere the instant it loads (flagship still + oversized title stack + live countdown to opening night), a featured-launch band, a teaser strip, and CTA into the slate.
- `/launches` **Upcoming Launches** — browsable grid of all films from the mock API: poster, premiere date, logline. Loading + error states.
- `/launches/$slug` **Film detail** — per-film page: hero still, synopsis, cast, premiere date, trailer embed, countdown. Driven by the same API; proper not-found + error boundaries.
- `/company` **The Company** — who AURELIA is + services (Premieres, Campaigns, Press) in an editorial layout.
- `/contact` **Stay in the loop** — newsletter/contact form persisted through the mock API with genuine loading → success/error UI, zod validation.

Each route gets its own `head()` metadata (title/description/og). Shared minimal header + footer.

## Technical approach

- `src/lib/api.ts` — the mock API: typed `Film` model, in-memory dataset, `fetchFilms`, `fetchFilm(slug)`, `submitSignup(payload)` with artificial latency and a failure path; signups pushed to an in-memory store. **Single swap point** for a real backend.
- Data fetching via TanStack Query (`ensureQueryData` in loaders + `useSuspenseQuery` in components), matching the template's conventions.
- Poster/still art generated as cinematic images into `src/assets/` (5 posters + hero/section stills), matching the frosted-glass and high-contrast film-still mood.
- Form validated with zod, client-side; submission goes through `submitSignup` and renders real success/error toasts + inline states.
- Reusable components: `SiteHeader`, `SiteFooter`, `Countdown`, `FilmCard`, `Marquee`, `RevealOnScroll`.
- Fully responsive; all colors via semantic tokens (no hardcoded color utilities).

## What I'll deliver
A world-class-feeling, fully responsive site with 5 routes, dynamic film data + film detail pages through a mock API, and a working, persisted (in-memory) signup form with real states — art-directed as a close homage to singsing.movie.
