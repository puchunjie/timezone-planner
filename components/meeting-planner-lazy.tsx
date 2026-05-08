"use client";

import dynamic from "next/dynamic";

const MeetingPlannerInner = dynamic(
  () =>
    import("./meeting-planner").then((m) => ({
      default: m.MeetingPlanner,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-card mx-auto h-72 w-full max-w-4xl animate-pulse rounded-lg border" />
    ),
  },
);

export function MeetingPlannerLazy() {
  return <MeetingPlannerInner />;
}
