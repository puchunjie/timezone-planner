import { MeetingPlanner } from "@/components/meeting-planner";

export default function Home() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 sm:py-20">
        <section className="flex flex-col gap-4 text-center sm:text-left">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wide">
            Modern timezone planner
          </p>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Schedule meetings across time zones,
            <br className="hidden sm:block" /> without the math.
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-base sm:mx-0 sm:text-lg">
            Drag a single time pointer. See every teammate&apos;s local time and
            business window light up — built for distributed teams and digital
            nomads.
          </p>
        </section>

        <MeetingPlanner />

        <section className="grid gap-4 sm:grid-cols-3">
          <Feature
            title="Mobile-first"
            body="Optimized for the half of remote workers who plan calls on their phone, not at a desk."
          />
          <Feature
            title="DST-aware"
            body="Handled by IANA tz data and luxon — no manual fixes when clocks change in March or November."
          />
          <Feature
            title="50 cities, 1,225 pairs"
            body="Every two-city combination has its own page with overlap, suggested times, and culture notes."
          />
        </section>
      </main>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  );
}
