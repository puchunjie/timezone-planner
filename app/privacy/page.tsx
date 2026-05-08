import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What data this site collects, how it's used, and your rights regarding cookies, analytics, and advertising.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: 2026-05-08
        </p>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">What we collect</h2>
          <p>
            We collect the minimum information needed to operate and improve
            this site. Specifically:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Anonymous, aggregated usage analytics (page views, country,
              device class) collected via Cloudflare Web Analytics or Google
              Analytics. No personally identifiable information is stored.
            </li>
            <li>
              Standard server logs (IP address, user agent, request path) kept
              for a short rolling window for security and debugging.
            </li>
            <li>
              Local browser storage to remember the cities and time you last
              chose in the meeting planner. This data never leaves your device.
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Cookies and similar tech</h2>
          <p>
            We use a small number of first-party cookies for the analytics
            described above. We do not sell, rent, or share these data with
            third parties for marketing purposes.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Advertising</h2>
          <p>
            This site may display advertising delivered by Google AdSense and
            similar networks. These networks may set their own cookies to serve
            ads based on your prior visits to this and other websites. You can
            opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              className="text-primary hover:underline"
              rel="nofollow noopener"
            >
              Google&apos;s Ads Settings
            </a>{" "}
            or{" "}
            <a
              href="https://www.aboutads.info/choices/"
              className="text-primary hover:underline"
              rel="nofollow noopener"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Children</h2>
          <p>
            This site is not directed to children under 13 and we do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Your rights</h2>
          <p>
            Residents of the EU/UK (GDPR), California (CCPA/CPRA), and similar
            jurisdictions can request access to, correction of, or deletion of
            any personal data we may hold. Contact us via the{" "}
            <a href="/contact" className="text-primary hover:underline">
              contact page
            </a>
            .
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Changes</h2>
          <p>
            We may update this policy as the site evolves. Material changes
            will be reflected in the &quot;Last updated&quot; date above.
          </p>
        </section>
      </main>
    </div>
  );
}
