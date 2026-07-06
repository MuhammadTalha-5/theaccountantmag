import type { Metadata } from "next";
import { Archivo, Fraunces, Newsreader } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getAllCategories } from "@/lib/api";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getAllCategories();

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
          <Header categories={categories} />
          <main id="main-content" className="flex-1 pt-20">
            {children}
          </main>
          <Footer categories={categories} />
        </ThemeProvider>
      </body>
    </html>
  );
}
