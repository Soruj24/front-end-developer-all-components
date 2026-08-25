"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Separator } from "@/components/ui/Separator";

const SEPARATOR_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type SeparatorVariant = "solid" | "dashed" | "dotted" | "gradient";

interface SeparatorProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  variant?: SeparatorVariant;
  className?: string;
}

const VARIANT_HORIZONTAL = {
  solid: "h-px w-full bg-border",
  dashed: "h-px w-full border-t border-dashed border-border bg-transparent",
  dotted: "h-px w-full border-t border-dotted border-border bg-transparent",
  gradient: "h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",
};

const VARIANT_VERTICAL = {
  solid: "h-full w-px bg-border",
  dashed: "h-full w-px border-l border-dashed border-border bg-transparent",
  dotted: "h-full w-px border-l border-dotted border-border bg-transparent",
  gradient: "h-full w-px bg-gradient-to-b from-transparent via-border to-transparent",
};

export function Separator({ orientation = "horizontal", decorative = true, variant = "solid", className }: SeparatorProps) {
  return (
    <div role={decorative ? "none" : "separator"} aria-orientation={!decorative ? orientation : undefined}
      className={cn("shrink-0", orientation === "horizontal" ? VARIANT_HORIZONTAL[variant] : VARIANT_VERTICAL[variant], className)} />
  );
}`;

export default function SeparatorPage() {
  return (
    <ComponentDocPage
      name="Separator"
      category="Layout"
      description="Visually or semantically separates content. Supports horizontal/vertical orientation and solid, dashed, dotted, gradient variants."
    >
      <PreviewPanel filename="separator-preview.tsx">
        <div className="flex w-full max-w-md flex-col gap-4">
          <p className="text-sm text-muted-foreground">Content above</p>
          <Separator />
          <p className="text-sm text-muted-foreground">Content below</p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Left</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">Right</span>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SEPARATOR_SOURCE}
        filename="components/ui/Separator/Separator.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Horizontal solid separator."
          code={`import { Separator } from "@/components/ui/Separator";\n\n<Separator />`}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Vertical"
          description="Vertical separator for inline content."
          code={`<div className="flex items-center gap-4">\n  <span>Left</span>\n  <Separator orientation="vertical" className="h-6" />\n  <span>Right</span>\n</div>`}
          filename="vertical.tsx"
        >
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Left</span>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-sm text-muted-foreground">Right</span>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dashed"
          description="Dashed line variant."
          code={`<Separator variant="dashed" />`}
          filename="dashed.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator variant="dashed" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Dotted"
          description="Dotted line variant."
          code={`<Separator variant="dotted" />`}
          filename="dotted.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator variant="dotted" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Gradient"
          description="Faded gradient variant that fades from transparent to opaque."
          code={`<Separator variant="gradient" />`}
          filename="gradient.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator variant="gradient" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Color"
          description="Override the color with Tailwind classes."
          code={`<Separator className="bg-primary/40" />`}
          filename="custom-color.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator className="bg-primary/40" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Content"
          description="Separator placed between content blocks."
          code={`<div className="flex flex-col gap-4">\n  <p>Content above</p>\n  <Separator />\n  <p>Content below</p>\n</div>`}
          filename="with-content.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <p className="text-sm text-muted-foreground">Content above</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Content below</p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Semantic"
          description="Non-decorative separator for screen readers."
          code={`<Separator decorative={false} />`}
          filename="semantic.tsx"
        >
          <div className="w-full max-w-sm">
            <Separator decorative={false} />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
