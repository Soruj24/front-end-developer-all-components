"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ArrowRight } from "lucide-react";

const ARROWCURSOR_SOURCE = `"use client";

import { ArrowRight } from "lucide-react";

interface ArrowCursorProps {
  direction?: "left" | "up" | "right" | "down";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ArrowCursor({ direction = "right", size = "md", className = "" }: ArrowCursorProps) {
  const rotation =
    direction === "left"
      ? "rotate-180"
      : direction === "up"
        ? "-rotate-90"
        : direction === "down"
          ? "rotate-90"
          : "";
  const box =
    size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : size === "lg" ? "h-12 w-12" : "h-16 w-16";
  const icon =
    size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : size === "lg" ? "h-6 w-6" : "h-8 w-8";
  return (
    <div className={"flex items-center justify-center rounded-full bg-primary/10 " + box + " " + className}>
      <ArrowRight className={"text-primary " + rotation + " " + icon} />
    </div>
  );
}`;

const DIRECTIONS_EXAMPLE = `<ArrowCursor direction="left" />
<ArrowCursor direction="up" />
<ArrowCursor direction="right" />
<ArrowCursor direction="down" />`;

const SIZES_EXAMPLE = `<ArrowCursor size="sm" />
<ArrowCursor size="md" />
<ArrowCursor size="lg" />
<ArrowCursor size="xl" />`;

const INTERACTIVE_EXAMPLE = `<div className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer">
  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-180" />
  <span className="flex-1 text-center text-sm font-medium">Previous</span>
</div>`;

export default function ArrowCursorPage() {
  return (
    <ComponentDocPage
      name="Arrow Cursor"
      category="Navigation"
      description="Custom arrow cursor indicators for navigation hints, directional cues, and interactive pointer elements."
    >
      <PreviewPanel filename="arrow-cursor.tsx">
        <div className="w-full p-4">
          <div className="flex items-center justify-center gap-8">
            {["left", "up", "right", "down"].map((dir) => (
              <div key={dir} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRight className={`h-5 w-5 text-primary ${dir === "left" ? "rotate-180" : dir === "up" ? "-rotate-90" : dir === "down" ? "rotate-90" : ""}`} />
                </div>
                <span className="text-xs capitalize text-muted-foreground">{dir}</span>
              </div>
            ))}
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={ARROWCURSOR_SOURCE} filename="components/ui/ArrowCursor/ArrowCursor.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Cursor Sizes" description="Different sizes of arrow cursors." code={SIZES_EXAMPLE}>
          <div className="w-full p-4">
            <div className="flex items-end justify-center gap-6">
              {["sm", "md", "lg", "xl"].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div className={`flex items-center justify-center rounded-full bg-primary/10 ${size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : size === "lg" ? "h-12 w-12" : "h-16 w-16"}`}>
                    <ArrowRight className={`text-primary ${size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : size === "lg" ? "h-6 w-6" : "h-8 w-8"}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Interactive Cursor Card" description="Arrow cursors used as navigation indicators on cards." code={INTERACTIVE_EXAMPLE}>
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-4">
              {["Previous", "Next"].map((label, i) => (
                <div key={i} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                  {i === 0 && <ArrowRight className="h-5 w-5 rotate-180 text-muted-foreground" />}
                  <span className="flex-1 text-center text-sm font-medium">{label}</span>
                  {i === 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" />}
                </div>
              ))}
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}