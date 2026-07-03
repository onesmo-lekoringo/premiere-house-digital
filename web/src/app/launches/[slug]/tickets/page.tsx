import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchFilm } from "@/lib/api";
import { TicketCheckoutForm } from "./TicketCheckoutForm";

export const revalidate = 0; // Disable static caching so it always fetches fresh data from Laravel

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = await fetchFilm(slug);
  return {
    title: film ? `Book Tickets: ${film.title} — Aurelia` : "Book Tickets — Aurelia",
    description: film ? `Reserve opening night tickets for ${film.title} at ${film.premiereVenue}.` : "Book tickets.",
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
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <TicketCheckoutForm film={film} />
    </div>
  );
}
