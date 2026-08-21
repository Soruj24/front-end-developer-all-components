"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Spinner } from "@/components/ui";

const SPINNER_SOURCE = `import { cn } from "@/lib/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
  className?: string;
}

const SIZE_MAP = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const STROKE_MAP = { xs: 3, sm: 3, md: 2.5, lg: 2.5, xl: 2 };

function Spinner({ size = "md", color, label, className }: SpinnerProps) {
  const stroke = STROKE_MAP[size];
  return (
    <svg className={cn("animate-spin", SIZE_MAP[size], className)} viewBox="0 0 24 24" fill="none"
      role={label ? "status" : "presentation"} aria-label={label}>
      {label && <title>{label}</title>}
      <circle cx="12" cy="12" r="10" stroke={color ?? "currentColor"} strokeWidth={stroke} strokeLinecap="round" className="opacity-15" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke={color ?? "currentColor"} strokeWidth={stroke} strokeLinecap="round" />
    </svg>
  );
}

export default Spinner;
export { Spinner };`;

export default function SpinnerPage() {
  return (
    <ComponentDocPage
      name="Spinner"
      category="Feedback"
      description="An animated spinner for indicating loading states. Supports five sizes, custom colors, and accessible labels."
    >
      <PreviewPanel filename="spinner-preview.tsx">
        <Spinner size="lg" />
      </PreviewPanel>

      <SourceCodeViewer
        source={SPINNER_SOURCE}
        filename="components/ui/Spinner.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="The default spinner with medium size."
          code={`import { Spinner } from "@/components/ui";\n\n<Spinner />`}
          filename="default.tsx"
        >
          <Spinner />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Five sizes: xs, sm, md (default), lg, xl."
          code={`<Spinner size="xs" />\n<Spinner size="sm" />\n<Spinner size="md" />\n<Spinner size="lg" />\n<Spinner size="xl" />`}
          filename="sizes.tsx"
        >
          <div className="flex items-center gap-6">
            <Spinner size="xs" />
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Colors"
          description="Pass a color prop to customize the spinner color."
          code={`<Spinner color="#6366f1" />\n<Spinner color="#f43f5e" />\n<Spinner color="#10b981" />\n<Spinner color="#f59e0b" />`}
          filename="colors.tsx"
        >
          <div className="flex items-center gap-6">
            <Spinner size="lg" color="#6366f1" />
            <Spinner size="lg" color="#f43f5e" />
            <Spinner size="lg" color="#10b981" />
            <Spinner size="lg" color="#f59e0b" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label"
          description="Accessible spinner with a screen-reader label."
          code={`<Spinner size="lg" label="Loading..." />`}
          filename="label.tsx"
        >
          <div className="flex items-center gap-3">
            <Spinner size="lg" label="Loading..." />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="In Button"
          description="Spinner used inside a button for loading state."
          code={`<button disabled className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80">\n  <Spinner size="sm" color="currentColor" />\n  Saving...\n</button>`}
          filename="in-button.tsx"
        >
          <div className="flex gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-80"
            >
              <Spinner size="sm" color="currentColor" />
              Saving...
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground opacity-80"
            >
              <Spinner size="sm" />
              Loading...
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Overlay"
          description="Spinner centered in an overlay."
          code={`<div className="relative flex h-48 items-center justify-center rounded-xl border border-border bg-background/80 backdrop-blur-sm">\n  <div className="flex flex-col items-center gap-3">\n    <Spinner size="lg" />\n    <span className="text-sm text-muted-foreground">Loading content...</span>\n  </div>\n</div>`}
          filename="overlay.tsx"
        >
          <div className="relative flex h-48 w-full max-w-sm items-center justify-center rounded-xl border border-border bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Spinner size="lg" />
              <span className="text-sm text-muted-foreground">
                Loading content...
              </span>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Color"
          description="Pass any CSS color value."
          code={`<Spinner size="lg" color="hsl(262, 83%, 58%)" />`}
          filename="custom-color.tsx"
        >
          <div className="flex items-center gap-6">
            <Spinner size="lg" color="hsl(262, 83%, 58%)" />
            <Spinner size="lg" color="rgb(14, 165, 233)" />
            <Spinner size="lg" color="var(--color-primary, #3b82f6)" />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;xs&quot; | &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">currentColor</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
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
