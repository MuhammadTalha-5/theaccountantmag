import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import CategoryBadge from "@/components/ui/CategoryBadge";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/article/ArticleCard";
import ReadingProgress from "@/components/article/ReadingProgress";
import ShareButtons from "@/components/article/ShareButtons";
import { getAllArticles, getArticleBySlug, getRelatedArticles } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getAllArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const img = article.featuredImage.node;
  const author = article.author.node;
  const related = await getRelatedArticles(article, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        {/* Headline block */}
        <Container className="pt-10">
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center gap-3">
              {article.categories.nodes.map((c) => (
                <CategoryBadge key={c.slug} category={c} />
              ))}
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.2rem]">
              {article.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-serif text-lg italic leading-relaxed text-ink-600 dark:text-ink-300">
              {article.excerpt}
            </p>

            {/* Byline */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link href={`/author/${author.slug}`} className="shrink-0">
                <Image
                  src={author.avatar.url}
                  alt={`Portrait of ${author.name}`}
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-brass-500/60"
                />
              </Link>
              <div className="text-left text-sm">
                <Link
                  href={`/author/${author.slug}`}
                  className="font-semibold transition-colors hover:text-ledger-700 dark:hover:text-brass-400"
                >
                  {author.name}
                </Link>
                <p className="text-xs text-ink-500 dark:text-ink-300">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span aria-hidden> · </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} aria-hidden />
                    {article.readTime} min read
                  </span>
                </p>
              </div>
            </div>
          </header>
        </Container>

        {/* Featured image */}
        <Container className="mt-10">
          <figure className="mx-auto max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={img.sourceUrl}
                alt={img.altText}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
            {img.caption && (
              <figcaption className="mt-3 text-center text-xs italic text-ink-500 dark:text-ink-400">
                {img.caption}
              </figcaption>
            )}
          </figure>
        </Container>

        {/* Body */}
        <Container className="mt-12">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_minmax(0,42rem)_1fr]">
            {/* Left rail: share (sticky on desktop) */}
            <div className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 lg:flex lg:justify-end lg:pr-2">
                <div className="flex gap-2 lg:flex-col">
                  <ShareButtons title={article.title} slug={article.slug} />
                </div>
              </div>
            </div>

            <div className="order-1 min-w-0 lg:order-2">
              <div
                className="prose-editorial"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              {article.tags.nodes.length > 0 && (
                <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
                  {article.tags.nodes.map((t) => (
                    <li key={t.slug}>
                      <span className="inline-block rounded-full border border-ink-950/12 px-3.5 py-1.5 text-xs font-medium text-ink-600 dark:border-ink-100/15 dark:text-ink-300">
                        {t.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Author card */}
              <aside className="mt-12 flex gap-5 rounded-2xl bg-paper-dark p-6 dark:bg-ink-900">
                <Link href={`/author/${author.slug}`} className="shrink-0">
                  <Image
                    src={author.avatar.url}
                    alt={`Portrait of ${author.name}`}
                    width={64}
                    height={64}
                    className="rounded-full ring-2 ring-brass-500/60"
                  />
                </Link>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brass-600 dark:text-brass-400">
                    Written by
                  </p>
                  <Link
                    href={`/author/${author.slug}`}
                    className="mt-1 block font-display text-lg font-bold transition-colors hover:text-ledger-700 dark:hover:text-brass-400"
                  >
                    {author.name}
                  </Link>
                  <p className="mt-2 line-clamp-3 font-serif text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {author.description}
                  </p>
                </div>
              </aside>
            </div>

            <div className="hidden lg:order-3 lg:block" aria-hidden />
          </div>
        </Container>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <Container className="mt-20" as="section">
          <SectionHeading title="Related reading" kicker="Keep going" />
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.07}>
                <ArticleCard article={a} headingLevel="h3" />
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
