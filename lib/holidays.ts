import Holidays from "date-holidays";
import { DateTime } from "luxon";

export interface HolidayEntry {
  name: string;
  date: string;
  type: "public" | "bank" | "school" | "optional" | "observance";
  rule?: string;
  weekday: string;
  isoDate: string;
}

export interface HolidayTypeFilter {
  includePublic?: boolean;
  includeBank?: boolean;
  includeObservance?: boolean;
}

const DEFAULT_FILTER: HolidayTypeFilter = {
  includePublic: true,
  includeBank: false,
  includeObservance: false,
};

const instanceCache = new Map<string, Holidays>();

function getInstance(countryCode: string): Holidays {
  const upper = countryCode.toUpperCase();
  const cached = instanceCache.get(upper);
  if (cached) return cached;
  const instance = new Holidays(upper, { languages: ["en"] });
  instanceCache.set(upper, instance);
  return instance;
}

function normalize(
  raw: ReturnType<Holidays["getHolidays"]>,
  filter: HolidayTypeFilter,
): HolidayEntry[] {
  return raw
    .filter((h) => {
      if (h.type === "public" && filter.includePublic) return true;
      if (h.type === "bank" && filter.includeBank) return true;
      if (h.type === "observance" && filter.includeObservance) return true;
      return false;
    })
    .map((h) => {
      const dt = DateTime.fromJSDate(new Date(h.date));
      return {
        name: h.name,
        date: h.date,
        type: h.type as HolidayEntry["type"],
        rule: h.rule,
        weekday: dt.isValid ? dt.toFormat("cccc") : "",
        isoDate: dt.isValid ? dt.toFormat("yyyy-MM-dd") : h.date.slice(0, 10),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getHolidays(
  countryCode: string,
  year: number,
  filter: HolidayTypeFilter = DEFAULT_FILTER,
): HolidayEntry[] {
  const instance = getInstance(countryCode);
  const raw = instance.getHolidays(year);
  return normalize(raw, filter);
}

export function getUpcomingHolidays(
  countryCode: string,
  fromDate: Date = new Date(),
  count = 5,
  filter: HolidayTypeFilter = DEFAULT_FILTER,
): HolidayEntry[] {
  const year = fromDate.getUTCFullYear();
  const thisYear = getHolidays(countryCode, year, filter);
  const nextYear = getHolidays(countryCode, year + 1, filter);
  const cutoff = fromDate.getTime();
  const futureAll = [...thisYear, ...nextYear].filter(
    (h) => new Date(h.isoDate).getTime() >= cutoff,
  );
  return futureAll.slice(0, count);
}

export function isHoliday(
  countryCode: string,
  date: Date,
  filter: HolidayTypeFilter = DEFAULT_FILTER,
): HolidayEntry | null {
  const list = getHolidays(countryCode, date.getUTCFullYear(), filter);
  const iso = DateTime.fromJSDate(date, { zone: "utc" }).toFormat("yyyy-MM-dd");
  return list.find((h) => h.isoDate === iso) ?? null;
}

export interface SharedHoliday {
  date: string;
  nameA: string;
  nameB: string;
}

export function findSharedHolidays(
  countryA: string,
  countryB: string,
  year: number,
): SharedHoliday[] {
  const a = getHolidays(countryA, year);
  const b = getHolidays(countryB, year);
  const bByDate = new Map(b.map((h) => [h.isoDate, h.name]));
  const shared: SharedHoliday[] = [];
  for (const h of a) {
    const match = bByDate.get(h.isoDate);
    if (match) {
      shared.push({ date: h.isoDate, nameA: h.name, nameB: match });
    }
  }
  return shared;
}
