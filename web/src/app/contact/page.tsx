"use client";

import { useState } from "react";
import { z } from "zod";
import { submitSignup, type SignupRecord } from "@/lib/api";
import { Reveal } from "@/components/Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid email address").max(160),
  interest: z.enum(["Premiere invitations", "Press & media", "Partnerships"]),
  message: z.string().trim().max(600).optional(),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const INTERESTS = [
  "Premiere invitations",
  "Press & media",
  "Partnerships",
] as const;

export default function Page() {
  const [interest, setInterest] =
    useState<(typeof INTERESTS)[number]>("Premiere invitations");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [signupData, setSignupData] = useState<SignupRecord | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMsg(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      interest,
      message: form.get("message") || undefined,
    });

    if (!parsed.success) {
      const fe: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        fe[issue.path[0] as keyof FieldErrors] = issue.message;
      }
      setErrors(fe);
      setLoading(false);
      return;
    }

    try {
      const result = await submitSignup(parsed.data);
      setSignupData(result);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit newsletter signup");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSignupData(null);
    setErrorMsg(null);
    setErrors({});
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-32 sm:px-8 sm:pt-40">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="eyebrow text-primary">Stay in the loop</p>
          <h1 className="mt-5 font-display text-5xl font-extrabold uppercase leading-[0.88] tracking-tight sm:text-7xl">
            Never miss a reveal
          </h1>
          <p className="mt-8 max-w-md font-serif text-lg leading-relaxed text-muted-foreground">
            Join the Aurelia list for premiere invitations, teaser drops and
            opening-night dates — delivered before the carpet is rolled out. We
            write rarely, and only when it matters.
          </p>
          <div className="mt-12 space-y-3 border-t border-border pt-8">
            <p className="eyebrow text-muted-foreground">Direct</p>
            <p className="font-serif text-lg">press@aurelia.film</p>
            <p className="font-serif text-lg">premieres@aurelia.film</p>
          </div>
        </Reveal>

        <Reveal delay={120} as="div">
          {signupData ? (
            <div className="grain flex min-h-[24rem] flex-col items-start justify-center border border-primary bg-card p-10">
              <p className="eyebrow text-primary">You're on the list</p>
              <h2 className="mt-4 font-display text-4xl font-extrabold uppercase leading-tight tracking-tight">
                See you at the premiere.
              </h2>
              <p className="mt-5 font-serif text-lg text-muted-foreground">
                Thank you, {signupData.name.split(" ")[0]}. A confirmation is
                on its way to {signupData.email}.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary link-underline"
              >
                Add another ↗
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-8">
              <Field label="Name" error={errors.name}>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="field-input"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="field-input"
                  placeholder="you@studio.com"
                />
              </Field>

              <div>
                <label className="eyebrow text-muted-foreground">
                  I'm interested in
                </label>
                <div className="mt-4 flex flex-wrap gap-3">
                  {INTERESTS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setInterest(opt)}
                      className={`border px-4 py-2.5 font-display text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                        interest === opt
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/40"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Message (optional)" error={errors.message}>
                <textarea
                  name="message"
                  rows={4}
                  className="field-input resize-none"
                  placeholder="Tell us about your film…"
                />
              </Field>

              {errorMsg && (
                <p
                  role="alert"
                  className="border border-destructive bg-destructive/10 px-4 py-3 font-serif text-sm text-destructive-foreground"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary px-8 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending…" : "Join the list ↗"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="eyebrow text-muted-foreground">{label}</label>
      <div className="mt-3">{children}</div>
      {error && (
        <p className="mt-2 font-serif text-sm italic text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
