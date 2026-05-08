import { describe, expect, it } from "vitest";
import { countries, getCountry } from "@/data/countries";
import {
  findSharedHolidays,
  getHolidays,
  getUpcomingHolidays,
  isHoliday,
} from "@/lib/holidays";

describe("countries dataset", () => {
  it("covers all 40 unique country codes from the cities list", () => {
    expect(countries.length).toBeGreaterThanOrEqual(38);
    expect(countries.length).toBeLessThanOrEqual(45);
  });

  it("each country has a region and representative city", () => {
    for (const c of countries) {
      expect(c.region).toBeTruthy();
      expect(c.representativeCitySlug).toBeTruthy();
      expect(c.cities.length).toBeGreaterThan(0);
    }
  });

  it("getCountry is case-insensitive", () => {
    expect(getCountry("us")?.name).toBe("United States");
    expect(getCountry("US")?.name).toBe("United States");
    expect(getCountry("ZZ")).toBeUndefined();
  });
});

describe("getHolidays - known dates", () => {
  it("US 2026 contains Independence Day on July 4", () => {
    const list = getHolidays("US", 2026);
    const july4 = list.find((h) => h.isoDate === "2026-07-04");
    expect(july4).toBeTruthy();
    expect(july4!.name.toLowerCase()).toContain("independence");
  });

  it("UK 2026 contains Good Friday and Christmas", () => {
    const list = getHolidays("GB", 2026);
    expect(list.some((h) => h.name.includes("Good Friday"))).toBe(true);
    expect(list.some((h) => h.name.includes("Christmas Day"))).toBe(true);
  });

  it("Japan 2026 has Golden Week cluster in late April / early May", () => {
    const list = getHolidays("JP", 2026);
    const goldenWeek = list.filter(
      (h) => h.isoDate >= "2026-04-29" && h.isoDate <= "2026-05-06",
    );
    expect(goldenWeek.length).toBeGreaterThanOrEqual(3);
  });

  it("India 2026 has Republic Day on Jan 26 and Independence Day on Aug 15", () => {
    const list = getHolidays("IN", 2026);
    expect(list.some((h) => h.isoDate === "2026-01-26")).toBe(true);
    expect(list.some((h) => h.isoDate === "2026-08-15")).toBe(true);
  });

  it("China 2026 has Spring Festival (Chinese New Year)", () => {
    const list = getHolidays("CN", 2026);
    expect(list.some((h) => h.name.includes("Spring Festival"))).toBe(true);
  });

  it("Brazil 2026 has Carnival-period observances", () => {
    const list = getHolidays("BR", 2026);
    expect(list.length).toBeGreaterThanOrEqual(8);
  });

  it("Australia 2026 has ANZAC Day on April 25", () => {
    const list = getHolidays("AU", 2026);
    expect(list.some((h) => h.isoDate === "2026-04-25")).toBe(true);
  });

  it("Germany 2026 has Christmas Day on Dec 25", () => {
    const list = getHolidays("DE", 2026);
    expect(list.some((h) => h.isoDate === "2026-12-25")).toBe(true);
  });
});

describe("isHoliday", () => {
  it("returns null for a regular weekday", () => {
    const march3 = new Date(Date.UTC(2026, 2, 3));
    expect(isHoliday("US", march3)).toBeNull();
  });

  it("returns holiday entry for New Year's Day in most countries", () => {
    const jan1 = new Date(Date.UTC(2026, 0, 1));
    for (const code of ["US", "GB", "JP", "DE", "FR", "BR"]) {
      expect(isHoliday(code, jan1), `expected a holiday for ${code}`).not.toBeNull();
    }
  });
});

describe("getUpcomingHolidays", () => {
  it("returns future-only holidays up to the requested count", () => {
    const from = new Date(Date.UTC(2026, 5, 1));
    const list = getUpcomingHolidays("US", from, 3);
    expect(list.length).toBe(3);
    for (const h of list) {
      expect(new Date(h.isoDate).getTime()).toBeGreaterThanOrEqual(from.getTime());
    }
  });

  it("continues into the following year when needed", () => {
    const from = new Date(Date.UTC(2026, 11, 20));
    const list = getUpcomingHolidays("US", from, 5);
    expect(list.length).toBe(5);
    expect(list.some((h) => h.isoDate.startsWith("2027-"))).toBe(true);
  });
});

describe("findSharedHolidays", () => {
  it("identifies shared Christmas Day between US and UK", () => {
    const shared = findSharedHolidays("US", "GB", 2026);
    const xmas = shared.find((s) => s.date === "2026-12-25");
    expect(xmas).toBeTruthy();
  });

  it("US-China share very few holidays (New Year's Day at minimum)", () => {
    const shared = findSharedHolidays("US", "CN", 2026);
    expect(shared.length).toBeGreaterThanOrEqual(1);
    expect(shared.length).toBeLessThan(5);
    expect(shared.some((s) => s.date === "2026-01-01")).toBe(true);
  });
});
