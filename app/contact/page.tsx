import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach us with feedback, bug reports, or city requests.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p>
          We&apos;d love to hear from you. The best ways to reach us:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:hello@timezone-planner.dev"
              className="text-primary hover:underline"
            >
              hello@timezone-planner.dev
            </a>{" "}
            — feedback, bug reports, city requests, partnership ideas.
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/puchunjie/timezone-planner/issues"
              className="text-primary hover:underline"
              rel="noopener"
            >
              Open an issue
            </a>{" "}
            for technical bugs or feature requests.
          </li>
        </ul>

        <p className="text-muted-foreground text-sm">
          We typically respond within 2-3 business days. Please include the
          page URL and a screenshot if you&apos;re reporting a bug.
        </p>
      </main>
    </div>
  );
}
