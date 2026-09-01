"use client";

import { useState } from "react";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Reveal } from "./Reveal";
import { CodeBlock } from "@/components/code";
import type { SupportedLanguage } from "@/components/code";

const setupSteps = [
  {
    step: 1,
    title: "Create a new Next.js project",
    code: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
    filename: "Terminal",
    language: "bash" as SupportedLanguage,
  },
  {
    step: 2,
    title: "Install required dependencies",
    code: "npm install clsx tailwind-merge",
    filename: "Terminal",
    language: "bash" as SupportedLanguage,
  },
  {
    step: 3,
    title: "Create the utility function",
    code: `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
    filename: "lib/cn.ts",
    language: "tsx" as SupportedLanguage,
  },
];

function SetupStep({
  step,
  title,
  code,
  filename,
  language,
}: (typeof setupSteps)[number]) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {step}
        </span>
        <span className="text-sm font-medium text-foreground">{title}</span>
      </div>
      <CodeBlock
        code={code}
        language={language}
        filename={filename}
        showLineNumbers={language !== "bash"}
      />
    </div>
  );
}

export function HomeHero() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-border/40 bg-background">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 py-20 sm:py-28 lg:py-36">
          <Reveal>
            <div className="flex flex-col items-center gap-5 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                </span>
                Open Source
                <svg
                  className="h-3 w-3"
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
              </span>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance max-w-4xl">
                Build faster with{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                  production-ready
                </span>{" "}
                components.
              </h1>

              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                Discover, customize, and ship reusable UI components for your
                next project. Built with React, Tailwind CSS, and TypeScript.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="w-full max-w-xl">
              <SearchTrigger
                onClick={() => setSearchOpen(true)}
                placeholder="Search components, templates, blocks..."
                className="w-full"
              />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="w-full max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <svg
                  className="h-4 w-4 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Quick setup — copy and paste to get started
              </div>
              {setupSteps.map((s) => (
                <SetupStep key={s.step} {...s} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
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
