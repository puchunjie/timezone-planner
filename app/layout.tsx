import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WebsiteJsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meeting Planner for Remote Teams Across Time Zones",
    template: "%s | Timezone Planner",
  },
  description:
    "Modern meeting planner for distributed teams and digital nomads. Drag one pointer, see every teammate's local time and business overlap. 50 cities, 1,225 pairs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <WebsiteJsonLd />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
