import Link from "next/link";
import { Mail, Rss } from "lucide-react";
import { LinkedinIcon, XTwitterIcon } from "@/components/ui/SocialIcons";
import Container from "@/components/ui/Container";
import NewsletterSignup from "@/components/ui/NewsletterSignup";
import type { NavItem } from "@/types";

const year = new Date().getFullYear();

export default function Footer({ items }: { items: NavItem[] }) {
  return (
    <footer className="mt-24 border-t border-ink-950/10 bg-ink-950 text-ink-200 dark:border-ink-100/10">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Masthead + mission */}
          <div className="lg:col-span-4">
            <p className="font-display text-2xl font-bold tracking-tight text-paper">
              The&nbsp;Accountant
              <span aria-hidden className="ml-2 inline-block h-2 w-2 rounded-full bg-brass-500" />
            </p>
            <p className="mt-4 max-w-sm font-serif text-[0.95rem] leading-relaxed text-ink-300">
              Independent journalism on the numbers that run the world — audit,
              tax, technology and the business of the profession itself.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://twitter.com/example"
                aria-label="The Accountant on Twitter"
                className="rounded-full border border-ink-100/15 p-2.5 transition-colors hover:border-brass-500 hover:text-brass-400"
              >
                <XTwitterIcon size={17} />
              </a>
              <a
                href="https://linkedin.com/company/example"
                aria-label="The Accountant on LinkedIn"
                className="rounded-full border border-ink-100/15 p-2.5 transition-colors hover:border-brass-500 hover:text-brass-400"
              >
                <LinkedinIcon size={17} />
              </a>
              <a
                href="mailto:editors@theaccountant.example"
                aria-label="Email the editors"
                className="rounded-full border border-ink-100/15 p-2.5 transition-colors hover:border-brass-500 hover:text-brass-400"
              >
                <Mail size={17} aria-hidden />
              </a>
              <a
                href="/rss.xml"
                aria-label="RSS feed"
                className="rounded-full border border-ink-100/15 p-2.5 transition-colors hover:border-brass-500 hover:text-brass-400"
              >
                <Rss size={17} aria-hidden />
              </a>
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Sections" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-400">
              Sections
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Magazine" className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-400">
              Magazine
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/team" className="transition-colors hover:text-paper">About &amp; Team</Link></li>
              <li><Link href="/search" className="transition-colors hover:text-paper">Search</Link></li>
              <li><Link href="#newsletter" className="transition-colors hover:text-paper">Newsletter</Link></li>
              <li><Link href="#" className="transition-colors hover:text-paper">Advertise</Link></li>
              <li><Link href="#" className="transition-colors hover:text-paper">Careers</Link></li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-brass-400">
              The Weekly Reconciliation
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">
              One email, every Friday. The week in the profession, balanced to
              the penny.
            </p>
            <div className="mt-4">
              <NewsletterSignup variant="footer" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-100/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} The Accountant Magazine. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="#" className="transition-colors hover:text-paper">Privacy</Link></li>
            <li><Link href="#" className="transition-colors hover:text-paper">Terms</Link></li>
            <li><Link href="#" className="transition-colors hover:text-paper">Cookies</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
