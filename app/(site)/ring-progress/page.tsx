"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const RINGPROGRESS_SOURCE = `"use client";

interface RingProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function RingProgress({
  value,
  size = 80,
  strokeWidth = 8,
  color = "text-primary",
  showLabel = true,
  className = "",
}: RingProgressProps) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className={\`relative inline-flex items-center justify-center \${className}\`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={value}
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={color} />
      </svg>
      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
          {value}%
        </span>
      )}
    </div>
  );
}`;

function PrimaryRing() {
  return (
    <div className="relative h-20 w-20">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" className="text-primary" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">75%</span>
    </div>
  );
}

function EmeraldRing() {
  return (
    <div className="relative h-16 w-16">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="125.6" strokeLinecap="round" className="text-emerald-500" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">50%</span>
    </div>
  );
}

export default function RingProgressPage() {
  return (
    <ComponentDocPage
      name="Ring Progress"
      category="Feedback"
      description="A circular progress indicator that shows completion as a ring arc."
    >
      <PreviewPanel filename="ring-progress.tsx">
        <div className="flex items-center justify-center gap-8">
          <PrimaryRing />
          <EmeraldRing />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={RINGPROGRESS_SOURCE} filename="components/ui/RingProgress/RingProgress.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Ring Progress" description="Circular progress indicator with customizable size and color." code={`<RingProgress value={75} />`}>
          <PrimaryRing />
        </ExampleBlock>
        <ExampleBlock title="Custom Color & Size" description="Smaller ring with an emerald accent color." code={`<RingProgress value={50} size={64} strokeWidth={10} color="text-emerald-500" />`}>
          <EmeraldRing />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
