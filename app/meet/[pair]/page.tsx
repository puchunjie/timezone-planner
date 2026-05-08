import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import {
  allPairSlugs,
  parsePairSlug,
  relatedPairs,
  pairSlug,
} from "@/lib/pairs";
import {
  DEFAULT_BUSINESS_HOURS,
  getOffsetLabel,
  getOverlap,
  getTimeDifferenceHours,
} from "@/lib/timezone";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

interface PageProps {
  params: Promise<{ pair: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return allPairSlugs().map((pair) => ({ pair }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { pair: slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) return {};
  const { a, b } = pair;
  const ref = nowReference();
  const diff = Math.abs(getTimeDifferenceHours(a, b, ref));
  const title = `Best Meeting Time Between ${a.name} and ${b.name}`;
  const description = `Plan calls between ${a.name} and ${b.name}. Time difference is ${diff} hours. See business-hour overlap, suggested meeting times, and DST notes.`;
  const url = `/meet/${pair.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

function nowReference(): Date {
  return DateTime.utc().startOf("day").plus({ hours: 12 }).toJSDate();
}

function bestMeetingSuggestions(
  aTimezone: string,
  bTimezone: string,
  reference: Date,
) {
  const dayInA = DateTime.fromJSDate(reference, { zone: aTimezone }).startOf(
    "day",
  );
  const slots: Array<{
    aLabel: string;
    bLabel: string;
    aInHours: boolean;
    bInHours: boolean;
  }> = [];
  for (let hour = 0; hour < 24; hour++) {
    const aTime = dayInA.set({ hour });
    const bTime = aTime.setZone(bTimezone);
    const aIn =
      hour >= DEFAULT_BUSINESS_HOURS.startHour &&
      hour < DEFAULT_BUSINESS_HOURS.endHour;
    const bIn =
      bTime.hour >= DEFAULT_BUSINESS_HOURS.startHour &&
      bTime.hour < DEFAULT_BUSINESS_HOURS.endHour;
    if (!aIn && !bIn) continue;
    slots.push({
      aLabel: aTime.toFormat("HH:mm"),
      bLabel: bTime.toFormat("HH:mm (ccc)"),
      aInHours: aIn,
      bInHours: bIn,
    });
  }
  return slots;
}

export default async function MeetPairPage({ params }: PageProps) {
  const { pair: slug } = await params;
  const pair = parsePairSlug(slug);
  if (!pair) notFound();

  const { a, b } = pair;
  const ref = nowReference();
  const diff = getTimeDifferenceHours(a, b, ref);
  const absDiff = Math.abs(diff);
  const ahead = diff > 0 ? b : a;
  const behind = diff > 0 ? a : b;

  const overlap = getOverlap(a, b, ref);
  const overlapTotal = overlap.hours + overlap.minutes / 60;
  const slots = bestMeetingSuggestions(a.timezone, b.timezone, ref);
  const both = slots.filter((s) => s.aInHours && s.bInHours);
  const aOnly = slots.filter((s) => s.aInHours && !s.bInHours).slice(0, 3);
  const bOnly = slots.filter((s) => !s.aInHours && s.bInHours).slice(0, 3);
  const related = relatedPairs(pair, 6);

  const aOffset = getOffsetLabel(a.timezone, ref);
  const bOffset = getOffsetLabel(b.timezone, ref);

  return (
    <div className="bg-background min-h-dvh font-sans">
      <ArticleJsonLd
        id={`ld-meet-${pair.slug}`}
        headline={`Meeting Time Between ${a.name} and ${b.name}`}
        description={`Time difference is ${absDiff} hours. See business-hour overlap and best meeting times.`}
        url={`/meet/${pair.slug}`}
      />
      <BreadcrumbJsonLd
        id={`ld-bc-meet-${pair.slug}`}
        items={[
          { name: "Home", url: "/" },
          { name: "Meet", url: "/" },
          { name: `${a.name} and ${b.name}`, url: `/meet/${pair.slug}` },
        ]}
      />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <nav className="text-muted-foreground text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Meet
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Meeting Time Between {a.name} and {b.name}
          </h1>
          <p className="text-muted-foreground text-base">
            Time difference: <strong>{absDiff} hours</strong> ({ahead.name} is
            ahead of {behind.name}). {a.name}: {aOffset}. {b.name}: {bOffset}.
          </p>
        </header>

        <section className="bg-card grid gap-4 rounded-lg border p-5 sm:grid-cols-3">
          <Stat label="Time difference" value={`${absDiff}h`} />
          <Stat
            label="Business overlap"
            value={
              overlapTotal === 0
                ? "0h (no overlap)"
                : `${overlap.hours}h ${overlap.minutes}m`
            }
          />
          <Stat
            label="Workable directions"
            value={`${both.length > 0 ? "Both ways" : aOnly.length > 0 ? `${a.name} morning` : `${b.name} morning`}`}
          />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Timezone Overview</h2>
          <p>
            <strong>{a.name}</strong> ({a.country}) operates on {aOffset}.{" "}
            {a.description}
          </p>
          <p>
            <strong>{b.name}</strong> ({b.country}) operates on {bOffset}.{" "}
            {b.description}
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Best Times to Schedule</h2>
          {both.length > 0 ? (
            <div>
              <p className="mb-2">
                Both teams are in standard 9–18 business hours during these
                windows:
              </p>
              <ul className="bg-card divide-y rounded-md border">
                {both.slice(0, 6).map((s) => (
                  <li
                    key={s.aLabel}
                    className="flex justify-between px-4 py-2 text-sm"
                  >
                    <span className="font-mono">
                      {a.name} {s.aLabel}
                    </span>
                    <span className="font-mono">
                      {b.name} {s.bLabel}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>
              {a.name} and {b.name} have no overlapping 9–18 business window. At
              least one side will need to adjust. Suggested options:
            </p>
          )}

          {aOnly.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold">
                {a.name} business hours, {b.name} late or early
              </h3>
              <ul className="text-muted-foreground mt-1 text-sm">
                {aOnly.map((s) => (
                  <li key={s.aLabel}>
                    {a.name} {s.aLabel} → {b.name} {s.bLabel}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bOnly.length > 0 && (
            <div className="mt-2">
              <h3 className="text-sm font-semibold">
                {b.name} business hours, {a.name} late or early
              </h3>
              <ul className="text-muted-foreground mt-1 text-sm">
                {bOnly.map((s) => (
                  <li key={s.aLabel}>
                    {a.name} {s.aLabel} → {b.name} {s.bLabel}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Common Scenarios</h2>
          <p>
            <strong>Weekly standup (30 min):</strong> Pick a slot from the list
            above and rotate which side stays late every other week to share the
            inconvenience.
          </p>
          <p>
            <strong>Client call:</strong> Default to the client&apos;s morning
            so they have the rest of the day to act on whatever you discuss.
          </p>
          <p>
            <strong>Recurring meeting:</strong> Pin the meeting to one
            timezone&apos;s clock to keep it stable through DST transitions.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <details className="bg-card rounded-md border p-4">
            <summary className="cursor-pointer font-medium">
              Does daylight saving change this?
            </summary>
            <p className="text-muted-foreground mt-2 text-sm">
              {a.name} and {b.name} can be either {Math.max(absDiff - 1, 0)} or{" "}
              {absDiff + 1} hours apart at different times of year, depending on
              which side observes DST. The values above are calculated for the
              current date.
            </p>
          </details>
          <details className="bg-card rounded-md border p-4">
            <summary className="cursor-pointer font-medium">
              Can I make a recurring meeting?
            </summary>
            <p className="text-muted-foreground mt-2 text-sm">
              Yes. Use Google Calendar or Outlook to anchor the meeting to one
              timezone, and the other side will see it shift by an hour during
              DST switches.
            </p>
          </details>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Related Pairs</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/meet/${p.slug}`}
                  className="text-primary hover:underline"
                >
                  {p.a.name} and {p.b.name}
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

export { pairSlug };
