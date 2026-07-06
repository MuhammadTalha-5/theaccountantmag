"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedinIcon, XTwitterIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types";

/**
 * Editorial alternating-layout bio: image and text swap sides row by row,
 * with a large index numeral — closer to a magazine masthead spread than a
 * card grid.
 */
export default function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  const reduce = useReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "group grid items-center gap-8 py-10 sm:grid-cols-[1fr_1.6fr] sm:gap-12",
        flipped && "sm:grid-cols-[1.6fr_1fr]"
      )}
    >
      {/* Photo */}
      <div className={cn("relative", flipped && "sm:order-2")}>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={member.photo.sourceUrl}
            alt={member.photo.altText}
            fill
            sizes="(max-width: 640px) 100vw, 35vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-ledger-900/0 transition-colors duration-500 group-hover:bg-ledger-900/15"
          />
        </div>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute -top-6 font-display text-7xl font-bold text-ink-950/8 transition-colors duration-500 group-hover:text-brass-500/40 sm:text-8xl dark:text-white/8",
            flipped ? "-right-3" : "-left-3"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Bio */}
      <div className={cn(flipped && "sm:order-1 sm:text-right")}>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-400">
          {member.role}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {member.authorSlug ? (
            <Link
              href={`/author/${member.authorSlug}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ledger-700 dark:hover:text-brass-400"
            >
              {member.name}
              <ArrowUpRight
                size={20}
                aria-hidden
                className="opacity-0 transition-all group-hover:opacity-100"
              />
            </Link>
          ) : (
            member.name
          )}
        </h3>
        <p className="mt-4 max-w-xl font-serif text-[1.02rem] leading-relaxed text-ink-600 dark:text-ink-300">
          {member.bio}
        </p>
        <div className={cn("mt-5 flex gap-2", flipped && "sm:justify-end")}>
          {member.social?.twitter && (
            <a
              href={member.social.twitter}
              aria-label={`${member.name} on Twitter`}
              className="rounded-full border border-ink-950/12 p-2 text-ink-500 transition-colors hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400"
            >
              <XTwitterIcon size={15} />
            </a>
          )}
          {member.social?.linkedin && (
            <a
              href={member.social.linkedin}
              aria-label={`${member.name} on LinkedIn`}
              className="rounded-full border border-ink-950/12 p-2 text-ink-500 transition-colors hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400"
            >
              <LinkedinIcon size={15} />
            </a>
          )}
          {member.social?.email && (
            <a
              href={`mailto:${member.social.email}`}
              aria-label={`Email ${member.name}`}
              className="rounded-full border border-ink-950/12 p-2 text-ink-500 transition-colors hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400"
            >
              <Mail size={15} aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
