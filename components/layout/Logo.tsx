import { cn } from "@/lib/utils";

/**
 * The Accountant brand mark: Fraunces "A" over the accountant's double rule
 * (the bookkeeping symbol for a final, balanced total).
 * The A inherits currentColor so it adapts to light/dark automatically;
 * the rules stay brass. Standalone SVG files live in /public/brand.
 */

const A_PATH =
  "M268 -539H772L775 -518H263ZM334 -7Q334 -4 332.0 -2.0Q330 0 326 0H-6Q-10 0 -12.0 -2.0Q-14 -4 -14 -7Q-14 -11 -11.0 -12.5Q-8 -14 -5 -15L29 -25Q63 -37 98.5 -74.5Q134 -112 156 -189L471 -1268Q484 -1311 472.5 -1336.5Q461 -1362 431 -1377Q419 -1386 413.0 -1388.0Q407 -1390 407 -1393Q407 -1397 409.5 -1398.5Q412 -1400 417 -1400H835Q840 -1400 842.0 -1398.5Q844 -1397 844 -1393Q844 -1390 839.0 -1387.0Q834 -1384 821 -1378Q799 -1374 794.0 -1364.0Q789 -1354 798 -1326L1197 -68Q1205 -45 1219.5 -32.5Q1234 -20 1256 -17Q1263 -15 1265.5 -13.0Q1268 -11 1268 -7Q1268 -4 1266.0 -2.0Q1264 0 1259 0H791Q787 0 784.5 -2.0Q782 -4 782 -7Q782 -11 785.0 -12.0Q788 -13 794 -15L839 -23Q865 -30 870.5 -43.0Q876 -56 868 -82L488 -1283L514 -1343L176 -185Q163 -143 176.0 -111.0Q189 -79 220.0 -57.5Q251 -36 295 -23L324 -15Q330 -13 332.0 -11.5Q334 -10 334 -7Z";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("h-8 w-8", className)}
    >
      <g transform="translate(19.55 74) scale(0.048571)">
        <path d={A_PATH} fill="currentColor" />
      </g>
      <rect x="18.85" y="83" width="62.3" height="6.5" className="fill-brass-500" />
      <rect x="18.85" y="94" width="62.3" height="3" className="fill-brass-500" />
    </svg>
  );
}

export default function Logo({
  compact = false,
  tagline = false,
  className,
}: {
  compact?: boolean;
  /** Renders "Beyond the Balance Sheet" beneath the wordmark. */
  tagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2 md:gap-2.5", className)}>
      <LogoMark
        className={cn(
          "shrink-0 transition-all duration-300",
          tagline
            ? compact
              ? "h-7 w-7 md:h-8 md:w-8"
              : "h-8 w-8 md:h-11 md:w-11"
            : compact
              ? "h-6 w-6 md:h-7 md:w-7"
              : "h-7 w-7 md:h-9 md:w-9"
        )}
      />
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display font-bold leading-none tracking-tight transition-all duration-300",
            compact ? "text-base md:text-xl" : "text-lg md:text-[1.7rem]"
          )}
        >
          The&nbsp;Accountant
        </span>
        {tagline && (
          <span
            className={cn(
              "font-semibold uppercase text-brass-500 transition-all duration-300",
              compact
                ? "mt-0.5 text-[0.38rem] tracking-[0.2em] md:mt-1 md:text-[0.48rem] md:tracking-[0.24em]"
                : "mt-1 text-[0.42rem] tracking-[0.22em] md:mt-1.5 md:text-[0.55rem] md:tracking-[0.3em]"
            )}
          >
            Beyond the Balance Sheet
          </span>
        )}
      </span>
    </span>
  );
}
