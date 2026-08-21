"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Progress } from "@/components/ui/Progress";

const PROGRESS_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type ProgressVariant = "default" | "success" | "warning" | "danger" | "info";
type ProgressSize = "sm" | "md" | "lg";

interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  className?: string;
}

const VARIANT_MAP = {
  default: "bg-foreground",
  success: "bg-emerald-500 dark:bg-emerald-400",
  warning: "bg-amber-500 dark:bg-amber-400",
  danger: "bg-red-500 dark:bg-red-400",
  info: "bg-primary",
};

const SIZE_MAP = { sm: "h-1.5", md: "h-2.5", lg: "h-3.5" };

export function Progress({ value = 0, max = 100, label, showValue = false, variant = "default", size = "md", indeterminate = false, className }: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && !indeterminate && <span className="text-sm tabular-nums text-muted-foreground">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={indeterminate ? undefined : value}
        aria-label={label || "Progress"} className={cn("w-full overflow-hidden rounded-full bg-muted", SIZE_MAP[size])}>
        {indeterminate ? (
          <div className={cn("h-full w-1/3 rounded-full", VARIANT_MAP[variant], "animate-[indeterminate_1.5s_ease-in-out_infinite]")} />
        ) : (
          <div className={cn("h-full rounded-full", VARIANT_MAP[variant], "transition-all duration-500 ease-out")} style={{ width: \`\${percentage}%\` }} />
        )}
      </div>
      <style>{\`
        @keyframes indeterminate {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      \`}</style>
    </div>
  );
}`;

export default function ProgressPage() {
  return (
    <ComponentDocPage
      name="Progress"
      category="Feedback"
      description="Displays an indicator showing completion progress of a task. Supports labels, percentage display, custom max values, variants, sizes, and indeterminate mode."
    >
      <PreviewPanel filename="progress-preview.tsx">
        <div className="w-full max-w-sm">
          <Progress value={60} showValue label="Loading..." />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={PROGRESS_SOURCE}
        filename="components/ui/Progress/Progress.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple progress bar."
          code={`import { Progress } from "@/components/ui/Progress";\n\n<Progress value={60} />`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={60} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Show Value"
          description="Display the current percentage next to the bar."
          code={`<Progress value={75} showValue />`}
          filename="show-value.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={75} showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label"
          description="Add a descriptive label above the progress bar."
          code={`<Progress value={50} label="Uploading..." showValue />`}
          filename="label.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={50} label="Uploading..." showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Max"
          description="Set a custom max value to represent partial progress."
          code={`<Progress value={3} max={5} label="Steps completed" showValue />`}
          filename="custom-max.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={3} max={5} label="Steps completed" showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Variants"
          description="Color variants for different statuses."
          code={`<Progress value={80} variant="success" showValue label="Complete" />\n<Progress value={60} variant="warning" showValue label="Warning" />\n<Progress value={30} variant="danger" showValue label="Critical" />\n<Progress value={50} variant="info" showValue label="Info" />`}
          filename="variants.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Progress value={80} variant="success" showValue label="Complete" />
            <Progress value={60} variant="warning" showValue label="Warning" />
            <Progress value={30} variant="danger" showValue label="Critical" />
            <Progress value={50} variant="info" showValue label="Info" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), lg."
          code={`<Progress value={60} size="sm" label="Small" showValue />\n<Progress value={60} size="md" label="Medium" showValue />\n<Progress value={60} size="lg" label="Large" showValue />`}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Progress value={60} size="sm" label="Small" showValue />
            <Progress value={60} size="md" label="Medium" showValue />
            <Progress value={60} size="lg" label="Large" showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Indeterminate"
          description="Animated loading bar without a specific value."
          code={`<Progress indeterminate label="Loading..." />\n<Progress indeterminate variant="info" size="lg" />`}
          filename="indeterminate.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Progress indeterminate label="Loading..." />
            <Progress indeterminate variant="info" size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Width"
          description="Wrap the progress bar to control its width."
          code={`<div className="w-1/2">\n  <Progress value={80} showValue />\n</div>`}
          filename="custom-width.tsx"
        >
          <div className="w-1/2">
            <Progress value={80} showValue />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">showValue</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;danger&quot; | &quot;info&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">indeterminate</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
