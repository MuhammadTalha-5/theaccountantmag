"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SearchX } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { cn } from "@/lib/utils";
import type { Article, CategoryNode } from "@/types";

export default function SearchClient({
  articles,
  categories,
}: {
  articles: Article[];
  categories: CategoryNode[];
}) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  // Simple client-side matching over mock data — will be replaced by a
  // WPGraphQL search query later.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const inCat = !activeCat || a.categories.nodes.some((c) => c.slug === activeCat);
      if (!inCat) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.author.node.name.toLowerCase().includes(q) ||
        a.tags.nodes.some((t) => t.name.toLowerCase().includes(q))
      );
    });
  }, [articles, query, activeCat]);

  return (
    <div>
      {/* Search input */}
      <div className="relative mx-auto max-w-2xl">
        <Search
          size={20}
          aria-hidden
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink-400"
        />
        <label htmlFor="site-search" className="sr-only">
          Search articles
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stories, topics, writers…"
          className="w-full rounded-full border-2 border-ink-950/12 bg-white py-4 pl-13 pr-6 font-serif text-lg outline-none transition-colors placeholder:text-ink-400 focus:border-ledger-700 dark:border-ink-100/15 dark:bg-ink-900 dark:focus:border-brass-500"
          style={{ paddingLeft: "3.25rem" }}
        />
      </div>

      {/* Category filter chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by section">
        <button
          type="button"
          onClick={() => setActiveCat(null)}
          aria-pressed={activeCat === null}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            activeCat === null
              ? "bg-ledger-700 text-paper dark:bg-brass-500 dark:text-ink-950"
              : "border border-ink-950/12 text-ink-600 hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400"
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActiveCat(activeCat === c.slug ? null : c.slug)}
            aria-pressed={activeCat === c.slug}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeCat === c.slug
                ? "bg-ledger-700 text-paper dark:bg-brass-500 dark:text-ink-950"
                : "border border-ink-950/12 text-ink-600 hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="mt-12" aria-live="polite">
        <p className="mb-8 text-center text-sm text-ink-500 dark:text-ink-300">
          {results.length} {results.length === 1 ? "result" : "results"}
          {query && (
            <>
              {" "}for <span className="font-semibold text-ink-950 dark:text-paper">“{query}”</span>
            </>
          )}
        </p>

        {results.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <SearchX size={40} aria-hidden className="mx-auto text-ink-300 dark:text-ink-500" />
            <p className="mt-4 font-display text-xl font-semibold">
              Nothing on the books
            </p>
            <p className="mt-2 font-serif text-ink-500 dark:text-ink-300">
              Try a different term, or browse a section from the menu above.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {results.map((a) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                >
                  <ArticleCard article={a} headingLevel="h2" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
