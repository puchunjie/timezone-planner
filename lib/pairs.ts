import type { City } from "@/data/cities";
import { cities } from "@/data/cities";

export interface CityPair {
  a: City;
  b: City;
  slug: string;
}

function alphabetic(a: City, b: City): [City, City] {
  return a.slug < b.slug ? [a, b] : [b, a];
}

export function pairSlug(a: City, b: City): string {
  const [first, second] = alphabetic(a, b);
  return `${first.slug}-and-${second.slug}`;
}

export function allPairSlugs(): string[] {
  const slugs: string[] = [];
  for (let i = 0; i < cities.length; i++) {
    for (let j = i + 1; j < cities.length; j++) {
      slugs.push(pairSlug(cities[i]!, cities[j]!));
    }
  }
  return slugs;
}

export function parsePairSlug(slug: string): CityPair | null {
  const sep = "-and-";
  for (let i = 0; i < cities.length; i++) {
    const a = cities[i]!;
    if (!slug.startsWith(`${a.slug}${sep}`)) continue;
    const rest = slug.slice(a.slug.length + sep.length);
    const b = cities.find((c) => c.slug === rest);
    if (!b) continue;
    if (a.slug >= b.slug) return null;
    return { a, b, slug: pairSlug(a, b) };
  }
  return null;
}

export function relatedPairs(pair: CityPair, limit = 6): CityPair[] {
  const seen = new Set<string>([pair.slug]);
  const candidates: CityPair[] = [];
  for (const peer of cities) {
    if (peer.slug === pair.a.slug || peer.slug === pair.b.slug) continue;
    for (const anchor of [pair.a, pair.b]) {
      const [a, b] = alphabetic(anchor, peer);
      const slug = pairSlug(a, b);
      if (seen.has(slug)) continue;
      seen.add(slug);
      candidates.push({ a, b, slug });
      if (candidates.length >= limit) return candidates;
    }
  }
  return candidates;
}
