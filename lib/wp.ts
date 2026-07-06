import type { Article, Author, CategoryNode, TeamMember } from "@/types";

/**
 * WPGraphQL data layer.
 * Set WORDPRESS_API_URL (e.g. https://cms.theaccountantmag.com/graphql)
 * in .env.local and in Vercel → Project → Settings → Environment Variables.
 * When the variable is missing, lib/api.ts falls back to mock data.
 */

const WP_URL = process.env.WORDPRESS_API_URL;

export const wpConfigured = Boolean(WP_URL);

/** How often (seconds) Next revalidates WordPress data (ISR). */
const REVALIDATE = 60;

async function wpFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!WP_URL) throw new Error("WORDPRESS_API_URL is not set");

  const res = await fetch(WP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: REVALIDATE },
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(`WPGraphQL error: ${json.errors[0].message}`);
  }
  return json.data as T;
}

/* ---------------------------------------------------------------------- */
/* Queries                                                                 */
/* ---------------------------------------------------------------------- */

const AUTHOR_FIELDS = `
  id
  name
  slug
  description
  avatar { url }
  authorMeta {
    roleTitle
    twitterUrl
    linkedinUrl
    publicEmail
    avatarImage { node { sourceUrl } }
  }
`;

const POST_FIELDS = `
  id
  title
  slug
  excerpt
  content
  date
  modified
  featuredImage {
    node {
      sourceUrl
      altText
      caption
    }
  }
  author { node { ${AUTHOR_FIELDS} } }
  categories { nodes { name slug description } }
  tags { nodes { name slug } }
  articleMeta {
    readTime
    featured
    editorsPick
  }
`;

const ALL_POSTS_QUERY = `
  query AllPosts($first: Int!) {
    posts(first: $first, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes { ${POST_FIELDS} }
    }
  }
`;

const POST_BY_SLUG_QUERY = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) { ${POST_FIELDS} }
  }
`;

const CATEGORIES_QUERY = `
  query AllCategories {
    categories(first: 50, where: { hideEmpty: false }) {
      nodes { name slug description count }
    }
  }
`;

const AUTHORS_QUERY = `
  query AllAuthors {
    users(first: 100, where: { hasPublishedPosts: [POST] }) {
      nodes { ${AUTHOR_FIELDS} }
    }
  }
`;

const TEAM_QUERY = `
  query AllTeamMembers {
    teamMembers(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        id
        title
        teamMemberMeta {
          role
          bio
          photo { node { sourceUrl altText } }
          twitterUrl
          linkedinUrl
          email
          linkedAuthor { nodes { slug } }
        }
      }
    }
  }
`;

/* ---------------------------------------------------------------------- */
/* Mappers: WPGraphQL shapes → app types                                   */
/* ---------------------------------------------------------------------- */

const stripHtml = (html: string) =>
  (html ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").replace(/\[…\]|\[&hellip;\]/g, "…").trim();

const wordsPerMinute = 220;

function estimateReadTime(html: string): number {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAuthor(u: any): Author {
  const meta = u?.authorMeta ?? {};
  return {
    id: u?.id ?? "",
    name: u?.name ?? "Staff",
    slug: u?.slug ?? "staff",
    description: u?.description ?? "",
    role: meta.roleTitle ?? undefined,
    avatar: {
      url: meta.avatarImage?.node?.sourceUrl ?? u?.avatar?.url ?? "/images/portrait-01.jpg",
    },
    social: {
      twitter: meta.twitterUrl ?? undefined,
      linkedin: meta.linkedinUrl ?? undefined,
      email: meta.publicEmail ?? undefined,
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapPost(p: any): Article {
  const meta = p?.articleMeta ?? {};
  return {
    id: p.id,
    title: stripHtml(p.title ?? ""),
    slug: p.slug,
    excerpt: stripHtml(p.excerpt ?? ""),
    content: p.content ?? "",
    date: p.date,
    modified: p.modified ?? undefined,
    readTime: meta.readTime ?? estimateReadTime(p.content ?? ""),
    featured: Boolean(meta.featured),
    editorsPick: Boolean(meta.editorsPick),
    featuredImage: {
      node: {
        sourceUrl: p.featuredImage?.node?.sourceUrl ?? "/images/article-01.jpg",
        altText: p.featuredImage?.node?.altText ?? stripHtml(p.title ?? ""),
        caption: stripHtml(p.featuredImage?.node?.caption ?? "") || undefined,
      },
    },
    author: { node: mapAuthor(p.author?.node) },
    categories: {
      nodes: (p.categories?.nodes ?? []).map(
        (c: { name: string; slug: string; description?: string }) => ({
          name: c.name,
          slug: c.slug,
          description: c.description ?? undefined,
        })
      ),
    },
    tags: {
      nodes: (p.tags?.nodes ?? []).map((t: { name: string; slug: string }) => ({
        name: t.name,
        slug: t.slug,
      })),
    },
  };
}

/* ---------------------------------------------------------------------- */
/* Fetchers                                                                */
/* ---------------------------------------------------------------------- */

export async function wpGetAllArticles(): Promise<Article[]> {
  const data = await wpFetch<{ posts: { nodes: unknown[] } }>(ALL_POSTS_QUERY, {
    first: 100,
  });
  return (data.posts?.nodes ?? []).map(mapPost);
}

export async function wpGetArticleBySlug(slug: string): Promise<Article | undefined> {
  const data = await wpFetch<{ post: unknown | null }>(POST_BY_SLUG_QUERY, { slug });
  return data.post ? mapPost(data.post) : undefined;
}

export async function wpGetCategories(): Promise<CategoryNode[]> {
  const data = await wpFetch<{
    categories: { nodes: { name: string; slug: string; description?: string }[] };
  }>(CATEGORIES_QUERY);
  return (data.categories?.nodes ?? [])
    .filter((c) => c.slug !== "uncategorized")
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description ?? undefined,
    }));
}

export async function wpGetAuthors(): Promise<Author[]> {
  const data = await wpFetch<{ users: { nodes: unknown[] } }>(AUTHORS_QUERY);
  return (data.users?.nodes ?? []).map(mapAuthor);
}

export async function wpGetTeamMembers(): Promise<TeamMember[]> {
  const data = await wpFetch<{
    teamMembers: {
      nodes: {
        id: string;
        title: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        teamMemberMeta: any;
      }[];
    };
  }>(TEAM_QUERY);

  return (data.teamMembers?.nodes ?? []).map((n) => {
    const meta = n.teamMemberMeta ?? {};
    return {
      id: n.id,
      name: stripHtml(n.title),
      role: meta.role ?? "",
      bio: meta.bio ?? "",
      photo: {
        sourceUrl: meta.photo?.node?.sourceUrl ?? "/images/portrait-01.jpg",
        altText: meta.photo?.node?.altText ?? `Portrait of ${stripHtml(n.title)}`,
      },
      social: {
        twitter: meta.twitterUrl ?? undefined,
        linkedin: meta.linkedinUrl ?? undefined,
        email: meta.email ?? undefined,
      },
      authorSlug: meta.linkedAuthor?.nodes?.[0]?.slug ?? undefined,
    };
  });
}
