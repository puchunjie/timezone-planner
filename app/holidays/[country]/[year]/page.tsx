import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { countries, getCountry } from "@/data/countries";
import { getHolidays } from "@/lib/holidays";
import { BreadcrumbJsonLd } from "@/components/json-ld";

interface PageProps {
  params: Promise<{ country: string; year: string }>;
}

const YEARS = [2025, 2026, 2027];

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { country: string; year: string }[] = [];
  for (const c of countries) {
    for (const y of YEARS) {
      params.push({ country: c.code.toLowerCase(), year: String(y) });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country: code, year: yearStr } = await params;
  const country = getCountry(code);
  const year = Number.parseInt(yearStr, 10);
  if (!country || !YEARS.includes(year)) return {};
  const title = `${country.name} Public Holidays ${year}`;
  const description = `Complete list of public holidays in ${country.name} for ${year}. Dates, weekdays, and long-weekend clusters for distributed-team planning.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/holidays/${country.code.toLowerCase()}/${year}`,
    },
    openGraph: { title, description, type: "article" },
  };
}

export default async function CountryYearHolidaysPage({ params }: PageProps) {
  const { country: code, year: yearStr } = await params;
  const country = getCountry(code);
  const year = Number.parseInt(yearStr, 10);
  if (!country || !YEARS.includes(year)) notFound();

  const holidays = getHolidays(country.code, year);
  const byQuarter: Record<string, typeof holidays> = {
    Q1: [],
    Q2: [],
    Q3: [],
    Q4: [],
  };
  for (const h of holidays) {
    const m = DateTime.fromISO(h.isoDate).month;
    const quarter = m <= 3 ? "Q1" : m <= 6 ? "Q2" : m <= 9 ? "Q3" : "Q4";
    byQuarter[quarter]!.push(h);
  }

  const longWeekends = holidays.filter(
    (h) => h.weekday === "Friday" || h.weekday === "Monday",
  );

  return (
    <div className="bg-background min-h-dvh font-sans">
      <BreadcrumbJsonLd
        id={`ld-bc-holidays-${country.code}-${year}`}
        items={[
          { name: "Home", url: "/" },
          { name: "Holidays", url: "/holidays" },
          {
            name: country.name,
            url: `/holidays/${country.code.toLowerCase()}`,
          },
          {
            name: String(year),
            url: `/holidays/${country.code.toLowerCase()}/${year}`,
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
          </Link>{" "}
          /{" "}
          <Link
            href={`/holidays/${country.code.toLowerCase()}`}
            className="hover:underline"
          >
            {country.name}
          </Link>
        </nav>

        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {country.name} Public Holidays {year}
          </h1>
          <p className="text-muted-foreground mt-1">
            {holidays.length} public holidays in {year}.
            {longWeekends.length > 0 &&
              ` ${longWeekends.length} land on a Friday or Monday, creating long-weekend opportunities.`}
          </p>
        </header>

        <div className="flex flex-wrap gap-2 text-sm">
          {YEARS.map((y) => (
            <Link
              key={y}
              href={`/holidays/${country.code.toLowerCase()}/${y}`}
              className={`rounded-md border px-3 py-1 ${
                y === year
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-accent"
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {(["Q1", "Q2", "Q3", "Q4"] as const).map((q) => {
          const list = byQuarter[q]!;
          if (list.length === 0) return null;
          return (
            <section key={q}>
              <h2 className="mb-3 text-xl font-semibold">{q}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-muted-foreground text-left">
                    <tr className="border-b">
                      <th className="py-2">Date</th>
                      <th className="py-2">Day</th>
                      <th className="py-2">Holiday</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((h) => {
                      const dt = DateTime.fromISO(h.isoDate);
                      const isLong =
                        h.weekday === "Friday" || h.weekday === "Monday";
                      return (
                        <tr
                          key={`${h.isoDate}-${h.name}`}
                          className="border-b last:border-b-0"
                        >
                          <td className="py-2 font-mono">
                            {dt.toFormat("LLL d")}
                          </td>
                          <td className="py-2">
                            {h.weekday}
                            {isLong && (
                              <span
                                className="text-primary ml-1 text-xs"
                                title="Creates a long weekend"
                              >
                                ◆
                              </span>
                            )}
                          </td>
                          <td className="py-2">{h.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {longWeekends.length > 0 && (
          <section className="bg-card rounded-lg border p-5">
            <h2 className="mb-2 text-base font-semibold">
              Long-weekend opportunities in {year}
            </h2>
            <p className="text-muted-foreground mb-2 text-sm">
              Holidays landing on a Friday or Monday create natural three-day
              breaks. Teams with members in {country.name} may want to
              proactively schedule releases and launches away from these dates.
            </p>
            <ul className="text-sm">
              {longWeekends.map((h) => (
                <li key={`${h.isoDate}-${h.name}`}>
                  <strong>{DateTime.fromISO(h.isoDate).toFormat("LLL d")}</strong>{" "}
                  — {h.name} ({h.weekday})
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
