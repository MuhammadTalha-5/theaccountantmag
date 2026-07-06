import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDate } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

type Variant = "default" | "horizontal" | "compact" | "large";

export default function ArticleCard({
  article,
  variant = "default",
  headingLevel: Heading = "h3",
}: {
  article: Article;
  variant?: Variant;
  headingLevel?: "h2" | "h3";
}) {
  const img = article.featuredImage.node;
  const category = article.categories.nodes[0];
  const author = article.author.node;

  if (variant === "compact") {
    return (
      <article className="group flex items-start gap-4 border-b border-ink-950/8 pb-5 last:border-0 dark:border-ink-100/10">
        <div className="min-w-0 flex-1">
          <CategoryBadge category={category} />
          <Heading className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug">
            <Link
              href={`/article/${article.slug}`}
              className="transition-colors group-hover:text-ledger-700 dark:group-hover:text-brass-400"
            >
              {article.title}
            </Link>
          </Heading>
          <p className="mt-1.5 text-xs text-ink-500 dark:text-ink-300">
            {formatDate(article.date)} · {article.readTime} min read
          </p>
        </div>
        <Link
          href={`/article/${article.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative block h-20 w-24 shrink-0 overflow-hidden rounded-lg"
        >
          <Image
            src={img.sourceUrl}
            alt=""
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group grid gap-5 sm:grid-cols-[2fr_3fr] sm:items-center">
        <Link
          href={`/article/${article.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-[16/10] overflow-hidden rounded-xl"
        >
          <Image
            src={img.sourceUrl}
            alt={img.altText}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </Link>
        <div>
          <CategoryBadge category={category} />
          <Heading className="mt-2 font-display text-xl font-bold leading-tight sm:text-2xl">
            <Link
              href={`/article/${article.slug}`}
              className="transition-colors group-hover:text-ledger-700 dark:group-hover:text-brass-400"
            >
              {article.title}
            </Link>
          </Heading>
          <p className="mt-2.5 line-clamp-2 font-serif text-[0.95rem] leading-relaxed text-ink-600 dark:text-ink-300">
            {article.excerpt}
          </p>
          <Meta article={article} authorName={author.name} authorSlug={author.slug} />
        </div>
      </article>
    );
  }

  const large = variant === "large";

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/article/${article.slug}`}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "relative block overflow-hidden rounded-xl",
          large ? "aspect-[16/10]" : "aspect-[16/10]"
        )}
      >
        <Image
          src={img.sourceUrl}
          alt={img.altText}
          fill
          sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <CategoryBadge category={category} />
        <Heading
          className={cn(
            "mt-2 font-display font-bold leading-tight",
            large ? "text-2xl sm:text-[1.7rem]" : "text-lg sm:text-xl"
          )}
        >
          <Link
            href={`/article/${article.slug}`}
            className="transition-colors group-hover:text-ledger-700 dark:group-hover:text-brass-400"
          >
            {article.title}
          </Link>
        </Heading>
        <p
          className={cn(
            "mt-2.5 font-serif leading-relaxed text-ink-600 dark:text-ink-300",
            large ? "line-clamp-3 text-base" : "line-clamp-2 text-[0.92rem]"
          )}
        >
          {article.excerpt}
        </p>
        <Meta article={article} authorName={author.name} authorSlug={author.slug} />
      </div>
    </article>
  );
}

function Meta({
  article,
  authorName,
  authorSlug,
}: {
  article: Article;
  authorName: string;
  authorSlug: string;
}) {
  return (
    <p className="mt-auto pt-3 text-xs text-ink-500 dark:text-ink-300">
      <Link
        href={`/author/${authorSlug}`}
        className="font-semibold text-ink-700 transition-colors hover:text-ledger-700 dark:text-ink-200 dark:hover:text-brass-400"
      >
        {authorName}
      </Link>
      <span aria-hidden> · </span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden> · </span>
      <span className="inline-flex items-center gap-1">
        <Clock size={12} aria-hidden />
        {article.readTime} min
      </span>
    </p>
  );
}
