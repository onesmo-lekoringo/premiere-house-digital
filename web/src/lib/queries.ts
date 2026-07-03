import { queryOptions } from "@tanstack/react-query";
import { fetchFilm, fetchFilms, fetchFeaturedFilm } from "./api";

export const filmsQueryOptions = () =>
  queryOptions({
    queryKey: ["films"],
    queryFn: () => fetchFilms(),
    staleTime: 60_000,
  });

export const featuredFilmQueryOptions = () =>
  queryOptions({
    queryKey: ["films", "featured"],
    queryFn: () => fetchFeaturedFilm(),
    staleTime: 60_000,
  });

export const filmQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["films", slug],
    queryFn: () => fetchFilm(slug),
    staleTime: 60_000,
  });
