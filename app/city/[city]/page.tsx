import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { cities, getCity } from "@/data/cities";
import { pairSlug } from "@/lib/pairs";
import {
  getOffsetLabel,
  getTimeDifferenceHours,
  isDST,
  nextDSTChange,
} from "@/lib/timezone";
import { BreadcrumbJsonLd, PlaceJsonLd } from "@/components/json-ld";

interface PageProps {
  params: Promise<{ city: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

const REFERENCE_PEERS = [
  "new-york",
  "san-francisco",
  "london",
  "berlin",
  "tokyo",
  "singapore",
  "sydney",
  "dubai",
  "sao-paulo",
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  const offset = getOffsetLabel(city.timezone);
  const title = `${city.name} Time Zone & Remote Work Guide`;
  const description = `Current time, ${offset} offset, business-hour overlap with major cities, DST schedule, and best meeting times for ${city.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/city/${slug}` },
    openGraph: { title, description, url: `/city/${slug}`, type: "article" },
    twitter: { card: "summary", title, description },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const ref = DateTime.utc().startOf("day").plus({ hours: 12 }).toJSDate();
  const offset = getOffsetLabel(city.timezone, ref);
  const inDst = isDST(city.timezone, ref);
  const nextChange = nextDSTChange(city.timezone, ref);

  const peers = REFERENCE_PEERS.map((s) => getCity(s)).filter(
    (c): c is NonNullable<ReturnType<typeof getCity>> =>
      Boolean(c) && c!.slug !== city.slug,
  );

  const pairsForCity = cities
    .filter((c) => c.slug !== city.slug)
    .slice(0, 30)
    .map((peer) => ({
      peer,
      slug: pairSlug(city, peer),
    }));

  return (
    <div className="bg-background min-h-dvh font-sans">
      <PlaceJsonLd
        id={`ld-place-${city.slug}`}
        name={city.name}
        description={city.description}
        latitude={city.latitude}
        longitude={city.longitude}
        country={city.country}
      />
      <BreadcrumbJsonLd
        id={`ld-bc-city-${city.slug}`}
        items={[
          { name: "Home", url: "/" },
          { name: "City", url: "/" },
          { name: city.name, url: `/city/${city.slug}` },
        ]}
      />
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <nav className="text-muted-foreground text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / City
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {city.name} Time Zone &amp; Remote Work Guide
          </h1>
          <p className="text-muted-foreground">
            Timezone: <strong>{city.timezone}</strong> ({offset}). Country:{" "}
            {city.country}. Population: {city.population.toLocaleString()}.
          </p>
        </header>

        <section>
          <h2 className="mb-2 text-xl font-semibold">About {city.name}</h2>
          <p>{city.description}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">DST Schedule</h2>
          {nextChange ? (
            <p>
              {city.name} {inDst ? "is currently" : "is not currently"} in
              daylight saving time. Next clock change:{" "}
              <strong>
                {DateTime.fromJSDate(nextChange)
                  .setZone(city.timezone)
                  .toFormat("LLLL d, yyyy")}
              </strong>
              .
            </p>
          ) : (
            <p>{city.name} does not observe daylight saving time.</p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Time Difference from Major Cities
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-left">
                <tr className="border-b">
                  <th className="py-2">City</th>
                  <th className="py-2">Difference</th>
                  <th className="py-2">Quick link</th>
                </tr>
              </thead>
              <tbody>
                {peers.map((peer) => {
                  const diff = getTimeDifferenceHours(city, peer, ref);
                  const sign = diff > 0 ? "+" : diff < 0 ? "−" : "";
                  return (
                    <tr key={peer.slug} className="border-b last:border-b-0">
                      <td className="py-2">{peer.name}</td>
                      <td className="py-2 font-mono">
                        {diff === 0 ? "same time" : `${sign}${Math.abs(diff)}h`}
                      </td>
                      <td className="py-2">
                        <Link
                          href={`/meet/${pairSlug(city, peer)}`}
                          className="text-primary hover:underline"
                        >
                          Plan a meeting →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold">
            Popular City Pairs with {city.name}
          </h2>
          <ul className="grid gap-1 sm:grid-cols-2">
            {pairsForCity.map(({ peer, slug }) => (
              <li key={slug}>
                <Link
                  href={`/meet/${slug}`}
                  className="text-primary hover:underline"
                >
                  {city.name} and {peer.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {city.isNomadHub && (
          <section className="bg-card rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-semibold">
              Why Remote Workers Choose {city.name}
            </h2>
            <p className="text-muted-foreground text-sm">
              {city.name} is a recognized hub for digital nomads and
              distributed-team employees. Strong infrastructure, an established
              coworking scene, and visa policies friendly to remote workers
              combine to make it a top base in {city.country}.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
