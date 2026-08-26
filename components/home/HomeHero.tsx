"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Reveal } from "./Reveal";

function HeroComponentPreview() {
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-background shadow-card">
      {/* Tabs */}
      <div className="flex border-b border-border/40">
        {(["button", "card", "input"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2.5 text-xs font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-foreground text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="flex items-center justify-center bg-muted/30 p-8">
        {activeTab === "button" && (
          <div className="flex flex-wrap items-center gap-3">
            <button className="inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-medium text-background transition-all hover:opacity-90 active:scale-[0.98]">
              Primary
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]">
              Secondary
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]">
              Outline
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-md bg-transparent px-4 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]">
              Ghost
            </button>
          </div>
        )}

        {activeTab === "card" && (
          <div className="w-full max-w-sm rounded-xl border border-border/60 bg-background p-4">
            <div className="mb-3 h-32 rounded-lg bg-muted/50" />
            <div className="mb-2 h-4 w-3/4 rounded bg-muted/50" />
            <div className="mb-4 h-3 w-1/2 rounded bg-muted/50" />
            <div className="flex gap-2">
              <div className="h-8 flex-1 rounded-md bg-foreground/10" />
              <div className="h-8 flex-1 rounded-md bg-foreground" />
            </div>
          </div>
        )}

        {activeTab === "input" && (
          <div className="w-full max-w-sm space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Email</label>
              <div className="flex h-9 rounded-md border border-border bg-background px-3 text-sm">
                <span className="text-muted-foreground">developer@example.com</span>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">Password</label>
              <div className="flex h-9 rounded-md border border-border bg-background px-3 text-sm">
                <span className="text-muted-foreground">••••••••</span>
              </div>
            </div>
            <button className="inline-flex h-9 w-full items-center justify-center rounded-md bg-foreground text-sm font-medium text-background">
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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
                Build faster with production-ready components.
              </h1>

              <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Discover, customize, generate, and ship reusable Tailwind CSS
                components for your next project.
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
                placeholder="Search components, templates, blocks..."
                className="w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <HeroComponentPreview />
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
