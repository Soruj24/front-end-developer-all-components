"use client";

import Link from "next/link";
import { Button } from "@/components/design-system/Button";
import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-to-b from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 blur-3xl rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
            <span>v2.0 — Now with AI-powered components</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Build faster with{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              premium
            </span>{" "}
            components
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            A collection of {siteConfig.stats.components}+ production-ready,
            accessible, and customizable React components. Copy, paste, and
            ship — no dependencies required.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/components">
              <Button size="lg" className="min-w-[160px]">
                Browse Components
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="min-w-[160px]">
                Documentation
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/50 pt-10">
            <div>
              <div className="text-3xl font-bold text-foreground">
                {siteConfig.stats.components}+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {siteConfig.stats.downloads}+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                {siteConfig.stats.stars}+
              </div>
              <div className="mt-1 text-sm text-muted-foreground">GitHub Stars</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
