import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import HeroStory from "@/components/article/HeroStory";
import ArticleCard from "@/components/article/ArticleCard";
import {
  getArticlesByCategory,
  getEditorsPicks,
  getLatestArticles,
  getLeadStory,
  getNavCategories,
  getSecondaryFeatures,
} from "@/lib/api";

export default async function HomePage() {
  const lead = await getLeadStory();
  const secondary = await getSecondaryFeatures(4);
  const picks = await getEditorsPicks(4);
  const usedIds = [lead.id, ...secondary.map((a) => a.id)];
  const latest = await getLatestArticles(5, usedIds);
  const categories = await getNavCategories();
  const categorySections = await Promise.all(
    categories.map(async (c, idx) => ({
      category: c,
      items: (await getArticlesByCategory(c.slug)).slice(0, idx % 2 === 0 ? 3 : 4),
    }))
  );

  return (
    <>
      {/* Hero */}
      <Container className="pt-6">
        <HeroStory article={lead} />
      </Container>

      {/* Secondary features + Latest rail */}
      <Container className="mt-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading title="Featured" kicker="The big stories" />
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2">
              {secondary.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.06}>
                  <ArticleCard article={a} headingLevel="h3" />
                </Reveal>
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4" aria-label="Latest articles">
            <SectionHeading title="Latest" kicker="Fresh off the ledger" />
            <div className="space-y-5">
              {latest.map((a, i) => (
                <Reveal key={a.id} delay={i * 0.05}>
                  <ArticleCard article={a} variant="compact" headingLevel="h3" />
                </Reveal>
              ))}
            </div>
          </aside>
        </div>
      </Container>

      {/* Editor's Picks — dark band */}
      <section className="mt-20 bg-ink-950 py-16 text-ink-100 dark:border-y dark:border-ink-100/10">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4 border-b-2 border-brass-500 pb-3">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-brass-400">
                Selected by the newsroom
              </p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                Editor&apos;s Picks
              </h2>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 [&_p]:!text-ink-300 [&_a]:!text-paper [&_a:hover]:!text-brass-300">
            {picks.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.07}>
                <ArticleCard article={a} headingLevel="h3" />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Category sections */}
      {categorySections.map(({ category: c, items }, idx) => {
        if (items.length === 0) return null;
        const [first, ...rest] = items;
        return (
          <Container key={c.slug} className="mt-20" as="section">
            <SectionHeading
              title={c.name}
              kicker={c.description}
              href={`/category/${c.slug}`}
              hrefLabel={`All ${c.name}`}
            />
            {idx % 2 === 0 ? (
              <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2">
                <Reveal>
                  <ArticleCard article={first} variant="large" headingLevel="h3" />
                </Reveal>
                <div className="space-y-6">
                  {rest.map((a, i) => (
                    <Reveal key={a.id} delay={i * 0.06}>
                      <ArticleCard article={a} variant="horizontal" headingLevel="h3" />
                    </Reveal>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((a, i) => (
                  <Reveal key={a.id} delay={i * 0.06}>
                    <ArticleCard article={a} headingLevel="h3" />
                  </Reveal>
                ))}
              </div>
            )}
          </Container>
        );
      })}

      {/* Newsletter */}
      <Container className="mt-24" as="section">
        <div
          id="newsletter"
          className="relative overflow-hidden rounded-2xl bg-ledger-800 px-6 py-14 text-center sm:px-12 lg:px-24 lg:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brass-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-ledger-400/15 blur-3xl"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
            The Weekly Reconciliation
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-paper sm:text-4xl">
            The week in the profession, balanced to the penny.
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif text-ledger-100">
            Analysis worth your inbox — audit, tax, technology and practice,
            every Friday morning. No spam, no filler, unsubscribe anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </>
  );
}
