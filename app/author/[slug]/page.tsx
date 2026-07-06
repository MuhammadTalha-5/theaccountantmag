import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { LinkedinIcon, XTwitterIcon } from "@/components/ui/SocialIcons";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ArticleCard from "@/components/article/ArticleCard";
import { getAllAuthors, getArticlesByAuthor, getAuthorBySlug } from "@/lib/api";

export async function generateStaticParams() {
  return (await getAllAuthors()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  return { title: author.name, description: author.description };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthor(slug);
  const iconClass =
    "rounded-full border border-ink-950/12 p-2.5 text-ink-500 transition-colors hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400";

  return (
    <Container className="pt-12">
      {/* Author hero */}
      <header className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:gap-10 sm:text-left">
        <Image
          src={author.avatar.url}
          alt={`Portrait of ${author.name}`}
          width={140}
          height={140}
          preload
          className="rounded-full ring-4 ring-brass-500/50"
        />
        <div>
          {author.role && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-400">
              {author.role}
            </p>
          )}
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">
            {author.name}
          </h1>
          <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-ink-600 dark:text-ink-300">
            {author.description}
          </p>
          <div className="mt-5 flex justify-center gap-2 sm:justify-start">
            {author.social?.twitter && (
              <a href={author.social.twitter} aria-label={`${author.name} on Twitter`} className={iconClass}>
                <XTwitterIcon size={16} />
              </a>
            )}
            {author.social?.linkedin && (
              <a href={author.social.linkedin} aria-label={`${author.name} on LinkedIn`} className={iconClass}>
                <LinkedinIcon size={16} />
              </a>
            )}
            {author.social?.email && (
              <a href={`mailto:${author.social.email}`} aria-label={`Email ${author.name}`} className={iconClass}>
                <Mail size={16} aria-hidden />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Articles */}
      <section className="mt-20">
        <SectionHeading
          title={`Stories by ${author.name.split(" ")[0]}`}
          kicker={`${articles.length} ${articles.length === 1 ? "article" : "articles"}`}
        />
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.06}>
              <ArticleCard article={a} headingLevel="h3" />
            </Reveal>
          ))}
        </div>
      </section>
    </Container>
  );
}
