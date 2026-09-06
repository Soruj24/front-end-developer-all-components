"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/code";
import { Reveal } from "./Reveal";

const codeExample = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

const usageExample = `import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CustomButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md bg-foreground px-4 py-2",
        "text-sm font-medium text-background",
        "transition-colors hover:opacity-90",
        className
      )}
      {...props}
    />
  );
}`;

export function HeroCodePreview() {
  const [activeTab, setActiveTab] = useState<"utility" | "usage">("utility");

  return (
    <section className="relative border-b border-border/40 bg-background py-16 sm:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-lg border border-border/60 bg-background shadow-card">
              <div className="flex items-center justify-between gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  </div>
                  <span className="ml-2 truncate font-mono text-xs text-muted-foreground">
                    {activeTab === "utility" ? "lib/cn.ts" : "components/ui/custom-button.tsx"}
                  </span>
                </div>
                <div role="tablist" aria-label="Code examples" className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "utility"}
                    onClick={() => setActiveTab("utility")}
                    className={`min-h-[44px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 ${
                      activeTab === "utility"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Utility
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === "usage"}
                    onClick={() => setActiveTab("usage")}
                    className={`min-h-[44px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 ${
                      activeTab === "usage"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Usage
                  </button>
                </div>
              </div>

              <div className="p-4">
                {activeTab === "utility" ? (
                  <CodeBlock
                    code={codeExample}
                    language="tsx"
                    filename="lib/cn.ts"
                    showLineNumbers
                  />
                ) : (
                  <CodeBlock
                    code={usageExample}
                    language="tsx"
                    filename="components/ui/custom-button.tsx"
                    showLineNumbers
                  />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
