"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export default function Header({ items }: { items: NavItem[] }) {
  const { dark, toggle } = useTheme();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  const onScroll = useCallback(() => {
    const y = window.scrollY;
    setCompact(y > 24);
    // Hide on scroll down, reveal on scroll up — never hide near the top
    // or while the mobile menu is open.
    if (y > lastY.current && y > 160 && !menuOpen) setHidden(true);
    else setHidden(false);
    lastY.current = y;
  }, [menuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      role="banner"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        compact
          ? "border-ink-950/10 bg-paper/90 backdrop-blur-md dark:border-ink-100/10 dark:bg-ink-950/90"
          : "border-transparent bg-paper dark:bg-ink-950"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-all duration-300",
            compact ? "h-14" : "h-20"
          )}
        >
          {/* Masthead */}
          <Link
            href="/"
            className="group flex shrink-0 items-baseline gap-2"
            aria-label="The Accountant — home"
          >
            <span
              className={cn(
                "font-display font-bold tracking-tight transition-all duration-300",
                compact ? "text-xl" : "text-2xl md:text-[1.7rem]"
              )}
            >
              The&nbsp;Accountant
            </span>
            <span
              aria-hidden
              className="hidden h-2 w-2 rounded-full bg-brass-500 transition-transform duration-300 group-hover:scale-150 sm:block"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-2 text-[0.82rem] font-medium uppercase tracking-[0.12em] transition-colors",
                        active
                          ? "text-ledger-700 dark:text-brass-400"
                          : "text-ink-600 hover:text-ink-950 dark:text-ink-300 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-brass-500"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="rounded-full p-2 text-ink-600 transition-colors hover:bg-ink-950/5 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Search size={19} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={dark}
              className="rounded-full p-2 text-ink-600 transition-colors hover:bg-ink-950/5 hover:text-ink-950 dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {dark ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
            </button>
            <Link
              href="#newsletter"
              className="hidden rounded-full bg-ledger-700 px-4 py-2 text-sm font-semibold text-paper transition-all hover:bg-ledger-800 hover:shadow-lg hover:shadow-ledger-700/25 sm:inline-block dark:bg-brass-500 dark:text-ink-950 dark:hover:bg-brass-400"
            >
              Subscribe
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="rounded-full p-2 text-ink-600 hover:bg-ink-950/5 hover:text-ink-950 lg:hidden dark:text-ink-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {menuOpen ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-ink-950/10 bg-paper lg:hidden dark:border-ink-100/10 dark:bg-ink-950"
          >
            <Container className="py-4">
              <ul className="flex flex-col">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block border-b border-ink-950/5 py-3 font-display text-lg font-semibold dark:border-ink-100/5"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/team"
                    className="block py-3 font-display text-lg font-semibold"
                  >
                    About &amp; Team
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
