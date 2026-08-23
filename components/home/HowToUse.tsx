"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { CodeBlock } from "./CodeBlock";

const steps = [
  {
    step: 1,
    title: "Open the Button component",
    description: "Browse the component library and find the Button component.",
    href: "/button",
  },
  {
    step: 2,
    title: "Choose an example",
    description: "Select from variants like Primary, Secondary, Outline, or Ghost.",
    href: "/button",
  },
  {
    step: 3,
    title: "Open Code",
    description: "Click the Code tab to view the complete source code.",
    href: "/button",
  },
  {
    step: 4,
    title: "Copy the source",
    description: "Click the copy button to copy the entire component to your clipboard.",
    href: "/button",
  },
  {
    step: 5,
    title: "Add to your project",
    description: "Paste the component into your project's components directory.",
    href: "/docs",
  },
  {
    step: 6,
    title: "Import and use",
    description: "Import the component and use it in your application.",
    href: "/docs",
  },
];

const installCode = `npm install lucide-react`;

const importCode = `import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button>
      Get Started
    </Button>
  )
}`;

const customizeCode = `import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Button className="bg-violet-600 hover:bg-violet-700">
      Custom Button
    </Button>
  )
}`;

export function HowToUse() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(importCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="border-b border-border/40 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tutorial"
          title="How to use a component"
          description="A step-by-step guide to using any component in your project."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Steps */}
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <Link
                key={step.step}
                href={step.href}
                className="group flex items-start gap-4 rounded-xl border border-border/60 bg-background p-4 transition-all duration-200 hover:border-border hover:shadow-card"
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {step.step}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <ExternalLink className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground/40 transition-colors group-hover:text-foreground" />
              </Link>
            ))}
          </div>

          {/* Code Example */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-border/60 bg-background p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Example: Button Component
              </h3>

              {/* Live Preview */}
              <div className="mb-4 flex items-center justify-center rounded-xl border border-border/40 bg-muted/30 p-8">
                <button className="inline-flex h-10 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
                  Get Started
                </button>
              </div>

              {/* Code */}
              <div className="relative">
                <CodeBlock code={importCode} filename="page.tsx" />
                <button
                  onClick={handleCopy}
                  className="absolute right-3 top-3 rounded-md border border-border bg-background p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-success" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background p-6">
              <h3 className="mb-4 text-sm font-semibold text-foreground">
                Customize with Tailwind
              </h3>
              <CodeBlock code={customizeCode} filename="page.tsx" />
            </div>

            <Link
              href="/button"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              View full Button documentation
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
