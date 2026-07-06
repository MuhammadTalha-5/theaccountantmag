import type { Author } from "@/types";

export const authors: Author[] = [
  {
    id: "author-1",
    name: "Eleanor Whitfield",
    slug: "eleanor-whitfield",
    role: "Editor-in-Chief",
    description:
      "Eleanor spent twelve years in Big Four assurance before trading working papers for print. She writes on audit reform, corporate governance, and the uneasy marriage of scepticism and commerce. Her series on audit market concentration was shortlisted for the Wincott Award.",
    avatar: { url: "/images/portrait-01.jpg" },
    social: {
      twitter: "https://twitter.com/example",
      linkedin: "https://linkedin.com/in/example",
      email: "eleanor@theaccountant.example",
    },
  },
  {
    id: "author-2",
    name: "Marcus Adeyemi",
    slug: "marcus-adeyemi",
    role: "Technology Editor",
    description:
      "A former systems auditor turned journalist, Marcus covers the collision of AI and the ledger — from agentic bookkeeping to the quiet death of the timesheet. He believes every technology story is really a story about controls.",
    avatar: { url: "/images/portrait-02.jpg" },
    social: {
      twitter: "https://twitter.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
  },
  {
    id: "author-3",
    name: "Priya Raghavan",
    slug: "priya-raghavan",
    role: "Tax Correspondent",
    description:
      "Priya is a chartered accountant and former transfer-pricing specialist who now translates the OECD's output into English. She covers global minimum tax, digital services levies, and the small-print politics of treaties.",
    avatar: { url: "/images/portrait-03.jpg" },
    social: {
      linkedin: "https://linkedin.com/in/example",
      email: "priya@theaccountant.example",
    },
  },
  {
    id: "author-4",
    name: "Tomás Herrera",
    slug: "tomas-herrera",
    role: "Economics Writer",
    description:
      "Tomás reads central bank minutes so you don't have to. Formerly of a sovereign risk desk, he writes on rates, insolvency cycles, and what the macro weather means for mid-market clients and the firms that advise them.",
    avatar: { url: "/images/portrait-04.jpg" },
    social: {
      twitter: "https://twitter.com/example",
    },
  },
  {
    id: "author-5",
    name: "Sofia Lindqvist",
    slug: "sofia-lindqvist",
    role: "Practice & Profession Editor",
    description:
      "Sofia covers the business of accountancy itself: private equity's march through the mid-tier, the salary wars for newly qualifieds, and why nobody wants to make partner anymore. She hosts the magazine's monthly practice-management roundtable.",
    avatar: { url: "/images/portrait-05.jpg" },
    social: {
      linkedin: "https://linkedin.com/in/example",
      email: "sofia@theaccountant.example",
    },
  },
  {
    id: "author-6",
    name: "David Okonkwo",
    slug: "david-okonkwo",
    role: "Regulation Correspondent",
    description:
      "David tracks the standard-setters — IAASB, PCAOB, FRC and the alphabet beyond — with a barrister's patience for footnotes. His beat is the widening gap between what regulators demand and what firms can staff.",
    avatar: { url: "/images/portrait-06.jpg" },
    social: {
      twitter: "https://twitter.com/example",
      linkedin: "https://linkedin.com/in/example",
    },
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
