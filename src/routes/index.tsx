import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { featuredFilmQueryOptions, filmsQueryOptions } from "@/lib/queries";
import { formatPremiere } from "@/lib/format";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { FilmCard } from "@/components/FilmCard";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(featuredFilmQueryOptions());
    context.queryClient.ensureQueryData(filmsQueryOptions());
  },
  component: Index,
});

function Index() {
  const { data: featured } = useSuspenseQuery(featuredFilmQueryOptions());
  const { data: films } = useSuspenseQuery(filmsQueryOptions());
  const rest = films.filter((f) => f.slug !== featured.slug).slice(0, 4);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-screen flex-col justify-end overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover animate-hero-video"
          poster={featured.still}
        >
          <source
            src="/A_slow_motion_macro_shot_of_tr.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
          <p className="eyebrow animate-reveal text-primary">
            World Premiere · {formatPremiere(featured.premiereDate)}
          </p>
          <h1
            className="display-hero mt-5 animate-reveal text-[15vw] leading-[0.82] sm:text-[10rem] lg:text-[12rem]"
            style={{ animationDelay: "80ms" }}
          >
            {featured.title.split(" ").map((word, i) => (
              <span key={i} className="block">
                {word}
              </span>
            ))}
          </h1>

          <div
            className="mt-10 grid animate-reveal gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end"
            style={{ animationDelay: "160ms" }}
          >
            <p className="max-w-xl font-serif text-lg leading-relaxed text-foreground/85 sm:text-xl">
              {featured.logline}
            </p>
            <div className="lg:justify-self-end">
              <p className="eyebrow mb-4 text-muted-foreground">
                Curtain rises in
              </p>
              <Countdown iso={featured.premiereDate} />
            </div>
          </div>

          <div
            className="mt-12 flex animate-reveal flex-wrap items-center gap-4"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              to="/launches/$slug"
              params={{ slug: featured.slug }}
              className="bg-primary px-7 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Enter the Premiere ↗
            </Link>
            <Link
              to="/launches"
              className="link-underline font-display text-xs font-semibold uppercase tracking-[0.2em]"
            >
              View all launches
            </Link>
          </div>
        </div>
      </section>



      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow text-primary">Who we are</p>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
            A launch house whose entire craft is making a premiere feel
            inevitable.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
            Aurelia builds the moment a film meets the world — the countdown, the
            carpet, the hush before the lights go down. We treat every opening
            night as a work in its own right, staged with the same intention as
            the film itself.
          </p>
        </Reveal>
      </section>

      {/* ── SLATE ────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow text-primary">The slate</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
                Upcoming launches
              </h2>
            </Reveal>
            <Link
              to="/launches"
              className="link-underline hidden font-display text-xs font-semibold uppercase tracking-[0.2em] sm:block"
            >
              All films ↗
            </Link>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((film, i) => (
              <Reveal key={film.slug} delay={i * 90}>
                <FilmCard film={film} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="grain border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-4xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Never miss a reveal.
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-serif text-lg text-muted-foreground">
              Premiere invitations, teaser drops and opening-night dates,
              delivered before the carpet is rolled out.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-block bg-primary px-8 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Stay in the loop ↗
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
