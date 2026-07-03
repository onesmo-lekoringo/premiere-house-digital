# 🎬 Aurelia — We Don't Release Films. We Reveal Them.

Welcome to the front door of **Aurelia**, a studio-adjacent movie-launch house. We don't just drop trailers; we choreograph high-tension countdowns, roll out plush red carpets, and construct the precise moment a film meets the world.

If a film premieres and there isn't a ticking countdown showing milliseconds, did it even happen? We think not.

---

## 🌐 Live Deployment

| Service | URL |
|---|---|
| **Frontend** (Next.js → Vercel) | [aurelia.vercel.app](https://aurelia.vercel.app) |
| **API** (Laravel → Railway) | [premiere-house-digital-production.up.railway.app/api](https://premiere-house-digital-production.up.railway.app/api) |

---

## 📸 Exhibition Gallery (Screenshots)

We know reviewers love eye candy. Here is a look at what we staged:

| **Splash Screen (The Cinematic Wait)** | **The Signature Hero Backdrop** |
|:---:|:---:|
| ![Splash Screen](public/loading%20screen.png) | ![Hero Page](public/hero-page.png) |

| **Upcoming Slate Grid** | **Interactive Ticket Seat Selection** |
|:---:|:---:|
| ![Upcoming Slate](public/upcoming%20launches.png) | ![Ticket Booking](public/reservation%20of%20tickets.png) |

| **Generated Ticket Pass** |
|:---:|
| ![Ticket Pass](public/tickets.png) |

---

## 🚀 Projection Booth Setup (Run Locally)

Follow these quick commands to spin up the local environment.

### 1. Run the Laravel API Backend (Docker)
Ensure Docker is running on your machine, then start the container from the `/api` directory:

```bash
cd api
docker compose up -d
```

*What happens behind the scenes:*
- A local SQLite database is instantly provisioned at `database/database.sqlite` — no DB credential nightmares.
- Migrations run automatically on container start.
- The database seeds itself with 5 highly existential, surrealist, and gothic films.

*To wipe the slate clean and re-seed manually:*
```bash
docker compose run --rm api php artisan migrate:fresh --seed
```

The API is served at: `http://localhost:8000/api`

---

### 2. Run the Next.js Frontend
From the root directory, install dependencies and boot the dev server:

```bash
npm install
npm run dev:web
```

*Other root-level scripts:*
- `npm run build:web` — Compile the Next.js production build (zero TypeScript errors, verified).
- `npm run start:web` — Start the production-optimized frontend.

The frontend will launch at: `http://localhost:3000`

> **Note:** When running locally, create a `web/.env.local` file with:
> ```
> NEXT_PUBLIC_API_URL=http://localhost:8000/api
> ```

---

## 🏗 Architecture

This is a **monorepo** with two independently deployed services:

```
/
├── web/        → Next.js 15 App Router (deployed on Vercel)
└── api/        → Laravel 11 REST API (deployed on Railway)
```

The frontend fetches all film and ticket data from the Laravel API at request time via React Server Components. CORS is open on the API so both local and production frontend origins are accepted.

---

## ⚡ Stack Choices & Engineering Confessions

### Frontend: The Next.js Pivot
- **The Choice**: Next.js 15 App Router with Tailwind CSS v4.
- **The Drama**: We initially built this with TanStack Start + Vite (micro-animations so fast they'd make Christopher Nolan dizzy). Following the assignment requirements, we did a mid-sprint pivot to Next.js App Router.
- **The Payoff**: React Server Components let us fetch the film list directly from the Laravel API at request-time, with zero client-side loading states on initial page load. Hydration mismatches on the countdown clock were resolved by deferring time calculations to post-mount on the client.

### Database & API: SQLite + Laravel 11
- **The Choice**: SQLite + Eloquent ORM, containerised in Docker locally and deployed on Railway in production.
- **The Rationale**: Reviewers have enough Docker containers in their life. SQLite requires zero database configuration and starts instantly. On Railway, the database is seeded fresh on every deploy — so the films are always there, always crisp.

---

## 🎟 Features Built (Act I to Act V)
- **The Signature Hero**: Cinematic landing with a high-precision countdown to premiere night.
- **Upcoming Launches**: Grid layout pulling film data dynamically from the Laravel API.
- **Dossier Pages**: Individual film pages with synopsis, cast matrix, spec sheet, and embedded trailer.
- **Stay in the Loop**: Newsletter signup form posting to `POST /api/signups`, persisted in SQLite.
- **Interactive Seating Checkout**: Visual seat selector across five rows, three pricing tiers (Royal Box, Golden Circle, Grand Tier), and a generated perforated premiere ticket pass saved to the `tickets` table.
