import type { CategoryNode } from "@/types";

export const categories: CategoryNode[] = [
  {
    name: "Tax",
    slug: "tax",
    description:
      "Policy shifts, cross-border complexity, and the practical craft of tax advisory.",
  },
  {
    name: "Audit & Assurance",
    slug: "audit",
    description:
      "Inside the profession's trust machinery — standards, scandals, and reinvention.",
  },
  {
    name: "Technology",
    slug: "technology",
    description:
      "AI, automation, and the tools reshaping how the numbers get done.",
  },
  {
    name: "Practice",
    slug: "practice",
    description:
      "Running the modern firm: talent, pricing, succession, and growth.",
  },
  {
    name: "Economy",
    slug: "economy",
    description:
      "The macro forces every adviser needs to read before their clients do.",
  },
  {
    name: "Regulation",
    slug: "regulation",
    description:
      "Standard-setters, watchdogs, and the shifting rulebook of the profession.",
  },
];

export function getCategoryBySlug(slug: string): CategoryNode | undefined {
  return categories.find((c) => c.slug === slug);
}
