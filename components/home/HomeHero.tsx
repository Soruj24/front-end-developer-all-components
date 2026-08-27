"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchTrigger } from "@/components/search/SearchTrigger";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

const setupSteps = [
  {
    step: 1,
    title: "Create a new Next.js project",
    code: "npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir",
    filename: "Terminal",
  },
  {
    step: 2,
    title: "Install required dependencies",
    code: "npm install clsx tailwind-merge",
    filename: "Terminal",
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
  },
];

function fallbackCopy(value: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  } finally {
    document.body.removeChild(textarea);
  }
  return ok;
}

async function writeClipboard(value: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      return fallbackCopy(value);
    }
  }
  return fallbackCopy(value);
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await writeClipboard(value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ? `Copy ${label}` : "Copy"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150",
        copied
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
      )}
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

function SetupStep({ step, title, code, filename }: typeof setupSteps[number]) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-card transition-all duration-200 hover:border-ring/30">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {step}
          </span>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <CopyButton value={code} label={title} />
      </div>
      <div className="bg-muted/10">
        <div className="flex items-center gap-2 border-b border-border/40 px-4 py-1.5">
          <span className="font-mono text-[11px] text-muted-foreground">{filename}</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
          <code className="text-foreground/80">{code}</code>
        </pre>
      </div>
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
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                Discover, customize, and ship reusable UI components for your next project.
                Built with React, Tailwind CSS, and TypeScript.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <Link
                  href="/components"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
                >
                  Browse Components
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
                >
                  Read Docs
                </Link>
              </div>
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
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
              {["React", "Tailwind CSS", "TypeScript", "Production Ready"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
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
