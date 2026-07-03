"use client";

import { useState } from "react";
import Link from "next/link";
import { submitTicket, type Film, type TicketRecord } from "@/lib/api";
import { formatPremiere } from "@/lib/format";
import { Reveal } from "@/components/Reveal";

const TIERS = [
  { name: "Royal Box", price: 250, desc: "Ultra-premium seating with private lounge access & vintage champagne service" },
  { name: "Golden Circle", price: 150, desc: "Front orchestra block offering absolute closeness to the stage & director's panel" },
  { name: "Grand Tier", price: 95, desc: "Exceptional acoustic & visual sweep from the front balcony" },
] as const;

// Seat grid: Rows A to E, Seats 1 to 8
const ROWS = ["A", "B", "C", "D", "E"] as const;
const SEAT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function TicketCheckoutForm({ film }: { film: Film }) {
  const [tier, setTier] = useState<(typeof TIERS)[number]>(TIERS[1]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; seats?: string }>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<TicketRecord | null>(null);

  function toggleSeat(seatCode: string) {
    setErrorMsg(null);
    setFormErrors((prev) => ({ ...prev, seats: undefined }));
    
    if (selectedSeats.includes(seatCode)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatCode));
    } else {
      if (selectedSeats.length >= 6) {
        setErrorMsg("Maximum of 6 tickets can be reserved per order.");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatCode]);
    }
  }

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setFormErrors({});
    setErrorMsg(null);

    const errors: typeof formErrors = {};
    if (!name.trim()) errors.name = "Please enter your full name";
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Please enter a valid email address";
    if (selectedSeats.length === 0) errors.seats = "Please select at least one seat from the grid";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const record = await submitTicket({
        film_slug: film.slug,
        name: name.trim(),
        email: email.trim(),
        tier: tier.name,
        quantity: selectedSeats.length,
        seats: selectedSeats.sort().join(", "),
      });
      setBookingResult(record);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to finalize ticket reservation.");
    } finally {
      setLoading(false);
    }
  }

  const totalPrice = selectedSeats.length * tier.price;

  if (bookingResult) {
    return (
      <div className="mx-auto max-w-xl animate-reveal">
        <div className="text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary text-primary">
            ✓
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            Pass Generated
          </h1>
          <p className="mt-4 font-serif text-lg text-muted-foreground">
            Your credentials for the opening night are secured. We have sent a confirmation to {bookingResult.email}.
          </p>
        </div>

        {/* ── CINEMATIC PASS CARD ─────────────────────────────────── */}
        <div className="relative mt-12 overflow-hidden border border-primary/45 bg-card shadow-2xl shadow-primary/5">
          <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background border-r border-primary/30 z-10" />
          <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-background border-l border-primary/30 z-10" />

          {/* Top Pass Details */}
          <div className="p-8">
            <div className="flex items-center justify-between border-b border-border/80 pb-5">
              <div>
                <p className="eyebrow text-primary">Aurelia Premiere Pass</p>
                <p className="font-serif text-xs italic text-muted-foreground">No. {1000 + bookingResult.id}</p>
              </div>
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] border border-primary px-3 py-1 text-primary">
                {bookingResult.tier}
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="eyebrow text-muted-foreground">FILM REVEAL</p>
                <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-foreground mt-1">
                  {film.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="eyebrow text-muted-foreground">DATE & TIME</p>
                  <p className="font-serif text-sm text-foreground/90 mt-1">{formatPremiere(film.premiereDate)}</p>
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground">VENUE</p>
                  <p className="font-serif text-sm text-foreground/90 mt-1">{film.premiereVenue}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="eyebrow text-muted-foreground">RESERVED SEATS</p>
                  <p className="font-display font-semibold tracking-wider text-primary mt-1">{bookingResult.seats}</p>
                </div>
                <div>
                  <p className="eyebrow text-muted-foreground">HOLDER</p>
                  <p className="font-serif text-sm text-foreground/90 mt-1">{bookingResult.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket perforated tear border */}
          <div className="border-t-2 border-dashed border-border/70 relative z-10 mx-6" />

          {/* Bottom barcode segment */}
          <div className="bg-background/25 px-8 py-6 text-center flex flex-col items-center justify-center">
            {/* Faux Barcode styling */}
            <div className="h-12 w-full flex items-center justify-center gap-[3px] opacity-80 mt-2">
              {[...Array(38)].map((_, idx) => (
                <div 
                  key={idx} 
                  className="bg-foreground h-full"
                  style={{
                    width: idx % 3 === 0 ? "4px" : idx % 5 === 0 ? "1px" : "2px"
                  }}
                />
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
              *{film.slug.toUpperCase()}-{bookingResult.id}*
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/launches"
            className="eyebrow text-primary link-underline"
          >
            ← Back to launches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
      {/* Left: Interactive seat map */}
      <div>
        <Link
          href={`/launches/${film.slug}`}
          className="eyebrow link-underline text-muted-foreground"
        >
          ← Return to film details
        </Link>
        
        <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-5xl">
          Reserve Tickets
        </h1>
        <p className="mt-4 font-serif text-lg text-muted-foreground">
          {film.title} opening night. Select up to 6 seats in the visual matrix below.
        </p>

        {/* ── VISUAL THEATER MAP ────────────────────────────────── */}
        <div className="mt-12 border border-border bg-card/60 p-8 sm:p-10 text-center relative overflow-hidden">
          
          {/* Cinema Screen Curve */}
          <div className="relative mx-auto w-3/4 mb-14">
            <div className="h-1 border-t-2 border-primary/60 rounded-full blur-[1px]" />
            <span className="eyebrow text-[10px] text-primary/70 tracking-[0.3em] block mt-3">SCREEN / FOCUS</span>
          </div>

          {/* Seats grid */}
          <div className="mx-auto max-w-sm space-y-3">
            {ROWS.map((row) => (
              <div key={row} className="flex items-center justify-between gap-3">
                <span className="font-display text-[10px] text-muted-foreground w-4">{row}</span>
                <div className="flex-1 flex justify-between gap-1.5">
                  {SEAT_NUMBERS.map((num) => {
                    const code = `${row}${num}`;
                    const isSelected = selectedSeats.includes(code);
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => toggleSeat(code)}
                        aria-label={`Seat ${code}`}
                        className={`aspect-square flex-1 max-w-[28px] rounded-[3px] text-[8px] font-display font-medium border flex items-center justify-center transition-all ${
                          isSelected 
                            ? "bg-primary border-primary text-primary-foreground font-bold shadow-sm shadow-primary/20 scale-105"
                            : "border-border text-muted-foreground/60 hover:border-primary/50 hover:text-foreground"
                        }`}
                      >
                        {num}
                      </button>
                    );
                  })}
                </div>
                <span className="font-display text-[10px] text-muted-foreground w-4">{row}</span>
              </div>
            ))}
          </div>

          {/* Seat Grid Legends */}
          <div className="mt-12 flex justify-center gap-8 border-t border-border/80 pt-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-[2px] border border-border" />
              <span className="eyebrow text-[10px] text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-[2px] bg-primary border border-primary" />
              <span className="eyebrow text-[10px] text-muted-foreground">Selected</span>
            </div>
          </div>
        </div>

        {formErrors.seats && (
          <p className="mt-4 font-serif text-sm italic text-destructive text-center">
            {formErrors.seats}
          </p>
        )}
      </div>

      {/* Right: Checkout Sidebar form */}
      <div className="border-t border-border pt-10 lg:border-t-0 lg:pt-0">
        <div className="border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight">
            Reservation Details
          </h2>

          <form onSubmit={handleCheckout} className="mt-8 space-y-6">
            {/* Seating Sector Tier */}
            <div>
              <label className="eyebrow text-muted-foreground">Select Sector</label>
              <div className="mt-3 space-y-3">
                {TIERS.map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`w-full text-left p-4 border flex flex-col justify-between gap-1.5 transition-colors ${
                      tier.name === t.name 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-foreground/35"
                    }`}
                  >
                    <div className="flex w-full items-baseline justify-between">
                      <span className="font-display text-sm font-bold uppercase tracking-wider">{t.name}</span>
                      <span className="font-display text-sm font-extrabold text-primary">${t.price} / ticket</span>
                    </div>
                    <p className="font-serif text-xs text-muted-foreground leading-normal">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Seats summary */}
            <div className="border-y border-border/80 py-4 flex items-center justify-between">
              <div>
                <p className="eyebrow text-muted-foreground">Seats Selected ({selectedSeats.length})</p>
                <p className="font-display text-sm font-semibold tracking-wider text-primary mt-1">
                  {selectedSeats.length > 0 ? selectedSeats.sort().join(", ") : "None selected"}
                </p>
              </div>
              <div className="text-right">
                <p className="eyebrow text-muted-foreground">Total Price</p>
                <p className="font-display text-xl font-extrabold text-foreground mt-1">${totalPrice}</p>
              </div>
            </div>

            {/* Holder Fields */}
            <div>
              <label className="eyebrow text-muted-foreground">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`field-input mt-3 ${formErrors.name ? "border-destructive" : ""}`}
                placeholder="Adrian Vale"
              />
              {formErrors.name && (
                <p className="mt-1.5 font-serif text-xs italic text-destructive">{formErrors.name}</p>
              )}
            </div>

            <div>
              <label className="eyebrow text-muted-foreground">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`field-input mt-3 ${formErrors.email ? "border-destructive" : ""}`}
                placeholder="adrian@exchange.com"
              />
              {formErrors.email && (
                <p className="mt-1.5 font-serif text-xs italic text-destructive">{formErrors.email}</p>
              )}
            </div>

            {errorMsg && (
              <p
                role="alert"
                className="border border-destructive bg-destructive/10 px-4 py-3 font-serif text-sm text-destructive"
              >
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating Pass..." : `Book ${selectedSeats.length} Ticket${selectedSeats.length === 1 ? "" : "s"} · $${totalPrice} ↗`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
