"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ProgressBar } from "@/components/ui/ProgressBar";

const PROGRESS_BAR_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type ProgressBarVariant = "default" | "success" | "warning" | "error";
type ProgressBarSize = "sm" | "md" | "lg";

interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const VARIANT_MAP = {
  default: "bg-foreground",
  success: "bg-emerald-500 dark:bg-emerald-400",
  warning: "bg-amber-500 dark:bg-amber-400",
  error: "bg-red-500 dark:bg-red-400",
};

const SIZE_MAP = {
  sm: { bar: "h-1.5", label: "text-xs" },
  md: { bar: "h-2.5", label: "text-sm" },
  lg: { bar: "h-4", label: "text-base" },
};

export function ProgressBar({ value, variant = "default", size = "md", showLabel = false, animated = true, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}
        aria-label={\`Progress: \${Math.round(clamped)}%\`} className={cn("flex-1 overflow-hidden rounded-full bg-muted", SIZE_MAP[size].bar)}>
        <div className={cn("h-full rounded-full", VARIANT_MAP[variant], "transition-all duration-500 ease-out", animated && "animate-pulse")}
          style={{ width: \`\${clamped}%\` }} />
      </div>
      {showLabel && (
        <span className={cn("shrink-0 tabular-nums font-medium text-muted-foreground", SIZE_MAP[size].label)}>
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}`;

export default function ProgressBarPage() {
  return (
    <ComponentDocPage
      name="Progress Bar"
      category="Feedback"
      description="A compact progress bar with label, variant colors, sizes, and optional animation."
    >
      <PreviewPanel filename="progress-bar-preview.tsx">
        <div className="w-full max-w-sm">
          <ProgressBar value={65} showLabel />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={PROGRESS_BAR_SOURCE}
        filename="components/ui/ProgressBar/ProgressBar.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple progress bar."
          code={`import { ProgressBar } from "@/components/ui/ProgressBar";\n\n<ProgressBar value={60} />`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <ProgressBar value={60} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label"
          description="Display a percentage label next to the bar."
          code={`<ProgressBar value={75} showLabel />`}
          filename="with-label.tsx"
        >
          <div className="w-full max-w-sm">
            <ProgressBar value={75} showLabel />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Variants"
          description="Color variants for different statuses."
          code={`<ProgressBar value={80} variant="success" showLabel />\n<ProgressBar value={60} variant="warning" showLabel />\n<ProgressBar value={30} variant="error" showLabel />`}
          filename="variants.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <ProgressBar value={80} variant="success" showLabel />
            <ProgressBar value={60} variant="warning" showLabel />
            <ProgressBar value={30} variant="error" showLabel />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), lg."
          code={`<ProgressBar value={60} size="sm" showLabel />\n<ProgressBar value={60} size="md" showLabel />\n<ProgressBar value={60} size="lg" showLabel />`}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <ProgressBar value={60} size="sm" showLabel />
            <ProgressBar value={60} size="md" showLabel />
            <ProgressBar value={60} size="lg" showLabel />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Without Animation"
          description="Static bar without the pulse effect."
          code={`<ProgressBar value={50} animated={false} showLabel />`}
          filename="no-animation.tsx"
        >
          <div className="w-full max-w-sm">
            <ProgressBar value={50} animated={false} showLabel />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Width"
          description="Wrap to control the bar width."
          code={`<div className="w-1/2">\n  <ProgressBar value={80} showLabel />\n</div>`}
          filename="custom-width.tsx"
        >
          <div className="w-1/2">
            <ProgressBar value={80} showLabel />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
