"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Separator } from "@/components/ui/Separator";

const SEPARATOR_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
}: SeparatorProps) {
  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative ? orientation : undefined}
      className={cn(
        "shrink-0 bg-zinc-200 dark:bg-zinc-700",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  );
}`;

const DEFAULT_EXAMPLE = `<Separator />`;

const VERTICAL_EXAMPLE = `<div className="flex items-center gap-4">
  <span className="text-sm">Left</span>
  <Separator orientation="vertical" className="h-6" />
  <span className="text-sm">Right</span>
</div>`;

const CUSTOM_STYLE_EXAMPLE = `<Separator className="bg-primary/40" />`;

const WITH_CONTENT_EXAMPLE = `<div className="flex flex-col gap-4">
  <p className="text-sm">Content above</p>
  <Separator />
  <p className="text-sm">Content below</p>
</div>`;

export default function SeparatorPage() {
  return (
    <ComponentDocPage
      name="Separator"
      category="Layout"
      description="Visually or semantically separates content. Supports horizontal and optional vertical orientation."
    >
      <PreviewPanel filename="separator-preview">
        <div className="flex w-full max-w-md flex-col gap-4">
          <p className="text-sm">Content above</p>
          <Separator />
          <p className="text-sm">Content below</p>
          <div className="flex items-center gap-4">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm">Right</span>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={SEPARATOR_SOURCE} filename="Separator.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Horizontal separator to divide sections." code={DEFAULT_EXAMPLE}>
          <Separator />
        </ExampleBlock>

        <ExampleBlock title="Vertical" description="Vertical separator for inline content." code={VERTICAL_EXAMPLE}>
          <div className="flex items-center gap-4">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm">Right</span>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Custom Style" description="Separator with custom background color." code={CUSTOM_STYLE_EXAMPLE}>
          <Separator className="bg-primary/40" />
        </ExampleBlock>

        <ExampleBlock title="With Content" description="Separator placed between content blocks." code={WITH_CONTENT_EXAMPLE}>
          <div className="flex flex-col gap-4">
            <p className="text-sm">Content above</p>
            <Separator />
            <p className="text-sm">Content below</p>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
