import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-8xl font-bold text-ledger-700/20 dark:text-brass-500/20">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
        This page doesn&apos;t balance.
      </h1>
      <p className="mt-3 max-w-md font-serif text-ink-600 dark:text-ink-300">
        The entry you&apos;re looking for has been written off. Try the
        homepage, or search the archive.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="rounded-full bg-ledger-700 px-6 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-ledger-800 dark:bg-brass-500 dark:text-ink-950 dark:hover:bg-brass-400"
        >
          Back to homepage
        </Link>
        <Link
          href="/search"
          className="rounded-full border-2 border-ledger-700 px-6 py-2.5 text-sm font-semibold text-ledger-700 transition-colors hover:bg-ledger-700 hover:text-paper dark:border-brass-500 dark:text-brass-400 dark:hover:bg-brass-500 dark:hover:text-ink-950"
        >
          Search
        </Link>
      </div>
    </Container>
  );
}
