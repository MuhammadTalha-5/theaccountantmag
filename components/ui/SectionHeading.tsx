import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SectionHeading({
  title,
  href,
  hrefLabel = "View all",
  kicker,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  kicker?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b-2 border-ink-950 pb-3 dark:border-ink-100">
      <div>
        {kicker && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brass-600 dark:text-brass-400">
            {kicker}
          </p>
        )}
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group mb-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-ledger-700 transition-colors hover:text-ledger-800 dark:text-brass-400 dark:hover:text-brass-300"
        >
          {hrefLabel}
          <ArrowUpRight
            size={16}
            aria-hidden
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
