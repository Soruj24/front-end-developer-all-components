"use client";

import { Progress } from "@/components/ui/Progress";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const PROGRESS_SOURCE = `"use client";

import { cn } from "@/lib/cn";

export interface ProgressProps {
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  label,
  showValue = false,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && <span className="text-sm text-zinc-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full rounded-full bg-zinc-900 transition-all duration-300 ease-in-out dark:bg-zinc-50"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}`;

const BASIC_SOURCE = `import { Progress } from "@/components/ui/Progress";

<Progress value={60} />`;

const SHOW_VALUE_SOURCE = `import { Progress } from "@/components/ui/Progress";

<Progress value={75} showValue />`;

const LABEL_SOURCE = `import { Progress } from "@/components/ui/Progress";

<Progress value={50} label="Uploading..." showValue />`;

const MAX_SOURCE = `import { Progress } from "@/components/ui/Progress";

<Progress value={3} max={5} label="Steps completed" showValue />`;

const CUSTOM_STYLE_SOURCE = `import { Progress } from "@/components/ui/Progress";

<div className="w-1/2">
  <Progress value={80} showValue />
</div>`;

export default function ProgressPage() {
  return (
    <ComponentDocPage
      name="Progress"
      category="Feedback"
      description="Displays an indicator showing completion progress of a task. Supports labels, percentage display, and custom max values."
    >
      <PreviewPanel filename="progress-preview.tsx">
        <div className="w-full max-w-sm">
          <Progress value={60} showValue label="Loading..." />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={PROGRESS_SOURCE}
        filename="components/ui/Progress.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic"
          description="Simple progress bar with a percentage value."
          code={BASIC_SOURCE}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={60} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Show Value"
          description="Display the current percentage next to the bar."
          code={SHOW_VALUE_SOURCE}
          filename="show-value.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={75} showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label"
          description="Add a descriptive label above the progress bar."
          code={LABEL_SOURCE}
          filename="label.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={50} label="Uploading..." showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Max"
          description="Set a custom max value to represent partial progress."
          code={MAX_SOURCE}
          filename="custom-max.tsx"
        >
          <div className="w-full max-w-sm">
            <Progress value={3} max={5} label="Steps completed" showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Width"
          description="Wrap the progress bar to control its width."
          code={CUSTOM_STYLE_SOURCE}
          filename="custom-width.tsx"
        >
          <div className="w-1/2">
            <Progress value={80} showValue />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
