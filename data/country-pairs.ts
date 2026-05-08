import type { City } from "./cities";
import { cities, getCity } from "./cities";
import { countries, getCountry, type Country } from "./countries";

function alphabetic(a: Country, b: Country): [Country, Country] {
  return a.code < b.code ? [a, b] : [b, a];
}

export function countryPairSlug(a: Country, b: Country): string {
  const [first, second] = alphabetic(a, b);
  return `${first.code.toLowerCase()}-and-${second.code.toLowerCase()}`;
}

export interface CountryPair {
  a: Country;
  b: Country;
  slug: string;
}

const POPULAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["US", "GB"],
  ["US", "JP"],
  ["US", "DE"],
  ["US", "IN"],
  ["US", "CN"],
  ["US", "MX"],
  ["US", "CA"],
  ["US", "AU"],
  ["US", "BR"],
  ["US", "KR"],
  ["GB", "DE"],
  ["GB", "FR"],
  ["GB", "IE"],
  ["GB", "IN"],
  ["GB", "AU"],
  ["GB", "JP"],
  ["GB", "SG"],
  ["DE", "FR"],
  ["DE", "PL"],
  ["DE", "NL"],
  ["JP", "KR"],
  ["JP", "SG"],
  ["JP", "CN"],
  ["JP", "TW"],
  ["IN", "SG"],
  ["IN", "AE"],
  ["SG", "AU"],
  ["SG", "HK"],
  ["AU", "NZ"],
  ["BR", "AR"],
  ["CA", "GB"],
  ["FR", "ES"],
  ["NL", "DE"],
  ["PT", "BR"],
];

export function popularCountryPairs(): CountryPair[] {
  const seen = new Set<string>();
  const out: CountryPair[] = [];
  for (const [aCode, bCode] of POPULAR_PAIRS) {
    const a = getCountry(aCode);
    const b = getCountry(bCode);
    if (!a || !b) continue;
    const [first, second] = alphabetic(a, b);
    const slug = countryPairSlug(first, second);
    if (seen.has(slug)) continue;
    seen.add(slug);
    out.push({ a: first, b: second, slug });
  }
  return out;
}

export function parseCountryPairSlug(slug: string): CountryPair | null {
  const parts = slug.split("-and-");
  if (parts.length !== 2) return null;
  const a = getCountry(parts[0]!);
  const b = getCountry(parts[1]!);
  if (!a || !b) return null;
  const [first, second] = alphabetic(a, b);
  if (first.code !== a.code || second.code !== b.code) return null;
  return { a, b, slug: countryPairSlug(first, second) };
}

export function representativeCity(country: Country): City | undefined {
  return getCity(country.representativeCitySlug);
}

export function _cities(): readonly City[] {
  return cities;
}

export function _countries(): readonly Country[] {
  return countries;
}
