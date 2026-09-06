"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Reveal } from "./Reveal";

export function HomeHero() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-background">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 py-20 sm:py-28 lg:py-36">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <Link
                href="/docs"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-0"
              >
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                v2.0 — See what&apos;s new
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>

              <h1 className="text-balance max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Build faster with production-ready components.
              </h1>

              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Discover, customize, generate, and ship reusable
                Tailwind CSS components for your next project.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/components"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Browse Components
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read Docs
                </Link>
              </div>

              <div className="w-full max-w-xl">
                <SearchTrigger
                  onClick={() => setSearchOpen(true)}
                  placeholder="Search components, templates, and examples..."
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {["React", "Tailwind CSS", "TypeScript", "Production Ready"].map(
                (t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <svg
                      className="h-3.5 w-3.5 text-success"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>
  );
}
