import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <p className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-6xl">
              Aurelia
            </p>
            <p className="mt-5 font-serif text-lg italic text-muted-foreground">
              We do not release films. We reveal them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <div>
              <p className="eyebrow text-muted-foreground">Navigate</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  { to: "/launches", label: "Launches" },
                  { to: "/company", label: "The Company" },
                  { to: "/contact", label: "Stay in the Loop" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="link-underline font-display text-sm font-semibold uppercase tracking-wider"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">Enquiries</p>
              <ul className="mt-4 space-y-2.5 font-serif text-sm text-muted-foreground">
                <li>press@aurelia.film</li>
                <li>premieres@aurelia.film</li>
                <li>+44 (0)20 7946 0102</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="eyebrow text-muted-foreground">
            © {year} Aurelia Launch House
          </p>
          <p className="eyebrow text-muted-foreground">
            London · Venice · Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}
