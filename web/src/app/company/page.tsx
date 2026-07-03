import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Company — Aurelia",
  description: "Aurelia is a launch house for cinema — premieres, campaigns and press, staged with the same intention as the films themselves.",
};

const SERVICES = [
  {
    n: "01",
    title: "Premieres",
    body: "Red carpets, opening nights and festival bows staged as events in their own right. We design the room, the timing and the hush before the lights go down.",
  },
  {
    n: "02",
    title: "Campaigns",
    body: "Teaser drops, poster reveals and countdowns choreographed across weeks — every beat building anticipation toward a single, inevitable moment.",
  },
  {
    n: "03",
    title: "Press",
    body: "Embargoes, junkets and first-look exclusives handled with discretion. We decide what the world sees, and precisely when it sees it.",
  },
];

export default function Page() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
        <Reveal>
          <p className="eyebrow text-primary">The Company</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-8xl">
            We do not release films. We reveal them.
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 max-w-2xl font-serif text-xl leading-relaxed text-muted-foreground">
            Aurelia is a launch house — a studio-adjacent atelier whose only craft
            is the moment a film meets its audience. Founded on the belief that a
            premiere is not an announcement but an experience, we stage openings
            with the same rigour a director brings to a final cut.
          </p>
        </Reveal>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow text-primary">What we do</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Three acts
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} as="div">
              <div className="flex h-full flex-col bg-background p-8 sm:p-10">
                <span className="font-display text-sm font-bold text-primary">
                  {s.n}
                </span>
                <h3 className="mt-8 font-display text-3xl font-extrabold uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-5 font-serif leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ethos */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <p className="eyebrow text-primary">Our ethos</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-8 font-serif text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
                <p>
                  A film is finished the day it is shown, not the day it is shot.
                  The reveal is the last edit — and we treat it that way.
                </p>
                <p className="text-muted-foreground">
                  We work with a small number of titles each year, giving each the
                  attention of a first night that will only ever happen once.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
          {[
            ["48", "Premieres staged"],
            ["11", "Festival bows"],
            ["3", "Continents"],
            ["MMXVI", "Since"],
          ].map(([v, l]) => (
            <div key={l} className="bg-background px-6 py-14 text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
                {v}
              </p>
              <p className="eyebrow mt-3 text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grain border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">
              Have a film to reveal?
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-block bg-primary px-8 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a conversation ↗
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
