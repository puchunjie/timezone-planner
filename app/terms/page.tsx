import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of this site, including limits on liability and acceptable use.",
};

export default function TermsPage() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: 2026-05-08
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Acceptance</h2>
          <p>
            By using this site you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Use of the site</h2>
          <p>
            The content is provided for personal and professional planning
            purposes. You may link to, share, and reference our pages. You may
            not scrape the site at scale, attempt to bypass technical limits,
            or republish substantial portions without permission.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Accuracy and warranties</h2>
          <p>
            We use the IANA timezone database and well-tested time libraries,
            but timezone rules can change with little notice (governments adopt
            or repeal DST, for example). Always confirm critical meeting times
            with your calendar tool. The site is provided <em>as is</em>, with
            no warranty of accuracy, fitness for a particular purpose, or
            uninterrupted availability.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any
            indirect, incidental, or consequential damages arising from use of
            the site, including missed meetings or scheduling errors.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Changes</h2>
          <p>
            We may update these terms over time. Material changes will be
            reflected in the &quot;Last updated&quot; date above. Continued use
            of the site after a change means you accept the updated terms.
          </p>
        </section>
      </main>
    </div>
  );
}
