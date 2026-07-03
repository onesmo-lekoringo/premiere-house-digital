import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Loader } from "../components/Loader";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="eyebrow text-primary">Aurelia</p>
      <h1 className="mt-4 font-display text-7xl font-extrabold uppercase tracking-tight sm:text-8xl">
        404
      </h1>
      <p className="mt-4 font-serif text-lg text-muted-foreground">
        This reel never made it to the projector.
      </p>
      <Link
        to="/"
        className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary link-underline"
      >
        Return to the marquee ↗
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <p className="eyebrow text-primary">Aurelia</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight">
        The house lights flickered
      </h1>
      <p className="mt-3 font-serif text-muted-foreground">
        Something interrupted the screening. Please try again.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="bg-primary px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
        >
          Try again
        </button>
        <a
          href="/"
          className="border border-border px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.2em]"
        >
          Go home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aurelia — A Film-Launch House" },
      {
        name: "description",
        content:
          "Aurelia is a launch house for cinema — red-carpet premieres, teaser drops and opening-night reveals. We do not release films. We reveal them.",
      },
      { name: "author", content: "Aurelia Launch House" },
      { property: "og:title", content: "Aurelia — A Film-Launch House" },
      {
        property: "og:description",
        content:
          "Red-carpet premieres, teaser drops and countdowns to opening night. We do not release films. We reveal them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showLoader, setShowLoader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {showLoader && <Loader onFinished={() => setShowLoader(false)} />}
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
