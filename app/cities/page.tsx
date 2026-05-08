import type { Metadata } from "next";
import Link from "next/link";
import { cities, type City } from "@/data/cities";

export const metadata: Metadata = {
  title: "All Cities",
  description:
    "Browse all 50 supported cities by region. Each page covers timezone, DST, and meeting overlap with major hubs.",
  alternates: { canonical: "/cities" },
};

interface RegionGroup {
  name: string;
  slugs: ReadonlyArray<string>;
}

const REGIONS: RegionGroup[] = [
  {
    name: "North America",
    slugs: [
      "new-york",
      "san-francisco",
      "los-angeles",
      "toronto",
      "vancouver",
      "austin",
      "miami",
      "mexico-city",
    ],
  },
  {
    name: "Europe",
    slugs: [
      "london",
      "berlin",
      "lisbon",
      "barcelona",
      "madrid",
      "amsterdam",
      "paris",
      "dublin",
      "copenhagen",
      "warsaw",
      "prague",
      "tbilisi",
      "stockholm",
    ],
  },
  {
    name: "Asia",
    slugs: [
      "tokyo",
      "singapore",
      "hong-kong",
      "bangkok",
      "chiang-mai",
      "bali",
      "kuala-lumpur",
      "taipei",
      "seoul",
      "bengaluru",
      "mumbai",
      "dubai",
      "tel-aviv",
      "ho-chi-minh-city",
      "shanghai",
    ],
  },
  { name: "Oceania", slugs: ["sydney", "melbourne", "auckland"] },
  {
    name: "Latin America",
    slugs: [
      "sao-paulo",
      "buenos-aires",
      "medellin",
      "lima",
      "santiago",
      "rio-de-janeiro",
    ],
  },
  { name: "Africa", slugs: ["cape-town", "nairobi", "lagos"] },
  { name: "Middle East", slugs: ["istanbul", "cairo"] },
];

function findCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export default function CitiesIndex() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            All Cities
          </h1>
          <p className="text-muted-foreground mt-1">
            50 cities across 7 regions. Click a city for its timezone guide,
            offset table, and popular meeting pairs.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          {REGIONS.map((region) => (
            <section key={region.name}>
              <h2 className="mb-2 text-xl font-semibold">{region.name}</h2>
              <ul className="grid gap-1 sm:grid-cols-2">
                {region.slugs.map((slug) => {
                  const city = findCity(slug);
                  if (!city) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/city/${slug}`}
                        className="text-primary hover:underline"
                      >
                        {city.name}
                      </Link>
                      <span className="text-muted-foreground text-sm">
                        {" "}
                        — {city.country}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
