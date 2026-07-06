import Link from "next/link";
import type { CategoryNode } from "@/types";

export default function CategoryBadge({
  category,
  onImage = false,
}: {
  category: CategoryNode;
  onImage?: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={
        onImage
          ? "inline-block rounded-full bg-paper/90 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink-950 backdrop-blur-sm transition-colors hover:bg-brass-400"
          : "inline-block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ledger-700 transition-colors hover:text-ledger-800 dark:text-brass-400 dark:hover:text-brass-300"
      }
    >
      {category.name}
    </Link>
  );
}
