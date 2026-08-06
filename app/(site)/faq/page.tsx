"use client";

import { useState, type ComponentType } from "react";
import { ComponentPreview } from "@/components/preview";
import { SimpleFaq } from "./components/SimpleFaq";
import { CategorizedFaq } from "./components/CategorizedFaq";
import { SearchFaq } from "./components/SearchFaq";
import { GridFaq } from "./components/GridFaq";
import { HelpfulFaq } from "./components/HelpfulFaq";
import { IconFaq } from "./components/IconFaq";

const FAQ_PATTERNS: Array<{ label: string; Render: ComponentType; registryId: string }> = [
  { label: "Simple Accordion", Render: SimpleFaq, registryId: "faq-simple" },
  { label: "Categorized", Render: CategorizedFaq, registryId: "faq-categorized" },
  { label: "Search", Render: SearchFaq, registryId: "faq-search" },
  { label: "Grid", Render: GridFaq, registryId: "faq-grid" },
  { label: "Helpful / Not Helpful", Render: HelpfulFaq, registryId: "faq-helpful" },
  { label: "With Icons", Render: IconFaq, registryId: "faq-icons" },
];

export default function FAQ() {
  const [activePattern, setActivePattern] = useState(0);
  const { Render: Active, registryId } = FAQ_PATTERNS[activePattern];

  return (
    <div className="flex flex-col gap-12 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Find answers to common questions below.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {FAQ_PATTERNS.map((pattern, i) => (
          <button
            key={pattern.label}
            onClick={() => setActivePattern(i)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              activePattern === i
                ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-zinc-700"
            }`}
          >
            {pattern.label}
          </button>
        ))}
      </div>

      <ComponentPreview id={registryId} title={FAQ_PATTERNS[activePattern].label + " FAQ"}>
        <Active />
      </ComponentPreview>

      <p className="text-center text-xs text-muted-foreground/70">
        Pattern {activePattern + 1} of {FAQ_PATTERNS.length} —{" "}
        <span className="font-medium">{FAQ_PATTERNS[activePattern].label}</span>
      </p>
    </div>
  );
}
