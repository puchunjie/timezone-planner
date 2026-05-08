import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import {
  parseCountryPairSlug,
  popularCountryPairs,
  representativeCity,
} from "@/data/country-pairs";
import { findSharedHolidays, getHolidays } from "@/lib/holidays";
import { pairSlug } from "@/lib/pairs";
import { BreadcrumbJsonLd } from "@/components/json-ld";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;
const CURRENT_YEAR = 2026;

export async function generateStaticParams() {
  return popularCountryPairs().map((p) => ({ pair: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pair: slug } = await params;
  const pair = parseCountryPairSlug(slug);
  if (!pair) return {};
  const { a, b } = pair;
  const title = `${a.name} vs ${b.name} Public Holidays (${CURRENT_YEAR})`;
  const description = `Compare ${CURRENT_YEAR} public holidays between ${a.name} and ${b.name}. Find shared days off, mismatched windows, and scheduling risks for distributed teams.`;
  return {
    title,
    description,
    alternates: { canonical: `/holidays/comparison/${slug}` },
    openGraph: { title, description, type: "article" },
  };
}

export default async function HolidayComparisonPage({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = parseCountryPairSlug(slug);
  if (!pair) notFound();

  const { a, b } = pair;
  const aCity = representativeCity(a);
  const bCity = representativeCity(b);
  const aList = getHolidays(a.code, CURRENT_YEAR);
  const bList = getHolidays(b.code, CURRENT_YEAR);
  const shared = findSharedHolidays(a.code, b.code, CURRENT_YEAR);
  const sharedDates = new Set(shared.map((s) => s.date));
  const aOnly = aList.filter((h) => !sharedDates.has(h.isoDate));
  const bOnly = bList.filter((h) => !sharedDates.has(h.isoDate));

  return (
    <div className="bg-background min-h-dvh font-sans">
      <BreadcrumbJsonLd
        id={`ld-bc-holiday-comp-${slug}`}
        items={[
          { name: "Home", url: "/" },
          { name: "Holidays", url: "/holidays" },
          {
            name: `${a.name} and ${b.name}`,
            url: `/holidays/comparison/${slug}`,
          },
        ]}
      />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <nav className="text-muted-foreground text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/holidays" className="hover:underline">
            Holidays
          </Link>
        </nav>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {a.name} vs {b.name}: Holiday Comparison
          </h1>
          <p className="text-muted-foreground mt-1">
            {CURRENT_YEAR}: {a.name} has {aList.length} public holidays,{" "}
            {b.name} has {bList.length}. {shared.length} dates are shared.
          </p>
          {aCity && bCity && (
            <p className="text-muted-foreground mt-1 text-sm">
              Also see:{" "}
              <Link
                href={`/meet/${pairSlug(aCity, bCity)}`}
                className="text-primary hover:underline"
              >
                meeting-time planner for {aCity.name} and {bCity.name}
              </Link>
            </p>
          )}
        </header>

        <section className="bg-card grid gap-4 rounded-lg border p-5 sm:grid-cols-3">
          <Stat label={`${a.name} holidays`} value={String(aList.length)} />
          <Stat label={`${b.name} holidays`} value={String(bList.length)} />
          <Stat label="Shared" value={String(shared.length)} />
        </section>

        {shared.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Shared holidays ({shared.length})
            </h2>
            <p className="text-muted-foreground mb-2 text-sm">
              Both teams are off on these dates. Safe to schedule around as
              guaranteed downtime.
            </p>
            <ul className="bg-card divide-y rounded-lg border">
              {shared.map((s) => (
                <li key={s.date} className="flex gap-4 px-4 py-2 text-sm">
                  <span className="font-mono">
                    {DateTime.fromISO(s.date).toFormat("LLL d")}
                  </span>
                  <span className="flex-1">
                    <strong>{a.code}:</strong> {s.nameA}
                    <br />
                    <strong>{b.code}:</strong> {s.nameB}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            {a.name} only ({aOnly.length})
          </h2>
          <p className="text-muted-foreground mb-2 text-sm">
            {a.name} team is off, {b.name} team is working. Risk: scheduling a
            meeting on these days means one side is unavailable.
          </p>
          <HolidayMini list={aOnly} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            {b.name} only ({bOnly.length})
          </h2>
          <p className="text-muted-foreground mb-2 text-sm">
            {b.name} team is off, {a.name} team is working.
          </p>
          <HolidayMini list={bOnly} />
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">More pair pages</h2>
          <ul className="grid gap-1 sm:grid-cols-2">
            {popularCountryPairs()
              .filter((p) => p.slug !== slug)
              .slice(0, 10)
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/holidays/comparison/${p.slug}`}
                    className="text-primary hover:underline"
                  >
                    {p.a.name} vs {p.b.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}

function HolidayMini({
  list,
}: {
  list: ReturnType<typeof getHolidays>;
}) {
  if (list.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">None in {CURRENT_YEAR}.</p>
    );
  }
  return (
    <ul className="bg-card divide-y rounded-lg border">
      {list.map((h) => (
        <li
          key={`${h.isoDate}-${h.name}`}
          className="flex gap-4 px-4 py-2 text-sm"
        >
          <span className="text-muted-foreground w-20 font-mono">
            {DateTime.fromISO(h.isoDate).toFormat("LLL d")}
          </span>
          <span className="text-muted-foreground w-24">{h.weekday}</span>
          <span className="flex-1">{h.name}</span>
        </li>
      ))}
    </ul>
  );
}
