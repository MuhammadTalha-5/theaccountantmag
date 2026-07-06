import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import CategoryArticleList from "@/components/article/CategoryArticleList";
import { getAllCategories, getArticlesByCategory, getCategoryBySlug } from "@/lib/api";

export async function generateStaticParams() {
  return (await getAllCategories()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <Container className="pt-10">
      <header className="max-w-3xl border-b-2 border-ink-950 pb-8 dark:border-ink-100">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-400">
          Section
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 font-serif text-lg leading-relaxed text-ink-600 dark:text-ink-300">
            {category.description}
          </p>
        )}
      </header>

      <div className="mt-10">
        <CategoryArticleList articles={articles} />
      </div>
    </Container>
  );
}
