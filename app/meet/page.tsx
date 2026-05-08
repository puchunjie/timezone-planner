import type { Metadata } from "next";
import Link from "next/link";
import { getCity } from "@/data/cities";
import { pairSlug } from "@/lib/pairs";

export const metadata: Metadata = {
  title: "Popular City Pairs",
  description:
    "Browse the most-searched cross-timezone meeting routes. 1,225 city pairs in total — each with overlap, suggested times, and DST notes.",
  alternates: { canonical: "/meet" },
};

const POPULAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["new-york", "london"],
  ["new-york", "tokyo"],
  ["new-york", "san-francisco"],
  ["london", "tokyo"],
  ["london", "singapore"],
  ["london", "new-york"],
  ["san-francisco", "tokyo"],
  ["san-francisco", "london"],
  ["singapore", "london"],
  ["singapore", "new-york"],
  ["sydney", "london"],
  ["sydney", "new-york"],
  ["sydney", "singapore"],
  ["lisbon", "new-york"],
  ["lisbon", "san-francisco"],
  ["bali", "new-york"],
  ["mexico-city", "london"],
  ["bengaluru", "san-francisco"],
  ["dubai", "london"],
  ["tel-aviv", "new-york"],
];

const REGIONAL_PAIRS: ReadonlyArray<{
  title: string;
  pairs: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    title: "Across the Atlantic",
    pairs: [
      ["new-york", "berlin"],
      ["new-york", "paris"],
      ["new-york", "amsterdam"],
      ["toronto", "london"],
      ["miami", "lisbon"],
    ],
  },
  {
    title: "Across the Pacific",
    pairs: [
      ["los-angeles", "tokyo"],
      ["vancouver", "tokyo"],
      ["san-francisco", "singapore"],
      ["los-angeles", "sydney"],
      ["san-francisco", "auckland"],
    ],
  },
  {
    title: "Europe ↔ Asia",
    pairs: [
      ["london", "hong-kong"],
      ["berlin", "singapore"],
      ["paris", "tokyo"],
      ["amsterdam", "bengaluru"],
      ["lisbon", "dubai"],
    ],
  },
  {
    title: "Nomad routes",
    pairs: [
      ["lisbon", "bali"],
      ["mexico-city", "berlin"],
      ["chiang-mai", "london"],
      ["medellin", "new-york"],
      ["tbilisi", "berlin"],
    ],
  },
];

export default function MeetIndex() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:py-16">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Plan a Meeting
          </h1>
          <p className="text-muted-foreground mt-1">
            Pick a pair to see business-hour overlap, suggested times, and a
            ready-to-share calendar invite. 1,225 pairs covered in total.
          </p>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Most-searched pairs</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {POPULAR_PAIRS.map(([aSlug, bSlug]) => {
              const a = getCity(aSlug);
              const b = getCity(bSlug);
              if (!a || !b) return null;
              const slug = pairSlug(a, b);
              return (
                <li key={slug}>
                  <Link
                    href={`/meet/${slug}`}
                    className="text-primary hover:underline"
                  >
                    {a.name} ↔ {b.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {REGIONAL_PAIRS.map((group) => (
          <section key={group.title}>
            <h2 className="mb-3 text-xl font-semibold">{group.title}</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {group.pairs.map(([aSlug, bSlug]) => {
                const a = getCity(aSlug);
                const b = getCity(bSlug);
                if (!a || !b) return null;
                const slug = pairSlug(a, b);
                return (
                  <li key={slug}>
                    <Link
                      href={`/meet/${slug}`}
                      className="text-primary hover:underline"
                    >
                      {a.name} ↔ {b.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="bg-card rounded-lg border p-5">
          <h2 className="mb-2 text-lg font-semibold">Browse by city</h2>
          <p className="text-muted-foreground mb-3 text-sm">
            Want to start from a single city instead?
          </p>
          <Link
            href="/cities"
            className="text-primary text-sm hover:underline"
          >
            See all 50 cities →
          </Link>
        </section>
      </main>
    </div>
  );
}
