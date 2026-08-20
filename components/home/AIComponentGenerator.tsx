"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function AIComponentGenerator() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    router.push(`/ai?prompt=${encodeURIComponent(prompt.trim())}`);
  };

  return (
    <section className="border-b border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-6">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48 2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
              </svg>
              AI Generator
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl text-balance">
              Describe it. Generate it.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell our AI what you need and get a production-ready component in seconds.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="rounded-lg border border-border/60 bg-background shadow-sm">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the component you want to build..."
                rows={3}
                className="w-full resize-none rounded-t-lg border-0 bg-transparent px-4 pt-4 pb-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleGenerate();
                }}
              />
              <div className="flex items-center justify-between border-t border-border/40 px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {["React", "Tailwind CSS", "TypeScript", "Production Ready"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/40 bg-muted/30 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!prompt.trim()}
                  className={cn(
                    "inline-flex h-8 items-center gap-1.5 rounded-md px-4 text-sm font-medium transition-all duration-200",
                    prompt.trim()
                      ? "bg-foreground text-background hover:opacity-90 active:scale-[0.98]"
                      : "bg-muted text-muted-foreground cursor-not-allowed",
                  )}
                >
                  Generate
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Press <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">Ctrl</kbd> + <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to generate
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
