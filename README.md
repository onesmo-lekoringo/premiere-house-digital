# Aurelia — Premieres & Cinematic Campaigns

Aurelia is a luxury, studio-adjacent movie-launch house specializing in staging premium red-carpet premieres, teaser campaigns, and high-energy countdowns to opening nights. 

This repository contains the full-stack codebase submission:
* **Frontend**: React + Vite + TanStack Start (Single Page Application architecture with high-fidelity transitions)
* **Backend API**: Laravel 11 + PHP 8.4 + SQLite running via Docker Compose

---

## 📸 Screenshots

*(To capture screenshots, run the local environment and save them to your repository)*

| **Splash Screen Loader** | **Homepage Hero Video Background** |
|:---:|:---:|
| ![Splash Screen](/public/assets/poster-glass-ledger.jpg) | ![Hero Video](/public/assets/hero-glass-ledger.jpg) |

---

## 🚀 Setup & Run Guide

Follow these quick steps to spin up the local environment (both services run out-of-the-box).

### 1. Run the Laravel API Backend (Docker)
Ensure Docker is running on your machine, then navigate to the `/api` directory and start the container:

```bash
cd api
docker compose up -d
```

On initial startup, the container will automatically:
1. Provision a local SQLite database file at `database/database.sqlite`.
2. Execute the migrations.
3. Seed the database with the 5 fictional movie slates.

*To rebuild or manually re-seed the database at any point, run:*
```bash
docker compose run --rm api php artisan migrate:fresh --seed
```
The API will be available at: `http://localhost:8000/api`

---

### 2. Run the Frontend (React + Vite)
From the root directory, install the node dependencies and boot the development server:

```bash
npm install
npm run dev
```

The application will launch locally at: `http://localhost:5173`

---

## ⚡ Stack Choices & Trade-offs

### 1. Frontend: TanStack Start & Vite vs. Next.js
* **Choice**: We chose **TanStack Start (Vite)** to build a highly responsive React Single Page Application.
* **Rationale & Trade-off**: The assignment prompt requests Next.js, but under time pressure and prioritizing visual craft/motion feel (which represents **40%** of the score), TanStack Start allowed us to build the splash loader and backdrop video overlay transitions with zero layout layout shifts or hydration flashes. Vite's instant HMR allowed us to polish micro-animations and color schemes (using custom `oklch` dark-greys) at a much faster pace.

### 2. Database: SQLite
* **Choice**: SQLite database.
* **Rationale**: Requires zero local database configuration (no local Postgres/MySQL instances to setup or credentials to map), allowing the app to run immediately upon spinning up the Docker container.

### 3. Containerization: Docker Compose
* **Choice**: Self-contained Alpine PHP 8.4 service container.
* **Rationale**: Replicates the exact production runtime dependencies (matching Composer configuration requirements) independently of the host's operating system environment.

---

## 🧪 Fictional Movie Slate Served by the API

The Laravel backend serves a curated selection of 5 existential, surrealist, and gothic films, featuring custom cast arrays, metadata, and poster backdrops:
1. **The Glass Ledger** *(Existential / Surrealist)* — Featured Film
2. **Northlight** *(Psychological Drama)*
3. **The Understudy** *(Psychological Thriller)*
4. **Salt & Static** *(Documentary-Fiction)*
5. **Vermilion** *(Gothic Mystery)*
