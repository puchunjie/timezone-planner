import { cities, type City } from "./cities";

export interface Country {
  code: string;
  name: string;
  region:
    | "North America"
    | "Europe"
    | "Asia"
    | "Oceania"
    | "Latin America"
    | "Africa"
    | "Middle East";
  representativeCitySlug: string;
  cities: ReadonlyArray<string>;
}

const REGION_BY_CODE: Record<string, Country["region"]> = {
  US: "North America",
  CA: "North America",
  MX: "North America",
  GB: "Europe",
  DE: "Europe",
  PT: "Europe",
  ES: "Europe",
  NL: "Europe",
  FR: "Europe",
  IE: "Europe",
  DK: "Europe",
  PL: "Europe",
  CZ: "Europe",
  GE: "Europe",
  SE: "Europe",
  JP: "Asia",
  SG: "Asia",
  HK: "Asia",
  TH: "Asia",
  ID: "Asia",
  MY: "Asia",
  TW: "Asia",
  KR: "Asia",
  IN: "Asia",
  CN: "Asia",
  VN: "Asia",
  AE: "Middle East",
  IL: "Middle East",
  AU: "Oceania",
  NZ: "Oceania",
  BR: "Latin America",
  AR: "Latin America",
  CO: "Latin America",
  PE: "Latin America",
  CL: "Latin America",
  ZA: "Africa",
  KE: "Africa",
  NG: "Africa",
  TR: "Middle East",
  EG: "Middle East",
};

function buildCountries(): Country[] {
  const map = new Map<string, { name: string; cities: City[] }>();
  for (const city of cities) {
    const existing = map.get(city.countryCode);
    if (existing) {
      existing.cities.push(city);
    } else {
      map.set(city.countryCode, { name: city.country, cities: [city] });
    }
  }
  const result: Country[] = [];
  for (const [code, info] of map) {
    const region = REGION_BY_CODE[code];
    if (!region) {
      throw new Error(`Missing region mapping for country code: ${code}`);
    }
    const biggest = [...info.cities].sort(
      (a, b) => b.population - a.population,
    )[0]!;
    result.push({
      code,
      name: info.name,
      region,
      representativeCitySlug: biggest.slug,
      cities: info.cities.map((c) => c.slug),
    });
  }
  result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

export const countries: readonly Country[] = buildCountries();

export function getCountry(code: string): Country | undefined {
  const upper = code.toUpperCase();
  return countries.find((c) => c.code === upper);
}

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.code.toLowerCase() === slug.toLowerCase());
}
