"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { AlignCenter, Maximize2, Move } from "lucide-react";

const CENTERLAYOUT_SOURCE = `"use client";

import type { ReactNode } from "react";

interface CenterProps {
  axis?: "both" | "x" | "y";
  inset?: boolean;
  padding?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Center({ axis = "both", inset = false, padding = false, className = "", children }: CenterProps) {
  const justify = axis === "x" ? "justify-center" : axis === "y" ? "justify-start" : "justify-center";
  const items = axis === "x" ? "items-start" : axis === "y" ? "items-center" : "items-center";
  const position = inset ? "absolute inset-0" : "";
  const pad = padding ? "p-8" : "";
  const classes = [justify, items, position, pad, className].filter(Boolean).join(" ");

  return <div className={"flex " + classes}>{children}</div>;
}`;

const HORIZONTAL_CODE = `<Center axis="x"><div>Horizontally centered only</div></Center>`;

const VERTICAL_CODE = `<Center axis="y"><div>Vertically centered only</div></Center>`;

const PADDING_CODE = `<Center padding><div className="max-w-sm">Centered with padding and max-width</div></Center>`;

const ABSOLUTE_CODE = `<div className="relative h-48"><Center inset><div>Absolute Center</div></Center></div>`;

const FLEXBOX_CODE = `<div className="flex items-center justify-center"><div>Flex Center</div></div>

<div className="flex flex-col items-center gap-1"><div>Stacked</div><span>subtitle</span></div>`;

const HERO_CODE = `<Center><div className="flex flex-col items-center gap-3 text-center"><h3>Welcome to Our Platform</h3><p>Build beautiful interfaces with our design system.</p><div className="flex gap-2"><div className="rounded-md bg-primary px-4 py-2 text-xs text-primary-foreground">Get Started</div><div className="rounded-md border bg-background px-4 py-2 text-xs">Learn More</div></div></div></Center>`;

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
    <ComponentDocPage
      name="Center Layout"
      category="Layout"
      description="Center content both horizontally and vertically. Supports single-axis centering, absolute positioning, and responsive padding for hero sections and modals."
    >
      <PreviewPanel filename="center.tsx">
        <CenterBothAxes />
      </PreviewPanel>

      <SourceCodeViewer
        source={CENTERLAYOUT_SOURCE}
        filename="components/ui/Center/Center.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Horizontal Center Only" description="Center content horizontally while keeping it top-aligned." code={HORIZONTAL_CODE}>
          <CenterHorizontalOnly />
        </ExampleBlock>
        <ExampleBlock title="Vertical Center Only" description="Center content vertically while keeping it left-aligned." code={VERTICAL_CODE}>
          <CenterVerticalOnly />
        </ExampleBlock>
        <ExampleBlock title="Center with Padding" description="Center with responsive padding and max-width constraints." code={PADDING_CODE}>
          <CenterWithPadding />
        </ExampleBlock>
        <ExampleBlock title="Absolute Center" description="Absolute positioning for precise centering within a container." code={ABSOLUTE_CODE}>
          <CenterAbsolute />
        </ExampleBlock>
        <ExampleBlock title="Flexbox Patterns" description="Common flexbox centering patterns for different scenarios." code={FLEXBOX_CODE}>
          <CenterFlexbox />
        </ExampleBlock>
        <ExampleBlock title="Hero Pattern" description="Centered hero section with title, description, and CTAs." code={HERO_CODE}>
          <CenterHeroPattern />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}