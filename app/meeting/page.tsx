import type { Metadata } from "next";
import { MeetingPlannerLazy } from "@/components/meeting-planner-lazy";

export const metadata: Metadata = {
  title: "Shared Meeting",
  robots: { index: false, follow: false },
};

export default function SharedMeetingPage() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:py-16">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Shared Meeting
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Loaded from the link you opened. Adjust the time or cities to refine.
          </p>
        </header>
        <MeetingPlannerLazy />
      </main>
    </div>
  );
}
