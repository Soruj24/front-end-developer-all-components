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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 py-20 sm:py-28 lg:py-36">
          <Reveal>
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                AI Component Registry
              </span>

              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance max-w-4xl">
                Build Better Interfaces, Faster.
              </h1>

              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Discover, customize, generate and share production-ready React + Tailwind CSS components.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  href="/components"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  Browse Components
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/playground"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98]"
                >
                  Open Playground
                </Link>
                <Link
                  href="/ai"
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
                  </svg>
                  Generate with AI
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="w-full max-w-2xl">
              <SearchTrigger
                onClick={() => setSearchOpen(true)}
                placeholder="Search components, templates and documentation..."
                className="w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              {["React", "Tailwind CSS", "TypeScript", "Production Ready"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </section>
  );
}
