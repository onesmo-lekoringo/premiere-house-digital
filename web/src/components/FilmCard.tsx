import Link from "next/link";
import type { Film } from "@/lib/api";
import { formatShort } from "@/lib/format";

export function FilmCard({ film, index }: { film: Film; index: number }) {
  return (
    <Link
      href={`/launches/${film.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden bg-card">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={film.poster}
            alt={`Poster for ${film.title}`}
            loading="lazy"
            width={768}
            height={1152}
            className="h-full w-full object-cover grayscale-[0.35] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/5 to-transparent" />
        <span className="eyebrow absolute left-4 top-4 rounded-sm bg-background/60 px-2.5 py-1 text-primary backdrop-blur-sm">
          {film.status}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="eyebrow text-muted-foreground">
            {String(index + 1).padStart(2, "0")} — {film.genre}
          </p>
          <h3 className="mt-1 font-display text-2xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-3xl">
            {film.title}
          </h3>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-border pt-3">
        <p className="font-serif text-sm leading-snug text-muted-foreground">
          {film.logline}
        </p>
      </div>
      <p className="eyebrow mt-3 text-primary">
        Premieres {formatShort(film.premiereDate)}
      </p>
    </Link>
  );
}
