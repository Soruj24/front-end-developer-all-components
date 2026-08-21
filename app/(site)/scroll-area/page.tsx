"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ScrollArea } from "@/components/ui/ScrollArea";

const SCROLL_AREA_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
type ScrollAreaSize = "sm" | "md" | "lg";

interface ScrollAreaProps {
  children: ReactNode;
  orientation?: ScrollAreaOrientation;
  size?: ScrollAreaSize;
  maxHeight?: string;
  maxWidth?: string;
  className?: string;
}

const SCROLLBAR_SIZE = { sm: "scrollbar-thin", md: "", lg: "scrollbar-wide" };

export const ScrollArea = forwardRef(({ children, orientation = "vertical", size = "md", maxHeight = "16rem", maxWidth, className, ...props }, ref) => {
  return (
    <div ref={ref} role="region" aria-orientation={orientation === "both" ? undefined : orientation}
      className={cn("relative overflow-auto rounded-xl border border-border bg-card", "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20", "hover:scrollbar-thumb-muted-foreground/40", "scrollbar-thumb-rounded-full scrollbar-track-rounded-full", SCROLLBAR_SIZE[size], orientation === "vertical" && "overflow-x-hidden", orientation === "horizontal" && "overflow-y-hidden", className)}
      style={{ maxHeight: orientation !== "horizontal" ? maxHeight : undefined, maxWidth: orientation !== "vertical" ? maxWidth : undefined }} {...props}>
      {children}
    </div>
  );
});
ScrollArea.displayName = "ScrollArea";`;

export default function ScrollAreaPage() {
  return (
    <ComponentDocPage
      name="Scroll Area"
      category="Layout"
      description="Custom-styled scroll container with thin scrollbars, hover reveal, and support for vertical, horizontal, and bidirectional scrolling."
    >
      <PreviewPanel filename="scroll-area-preview.tsx">
        <div className="w-full max-w-md">
          <ScrollArea className="h-48 w-full">
            <div className="flex flex-col gap-2 p-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                  Item {i + 1}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SCROLL_AREA_SOURCE}
        filename="components/ui/ScrollArea/ScrollArea.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Vertical"
          description="Vertical scroll area with fixed height."
          code={`import { ScrollArea } from "@/components/ui/ScrollArea";\n\n<ScrollArea className="h-48 w-full">\n  <div className="flex flex-col gap-2 p-4">\n    {items.map((item) => <div>{item}</div>)}\n  </div>\n</ScrollArea>`}
          filename="vertical.tsx"
        >
          <div className="w-full max-w-md">
            <ScrollArea className="h-48 w-full">
              <div className="flex flex-col gap-2 p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Horizontal"
          description="Horizontal scroll area for wide content."
          code={`<ScrollArea orientation="horizontal" className="h-24 w-full">\n  <div className="flex gap-4 p-4">\n    {cards.map((card) => <div className="h-20 w-32 shrink-0">{card}</div>)}\n  </div>\n</ScrollArea>`}
          filename="horizontal.tsx"
        >
          <div className="w-full max-w-md">
            <ScrollArea orientation="horizontal" className="h-24 w-full">
              <div className="flex gap-4 p-4">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="flex h-20 w-32 shrink-0 items-center justify-center rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    Card {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Both Directions"
          description="Scrollable in both vertical and horizontal directions."
          code={`<ScrollArea orientation="both" className="h-48 w-full">\n  <div className="grid grid-cols-4 gap-2 p-4">\n    {cells.map((cell) => <div className="h-24">{cell}</div>)}\n  </div>\n</ScrollArea>`}
          filename="both.tsx"
        >
          <div className="w-full max-w-md">
            <ScrollArea orientation="both" className="h-48 w-full">
              <div className="grid grid-cols-4 gap-2 p-4">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="flex h-24 items-center justify-center rounded-lg bg-muted/50 text-sm text-muted-foreground">
                    Cell {i + 1}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three scrollbar sizes: sm, md (default), lg."
          code={`<ScrollArea size="sm" className="h-32 w-full">...</ScrollArea>\n<ScrollArea size="md" className="h-32 w-full">...</ScrollArea>\n<ScrollArea size="lg" className="h-32 w-full">...</ScrollArea>`}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <div>
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Small</span>
              <ScrollArea size="sm" className="h-32 w-full">
                <div className="flex flex-col gap-1.5 p-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="rounded-md bg-muted/50 px-2 py-1.5 text-xs text-muted-foreground">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Medium (default)</span>
              <ScrollArea size="md" className="h-32 w-full">
                <div className="flex flex-col gap-1.5 p-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="rounded-md bg-muted/50 px-2 py-1.5 text-xs text-muted-foreground">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Large</span>
              <ScrollArea size="lg" className="h-32 w-full">
                <div className="flex flex-col gap-1.5 p-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="rounded-md bg-muted/50 px-2 py-1.5 text-xs text-muted-foreground">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot; | &quot;both&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">maxHeight</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;16rem&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">maxWidth</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
