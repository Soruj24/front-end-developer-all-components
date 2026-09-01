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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-xl border border-border/60 bg-background shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/60 bg-muted/30 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                    <span className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-muted-foreground">
                    lib/cn.ts
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("utility")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeTab === "utility"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Utility
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("usage")}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
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
