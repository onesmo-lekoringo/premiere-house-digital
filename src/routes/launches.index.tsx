import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { filmsQueryOptions } from "@/lib/queries";
import { FilmCard } from "@/components/FilmCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/launches/")({
  head: () => ({
    meta: [
      { title: "Upcoming Launches — Aurelia" },
      {
        name: "description",
        content:
          "Every film Aurelia is bringing to opening night — poster art, premiere dates and loglines for the current slate.",
      },
      { property: "og:title", content: "Upcoming Launches — Aurelia" },
      {
        property: "og:description",
        content: "The current Aurelia slate — premieres, dates and loglines.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(filmsQueryOptions()),
  component: LaunchesPage,
  pendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <p className="eyebrow animate-pulse text-muted-foreground">
        Loading the slate…
      </p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-primary">Aurelia</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold uppercase">
        We couldn't load the slate
      </h1>
      <p className="mt-3 font-serif text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function LaunchesPage() {
  const { data: films } = useSuspenseQuery(filmsQueryOptions());

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
