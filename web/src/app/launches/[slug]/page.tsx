import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchFilm } from "@/lib/api";
import { formatPremiere } from "@/lib/format";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";

export const revalidate = 0; // Disable static caching so it always fetches fresh data from Laravel

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = await fetchFilm(slug);
  return {
    title: film ? `${film.title} — Aurelia` : "Aurelia",
    description: film ? `${film.logline}` : "An Aurelia launch.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = await fetchFilm(slug);

  if (!film) {
    notFound();
  }

  return (
    <article>
      {/* Hero still */}
      <section className="grain relative flex min-h-[85vh] flex-col justify-end overflow-hidden">
        <img
          src={film.still}
          alt={`Still from ${film.title}`}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8">
          <Link
            href="/launches"
            className="eyebrow link-underline animate-reveal text-muted-foreground"
          >
            ← All launches
          </Link>
          <p className="eyebrow mt-6 animate-reveal text-primary">
            {film.status} · {film.genre}
          </p>
          <h1
            className="display-hero mt-4 animate-reveal text-[13vw] leading-[0.82] sm:text-8xl lg:text-9xl"
            style={{ animationDelay: "80ms" }}
          >
            {film.title}
          </h1>
          <p
            className="mt-6 max-w-2xl animate-reveal font-serif text-xl italic leading-relaxed text-foreground/85"
            style={{ animationDelay: "150ms" }}
          >
            {film.logline}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
          {/* Left: synopsis + trailer */}
          <div>
            <Reveal>
              <p className="eyebrow text-primary">Synopsis</p>
              <p className="mt-6 font-serif text-xl leading-relaxed text-foreground/90 sm:text-2xl">
                {film.synopsis}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-14">
                <p className="eyebrow text-primary">Teaser</p>
                <a
                  href={film.trailerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 flex items-center justify-between border border-border bg-card p-6 transition-colors hover:border-primary"
                >
                  <span className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
                    Watch the teaser
                  </span>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary text-primary transition-transform group-hover:scale-110">
                    ▶
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10">
                <p className="eyebrow text-primary">Attendance</p>
                <Link
                  href={`/launches/${film.slug}/tickets`}
                  className="group mt-5 flex items-center justify-between border border-primary bg-primary/5 p-6 transition-colors hover:bg-primary/10"
                >
                  <div>
                    <span className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl block text-primary">
                      Reserve Tickets
                    </span>
                    <span className="font-serif text-sm text-muted-foreground mt-1 block">
                      Secure credentials for the opening night premiere
                    </span>
                  </div>
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-bold transition-transform group-hover:scale-110">
                    🎟
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: facts + cast + countdown */}
          <Reveal delay={150} as="div">
            <div className="border-t border-border pt-6">
              <dl className="space-y-5">
                {[
                  ["Director", film.director],
                  ["Premiere", formatPremiere(film.premiereDate)],
                  ["Venue", film.premiereVenue],
                  ["Runtime", film.runtime],
                  ["Rating", film.rating],
                  ["Year", String(film.year)],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-4"
                  >
                    <dt className="eyebrow text-muted-foreground">{k}</dt>
                    <dd className="text-right font-serif text-foreground/90">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10">
                <p className="eyebrow text-muted-foreground">Cast</p>
                <ul className="mt-5 space-y-4">
                  {film.cast.map((c) => (
                    <li key={c.actor}>
                      <p className="font-display text-lg font-bold uppercase leading-tight tracking-tight">
                        {c.actor}
                      </p>
                      <p className="font-serif text-sm italic text-muted-foreground">
                        {c.role}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 border-t border-border pt-8">
                <p className="eyebrow text-primary">Curtain rises in</p>
                <div className="mt-5">
                  <Countdown iso={film.premiereDate} size="sm" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
