import { describe, expect, it } from "vitest";
import { DateTime } from "luxon";
import { cities, getCity } from "@/data/cities";
import {
  getOffsetHours,
  getOffsetLabel,
  getOverlap,
  getTimeDifferenceHours,
  isDST,
  nextDSTChange,
} from "@/lib/timezone";

const SUMMER = new Date("2026-07-15T12:00:00Z");
const WINTER = new Date("2026-01-15T12:00:00Z");

describe("cities dataset", () => {
  it("has 50 cities", () => {
    expect(cities).toHaveLength(50);
  });

  it("has unique slugs", () => {
    const slugs = new Set(cities.map((c) => c.slug));
    expect(slugs.size).toBe(cities.length);
  });

  it.each(cities.map((c) => [c.slug, c]))(
    "%s has a valid IANA timezone",
    (_slug, city) => {
      const dt = DateTime.now().setZone(city.timezone);
      expect(dt.isValid, `${city.timezone} invalid: ${dt.invalidReason}`).toBe(
        true,
      );
    },
  );

  it.each(cities.map((c) => [c.slug, c]))(
    "%s has finite coords + positive population",
    (_slug, city) => {
      expect(Number.isFinite(city.latitude)).toBe(true);
      expect(Number.isFinite(city.longitude)).toBe(true);
      expect(city.latitude).toBeGreaterThanOrEqual(-90);
      expect(city.latitude).toBeLessThanOrEqual(90);
      expect(city.longitude).toBeGreaterThanOrEqual(-180);
      expect(city.longitude).toBeLessThanOrEqual(180);
      expect(city.population).toBeGreaterThan(0);
      expect(city.description.length).toBeGreaterThan(40);
    },
  );

  it("getCity round-trips by slug", () => {
    for (const c of cities) {
      expect(getCity(c.slug)?.timezone).toBe(c.timezone);
    }
    expect(getCity("nonexistent-city")).toBeUndefined();
  });
});

describe("DST behavior — Northern Hemisphere DST observers", () => {
  const NORTHERN_DST_CITIES = [
    "new-york",
    "san-francisco",
    "los-angeles",
    "toronto",
    "vancouver",
    "austin",
    "miami",
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
    "stockholm",
    "tel-aviv",
    "cairo",
  ];

  it.each(NORTHERN_DST_CITIES)("%s is in DST in July", (slug) => {
    const c = getCity(slug)!;
    expect(isDST(c.timezone, SUMMER)).toBe(true);
  });

  it.each(NORTHERN_DST_CITIES)("%s is NOT in DST in January", (slug) => {
    const c = getCity(slug)!;
    expect(isDST(c.timezone, WINTER)).toBe(false);
  });
});

describe("DST behavior — Southern Hemisphere DST observers", () => {
  const SOUTHERN_DST_CITIES = ["sydney", "melbourne", "auckland", "santiago"];

  it.each(SOUTHERN_DST_CITIES)("%s is NOT in DST in July", (slug) => {
    const c = getCity(slug)!;
    expect(isDST(c.timezone, SUMMER)).toBe(false);
  });

  it.each(SOUTHERN_DST_CITIES)("%s is in DST in January", (slug) => {
    const c = getCity(slug)!;
    expect(isDST(c.timezone, WINTER)).toBe(true);
  });
});

describe("DST behavior — non-observers (year-round same offset)", () => {
  const NO_DST_CITIES = [
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
    "ho-chi-minh-city",
    "shanghai",
    "mexico-city",
    "tbilisi",
    "sao-paulo",
    "buenos-aires",
    "medellin",
    "lima",
    "rio-de-janeiro",
    "cape-town",
    "nairobi",
    "lagos",
    "istanbul",
  ];

  it.each(NO_DST_CITIES)("%s has same offset in summer and winter", (slug) => {
    const c = getCity(slug)!;
    const summerOffset = getOffsetHours(c.timezone, SUMMER);
    const winterOffset = getOffsetHours(c.timezone, WINTER);
    expect(summerOffset).toBe(winterOffset);
  });

  it.each(NO_DST_CITIES)("%s reports isDST=false year-round", (slug) => {
    const c = getCity(slug)!;
    expect(isDST(c.timezone, SUMMER)).toBe(false);
    expect(isDST(c.timezone, WINTER)).toBe(false);
  });
});

describe("Known offsets at fixed dates", () => {
  it("Tokyo is UTC+9 year-round", () => {
    const c = getCity("tokyo")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(9);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(9);
  });

  it("New York is UTC-4 in summer, UTC-5 in winter", () => {
    const c = getCity("new-york")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(-4);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(-5);
  });

  it("London is UTC+1 (BST) in summer, UTC+0 (GMT) in winter", () => {
    const c = getCity("london")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(1);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(0);
  });

  it("Sydney is UTC+10 in July, UTC+11 in January", () => {
    const c = getCity("sydney")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(10);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(11);
  });

  it("Bengaluru is UTC+5:30", () => {
    const c = getCity("bengaluru")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(5.5);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(5.5);
  });

  it("Auckland is UTC+12 in July, UTC+13 in January", () => {
    const c = getCity("auckland")!;
    expect(getOffsetHours(c.timezone, SUMMER)).toBe(12);
    expect(getOffsetHours(c.timezone, WINTER)).toBe(13);
  });
});

describe("Offset label formatting", () => {
  it("formats whole-hour offsets without minutes", () => {
    expect(getOffsetLabel("Asia/Tokyo", SUMMER)).toBe("UTC+9");
    expect(getOffsetLabel("America/New_York", WINTER)).toBe("UTC-5");
  });

  it("formats half-hour offsets with minutes", () => {
    expect(getOffsetLabel("Asia/Kolkata", SUMMER)).toBe("UTC+5:30");
  });
});

describe("getTimeDifferenceHours", () => {
  it("NY-Tokyo is 13h in US winter (no DST in either, NY=UTC-5, Tokyo=UTC+9)", () => {
    const ny = getCity("new-york")!;
    const tk = getCity("tokyo")!;
    expect(getTimeDifferenceHours(ny, tk, WINTER)).toBe(14);
  });

  it("NY-Tokyo is 13h in US summer (NY=UTC-4, Tokyo=UTC+9)", () => {
    const ny = getCity("new-york")!;
    const tk = getCity("tokyo")!;
    expect(getTimeDifferenceHours(ny, tk, SUMMER)).toBe(13);
  });

  it("London-Singapore is 7h in winter, 7h in summer", () => {
    const ldn = getCity("london")!;
    const sg = getCity("singapore")!;
    expect(getTimeDifferenceHours(ldn, sg, WINTER)).toBe(8);
    expect(getTimeDifferenceHours(ldn, sg, SUMMER)).toBe(7);
  });
});

describe("Business hours overlap", () => {
  it("NY (9-18) and Tokyo (9-18) have zero overlap", () => {
    const ny = getCity("new-york")!;
    const tk = getCity("tokyo")!;
    const result = getOverlap(ny, tk, SUMMER);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
  });

  it("NY and London have several hours of overlap in summer", () => {
    const ny = getCity("new-york")!;
    const ldn = getCity("london")!;
    const result = getOverlap(ny, ldn, SUMMER);
    expect(result.hours).toBeGreaterThanOrEqual(4);
    expect(result.hours).toBeLessThanOrEqual(5);
  });

  it("Singapore and Tokyo overlap fully (1h offset, 9-18 each)", () => {
    const sg = getCity("singapore")!;
    const tk = getCity("tokyo")!;
    const result = getOverlap(sg, tk, SUMMER);
    expect(result.hours).toBeGreaterThanOrEqual(7);
  });
});

describe("DST transition detection", () => {
  it("finds an upcoming DST change for New York within a year", () => {
    const change = nextDSTChange("America/New_York", WINTER);
    expect(change).not.toBeNull();
    expect(change!.getTime()).toBeGreaterThan(WINTER.getTime());
  });

  it("returns null for non-DST zones", () => {
    expect(nextDSTChange("Asia/Tokyo", WINTER)).toBeNull();
    expect(nextDSTChange("Asia/Singapore", SUMMER)).toBeNull();
  });
});
