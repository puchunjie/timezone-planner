export interface SharedMeetingState {
  cities: string[];
  utcMinutes: number;
  durationMinutes: number;
}

export function encodeShared(state: SharedMeetingState): string {
  const params = new URLSearchParams();
  params.set("c", state.cities.join(","));
  params.set("t", String(state.utcMinutes));
  params.set("d", String(state.durationMinutes));
  return params.toString();
}

export function decodeShared(query: string): SharedMeetingState | null {
  const params = new URLSearchParams(query);
  const c = params.get("c");
  const t = params.get("t");
  const d = params.get("d");
  if (!c || !t || !d) return null;
  const cities = c.split(",").filter(Boolean);
  const utcMinutes = Number.parseInt(t, 10);
  const durationMinutes = Number.parseInt(d, 10);
  if (cities.length === 0) return null;
  if (!Number.isFinite(utcMinutes) || !Number.isFinite(durationMinutes)) {
    return null;
  }
  return { cities, utcMinutes, durationMinutes };
}
