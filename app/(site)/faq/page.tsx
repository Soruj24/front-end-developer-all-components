"use client";

import { useState, type ComponentType } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SimpleFaq } from "./components/SimpleFaq";
import { CategorizedFaq } from "./components/CategorizedFaq";
import { SearchFaq } from "./components/SearchFaq";
import { GridFaq } from "./components/GridFaq";
import { HelpfulFaq } from "./components/HelpfulFaq";
import { IconFaq } from "./components/IconFaq";

const faqProps = [
  { prop: "variant", type: "\"simple\" | \"categorized\" | \"search\" | \"grid\" | \"helpful\"", default: "\"simple\"", required: "No" },
  { prop: "items", type: "FaqItem[]", default: "-", required: "Yes" },
  { prop: "showSearch", type: "boolean", default: "false", required: "No" },
  { prop: "showHelpful", type: "boolean", default: "false", required: "No" },
];

const installCommand = `npx component-library@latest add faq`;

const usageCode = `import { FaqAccordion } from "@/components/faq";

<FaqAccordion items={faqItems} variant="simple" />`;

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
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Frequently Asked Questions</h1>
          <Badge variant="primary">{FAQ_PATTERNS.length} variants</Badge>
        </div>
        <p className="mt-2 text-muted-foreground">Find answers to common questions below.</p>
      </div>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

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
    </section>

    {/* API Reference */}
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-left font-medium">Prop</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Default</th>
              <th className="px-4 py-3 text-left font-medium">Required</th>
            </tr>
          </thead>
          <tbody>
            {faqProps.map((row, i) => (
              <tr key={row.prop} className={i < faqProps.length - 1 ? "border-b" : ""}>
                <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                <td className="px-4 py-3">{row.required}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
    </div>
  );
}
