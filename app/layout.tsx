import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
        {children}
      </body>
    </html>
  );
}
