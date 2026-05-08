import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { allPairSlugs } from "@/lib/pairs";
import { timezones } from "@/data/timezones";
import { countries } from "@/data/countries";
import { popularCountryPairs } from "@/data/country-pairs";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const STATIC_PATHS: ReadonlyArray<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/meet", changeFrequency: "weekly", priority: 0.9 },
  { path: "/cities", changeFrequency: "weekly", priority: 0.9 },
  { path: "/holidays", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.3 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const s of STATIC_PATHS) {
    entries.push({
      url: `${SITE_URL}${s.path}`,
      lastModified: today,
      changeFrequency: s.changeFrequency,
      priority: s.priority,
    });
  }

  for (const c of cities) {
    entries.push({
      url: `${SITE_URL}/city/${c.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const tz of timezones) {
    entries.push({
      url: `${SITE_URL}/timezone/${tz.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of allPairSlugs()) {
    entries.push({
      url: `${SITE_URL}/meet/${slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const c of countries) {
    entries.push({
      url: `${SITE_URL}/holidays/${c.code.toLowerCase()}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const year of [2025, 2026, 2027]) {
      entries.push({
        url: `${SITE_URL}/holidays/${c.code.toLowerCase()}/${year}`,
        lastModified: today,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const p of popularCountryPairs()) {
    entries.push({
      url: `${SITE_URL}/holidays/comparison/${p.slug}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
