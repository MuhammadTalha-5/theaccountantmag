import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import CategoryBadge from "@/components/ui/CategoryBadge";
import { formatDate } from "@/lib/api";
import type { Article } from "@/types";

export default function HeroStory({ article }: { article: Article }) {
  const img = article.featuredImage.node;
  const author = article.author.node;
  const category = article.categories.nodes[0];

  return (
    <article className="group relative overflow-hidden rounded-2xl">
      <Link
        href={`/article/${article.slug}`}
        className="absolute inset-0 z-10"
        aria-label={article.title}
      />
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/10]">
        <Image
          src={img.sourceUrl}
          alt={img.altText}
          fill
          preload
          sizes="100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 p-6 sm:p-10 lg:p-14">
        <div className="max-w-3xl">
          <CategoryBadge category={category} onImage />
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-paper sm:text-4xl lg:text-[3.4rem]">
            <Link
              href={`/article/${article.slug}`}
              className="relative z-20 transition-colors hover:text-brass-200"
            >
              {article.title}
            </Link>
          </h1>
          <p className="mt-4 hidden max-w-2xl font-serif text-lg leading-relaxed text-paper/85 sm:block">
            {article.excerpt}
          </p>
          <p className="mt-5 text-sm text-paper/75">
            <Link
              href={`/author/${author.slug}`}
              className="relative z-20 font-semibold text-paper transition-colors hover:text-brass-300"
            >
              {author.name}
            </Link>
            <span aria-hidden> · </span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden> · </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} aria-hidden />
              {article.readTime} min read
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
