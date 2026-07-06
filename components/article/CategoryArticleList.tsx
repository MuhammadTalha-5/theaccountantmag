"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownWideNarrow, LayoutGrid, Rows3 } from "lucide-react";
import ArticleCard from "@/components/article/ArticleCard";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

type SortKey = "newest" | "oldest" | "shortest";
const PAGE_SIZE = 6;

export default function CategoryArticleList({ articles }: { articles: Article[] }) {
  const [sort, setSort] = useState<SortKey>("newest");
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const sorted = useMemo(() => {
    const copy = [...articles];
    switch (sort) {
      case "oldest":
        return copy.sort((a, b) => +new Date(a.date) - +new Date(b.date));
      case "shortest":
        return copy.sort((a, b) => a.readTime - b.readTime);
      default:
        return copy.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
  }, [articles, sort]);

  const shown = sorted.slice(0, visible);
  const hasMore = visible < sorted.length;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-500 dark:text-ink-300" role="status">
          {sorted.length} {sorted.length === 1 ? "story" : "stories"}
        </p>
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-300"
          >
            <ArrowDownWideNarrow size={14} aria-hidden />
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as SortKey);
              setVisible(PAGE_SIZE);
            }}
            className="rounded-full border border-ink-950/15 bg-transparent px-3.5 py-1.5 text-sm outline-none transition-colors focus:border-ledger-700 dark:border-ink-100/20 dark:bg-ink-900 dark:focus:border-brass-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="shortest">Quickest reads</option>
          </select>

          <div
            className="hidden overflow-hidden rounded-full border border-ink-950/15 sm:flex dark:border-ink-100/20"
            role="group"
            aria-label="Layout"
          >
            <button
              type="button"
              onClick={() => setLayout("grid")}
              aria-pressed={layout === "grid"}
              aria-label="Grid layout"
              className={cn(
                "p-2 transition-colors",
                layout === "grid"
                  ? "bg-ledger-700 text-paper dark:bg-brass-500 dark:text-ink-950"
                  : "text-ink-500 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
              )}
            >
              <LayoutGrid size={15} aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => setLayout("list")}
              aria-pressed={layout === "list"}
              aria-label="List layout"
              className={cn(
                "p-2 transition-colors",
                layout === "list"
                  ? "bg-ledger-700 text-paper dark:bg-brass-500 dark:text-ink-950"
                  : "text-ink-500 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
              )}
            >
              <Rows3 size={15} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div
        className={cn(
          layout === "grid"
            ? "grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-10"
        )}
      >
        <AnimatePresence mode="popLayout">
          {shown.map((a, i) => (
            <motion.div
              key={`${layout}-${a.id}`}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: (i % PAGE_SIZE) * 0.04 }}
            >
              <ArticleCard
                article={a}
                variant={layout === "list" ? "horizontal" : "default"}
                headingLevel="h2"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {hasMore && (
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full border-2 border-ledger-700 px-8 py-3 text-sm font-semibold text-ledger-700 transition-all hover:bg-ledger-700 hover:text-paper dark:border-brass-500 dark:text-brass-400 dark:hover:bg-brass-500 dark:hover:text-ink-950"
          >
            Load more stories
          </button>
        </div>
      )}
    </div>
  );
}
