import type { Metadata } from "next";
import { Archivo, Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getNavItems } from "@/lib/api";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Accountant — Journalism on the numbers that run the world",
    template: "%s | The Accountant",
  },
  description:
    "Independent journalism on audit, tax, technology and the business of the accounting profession.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = await getNavItems();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${archivo.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ledger-700 focus:px-4 focus:py-2 focus:text-paper"
          >
            Skip to content
          </a>
          <Header items={navItems} />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer items={navItems} />
        </ThemeProvider>
      </body>
    </html>
  );
}
