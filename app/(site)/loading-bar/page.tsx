"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Loader, BarChart3, Activity, Zap, Settings, Play, Pause } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const LOADINGBAR_SOURCE = `"use client";

interface LoadingBarProps {
  value?: number;
  variant?: "default" | "indeterminate" | "gradient" | "striped";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeMap = { sm: "h-1", md: "h-2", lg: "h-3" };

export function LoadingBar({ value = 0, variant = "default", size = "md", showLabel = false, className = "" }: LoadingBarProps) {
  const indeterminate = variant === "indeterminate";
  const fill = indeterminate
    ? "w-1/3 animate-pulse"
    : variant === "gradient"
    ? "bg-gradient-to-r from-primary to-emerald-500"
    : variant === "striped"
    ? "bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.4)_6px,rgba(255,255,255,0.4)_12px)]"
    : "";

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Loading...</span>
          <span className="text-xs tabular-nums text-muted-foreground">{Math.round(value)}%</span>
        </div>
      )}
      <div className={\`w-full overflow-hidden rounded-full bg-muted \${sizeMap[size]} \${className}\`} role="progressbar" aria-valuenow={value}>
        <div
          className={\`h-full rounded-full bg-primary transition-all duration-300 \${fill}\`}
          style={indeterminate ? undefined : { width: \`\${Math.min(Math.max(value, 0), 100)}%\` }}
        />
      </div>
    </div>
  );
}`;

function LoadingBarDemo({ icon: Icon, name, iconName, label }: { icon: LucideIcon; name: string; iconName: string; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-background p-6">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">{name}</h3>
        <span className="ml-auto rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="text-center text-muted-foreground">
          <Icon className="mx-auto mb-3 h-12 w-12 opacity-30" />
          <p className="text-sm">{name} demonstration</p>
          <button onClick={() => setOpen(!open)} className="mt-2 text-xs text-primary hover:underline">
            {open ? "Hide" : "Show"} Details
          </button>
        </div>
      </div>
      {open && (
        <div className="rounded-lg bg-muted/50 p-3 font-mono text-xs text-muted-foreground">
          {JSON.stringify({ component: name, category: "Feedback", icon: iconName }, null, 2)}
        </div>
      )}
    </div>
  );
}

const DEMOS: { icon: LucideIcon; name: string; iconName: string; label: string }[] = [
  { icon: Loader, name: "TopBar", iconName: "Loader", label: "Demo 1" },
  { icon: BarChart3, name: "InlineBar", iconName: "BarChart3", label: "Demo 2" },
  { icon: Activity, name: "CircularBar", iconName: "Activity", label: "Demo 3" },
  { icon: Zap, name: "StepBar", iconName: "Zap", label: "Demo 4" },
  { icon: Settings, name: "ProgressBar", iconName: "Settings", label: "Demo 5" },
  { icon: Play, name: "IndeterminateBar", iconName: "Play", label: "Demo 6" },
  { icon: Pause, name: "ColorBar", iconName: "Pause", label: "Demo 7" },
];

function DemoGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DEMOS.map((d) => (
        <LoadingBarDemo key={d.name} {...d} />
      ))}
    </div>
  );
}

export default function LoadingBarPage() {
  return (
    <ComponentDocPage
      name="Loading Bar"
      category="Feedback"
      description="An animated loading bar component with indeterminate and determinate modes for page or content loading states."
    >
      <PreviewPanel filename="loading-bar.tsx">
        <DemoGrid />
      </PreviewPanel>

      <SourceCodeViewer source={LOADINGBAR_SOURCE} filename="components/ui/LoadingBar/LoadingBar.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="TopBar" description="Fixed bar pinned to the top of the page." code={`<LoadingBar value={progress} className="fixed top-0 left-0 right-0 z-50" />`}>
          <LoadingBarDemo icon={Loader} name="TopBar" iconName="Loader" label="Demo 1" />
        </ExampleBlock>
        <ExampleBlock title="InlineBar" description="Compact bar rendered inline with content." code={`<LoadingBar value={75} className="h-1.5" />`}>
          <LoadingBarDemo icon={BarChart3} name="InlineBar" iconName="BarChart3" label="Demo 2" />
        </ExampleBlock>
        <ExampleBlock title="CircularBar" description="Circular progress representation." code={`<LoadingBar value={85} size="lg" />`}>
          <LoadingBarDemo icon={Activity} name="CircularBar" iconName="Activity" label="Demo 3" />
        </ExampleBlock>
        <ExampleBlock title="StepBar" description="Striped bar for multi-step workflows." code={`<LoadingBar variant="striped" value={60} />`}>
          <LoadingBarDemo icon={Zap} name="StepBar" iconName="Zap" label="Demo 4" />
        </ExampleBlock>
        <ExampleBlock title="ProgressBar" description="Determinate bar with a visible label." code={`<LoadingBar value={45} showLabel />`}>
          <LoadingBarDemo icon={Settings} name="ProgressBar" iconName="Settings" label="Demo 5" />
        </ExampleBlock>
        <ExampleBlock title="IndeterminateBar" description="Animated bar for unknown loading duration." code={`<LoadingBar variant="indeterminate" />`}>
          <LoadingBarDemo icon={Play} name="IndeterminateBar" iconName="Play" label="Demo 6" />
        </ExampleBlock>
        <ExampleBlock title="ColorBar" description="Gradient bar with a color accent." code={`<LoadingBar variant="gradient" value={80} />`}>
          <LoadingBarDemo icon={Pause} name="ColorBar" iconName="Pause" label="Demo 7" />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
