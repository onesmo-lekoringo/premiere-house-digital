export type CastMember = { actor: string; role: string };

export type Film = {
  slug: string;
  title: string;
  year: number;
  genre: string;
  runtime: string;
  rating: string;
  logline: string;
  synopsis: string;
  director: string;
  cast: CastMember[];
  premiereDate: string; // ISO
  premiereVenue: string;
  status: "In Preview" | "Now Booking" | "World Premiere" | "In Selection";
  trailerUrl: string;
  poster: string;
  still: string;
  accent: "gold" | "vermilion" | "cold";
  featured?: boolean;
};

export type SignupPayload = {
  name: string;
  email: string;
  interest: string;
  message?: string;
};

export type SignupRecord = SignupPayload & { id: string; createdAt: string };

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/** GET /api/films */
export async function fetchFilms(): Promise<Film[]> {
  const res = await fetch(`${API_URL}/films`);
  if (!res.ok) {
    throw new Error("Failed to fetch films from Laravel API");
  }
  const data = await res.json();
  return data.sort(
    (a: Film, b: Film) => +new Date(a.premiereDate) - +new Date(b.premiereDate)
  );
}

/** GET /api/films/featured */
export async function fetchFeaturedFilm(): Promise<Film> {
  const films = await fetchFilms();
  return films.find((f) => f.featured) ?? films[0];
}

/** GET /api/films/:slug */
export async function fetchFilm(slug: string): Promise<Film | null> {
  const res = await fetch(`${API_URL}/films/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch film ${slug} from Laravel API`);
  }
  return res.json();
}

/** POST /api/signups — persisted server-side, returns real success/error */
export async function submitSignup(payload: SignupPayload): Promise<SignupRecord> {
  const res = await fetch(`${API_URL}/signups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const errMsg = errData.message || "Failed to submit newsletter signup";
    throw new Error(errMsg);
  }

  const result = await res.json();
  return {
    ...result.data,
    createdAt: result.data.created_at,
  };
}

export type TicketPayload = {
  film_slug: string;
  name: string;
  email: string;
  tier: string;
  quantity: number;
  seats: string;
};

export type TicketRecord = TicketPayload & { id: number; created_at: string };

/** POST /api/tickets — reserve premiere tickets in the SQLite database */
export async function submitTicket(payload: TicketPayload): Promise<TicketRecord> {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    const errMsg = errData.message || "Failed to reserve tickets";
    throw new Error(errMsg);
  }

  const result = await res.json();
  return result.data;
}
