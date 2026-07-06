"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterSignup({
  variant = "section",
}: {
  variant?: "section" | "footer";
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setDone(true);
  }

  if (done) {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          variant === "footer" ? "text-brass-400" : "text-ledger-700 dark:text-brass-400"
        )}
      >
        <CheckCircle2 size={18} aria-hidden />
        You&apos;re on the list. See you Friday.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md gap-2">
      <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
        Email address
      </label>
      <input
        id={`newsletter-email-${variant}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@firm.com"
        className={cn(
          "w-full rounded-full border px-4 py-2.5 text-sm outline-none transition-colors",
          variant === "footer"
            ? "border-ink-100/20 bg-ink-900 text-paper placeholder:text-ink-400 focus:border-brass-500"
            : "border-ink-950/15 bg-white text-ink-950 placeholder:text-ink-400 focus:border-ledger-700 dark:border-ink-100/15 dark:bg-ink-900 dark:text-paper dark:focus:border-brass-500"
        )}
      />
      <button
        type="submit"
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
          variant === "footer"
            ? "bg-brass-500 text-ink-950 hover:bg-brass-400"
            : "bg-ledger-700 text-paper hover:bg-ledger-800 hover:shadow-lg hover:shadow-ledger-700/25 dark:bg-brass-500 dark:text-ink-950 dark:hover:bg-brass-400"
        )}
      >
        Sign&nbsp;up
        <ArrowRight size={15} aria-hidden />
      </button>
    </form>
  );
}
