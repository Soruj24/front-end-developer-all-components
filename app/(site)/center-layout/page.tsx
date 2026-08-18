"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { AlignCenter, Maximize2, Move } from "lucide-react";

const installCommand = `npx component-library@latest add center-layout`;

const usageCode = `import { Center } from "@/components/ui/Center";

<Center>
  <div>Perfectly centered content</div>
</Center>

<Center axis="x">
  <div>Horizontally centered only</div>
</Center>

<Center inset padding>
  <div>Centered with safe area padding</div>
</Center>`;

function CenterBothAxes() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlignCenter className="h-4 w-4" />
        <span>Center on Both Axes</span>
      </div>
      <div className="flex h-64 items-center justify-center rounded-lg border bg-muted/30">
        <div className="rounded-lg bg-primary/10 px-6 py-3 text-sm font-medium text-primary">Centered Content</div>
      </div>
    </div>
  );
}

function CenterHorizontalOnly() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Move className="h-4 w-4" />
        <span>Horizontal Center Only</span>
      </div>
      <div className="flex h-48 flex-col items-center justify-start gap-2 rounded-lg border bg-muted/30 p-4">
        <div className="rounded-lg bg-green-500/10 px-6 py-3 text-sm font-medium text-green-600 dark:text-green-400">Top-aligned, horizontally centered</div>
        <div className="rounded-lg bg-green-500/10 px-6 py-3 text-sm font-medium text-green-600 dark:text-green-400">Second item</div>
      </div>
    </div>
  );
}

function CenterVerticalOnly() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Maximize2 className="h-4 w-4" />
        <span>Vertical Center Only</span>
      </div>
      <div className="flex h-48 items-center justify-start gap-4 rounded-lg border bg-muted/30 p-4">
        <div className="rounded-lg bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-600 dark:text-amber-400">Vertically centered</div>
        <div className="rounded-lg bg-amber-500/10 px-6 py-3 text-sm font-medium text-amber-600 dark:text-amber-400">Next to it</div>
      </div>
    </div>
  );
}

function CenterWithPadding() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Centered with responsive padding</p>
      <div className="flex h-48 items-center justify-center rounded-lg border bg-muted/30 p-8">
        <div className="w-full max-w-sm rounded-lg bg-purple-500/10 px-6 py-3 text-center text-sm font-medium text-purple-600 dark:text-purple-400">
          Centered with padding and max-width
        </div>
      </div>
    </div>
  );
}

function CenterAbsolute() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Absolute centering within a relative container</p>
      <div className="relative h-48 rounded-lg border bg-muted/30">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-600 dark:text-blue-400">
          Absolute Center
        </div>
        <div className="absolute right-3 top-3 text-xs text-muted-foreground">relative parent</div>
      </div>
    </div>
  );
}

function CenterFlexbox() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Flexbox-based centering patterns</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center rounded-lg border bg-muted/30 p-4">
          <div className="rounded bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400">Flex Center</div>
        </div>
        <div className="flex items-center justify-center rounded-lg border bg-muted/30 p-4">
          <div className="flex flex-col items-center gap-1">
            <div className="rounded bg-rose-500/10 px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400">Stacked</div>
            <span className="text-[10px] text-muted-foreground">subtitle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CenterHeroPattern() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Common hero section pattern</p>
      <div className="flex h-64 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border">
        <div className="flex flex-col items-center gap-3 text-center">
          <h3 className="text-lg font-semibold text-foreground">Welcome to Our Platform</h3>
          <p className="max-w-md text-sm text-muted-foreground">Build beautiful interfaces with our comprehensive design system and component library.</p>
          <div className="flex gap-2">
            <div className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">Get Started</div>
            <div className="rounded-md border bg-background px-4 py-2 text-xs font-medium">Learn More</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CenterLayoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Center Layout</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Center content both horizontally and vertically. Supports single-axis centering, absolute positioning, and responsive padding for hero sections and modals.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Center Both Axes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Center content perfectly in both directions.</p>
        </div>
        <ComponentPreview id="center-both">
          <CenterBothAxes />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Center Only</h2>
          <p className="mt-1 text-sm text-muted-foreground">Center content horizontally while keeping it top-aligned.</p>
        </div>
        <ComponentPreview id="center-horizontal">
          <CenterHorizontalOnly />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Center Only</h2>
          <p className="mt-1 text-sm text-muted-foreground">Center content vertically while keeping it left-aligned.</p>
        </div>
        <ComponentPreview id="center-vertical">
          <CenterVerticalOnly />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Center with Padding</h2>
          <p className="mt-1 text-sm text-muted-foreground">Center with responsive padding and max-width constraints.</p>
        </div>
        <ComponentPreview id="center-padding">
          <CenterWithPadding />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Absolute Center</h2>
          <p className="mt-1 text-sm text-muted-foreground">Absolute positioning for precise centering within a container.</p>
        </div>
        <ComponentPreview id="center-absolute">
          <CenterAbsolute />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Flexbox Patterns</h2>
          <p className="mt-1 text-sm text-muted-foreground">Common flexbox centering patterns for different scenarios.</p>
        </div>
        <ComponentPreview id="center-flexbox">
          <CenterFlexbox />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Hero Pattern</h2>
          <p className="mt-1 text-sm text-muted-foreground">Centered hero section with title, description, and CTAs.</p>
        </div>
        <ComponentPreview id="center-hero">
          <CenterHeroPattern />
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
                <td className="px-4 py-3 font-mono text-xs">axis</td>
                <td className="px-4 py-3 text-muted-foreground">{`"both" | "x" | "y"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"both"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">inset</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">padding</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
