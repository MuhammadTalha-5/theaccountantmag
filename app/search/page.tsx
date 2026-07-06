import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SearchClient from "@/components/ui/SearchClient";
import { getAllArticles, getAllCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Search",
  description: "Search The Accountant's archive of stories.",
};

export default function SearchPage() {
  return (
    <Container className="pt-12">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-400">
          The archive
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Search
        </h1>
      </header>
      <SearchClient articles={getAllArticles()} categories={getAllCategories()} />
    </Container>
  );
}
