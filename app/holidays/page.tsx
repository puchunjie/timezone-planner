import type { Metadata } from "next";
import Link from "next/link";
import { DateTime } from "luxon";
import { countries, type Country } from "@/data/countries";
import { getUpcomingHolidays } from "@/lib/holidays";

export const metadata: Metadata = {
  title: "World Public Holidays for Remote Teams",
  description:
    "Public holiday calendars for the 40 most common remote-work countries. Plan meetings, release windows, and on-call rotations without missing a holiday.",
  alternates: { canonical: "/holidays" },
};

const CURRENT_YEAR = 2026;

export default function HolidaysIndex() {
  const grouped = new Map<string, Country[]>();
  for (const c of countries) {
    const bucket = grouped.get(c.region) ?? [];
    bucket.push(c);
    grouped.set(c.region, bucket);
  }

  const now = new Date();
  const upcomingByCountry = countries
    .map((c) => {
      const next = getUpcomingHolidays(c.code, now, 1)[0];
      if (!next) return null;
      return { country: c, holiday: next };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.holiday.isoDate.localeCompare(b.holiday.isoDate))
    .slice(0, 12);

  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-10 sm:py-16">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            World Public Holidays
          </h1>
          <p className="text-muted-foreground mt-1">
            Public holiday calendars for {countries.length} countries commonly
            represented on distributed teams. Plan meetings, release windows,
            and on-call rotations without missing a national day off.
          </p>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Upcoming worldwide</h2>
          <ul className="bg-card divide-y rounded-lg border">
            {upcomingByCountry.map(({ country, holiday }) => {
              const dt = DateTime.fromISO(holiday.isoDate);
              return (
                <li key={country.code} className="flex gap-4 px-4 py-2">
                  <span className="text-muted-foreground w-28 font-mono text-sm">
                    {dt.toFormat("LLL d")}
                  </span>
                  <Link
                    href={`/holidays/${country.code.toLowerCase()}`}
                    className="text-primary flex-1 hover:underline"
                  >
                    {country.name}
                  </Link>
                  <span className="text-muted-foreground text-sm">
                    {holiday.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        {[...grouped.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([region, list]) => (
            <section key={region}>
              <h2 className="mb-3 text-xl font-semibold">{region}</h2>
              <ul className="grid gap-1 sm:grid-cols-2">
                {list.map((c) => (
                  <li key={c.code}>
                    <Link
                      href={`/holidays/${c.code.toLowerCase()}`}
                      className="text-primary hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

        <section className="bg-card flex flex-col gap-2 rounded-lg border p-5">
          <h2 className="text-base font-semibold">Browse by year</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            {[CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1].map((y) => (
              <Link
                key={y}
                href={`/holidays/${countries[0]?.code.toLowerCase() ?? "us"}/${y}`}
                className="bg-background hover:bg-accent rounded-md border px-3 py-1"
              >
                {y}
              </Link>
            ))}
          </div>
          <p className="text-muted-foreground text-xs">
            Tip: pick a country page first, then switch years from there.
          </p>
        </section>
      </main>
    </div>
  );
}
