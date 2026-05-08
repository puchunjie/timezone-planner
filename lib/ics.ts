import { createEvent, type DateArray } from "ics";
import { DateTime } from "luxon";

export interface MeetingICSInput {
  title: string;
  description: string;
  startUTC: Date;
  durationMinutes: number;
  url?: string;
}

function toDateArray(d: Date): DateArray {
  const dt = DateTime.fromJSDate(d, { zone: "utc" });
  return [dt.year, dt.month, dt.day, dt.hour, dt.minute];
}

export function buildMeetingICS(input: MeetingICSInput): string {
  const { value, error } = createEvent({
    title: input.title,
    description: input.description,
    start: toDateArray(input.startUTC),
    startInputType: "utc",
    duration: { minutes: input.durationMinutes },
    url: input.url,
    productId: "timezone-planner",
  });
  if (error || !value) {
    throw new Error(`Failed to build .ics: ${error?.message ?? "unknown"}`);
  }
  return value;
}

export function downloadICS(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
