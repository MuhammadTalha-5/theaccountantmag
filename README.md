# The Accountant — Magazine Frontend

A premium digital-magazine frontend for the accounting profession, built with
Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | Description |
| --- | --- |
| `/` | Homepage — hero lead story, featured grid, Latest rail, Editor's Picks, category sections, newsletter |
| `/category/[slug]` | Section listing with sort, grid/list toggle, load-more pagination |
| `/article/[slug]` | Long-form article — reading progress bar, byline, share buttons, related stories |
| `/team` | About the magazine + editorial alternating team layout |
| `/author/[slug]` | Author bio + their articles |
| `/search` | Archive search UI (client-side over mock data) |

## Architecture

```
app/                     Routes (App Router, all typed)
components/
  layout/                Header (sticky, hide-on-scroll), Footer, ThemeProvider
  ui/                    Container, SectionHeading, Reveal, Skeletons, Newsletter, Search
  article/               ArticleCard (4 variants), HeroStory, ReadingProgress, ShareButtons
  team/                  TeamMemberCard (alternating editorial layout)
lib/
  api.ts                 Data-access layer — each function maps 1:1 to a future WPGraphQL query
  data/                  Mock content: articles, authors, team, categories
types/                   Content types mirroring WPGraphQL shapes
public/images/           Locally generated abstract placeholder art
```

## WPGraphQL migration path

Mock data intentionally mirrors WPGraphQL response shapes:
`featuredImage.node.sourceUrl`, `author.node`, `categories.nodes`,
`tags.nodes`, HTML-string `content`. To go live, replace the function bodies
in `lib/api.ts` with GraphQL queries — call sites stay untouched.

## Design system

- **Fonts:** Fraunces (display), Newsreader (body serif), Archivo (UI sans) via `next/font`
- **Palette:** ink navy `#101820`, ledger green `#175243`, brass `#C29A3B`, paper `#FAF7F0`
- **Dark mode:** class strategy, toggled via React state (`ThemeProvider`) — no localStorage yet
- **Motion:** Framer Motion — scroll reveals, header hide/reveal, layout animations; respects `prefers-reduced-motion`
