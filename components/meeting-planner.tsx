"use client";

import { useEffect, useMemo, useState } from "react";
import { DateTime } from "luxon";
import { useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cities, type City } from "@/data/cities";
import {
  DEFAULT_BUSINESS_HOURS,
  formatLocalTime,
  getOffsetLabel,
} from "@/lib/timezone";
import { buildMeetingICS, downloadICS } from "@/lib/ics";
import { encodeShared } from "@/lib/shared-meeting";

const MAX_CITIES = 5;
const HALF_HOURS_IN_DAY = 48;
const DEFAULT_SLUGS = ["new-york", "london", "tokyo"] as const;
const DEFAULT_DURATION_MIN = 30;

function utcAtHalfHour(reference: Date, halfHourIndex: number): Date {
  const startOfDayUTC = DateTime.fromJSDate(reference, { zone: "utc" })
    .startOf("day")
    .toJSDate();
  return new Date(startOfDayUTC.getTime() + halfHourIndex * 30 * 60 * 1000);
}

function isInBusinessHours(timezone: string, at: Date): boolean {
  const local = DateTime.fromJSDate(at, { zone: timezone });
  return (
    local.hour >= DEFAULT_BUSINESS_HOURS.startHour &&
    local.hour < DEFAULT_BUSINESS_HOURS.endHour
  );
}

interface CityRowProps {
  city: City;
  pointerAt: Date;
  onRemove?: () => void;
  canRemove: boolean;
}

function CityRow({ city, pointerAt, onRemove, canRemove }: CityRowProps) {
  const cells = Array.from({ length: HALF_HOURS_IN_DAY }, (_, i) => {
    const at = utcAtHalfHour(pointerAt, i);
    return isInBusinessHours(city.timezone, at);
  });
  const localTime = formatLocalTime(city.timezone, pointerAt);
  const local = DateTime.fromJSDate(pointerAt, { zone: city.timezone });
  const dayLabel = local.toFormat("ccc, LLL d");
  const offset = getOffsetLabel(city.timezone, pointerAt);

  return (
    <div className="grid grid-cols-[minmax(140px,1fr)_3fr_minmax(80px,auto)] items-center gap-3 py-2">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{city.name}</span>
          {canRemove && onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label={`Remove ${city.name}`}
              className="text-muted-foreground hover:text-foreground text-xs"
            >
              ×
            </button>
          )}
        </div>
        <div className="text-muted-foreground truncate text-xs">
          {dayLabel} · {offset}
        </div>
      </div>
      <div
        className="flex h-6 overflow-hidden rounded-sm border"
        role="img"
        aria-label={`${city.name} business hours band`}
      >
        {cells.map((isWork, i) => (
          <div
            key={i}
            className={`flex-1 ${
              isWork ? "bg-emerald-400/70" : "bg-muted/40"
            } ${i % 2 === 0 ? "border-l border-l-background/20" : ""}`}
          />
        ))}
      </div>
      <div className="text-right tabular-nums">
        <div className="font-mono text-base">{localTime}</div>
      </div>
    </div>
  );
}

export interface MeetingPlannerProps {
  initialSlugs?: ReadonlyArray<string>;
  initialUtcMinutes?: number;
  initialDurationMinutes?: number;
}

export function MeetingPlanner({
  initialSlugs,
  initialUtcMinutes,
  initialDurationMinutes,
}: MeetingPlannerProps = {}) {
  const searchParams = useSearchParams();

  const initialFromUrl = useMemo(() => {
    if (!searchParams) return null;
    const c = searchParams.get("c");
    const t = searchParams.get("t");
    const d = searchParams.get("d");
    if (!c) return null;
    return {
      slugs: c.split(",").filter(Boolean),
      t: t ? Number.parseInt(t, 10) : undefined,
      d: d ? Number.parseInt(d, 10) : undefined,
    };
  }, [searchParams]);

  const [selected, setSelected] = useState<string[]>(() => {
    if (initialFromUrl?.slugs.length) return initialFromUrl.slugs;
    if (initialSlugs && initialSlugs.length > 0) return [...initialSlugs];
    return [...DEFAULT_SLUGS];
  });
  const [referenceUTC] = useState(() =>
    DateTime.utc().startOf("day").plus({ hours: 12 }).toJSDate(),
  );
  const [halfHourIndex, setHalfHourIndex] = useState(() => {
    const minutes =
      initialFromUrl?.t ??
      initialUtcMinutes ??
      12 * 60;
    return Math.max(0, Math.min(HALF_HOURS_IN_DAY - 1, Math.round(minutes / 30)));
  });
  const [durationMinutes, setDurationMinutes] = useState(
    initialFromUrl?.d ?? initialDurationMinutes ?? DEFAULT_DURATION_MIN,
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const handle = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(handle);
  }, [copied]);

  const pointerAt = useMemo(
    () => utcAtHalfHour(referenceUTC, halfHourIndex),
    [referenceUTC, halfHourIndex],
  );

  const selectedCities = useMemo(
    () =>
      selected
        .map((slug) => cities.find((c) => c.slug === slug))
        .filter((c): c is City => Boolean(c)),
    [selected],
  );

  const remainingCities = useMemo(
    () => cities.filter((c) => !selected.includes(c.slug)),
    [selected],
  );

  const overlapCount = useMemo(() => {
    if (selectedCities.length < 2) return 0;
    let count = 0;
    for (let i = 0; i < HALF_HOURS_IN_DAY; i++) {
      const at = utcAtHalfHour(referenceUTC, i);
      if (selectedCities.every((c) => isInBusinessHours(c.timezone, at))) {
        count++;
      }
    }
    return count;
  }, [selectedCities, referenceUTC]);

  const overlapHours = overlapCount / 2;

  function handleSchedule() {
    const cityNames = selectedCities.map((c) => c.name).join(" / ");
    const ics = buildMeetingICS({
      title: `Meeting: ${cityNames}`,
      description: `Cross-timezone meeting planned with timezone-planner.\nAttendees in: ${cityNames}.`,
      startUTC: pointerAt,
      durationMinutes,
    });
    downloadICS(`meeting-${pointerAt.toISOString().slice(0, 16)}.ics`, ics);
  }

  async function handleShare() {
    if (typeof window === "undefined") return;
    const utcMinutes = halfHourIndex * 30;
    const query = encodeShared({
      cities: selected,
      utcMinutes,
      durationMinutes,
    });
    const url = `${window.location.origin}/meeting?${query}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt("Copy this share link:", url);
    }
  }

  return (
    <section className="bg-card mx-auto w-full max-w-4xl rounded-lg border p-4 shadow-sm sm:p-6">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">Meeting Planner</h2>
        <div className="text-muted-foreground text-sm">
          {selectedCities.length < 2
            ? "Add a second city to see overlap"
            : overlapHours > 0
              ? `Overlap: ${overlapHours}h business window${overlapHours === 1 ? "" : "s"}`
              : "No overlapping business hours"}
        </div>
      </header>

      <div className="space-y-1">
        {selectedCities.map((city) => (
          <CityRow
            key={city.slug}
            city={city}
            pointerAt={pointerAt}
            canRemove={selectedCities.length > 1}
            onRemove={() =>
              setSelected((prev) => prev.filter((s) => s !== city.slug))
            }
          />
        ))}
      </div>

      <div className="mt-6">
        <label className="text-muted-foreground mb-2 block text-xs uppercase tracking-wide">
          Reference time (drag)
        </label>
        <Slider
          value={[halfHourIndex]}
          min={0}
          max={HALF_HOURS_IN_DAY - 1}
          step={1}
          onValueChange={(v) => {
            const next = Array.isArray(v) ? v[0] : v;
            if (typeof next === "number") setHalfHourIndex(next);
          }}
          aria-label="Reference time slider"
        />
        <div className="text-muted-foreground mt-1 flex justify-between text-xs tabular-nums">
          <span>00:00 UTC</span>
          <span>12:00 UTC</span>
          <span>24:00 UTC</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label className="text-muted-foreground text-sm" htmlFor="dur">
          Duration
        </label>
        <select
          id="dur"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          className="bg-background rounded-md border px-2 py-1 text-sm"
        >
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
          <option value={45}>45 min</option>
          <option value={60}>60 min</option>
          <option value={90}>90 min</option>
        </select>
        <Button size="sm" onClick={handleSchedule}>
          Add to Calendar (.ics)
        </Button>
        <Button size="sm" variant="outline" onClick={handleShare}>
          {copied ? "Copied!" : "Share link"}
        </Button>
      </div>

      {selectedCities.length < MAX_CITIES && remainingCities.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <label
            htmlFor="add-city"
            className="text-muted-foreground text-sm"
          >
            Add city:
          </label>
          <select
            id="add-city"
            value=""
            onChange={(e) => {
              const slug = e.target.value;
              if (slug) setSelected((prev) => [...prev, slug]);
            }}
            className="bg-background min-w-[220px] rounded-md border px-3 py-2 text-sm"
          >
            <option value="">Choose a city</option>
            {remainingCities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}, {c.country}
              </option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelected([...DEFAULT_SLUGS])}
          >
            Reset
          </Button>
        </div>
      )}
    </section>
  );
}
