"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ScrollArea } from "@/components/ui/ScrollArea";

const SCROLLAREA_SOURCE = `"use client";

import { forwardRef, HTMLAttributes } from "react";

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "both" | "vertical" | "horizontal";
  maxHeight?: string;
  maxWidth?: string;
}

const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", orientation = "vertical", maxHeight = "16rem", maxWidth, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={\`overflow-auto \${
          orientation === "vertical"
            ? "overflow-x-hidden"
            : orientation === "horizontal"
              ? "overflow-y-hidden"
              : ""
        } \${className}\`}
        style={{
          maxHeight: orientation !== "horizontal" ? maxHeight : undefined,
          maxWidth: orientation !== "vertical" ? maxWidth : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
export { ScrollArea };`;

const DEFAULT_EXAMPLE = `<ScrollArea className="h-48 w-full rounded border">
  <div className="flex flex-col gap-2 p-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <div key={i} className="rounded bg-muted/50 p-2 text-sm">
        Item {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`;

const HORIZONTAL_EXAMPLE = `<ScrollArea orientation="horizontal" className="h-24 w-full rounded border">
  <div className="flex gap-4 p-4">
    {Array.from({ length: 15 }).map((_, i) => (
      <div key={i} className="flex h-20 w-32 shrink-0 items-center justify-center rounded bg-muted/50 text-sm">
        Card {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`;

const BOTH_EXAMPLE = `<ScrollArea orientation="both" className="h-48 w-full rounded border">
  <div className="grid grid-cols-4 gap-2 p-4">
    {Array.from({ length: 40 }).map((_, i) => (
      <div key={i} className="flex h-24 items-center justify-center rounded bg-muted/50 text-sm">
        Cell {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`;

export default function ScrollAreaPage() {
  return (
    <ComponentDocPage
      name="Scroll Area"
      category="Layout"
      description="Augments native scroll functionality for custom, cross-browser styling. Supports vertical, horizontal, and bidirectional scrolling."
    >
      <PreviewPanel filename="scroll-area-preview">
        <div className="flex w-full max-w-md flex-col gap-4">
          <ScrollArea className="h-48 w-full rounded border">
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="rounded bg-muted/50 p-2 text-sm">Item {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SCROLLAREA_SOURCE} filename="ScrollArea.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Vertical" description="Vertical scroll area with fixed height." code={DEFAULT_EXAMPLE}>
          <ScrollArea className="h-48 w-full rounded border">
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="rounded bg-muted/50 p-2 text-sm">Item {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </ExampleBlock>

        <ExampleBlock title="Horizontal" description="Horizontal scroll area for wide content." code={HORIZONTAL_EXAMPLE}>
          <ScrollArea orientation="horizontal" className="h-24 w-full rounded border">
            <div className="flex gap-4 p-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex h-20 w-32 shrink-0 items-center justify-center rounded bg-muted/50 text-sm">Card {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </ExampleBlock>

        <ExampleBlock title="Both Directions" description="Scrollable in both vertical and horizontal directions." code={BOTH_EXAMPLE}>
          <ScrollArea orientation="both" className="h-48 w-full rounded border">
            <div className="grid grid-cols-4 gap-2 p-4">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex h-24 items-center justify-center rounded bg-muted/50 text-sm">Cell {i + 1}</div>
              ))}
            </div>
          </ScrollArea>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
