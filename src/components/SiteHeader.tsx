import { useState } from "react";
import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/launches", label: "Launches" },
  { to: "/company", label: "The Company" },
  { to: "/contact", label: "Stay in the Loop" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Link
            to="/"
            className="font-display text-lg font-extrabold uppercase tracking-[0.14em]"
            onClick={() => setOpen(false)}
          >
            Aurelia
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="link-underline font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground/90 transition-colors hover:text-foreground"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/launches"
              className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary"
            >
              Get Tickets ↗
            </Link>
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="font-display text-xs font-semibold uppercase tracking-[0.2em] md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center bg-background px-6 md:hidden animate-reveal">
          <nav className="flex flex-col gap-6">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-extrabold uppercase tracking-tight"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
