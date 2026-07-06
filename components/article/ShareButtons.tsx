"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedinIcon, XTwitterIcon } from "@/components/ui/SocialIcons";

const base =
  "rounded-full border border-ink-950/12 p-2.5 text-ink-600 transition-all hover:-translate-y-0.5 hover:border-ledger-700 hover:text-ledger-700 dark:border-ink-100/15 dark:text-ink-300 dark:hover:border-brass-400 dark:hover:text-brass-400";

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://theaccountant.example/article/${slug}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="flex items-center gap-2" aria-label="Share this article">
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className={base}
      >
        <XTwitterIcon size={16} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={base}
      >
        <LinkedinIcon size={16} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={base}
      >
        <FacebookIcon size={16} />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={base}
      >
        {copied ? (
          <Check size={16} aria-hidden className="text-ledger-600 dark:text-brass-400" />
        ) : (
          <Link2 size={16} aria-hidden />
        )}
      </button>
    </div>
  );
}
