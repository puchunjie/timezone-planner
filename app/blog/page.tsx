import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical writing on cross-timezone work, distributed-team meetings, and the realities of remote life across continents.",
};

export default function BlogIndex() {
  return (
    <div className="bg-background min-h-dvh font-sans">
      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:py-16">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Blog
          </h1>
          <p className="text-muted-foreground mt-1">
            Practical writing on cross-timezone work and distributed teams.
          </p>
        </header>
        <ul className="flex flex-col gap-6">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="bg-card flex flex-col gap-2 rounded-lg border p-5"
            >
              <div className="text-muted-foreground text-xs uppercase tracking-wide">
                {p.publishedAt} · {p.readingMinutes} min read
              </div>
              <h2 className="text-xl font-semibold">
                <Link
                  href={`/blog/${p.slug}`}
                  className="hover:underline"
                >
                  {p.title}
                </Link>
              </h2>
              <p className="text-muted-foreground text-sm">{p.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
