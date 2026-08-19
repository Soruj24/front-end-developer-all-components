"use client";

import { Viewport } from "@/components/ui";
import { Maximize, Monitor, Smartphone, Tablet, ScreenShare, Minimize2 } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const SOURCE = `import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface ViewportProps {
  children: ReactNode;
  width?: number;
  height?: number;
  device?: "mobile" | "tablet" | "desktop";
  className?: string;
}

export const deviceSizes: Record<string, { width: number; height: number }> = {
  mobile: { width: 375, height: 812 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 800 },
};

export function Viewport({ children, width, height, device = "desktop", className }: ViewportProps) {
  const size = deviceSizes[device];
  const w = width ?? size.width;
  const h = height ?? size.height;

  return (
    <div className={cn("mx-auto overflow-auto border rounded-lg bg-white dark:bg-zinc-900", className)} style={{ width: w, height: h }}>
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  );
}`;

const MAX_WIDTHS = ["max-w-xs", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl"];

function MaxWidthDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Maximize className="h-4 w-4" /><span>Max Width Variants</span></div>
      {MAX_WIDTHS.map((max) => (
        <div key={max} className="w-full">
          <div className="mb-1 text-[10px] text-muted-foreground">{max}</div>
          <div className={`mx-auto ${max} h-8 rounded border bg-primary/5 flex items-center px-2`}>
            <span className="text-[10px] text-primary">Content</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResponsivePaddingDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><ScreenShare className="h-4 w-4" /><span>Responsive Padding</span></div>
      <div className="rounded border bg-muted/30 p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="rounded bg-primary/5 p-2 text-center text-xs text-primary">Responsive padded content</div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded bg-muted/30 p-1 text-[10px] text-muted-foreground">p-2 (mobile)</div>
        <div className="hidden rounded bg-muted/30 p-1 text-[10px] text-muted-foreground sm:block">p-4 (sm)</div>
        <div className="hidden rounded bg-muted/30 p-1 text-[10px] text-muted-foreground md:block">p-6 (md)</div>
      </div>
    </div>
  );
}

function BreakpointsDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Monitor className="h-4 w-4" /><span>Device Breakpoints</span></div>
      <div className="flex items-end gap-6">
        <div className="flex flex-col items-center gap-1"><Smartphone className="h-5 w-5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">sm · 375px</span></div>
        <div className="flex flex-col items-center gap-1"><Tablet className="h-5 w-5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">md · 768px</span></div>
        <div className="flex flex-col items-center gap-1"><Monitor className="h-5 w-5 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">lg · 1024px</span></div>
        <div className="flex flex-col items-center gap-1"><Monitor className="h-6 w-6 text-muted-foreground" /><span className="text-[10px] text-muted-foreground">xl · 1280px</span></div>
      </div>
    </div>
  );
}

function FluidDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Fluid — fills available width</p>
      <div className="w-full rounded-lg border bg-primary/5 p-4">
        <p className="text-xs text-primary text-center">Fluid Container — full width</p>
      </div>
    </div>
  );
}

function CenteredDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground"><Minimize2 className="h-4 w-4" /><span>Centered Content</span></div>
      <div className="mx-auto max-w-md rounded-lg border bg-background p-6 text-center">
        <p className="text-sm font-medium">Centered Content</p>
        <p className="mt-1 text-xs text-muted-foreground">Constrained and centered within the viewport</p>
      </div>
    </div>
  );
}

function NestedDemo() {
  return (
    <div className="w-full flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Nested responsive containers</p>
      <div className="rounded-lg border bg-muted/20 p-4">
        <div className="mb-2 text-[10px] text-muted-foreground">Outer container</div>
        <div className="rounded border bg-background p-3">
          <div className="mb-1 text-[10px] text-muted-foreground">Inner container</div>
          <div className="mx-auto max-w-xs rounded bg-primary/5 p-2 text-center text-[10px] text-primary">Constrained content</div>
        </div>
      </div>
    </div>
  );
}

export default function ResponsiveContainerPage() {
  return (
    <ComponentDocPage
      name="Responsive Container"
      category="Layout"
      description="Constrain content width, add responsive padding, and center elements across breakpoints using a device-aware Viewport."
    >
      <PreviewPanel filename="responsive-container-preview.tsx">
        <div className="w-full max-w-lg flex flex-col gap-6 items-center">
          <Viewport device="mobile" width={320} height={200}>
            <div className="p-4">
              <div className="rounded-lg border bg-primary/5 p-3">
                <p className="text-[10px] text-primary">Mobile preview</p>
              </div>
            </div>
          </Viewport>
          <Viewport device="tablet" width={512} height={200}>
            <div className="p-4">
              <div className="rounded-lg border bg-primary/5 p-3">
                <p className="text-xs text-primary">Tablet preview</p>
              </div>
            </div>
          </Viewport>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SOURCE} filename="components/ui/Viewport/Viewport.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Max Width Variants" description="Constrain content with Tailwind max-width classes." code={`<div className="mx-auto max-w-md">...</div>`}>
          <MaxWidthDemo />
        </ExampleBlock>

        <ExampleBlock title="Responsive Padding" description="Padding that adjusts based on screen size." code={`<div className="rounded bg-muted/30 p-2 sm:p-4 md:p-6 lg:p-8">...</div>`}>
          <ResponsivePaddingDemo />
        </ExampleBlock>

        <ExampleBlock title="Breakpoint Behavior" description="How content adapts across device sizes." code={`<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">...</div>`}>
          <BreakpointsDemo />
        </ExampleBlock>

        <ExampleBlock title="Fluid Container" description="Full-width container that adapts to its parent." code={`<div className="w-full">...</div>`}>
          <FluidDemo />
        </ExampleBlock>

        <ExampleBlock title="Centered Content" description="Center-constrained content with max-width." code={`<div className="mx-auto max-w-md">...</div>`}>
          <CenteredDemo />
        </ExampleBlock>

        <ExampleBlock title="Nested Containers" description="Containers nested within containers for layered layouts." code={`<div className="p-4"><div className="p-3"><div className="mx-auto max-w-xs">...</div></div></div>`}>
          <NestedDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
