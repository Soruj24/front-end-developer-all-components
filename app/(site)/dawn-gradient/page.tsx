"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  ComponentDocPage,
  ExampleBlock,
  PreviewPanel,
  SourceCodeViewer,
} from "@/components/docs";
import { cn } from "@/lib/cn";
import { DawnGradientDemo } from "./dawn-gradient";
import {
  DAWN_GRADIENT_SOURCE,
  EXAMPLE_STATIC,
  EXAMPLE_ANIMATED,
  EXAMPLE_SLOW,
} from "./dawn-gradient-source";

const SPEEDS = [
  { label: "Slow", value: 150 },
  { label: "Normal", value: 80 },
  { label: "Fast", value: 40 },
];

function PlaygroundDemo() {
  const [intervalMs, setIntervalMs] = useState(80);
  const [running, setRunning] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Animation speed"
          className="inline-flex w-fit rounded-lg border border-border bg-background p-1"
        >
          {SPEEDS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setIntervalMs(s.value)}
              aria-pressed={intervalMs === s.value}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                intervalMs === s.value
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          aria-pressed={running}
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
            running
              ? "border border-border bg-background text-foreground hover:bg-muted"
              : "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {running ? (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {running ? "Stop" : "Animate"}
        </button>
      </div>

      <DawnGradientDemo
        key={`${intervalMs}-${running}`}
        defaultRunning={running}
        intervalMs={intervalMs}
        title="Dawn Gradient"
        description={`${intervalMs}ms per rotation step`}
      />
    </div>
  );
}

export default function DawnGradientPage() {
  return (
    <ComponentDocPage
      name="Dawn Gradient"
      category="Data Display"
      description="An animated conic-gradient backdrop card with play/pause controls, a manual angle slider, live degree readout, and reduced-motion support."
    >
      <PreviewPanel filename="dawn-gradient.tsx">
        <DawnGradientDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DAWN_GRADIENT_SOURCE}
        filename="components/ui/DawnGradient/DawnGradient.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Static"
          description="A still gradient at 0°. No timer is created until Animate is pressed."
          code={EXAMPLE_STATIC}
          filename="static.tsx"
        >
          <DawnGradientDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Animated"
          description="Starts rotating automatically and can be paused at any time."
          code={EXAMPLE_ANIMATED}
          filename="animated.tsx"
        >
          <DawnGradientDemo defaultRunning />
        </ExampleBlock>

        <ExampleBlock
          title="Slow Spin"
          description="A calmer rotation using a longer interval between steps."
          code={EXAMPLE_SLOW}
          filename="slow-spin.tsx"
        >
          <DawnGradientDemo
            defaultRunning
            intervalMs={150}
            title="Slow Spin"
            description="150ms per rotation step"
          />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Pick a rotation speed and drive the animation yourself."
          code={EXAMPLE_ANIMATED}
          filename="playground.tsx"
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
