"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CIRCLEPROGRESS_SOURCE = `"use client";

interface CircleProgressProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

const sizeMap = { sm: 32, md: 48, lg: 64, xl: 80 };

export function CircleProgress({
  value,
  size = "md",
  color = "text-primary",
  strokeWidth = 2,
  showLabel = true,
  className = "",
}: CircleProgressProps) {
  const px = sizeMap[size];
  return (
    <div
      className={\`relative inline-flex items-center justify-center \${className}\`}
      style={{ width: px, height: px }}
      role="progressbar"
      aria-valuenow={value}
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted" />
        <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={\`\${value} 100\`} strokeLinecap="round" className={color} />
      </svg>
      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {value}%
        </span>
      )}
    </div>
  );
}`;

function BasicProgress() {
  return (
    <div className="flex items-center justify-center gap-8">
      {[25, 50, 75, 100].map((value) => (
        <div key={value} className="flex flex-col items-center gap-2">
          <div className="relative h-16 w-16">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
              <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray={`${value} 100`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">{value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Sizes() {
  return (
    <div className="flex items-end justify-center gap-6">
      {["sm", "md", "lg", "xl"].map((size) => {
        const s = size === "sm" ? 32 : size === "md" ? 48 : size === "lg" ? 64 : 80;
        return (
          <div key={size} className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: s, height: s }}>
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="75 100" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium">75%</span>
            </div>
            <span className="text-xs text-muted-foreground">{size}</span>
          </div>
        );
      })}
    </div>
  );
}

function MultiRing() {
  return (
    <div>
      <div className="relative mx-auto h-24 w-24">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" strokeDasharray="85 100" strokeLinecap="round" />
          <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" strokeDasharray="65 100" strokeLinecap="round" />
          <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
          <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500" strokeDasharray="45 100" strokeLinecap="round" />
        </svg>
      </div>
      <div className="mt-3 flex justify-center gap-4">
        {[{ label: "Health", color: "bg-primary" }, { label: "Memory", color: "bg-emerald-500" }, { label: "CPU", color: "bg-amber-500" }].map((m) => (
          <div key={m.label} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${m.color}`} />
            <span className="text-[10px] text-muted-foreground">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CircleProgressPage() {
  return (
    <ComponentDocPage
      name="Circle Progress"
      category="Feedback"
      description="A circular progress indicator for showing completion status, loading states, and metric visualizations."
    >
      <PreviewPanel filename="circle-progress.tsx">
        <BasicProgress />
      </PreviewPanel>

      <SourceCodeViewer source={CIRCLEPROGRESS_SOURCE} filename="components/ui/CircleProgress/CircleProgress.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Progress" description="Simple circular progress with percentage display." code={`<CircleProgress value={75} size="lg" />`}>
          <BasicProgress />
        </ExampleBlock>
        <ExampleBlock title="Sizes" description="Different sizes of circular progress indicators." code={`<div className="flex items-end gap-6">
  <CircleProgress value={75} size="sm" />
  <CircleProgress value={75} size="md" />
  <CircleProgress value={75} size="lg" />
  <CircleProgress value={75} size="xl" />
</div>`}>
          <Sizes />
        </ExampleBlock>
        <ExampleBlock title="Multi-Ring" description="Nested progress rings for multiple metrics." code={`<svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary" strokeDasharray="85 100" />
  <circle cx="18" cy="18" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" strokeDasharray="65 100" />
  <circle cx="18" cy="18" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-500" strokeDasharray="45 100" />
</svg>`}>
          <MultiRing />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
