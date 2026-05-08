import { DateTime, Interval } from "luxon";
import type { City } from "@/data/cities";

const MS_PER_HOUR = 60 * 60 * 1000;
const MINUTES_PER_HOUR = 60;

export interface BusinessHours {
  startHour: number;
  endHour: number;
}

export const DEFAULT_BUSINESS_HOURS: BusinessHours = {
  startHour: 9,
  endHour: 18,
};

export interface OverlapResult {
  hours: number;
  minutes: number;
  intervalsInA: ReadonlyArray<{ startHour: number; endHour: number }>;
}

export function getOffsetMinutes(timezone: string, at: Date = new Date()): number {
  const dt = DateTime.fromJSDate(at, { zone: timezone });
  return dt.offset;
}

export function getOffsetHours(timezone: string, at: Date = new Date()): number {
  return getOffsetMinutes(timezone, at) / MINUTES_PER_HOUR;
}

export function getOffsetLabel(timezone: string, at: Date = new Date()): string {
  const minutes = getOffsetMinutes(timezone, at);
  const sign = minutes >= 0 ? "+" : "-";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / MINUTES_PER_HOUR);
  const mins = abs % MINUTES_PER_HOUR;
  if (mins === 0) {
    return `UTC${sign}${hours}`;
  }
  return `UTC${sign}${hours}:${mins.toString().padStart(2, "0")}`;
}

export function getTimezoneAbbreviation(
  timezone: string,
  at: Date = new Date(),
): string {
  const dt = DateTime.fromJSDate(at, { zone: timezone });
  return dt.toFormat("ZZZZ");
}

export function getTimeDifferenceHours(
  a: Pick<City, "timezone">,
  b: Pick<City, "timezone">,
  at: Date = new Date(),
): number {
  return getOffsetHours(b.timezone, at) - getOffsetHours(a.timezone, at);
}

export function isDST(timezone: string, at: Date = new Date()): boolean {
  return DateTime.fromJSDate(at, { zone: timezone }).isInDST;
}

export function nextDSTChange(
  timezone: string,
  from: Date = new Date(),
): Date | null {
  const start = DateTime.fromJSDate(from, { zone: timezone });
  const startInDst = start.isInDST;
  const horizon = start.plus({ days: 366 });
  let cursor = start;
  while (cursor < horizon) {
    cursor = cursor.plus({ hours: 1 });
    if (cursor.isInDST !== startInDst) {
      return cursor.toJSDate();
    }
  }
  return null;
}

export function formatLocalTime(
  timezone: string,
  at: Date = new Date(),
  format = "HH:mm",
): string {
  return DateTime.fromJSDate(at, { zone: timezone }).toFormat(format);
}

export function formatLocalDateTime(
  timezone: string,
  at: Date = new Date(),
): string {
  return DateTime.fromJSDate(at, { zone: timezone }).toFormat(
    "yyyy-MM-dd HH:mm",
  );
}

function buildBusinessIntervalsUTC(
  city: Pick<City, "timezone">,
  reference: Date,
  hours: BusinessHours,
  dayOffsets: ReadonlyArray<number>,
): Interval[] {
  const refLocal = DateTime.fromJSDate(reference, { zone: city.timezone });
  const intervals: Interval[] = [];
  for (const dayOffset of dayOffsets) {
    const day = refLocal.plus({ days: dayOffset }).startOf("day");
    const start = day.set({ hour: hours.startHour }).toUTC();
    const end = day.set({ hour: hours.endHour }).toUTC();
    intervals.push(Interval.fromDateTimes(start, end));
  }
  return intervals;
}

export function getOverlap(
  cityA: Pick<City, "timezone">,
  cityB: Pick<City, "timezone">,
  reference: Date = new Date(),
  hours: BusinessHours = DEFAULT_BUSINESS_HOURS,
): OverlapResult {
  const aIntervals = buildBusinessIntervalsUTC(cityA, reference, hours, [0]);
  const bIntervals = buildBusinessIntervalsUTC(
    cityB,
    reference,
    hours,
    [-1, 0, 1],
  );

  const merged: Interval[] = [];
  for (const a of aIntervals) {
    for (const b of bIntervals) {
      const overlap = a.intersection(b);
      if (overlap && overlap.length("milliseconds") > 0) {
        merged.push(overlap);
      }
    }
  }

  let totalMs = 0;
  const intervalsInA: { startHour: number; endHour: number }[] = [];
  for (const interval of merged) {
    totalMs += interval.length("milliseconds");
    const startA = interval.start?.setZone(cityA.timezone);
    const endA = interval.end?.setZone(cityA.timezone);
    if (startA && endA) {
      intervalsInA.push({
        startHour: startA.hour + startA.minute / MINUTES_PER_HOUR,
        endHour: endA.hour + endA.minute / MINUTES_PER_HOUR,
      });
    }
  }

  const totalHours = totalMs / MS_PER_HOUR;
  const wholeHours = Math.floor(totalHours);
  const minutes = Math.round((totalHours - wholeHours) * MINUTES_PER_HOUR);
  return { hours: wholeHours, minutes, intervalsInA };
}

export function suggestMeetingTimes(
  cityA: Pick<City, "timezone">,
  cityB: Pick<City, "timezone">,
  reference: Date = new Date(),
  hours: BusinessHours = DEFAULT_BUSINESS_HOURS,
): Array<{ inA: string; inB: string; bothInBusinessHours: boolean }> {
  const refLocalA = DateTime.fromJSDate(reference, {
    zone: cityA.timezone,
  }).startOf("day");
  const candidates: Array<{
    inA: string;
    inB: string;
    bothInBusinessHours: boolean;
  }> = [];
  for (let hour = 0; hour < 24; hour++) {
    const aTime = refLocalA.set({ hour });
    const bTime = aTime.setZone(cityB.timezone);
    const aInHours = hour >= hours.startHour && hour < hours.endHour;
    const bInHours =
      bTime.hour >= hours.startHour && bTime.hour < hours.endHour;
    if (aInHours || bInHours) {
      candidates.push({
        inA: aTime.toFormat("HH:mm"),
        inB: bTime.toFormat("HH:mm ZZZZ"),
        bothInBusinessHours: aInHours && bInHours,
      });
    }
  }
  return candidates;
}
