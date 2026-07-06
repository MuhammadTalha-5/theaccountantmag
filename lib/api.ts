import type { Article, Author, CategoryNode } from "@/types";
import { articles } from "./data/articles";
import { authors, getAuthorBySlug } from "./data/authors";
import { categories, getCategoryBySlug } from "./data/categories";

/**
 * Data-access layer. Every function here maps 1:1 onto a future WPGraphQL
 * query, so swapping mock data for live WordPress content later means
 * replacing implementations — not call sites.
 */

const sortByDateDesc = (a: Article, b: Article) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export function getAllArticles(): Article[] {
  return [...articles].sort(sortByDateDesc);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((a) => a.featured);
}

export function getLeadStory(): Article {
  return getFeaturedArticles()[0] ?? getAllArticles()[0];
}

export function getSecondaryFeatures(count = 4): Article[] {
  const lead = getLeadStory();
  return getAllArticles()
    .filter((a) => a.id !== lead.id && (a.featured || a.editorsPick))
    .slice(0, count);
}

export function getEditorsPicks(count = 4): Article[] {
  return getAllArticles().filter((a) => a.editorsPick).slice(0, count);
}

export function getLatestArticles(count = 6, excludeIds: string[] = []): Article[] {
  return getAllArticles()
    .filter((a) => !excludeIds.includes(a.id))
    .slice(0, count);
}

export function getArticlesByCategory(slug: string): Article[] {
  return getAllArticles().filter((a) =>
    a.categories.nodes.some((c) => c.slug === slug)
  );
}

export function getArticlesByAuthor(authorSlug: string): Article[] {
  return getAllArticles().filter((a) => a.author.node.slug === authorSlug);
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  const catSlugs = article.categories.nodes.map((c) => c.slug);
  const tagSlugs = article.tags.nodes.map((t) => t.slug);
  return getAllArticles()
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

export function getAllCategories(): CategoryNode[] {
  return categories;
}

export function getAllAuthors(): Author[] {
  return authors;
}

export { getAuthorBySlug, getCategoryBySlug };

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
