import { cache } from "react";
import type { Article, Author, CategoryNode, NavItem, TeamMember } from "@/types";
import { articles as mockArticles } from "./data/articles";
import { authors as mockAuthors } from "./data/authors";
import { categories as mockCategories } from "./data/categories";
import { team as mockTeam } from "./data/team";
import {
  wpConfigured,
  wpGetAllArticles,
  wpGetArticleBySlug,
  wpGetAuthors,
  wpGetCategories,
  wpGetPrimaryMenu,
  wpGetTeamMembers,
} from "./wp";

/**
 * Data-access layer.
 * Live WordPress (WPGraphQL) when WORDPRESS_API_URL is set;
 * falls back to typed mock data otherwise (useful for local dev/preview).
 * All functions are async — call sites simply `await`.
 */

const sortByDateDesc = (a: Article, b: Article) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

/* React cache() dedupes these per request, so the homepage rendering
   many sections still issues a single GraphQL query. */

export const getAllArticles = cache(async (): Promise<Article[]> => {
  const list = wpConfigured ? await wpGetAllArticles() : [...mockArticles];
  return list.sort(sortByDateDesc);
});

export const getAllCategories = cache(async (): Promise<CategoryNode[]> => {
  return wpConfigured ? wpGetCategories() : mockCategories;
});

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  return wpConfigured ? wpGetAuthors() : mockAuthors;
});

export const getTeamMembers = cache(async (): Promise<TeamMember[]> => {
  return wpConfigured ? wpGetTeamMembers() : mockTeam;
});

/**
 * Header/footer navigation.
 * Uses the WordPress menu assigned to the "Primary Menu" location when one
 * exists; otherwise falls back to the category list. Managing the menu in
 * WP Admin → Appearance → Menus controls exactly what appears (and hides
 * the un-deletable default category).
 */
export const getNavItems = cache(async (): Promise<NavItem[]> => {
  if (wpConfigured) {
    const menu = await wpGetPrimaryMenu();
    if (menu) return menu;
  }
  return (await getAllCategories()).map((c) => ({
    label: c.name,
    href: `/category/${c.slug}`,
  }));
});

/**
 * Categories surfaced as homepage sections — driven by the nav menu, so
 * curating the menu also curates the homepage. Falls back to all categories.
 */
export const getNavCategories = cache(async (): Promise<CategoryNode[]> => {
  const [navItems, categories] = await Promise.all([getNavItems(), getAllCategories()]);
  const navSlugs = navItems
    .map((i) => i.href.match(/^\/category\/([^/]+)$/)?.[1])
    .filter((s): s is string => Boolean(s));
  if (navSlugs.length === 0) return categories;
  // Preserve menu order.
  return navSlugs
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is CategoryNode => Boolean(c));
});

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (wpConfigured) return wpGetArticleBySlug(slug);
  return mockArticles.find((a) => a.slug === slug);
}

export async function getCategoryBySlug(slug: string): Promise<CategoryNode | undefined> {
  const cats = await getAllCategories();
  return cats.find((c) => c.slug === slug);
}

export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const all = await getAllAuthors();
  return all.find((a) => a.slug === slug);
}

/* ---- Derived selections (operate on the cached article list) ---- */

export async function getFeaturedArticles(): Promise<Article[]> {
  return (await getAllArticles()).filter((a) => a.featured);
}

export async function getLeadStory(): Promise<Article> {
  const all = await getAllArticles();
  return all.find((a) => a.featured) ?? all[0];
}

export async function getSecondaryFeatures(count = 4): Promise<Article[]> {
  const all = await getAllArticles();
  const lead = await getLeadStory();
  return all
    .filter((a) => a.id !== lead.id && (a.featured || a.editorsPick))
    .slice(0, count);
}

export async function getEditorsPicks(count = 4): Promise<Article[]> {
  return (await getAllArticles()).filter((a) => a.editorsPick).slice(0, count);
}

export async function getLatestArticles(
  count = 6,
  excludeIds: string[] = []
): Promise<Article[]> {
  return (await getAllArticles())
    .filter((a) => !excludeIds.includes(a.id))
    .slice(0, count);
}

export async function getArticlesByCategory(slug: string): Promise<Article[]> {
  return (await getAllArticles()).filter((a) =>
    a.categories.nodes.some((c) => c.slug === slug)
  );
}

export async function getArticlesByAuthor(authorSlug: string): Promise<Article[]> {
  return (await getAllArticles()).filter((a) => a.author.node.slug === authorSlug);
}

export async function getRelatedArticles(article: Article, count = 3): Promise<Article[]> {
  const catSlugs = article.categories.nodes.map((c) => c.slug);
  const tagSlugs = article.tags.nodes.map((t) => t.slug);
  return (await getAllArticles())
    .filter((a) => a.id !== article.id)
    .map((a) => {
      const catScore = a.categories.nodes.filter((c) => catSlugs.includes(c.slug)).length * 2;
      const tagScore = a.tags.nodes.filter((t) => tagSlugs.includes(t.slug)).length;
      return { article: a, score: catScore + tagScore };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, count)
    .map((x) => x.article);
}
