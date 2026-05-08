import { Suspense } from "react";
import Link from "next/link";
import { MeetingPlanner } from "@/components/meeting-planner";
import { getCity } from "@/data/cities";
import { pairSlug } from "@/lib/pairs";

const POPULAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["new-york", "london"],
  ["new-york", "tokyo"],
  ["london", "tokyo"],
  ["san-francisco", "tokyo"],
  ["london", "singapore"],
  ["sydney", "london"],
  ["new-york", "san-francisco"],
  ["lisbon", "new-york"],
  ["bali", "new-york"],
  ["bengaluru", "san-francisco"],
  ["dubai", "london"],
  ["mexico-city", "london"],
];

export default function Home() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 sm:py-20">
        <section className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Modern timezone planner
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Schedule meetings across time zones,
            <br className="hidden sm:block" /> without the math.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-base sm:mx-0 sm:text-lg">
            Drag a single time pointer. See every teammate&apos;s local time and
            business window light up — built for distributed teams and digital
            nomads.
          </p>
        </section>

        <Suspense
          fallback={
            <div className="bg-card mx-auto h-72 w-full max-w-4xl animate-pulse rounded-lg border" />
          }
        >
          <MeetingPlanner />
        </Suspense>

        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Popular city pairs</h2>
            <Link
              href="/meet"
              className="text-primary text-sm hover:underline"
            >
              See all pairs →
            </Link>
          </div>
          <ul className="grid gap-2 sm:grid-cols-3">
            {POPULAR_PAIRS.map(([aSlug, bSlug]) => {
              const a = getCity(aSlug);
              const b = getCity(bSlug);
              if (!a || !b) return null;
              const slug = pairSlug(a, b);
              return (
                <li key={slug}>
                  <Link
                    href={`/meet/${slug}`}
                    className="bg-card hover:bg-accent block rounded-md border px-3 py-2 text-sm"
                  >
                    {a.name} ↔ {b.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="bg-card flex flex-col gap-2 rounded-lg border p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold">Browse all 50 cities</h2>
            <p className="text-muted-foreground text-sm">
              Single-city guides with offset tables and DST schedules.
            </p>
          </div>
          <Link
            href="/cities"
            className="text-primary text-sm hover:underline"
          >
            See all cities →
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Feature
            title="Mobile-first"
            body="Optimized for the half of remote workers who plan calls on their phone, not at a desk."
          />
          <Feature
            title="DST-aware"
            body="Handled by IANA tz data and luxon — no manual fixes when clocks change in March or November."
          />
          <Feature
            title="50 cities, 1,225 pairs"
            body="Every two-city combination has its own page with overlap, suggested times, and culture notes."
          />
        </section>
      </main>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  );
}
