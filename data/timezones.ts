import type { City } from "@/data/cities";
import { cities } from "@/data/cities";

export interface TimezoneInfo {
  slug: string;
  abbreviation: string;
  fullName: string;
  utcOffsetLabel: string;
  observesDST: boolean;
  dstAbbreviation?: string;
  dstOffsetLabel?: string;
  ianaZones: ReadonlyArray<string>;
  description: string;
}

export const timezones: readonly TimezoneInfo[] = [
  {
    slug: "pst",
    abbreviation: "PST",
    fullName: "Pacific Standard Time",
    utcOffsetLabel: "UTC−8",
    observesDST: true,
    dstAbbreviation: "PDT",
    dstOffsetLabel: "UTC−7",
    ianaZones: ["America/Los_Angeles", "America/Vancouver"],
    description:
      "Pacific Standard Time covers the US and Canadian west coast. From the second Sunday of March to the first Sunday of November, the zone observes Pacific Daylight Time (PDT, UTC−7).",
  },
  {
    slug: "est",
    abbreviation: "EST",
    fullName: "Eastern Standard Time",
    utcOffsetLabel: "UTC−5",
    observesDST: true,
    dstAbbreviation: "EDT",
    dstOffsetLabel: "UTC−4",
    ianaZones: ["America/New_York", "America/Toronto"],
    description:
      "Eastern Standard Time anchors the US and Canadian east coast. Most of the zone observes Eastern Daylight Time (EDT, UTC−4) from mid-March to early November.",
  },
  {
    slug: "cst",
    abbreviation: "CST",
    fullName: "Central Standard Time",
    utcOffsetLabel: "UTC−6",
    observesDST: true,
    dstAbbreviation: "CDT",
    dstOffsetLabel: "UTC−5",
    ianaZones: ["America/Chicago"],
    description:
      "Central Standard Time covers the US Midwest and Texas. Note that 'CST' is also used for China Standard Time (UTC+8); always disambiguate when scheduling international meetings.",
  },
  {
    slug: "gmt",
    abbreviation: "GMT",
    fullName: "Greenwich Mean Time",
    utcOffsetLabel: "UTC+0",
    observesDST: true,
    dstAbbreviation: "BST",
    dstOffsetLabel: "UTC+1",
    ianaZones: ["Europe/London", "Europe/Dublin"],
    description:
      "Greenwich Mean Time is the historical baseline for civil time worldwide. The UK and Ireland observe British Summer Time (BST, UTC+1) from late March to late October.",
  },
  {
    slug: "cet",
    abbreviation: "CET",
    fullName: "Central European Time",
    utcOffsetLabel: "UTC+1",
    observesDST: true,
    dstAbbreviation: "CEST",
    dstOffsetLabel: "UTC+2",
    ianaZones: [
      "Europe/Berlin",
      "Europe/Paris",
      "Europe/Madrid",
      "Europe/Amsterdam",
      "Europe/Stockholm",
      "Europe/Warsaw",
      "Europe/Prague",
      "Europe/Copenhagen",
    ],
    description:
      "Central European Time covers most of continental Western Europe. From late March to late October the entire region shifts to Central European Summer Time (CEST, UTC+2).",
  },
  {
    slug: "eet",
    abbreviation: "EET",
    fullName: "Eastern European Time",
    utcOffsetLabel: "UTC+2",
    observesDST: true,
    dstAbbreviation: "EEST",
    dstOffsetLabel: "UTC+3",
    ianaZones: ["Africa/Cairo"],
    description:
      "Eastern European Time covers Greece, Romania, the Baltics, Ukraine, and Egypt (which restored DST in 2023). Most observers shift to EEST (UTC+3) for the summer.",
  },
  {
    slug: "ist",
    abbreviation: "IST",
    fullName: "India Standard Time",
    utcOffsetLabel: "UTC+5:30",
    observesDST: false,
    ianaZones: ["Asia/Kolkata"],
    description:
      "India Standard Time covers all of India year round at UTC+5:30. The same abbreviation 'IST' is also used for Israel Standard Time (UTC+2/+3) and Irish Standard Time (UTC+1) — always disambiguate.",
  },
  {
    slug: "sgt",
    abbreviation: "SGT",
    fullName: "Singapore Time",
    utcOffsetLabel: "UTC+8",
    observesDST: false,
    ianaZones: ["Asia/Singapore", "Asia/Kuala_Lumpur"],
    description:
      "Singapore Time runs at UTC+8 year-round and is shared with Malaysia, Hong Kong, Taiwan, the Philippines, mainland China, and Bali (Indonesia Central).",
  },
  {
    slug: "jst",
    abbreviation: "JST",
    fullName: "Japan Standard Time",
    utcOffsetLabel: "UTC+9",
    observesDST: false,
    ianaZones: ["Asia/Tokyo"],
    description:
      "Japan Standard Time covers all of Japan at UTC+9 year-round. Korea Standard Time (KST) shares the same offset.",
  },
  {
    slug: "kst",
    abbreviation: "KST",
    fullName: "Korea Standard Time",
    utcOffsetLabel: "UTC+9",
    observesDST: false,
    ianaZones: ["Asia/Seoul"],
    description:
      "Korea Standard Time covers all of South Korea at UTC+9 year-round. Same offset as JST.",
  },
  {
    slug: "aest",
    abbreviation: "AEST",
    fullName: "Australian Eastern Standard Time",
    utcOffsetLabel: "UTC+10",
    observesDST: true,
    dstAbbreviation: "AEDT",
    dstOffsetLabel: "UTC+11",
    ianaZones: ["Australia/Sydney", "Australia/Melbourne"],
    description:
      "Australian Eastern Standard Time covers New South Wales, Victoria, the ACT, and Tasmania. The zone observes Australian Eastern Daylight Time (AEDT, UTC+11) from October to April.",
  },
  {
    slug: "nzst",
    abbreviation: "NZST",
    fullName: "New Zealand Standard Time",
    utcOffsetLabel: "UTC+12",
    observesDST: true,
    dstAbbreviation: "NZDT",
    dstOffsetLabel: "UTC+13",
    ianaZones: ["Pacific/Auckland"],
    description:
      "New Zealand Standard Time covers all of mainland New Zealand. The country observes NZDT (UTC+13) from late September to early April.",
  },
  {
    slug: "gst",
    abbreviation: "GST",
    fullName: "Gulf Standard Time",
    utcOffsetLabel: "UTC+4",
    observesDST: false,
    ianaZones: ["Asia/Dubai"],
    description:
      "Gulf Standard Time covers the UAE and Oman year-round at UTC+4. No daylight saving observed.",
  },
];

export function getTimezoneInfo(slug: string): TimezoneInfo | undefined {
  return timezones.find((t) => t.slug === slug.toLowerCase());
}

export function citiesInZone(info: TimezoneInfo): City[] {
  return cities.filter((c) => info.ianaZones.includes(c.timezone));
}
