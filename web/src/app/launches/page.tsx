import type { Metadata } from "next";
import { fetchFilms } from "@/lib/api";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const revalidate = 0; // Disable static caching so it always fetches fresh data from Laravel

export const metadata: Metadata = {
  title: "Upcoming Launches — Aurelia",
  description: "Every film Aurelia is bringing to opening night — poster art, premiere dates and loglines for the current slate.",
};

export default async function Page() {
  const films = await fetchFilms().catch((err) => {
    console.error("Failed to fetch films on launches page:", err);
    return [];
  });

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <Reveal>
        <p className="eyebrow text-primary">The slate · {films.length} films</p>
        <h1 className="mt-5 font-display text-6xl font-extrabold uppercase leading-[0.86] tracking-tight sm:text-8xl">
          Upcoming
          <br />
          Launches
        </h1>
        <p className="mt-8 max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
          The films we are bringing to opening night — each one staged, timed and
          revealed with intention. Select a title for the full dossier.
        </p>
      </Reveal>

      <div className="mt-20 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {films.map((film, i) => (
          <Reveal key={film.slug} delay={(i % 3) * 90}>
            <FilmCard film={film} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
