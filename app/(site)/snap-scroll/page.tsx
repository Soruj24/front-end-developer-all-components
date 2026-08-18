"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowUpDown, ArrowLeftRight, Maximize2, Grid, List, Layout, Monitor } from "lucide-react";

const installCommand = `npx component-library@latest add snap-scroll`;

const usageCode = `import { SnapScroll } from "@/components/ui/snap-scroll";

export default function Demo() {
  return (
    <SnapScroll direction="vertical">
      <div className="h-screen">Section 1</div>
      <div className="h-screen">Section 2</div>
    </SnapScroll>
  );
}`;

function SnapVerticalDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-64 w-48 overflow-y-auto rounded-xl border snap-y snap-mandatory bg-muted/20 space-y-2 p-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="h-28 snap-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-sm font-medium text-primary">
            <ArrowUpDown className="mr-1 h-4 w-4" /> Section {n}
          </div>
        ))}
      </div>
    </div>
  );
}

function SnapHorizontalDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-48 w-72 overflow-x-auto rounded-xl border snap-x snap-mandatory bg-muted/20 flex gap-2 p-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="w-64 shrink-0 snap-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center text-sm font-medium text-primary">
            <ArrowLeftRight className="mr-1 h-4 w-4" /> Card {n}
          </div>
        ))}
      </div>
    </div>
  );
}

function SnapGridDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-2 h-48 w-56 overflow-y-auto rounded-xl border snap-y snap-mandatory bg-muted/20 p-2 content-start">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="h-16 snap-center rounded-lg bg-primary/10 flex items-center justify-center">
            <Grid className="h-4 w-4 text-primary/60" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CardSnapDemo() {
  const [active, setActive] = useState(0);
  const cards = ["Design", "Develop", "Deploy", "Monitor", "Scale"];
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="flex gap-2">
        {cards.map((c, i) => (
          <button key={c} onClick={() => setActive(i)} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${active === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            {i + 1}
          </button>
        ))}
      </div>
      <div className="h-40 w-64 rounded-xl border bg-gradient-to-br from-primary/10 to-primary/5 flex flex-col items-center justify-center p-4">
        <Layout className="h-6 w-6 text-primary mb-2" />
        <p className="text-sm font-medium text-primary">{cards[active]}</p>
        <p className="text-xs text-muted-foreground mt-1">Card {active + 1} of {cards.length}</p>
      </div>
    </div>
  );
}

function SectionSnapDemo() {
  const sections = [
    { label: "Hero", bg: "from-blue-500/10 to-blue-600/5" },
    { label: "Features", bg: "from-green-500/10 to-green-600/5" },
    { label: "Pricing", bg: "from-purple-500/10 to-purple-600/5" },
  ];
  return (
    <div className="flex items-center justify-center p-8">
      <div className="h-48 w-56 overflow-y-auto rounded-xl border snap-y snap-mandatory bg-muted/20">
        {sections.map((s, i) => (
          <div key={i} className={`h-48 snap-center flex flex-col items-center justify-center bg-gradient-to-b ${s.bg}`}>
            <span className="text-lg font-bold text-foreground">{s.label}</span>
            <span className="text-xs text-muted-foreground mt-1">Section {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FullPageSnapDemo() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="relative h-40 w-64 overflow-hidden rounded-xl border">
        <div className="flex h-full transition-transform duration-300" style={{ transform: `translateY(-${current * 100}%)` }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-full w-full shrink-0 flex items-center justify-center bg-gradient-to-b from-primary/10 to-primary/5">
              <Maximize2 className="h-6 w-6 text-primary/40" />
              <span className="ml-2 text-sm font-medium text-primary">Page {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 w-8 rounded-full transition-colors ${current === i ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}

function CarouselSnapDemo() {
  const [index, setIndex] = useState(0);
  const items = ["Analytics", "Reports", "Insights", "Trends", "Forecasts"];
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div className="h-40 w-72 overflow-hidden rounded-xl border bg-muted/20 relative">
        <div className="flex h-full transition-transform duration-300" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((item, i) => (
            <div key={i} className="h-full w-full shrink-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/15">
              <div className="text-center">
                <Monitor className="h-6 w-6 text-primary mx-auto mb-1" />
                <p className="text-sm font-medium text-primary">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setIndex(Math.max(0, index - 1))} disabled={index === 0} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-muted/80">Prev</button>
        <span className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">{index + 1}/{items.length}</span>
        <button onClick={() => setIndex(Math.min(items.length - 1, index + 1))} disabled={index === items.length - 1} className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-muted/80">Next</button>
      </div>
    </div>
  );
}

export default function SnapScrollPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Snap Scroll</h1>
          <Badge variant="primary">Scroll</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A scroll container with CSS scroll-snap for precise section-by-section or card-by-card navigation.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various snap scroll demonstrations.</p>
        </div>

        <ComponentPreview id="snap-scroll-vertical">
          <SnapVerticalDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-horizontal">
          <SnapHorizontalDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-grid">
          <SnapGridDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-card">
          <CardSnapDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-section">
          <SectionSnapDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-fullpage">
          <FullPageSnapDemo />
        </ComponentPreview>

        <ComponentPreview id="snap-scroll-carousel">
          <CarouselSnapDemo />
        </ComponentPreview>
      </section>

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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">"vertical" | "horizontal"</td>
                <td className="px-4 py-3 text-muted-foreground">"vertical"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
