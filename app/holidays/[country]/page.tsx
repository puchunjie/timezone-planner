import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { countries, getCountry } from "@/data/countries";
import { getCity } from "@/data/cities";
import { getHolidays } from "@/lib/holidays";
import { BreadcrumbJsonLd } from "@/components/json-ld";

interface PageProps {
  params: Promise<{ country: string }>;
}

export const dynamicParams = false;
const CURRENT_YEAR = 2026;
const AVAILABLE_YEARS = [CURRENT_YEAR - 1, CURRENT_YEAR, CURRENT_YEAR + 1];

export async function generateStaticParams() {
  return countries.map((c) => ({ country: c.code.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country: code } = await params;
  const country = getCountry(code);
  if (!country) return {};
  const title = `Public Holidays in ${country.name} (${CURRENT_YEAR})`;
  const description = `Every public holiday in ${country.name} for ${CURRENT_YEAR}, with dates and weekday. Plan distributed-team schedules and avoid booking calls on national days off.`;
  return {
    title,
    description,
    alternates: { canonical: `/holidays/${country.code.toLowerCase()}` },
    openGraph: { title, description, type: "article" },
  };
}

export default async function CountryHolidaysPage({ params }: PageProps) {
  const { country: code } = await params;
  const country = getCountry(code);
  if (!country) notFound();

  const thisYear = getHolidays(country.code, CURRENT_YEAR);
  const nextYear = getHolidays(country.code, CURRENT_YEAR + 1);
  const representative = getCity(country.representativeCitySlug);

  return (
    <div className="bg-background min-h-dvh font-sans">
      <BreadcrumbJsonLd
        id={`ld-bc-holidays-${country.code}`}
        items={[
          { name: "Home", url: "/" },
          { name: "Holidays", url: "/holidays" },
          {
            name: country.name,
            url: `/holidays/${country.code.toLowerCase()}`,
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
            Public Holidays in {country.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {thisYear.length} public holidays in {CURRENT_YEAR}.{" "}
            {representative && (
              <>
                Representative city:{" "}
                <Link
                  href={`/city/${representative.slug}`}
                  className="text-primary hover:underline"
                >
                  {representative.name}
                </Link>
                .
              </>
            )}
          </p>
        </header>

        <section>
          <h2 className="mb-3 text-xl font-semibold">{CURRENT_YEAR}</h2>
          <HolidayTable holidays={thisYear} />
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {AVAILABLE_YEARS.map((y) => (
              <Link
                key={y}
                href={`/holidays/${country.code.toLowerCase()}/${y}`}
                className={`rounded-md border px-3 py-1 ${
                  y === CURRENT_YEAR
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent"
                }`}
              >
                {y}
              </Link>
            ))}
          </div>
        </section>

        {nextYear.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Early preview — {CURRENT_YEAR + 1}
            </h2>
            <HolidayTable holidays={nextYear.slice(0, 6)} />
            <Link
              href={`/holidays/${country.code.toLowerCase()}/${CURRENT_YEAR + 1}`}
              className="text-primary mt-2 inline-block text-sm hover:underline"
            >
              See all {CURRENT_YEAR + 1} holidays →
            </Link>
          </section>
        )}

        <section className="bg-card rounded-lg border p-5">
          <h2 className="mb-2 text-base font-semibold">
            Notes for distributed teams
          </h2>
          <p className="text-muted-foreground text-sm">
            Only national-level public holidays are shown. Regional, religious,
            or observance-only days may apply locally even if they aren&apos;t
            on this list. When scheduling critical cross-team work, verify with
            local teammates rather than relying on any single calendar source.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">Browse other countries</h2>
          <ul className="grid gap-1 sm:grid-cols-3">
            {countries
              .filter((c) => c.code !== country.code)
              .slice(0, 18)
              .map((c) => (
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
      </main>
    </div>
  );
}

function HolidayTable({
  holidays,
}: {
  holidays: ReturnType<typeof getHolidays>;
}) {
  if (holidays.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        No public holidays on record for this period.
      </p>
    );
  }
  return (
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
          {holidays.map((h) => {
            const dt = DateTime.fromISO(h.isoDate);
            return (
              <tr key={`${h.isoDate}-${h.name}`} className="border-b last:border-b-0">
                <td className="py-2 font-mono">{dt.toFormat("LLL d")}</td>
                <td className="py-2">{h.weekday}</td>
                <td className="py-2">{h.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
