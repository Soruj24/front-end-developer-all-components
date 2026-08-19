"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const MARKER_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import type { MarkerProps } from "./Marker.types";

export function Marker({ children, active = false, className }: MarkerProps) {
  return (
    <span
      className={cn(
        "rounded px-0.5 transition-colors duration-200",
        active
          ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-100"
          : "bg-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}`;

const USAGE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<Marker>Plain text</Marker>
<Marker active>Highlighted text</Marker>`;

const ACTIVE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<Marker active>Important note</Marker>
<Marker active>Another highlighted item</Marker>
<Marker>Non-active text</Marker>`;

const CUSTOM_STYLE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<Marker active className="bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100">
  Custom green highlight
</Marker>
<Marker active className="bg-pink-200 text-pink-900 dark:bg-pink-800 dark:text-pink-100">
  Custom pink highlight
</Marker>`;

const INLINE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<p>
  This is a paragraph with <Marker active>highlighted text</Marker> mixed
  with <Marker>non-highlighted text</Marker> for emphasis.
</p>`;

function InlineMarker({ active, className, children }: { active?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <Marker active={active} className={className}>
      {children}
    </Marker>
  );
}

export default function MarkerPage() {
  return (
    <ComponentDocPage
      name="Marker"
      category="Data Display"
      description="A simple inline text highlight component. Use it to draw attention to specific words or phrases within a block of text."
    >
      <PreviewPanel filename="marker-preview.tsx">
        <div className="flex flex-wrap items-center gap-4 text-lg">
          <span>Plain text</span>
          <Marker active>Highlighted text</Marker>
          <span>More text</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={MARKER_SOURCE}
        filename="components/ui/Marker/Marker.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic Usage"
          description="Wrap any text content with the Marker component."
          code={USAGE_SOURCE}
          filename="basic.tsx"
        >
          <div className="flex flex-wrap items-center gap-4 text-base">
            <span>Plain text</span>
            <Marker active>Highlighted text</Marker>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Active State"
          description="Toggle the active prop to highlight text with a yellow background."
          code={ACTIVE_SOURCE}
          filename="active.tsx"
        >
          <div className="flex flex-wrap items-center gap-4 text-base">
            <Marker active>Important note</Marker>
            <Marker active>Another highlighted item</Marker>
            <Marker>Non-active text</Marker>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Styles"
          description="Override the default highlight color using className."
          code={CUSTOM_STYLE_SOURCE}
          filename="custom-styles.tsx"
        >
          <div className="flex flex-wrap items-center gap-4 text-base">
            <Marker active className="bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100">
              Custom green
            </Marker>
            <Marker active className="bg-pink-200 text-pink-900 dark:bg-pink-800 dark:text-pink-100">
              Custom pink
            </Marker>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Inline Usage"
          description="Use Marker inline within paragraphs to highlight specific words."
          code={INLINE_SOURCE}
          filename="inline.tsx"
        >
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            This is a paragraph with <Marker active>highlighted text</Marker> mixed
            with <Marker>non-highlighted text</Marker> for emphasis.
          </p>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}