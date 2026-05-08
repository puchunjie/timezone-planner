import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import {
  citiesInZone,
  getTimezoneInfo,
  timezones,
} from "@/data/timezones";

interface PageProps {
  params: Promise<{ tz: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return timezones.map((t) => ({ tz: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tz } = await params;
  const info = getTimezoneInfo(tz);
  if (!info) return {};
  const title = `${info.abbreviation} (${info.fullName}) Explained`;
  const description = `${info.fullName} runs at ${info.utcOffsetLabel}${
    info.observesDST
      ? ` and shifts to ${info.dstOffsetLabel} during DST`
      : ""
  }. Cities, DST rules, and common confusion.`;
  return {
    title,
    description,
    alternates: { canonical: `/timezone/${info.slug}` },
    openGraph: { title, description, url: `/timezone/${info.slug}` },
    twitter: { card: "summary", title, description },
  };
}

export default async function TimezonePage({ params }: PageProps) {
  const { tz } = await params;
  const info = getTimezoneInfo(tz);
  if (!info) notFound();

  const zoneCities = citiesInZone(info);
  const sample = info.ianaZones[0]!;
  const nowInZone = DateTime.now().setZone(sample);

  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <nav className="text-muted-foreground text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Timezone
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {info.abbreviation} — {info.fullName}
          </h1>
          <p className="text-muted-foreground">
            {info.utcOffsetLabel}
            {info.observesDST &&
              ` standard / ${info.dstOffsetLabel} (${info.dstAbbreviation}) during DST`}
          </p>
        </header>

        <section className="bg-card grid gap-3 rounded-lg border p-5 sm:grid-cols-2">
          <div>
            <div className="text-muted-foreground text-xs uppercase">
              Sample current time ({sample.split("/").pop()?.replace("_", " ")})
            </div>
            <div className="font-mono text-2xl">
              {nowInZone.toFormat("HH:mm")}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs uppercase">
              Standard offset
            </div>
            <div className="font-mono text-2xl">{info.utcOffsetLabel}</div>
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">About {info.abbreviation}</h2>
          <p>{info.description}</p>
        </section>

        {info.observesDST && (
          <section>
            <h2 className="mb-2 text-xl font-semibold">DST Rules</h2>
            <p>
              {info.fullName} shifts forward one hour to{" "}
              <strong>{info.dstAbbreviation}</strong> ({info.dstOffsetLabel})
              during the warm season. Always check your calendar tool to confirm
              the exact transition date for the current year.
            </p>
          </section>
        )}

        {zoneCities.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              Cities in {info.abbreviation}
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {zoneCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/city/${c.slug}`}
                    className="text-primary hover:underline"
                  >
                    {c.name}, {c.country}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-2 text-xl font-semibold">Common Confusion</h2>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
            <li>
              {info.abbreviation} usually refers to the standard offset; the DST
              variant has a different abbreviation.
            </li>
            <li>
              Some abbreviations are reused in multiple regions (CST, IST, GST).
              Always confirm the IANA timezone identifier.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
