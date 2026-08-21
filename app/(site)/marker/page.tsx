"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Marker } from "@/components/ui/Marker";

const MARKER_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type MarkerVariant = "yellow" | "green" | "blue" | "pink" | "red" | "purple";

interface MarkerProps {
  children: React.ReactNode;
  active?: boolean;
  variant?: MarkerVariant;
  className?: string;
}

export function Marker({ children, active = false, variant = "yellow", className }: MarkerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 font-medium transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
        active
          ? cn(
              variant === "yellow" && "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
              variant === "green" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
              variant === "blue" && "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
              variant === "pink" && "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
              variant === "red" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
              variant === "purple" && "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
            )
          : "bg-muted text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}`;

const USAGE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<Marker>Default marker</Marker>
<Marker active>Active marker</Marker>`;

const VARIANT_SOURCE = `import { Marker } from "@/components/ui/Marker";

<Marker active variant="yellow">Yellow</Marker>
<Marker active variant="green">Green</Marker>
<Marker active variant="blue">Blue</Marker>
<Marker active variant="pink">Pink</Marker>
<Marker active variant="red">Red</Marker>
<Marker active variant="purple">Purple</Marker>`;

const INLINE_SOURCE = `import { Marker } from "@/components/ui/Marker";

<p>
  This is a paragraph with <Marker active>highlighted text</Marker> mixed
  with <Marker>non-highlighted text</Marker> for emphasis.
</p>`;

export default function MarkerPage() {
  return (
    <ComponentDocPage
      name="Marker"
      category="Data Display"
      description="Inline text highlight component with color variants. Use it to draw attention to specific words or phrases."
    >
      <PreviewPanel filename="marker-preview.tsx">
        <div className="flex flex-wrap items-center gap-3 text-lg">
          <span>Plain text</span>
          <Marker active>Highlighted text</Marker>
          <span>More text</span>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={MARKER_SOURCE} filename="components/ui/Marker/Marker.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Usage"
          description="Default and active state markers."
          code={USAGE_SOURCE}
          filename="basic.tsx"
        >
          <div className="flex flex-wrap items-center gap-3 text-base">
            <Marker>Default marker</Marker>
            <Marker active>Active marker</Marker>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Color Variants"
          description="Six built-in color variants for different contexts."
          code={VARIANT_SOURCE}
          filename="variants.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Marker active variant="yellow">Yellow</Marker>
            <Marker active variant="green">Green</Marker>
            <Marker active variant="blue">Blue</Marker>
            <Marker active variant="pink">Pink</Marker>
            <Marker active variant="red">Red</Marker>
            <Marker active variant="purple">Purple</Marker>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">active</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;yellow&quot; | &quot;green&quot; | &quot;blue&quot; | &quot;pink&quot; | &quot;red&quot; | &quot;purple&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;yellow&quot;</td>
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
