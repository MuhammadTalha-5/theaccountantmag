/**
 * Content types shaped to mirror WPGraphQL responses so the mock data
 * layer can later be swapped for live queries with minimal refactoring.
 * (e.g. `featuredImage.node.sourceUrl` matches WPGraphQL's MediaItem shape.)
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface MediaItem {
  node: {
    sourceUrl: string;
    altText: string;
    caption?: string;
  };
}

export interface CategoryNode {
  name: string;
  slug: string;
  description?: string;
}

export interface TagNode {
  name: string;
  slug: string;
}

export interface AuthorNode {
  node: Author;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  description: string; // WP "biographical info"
  role?: string;
  avatar: { url: string };
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string; // the dek
  content: string; // HTML string, as WPGraphQL returns
  date: string; // ISO — WP `date`
  modified?: string;
  readTime: number; // minutes — custom field
  featured?: boolean;
  editorsPick?: boolean;
  featuredImage: MediaItem;
  author: AuthorNode;
  categories: { nodes: CategoryNode[] };
  tags: { nodes: TagNode[] };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: { sourceUrl: string; altText: string };
  social?: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  authorSlug?: string; // links to /author/[slug] when they also write
}
