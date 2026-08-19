"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { COLOR_WHEEL_SOURCE } from "./color-wheel-source";

const wheelSwatches = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#fb923c", "#facc15", "#4ade80", "#22d3ee", "#60a5fa", "#a78bfa", "#f472b6"];

const WHEEL_CODE = `<div
  className="h-40 w-40 rounded-full"
  style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
/>`;

const SWATCHES_CODE = `<div className="grid grid-cols-8 gap-2">
  {swatches.map((c) => (
    <button
      key={c}
      className="h-8 w-8 rounded-lg border border-border"
      style={{ backgroundColor: c }}
    />
  ))}
</div>`;

const INPUT_CODE = `<ColorWheel value={color} onChange={setColor} />`;

function WheelDemo() {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="h-40 w-40 rounded-full" style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}>
          <div className="m-[30%] h-[40%] w-[40%] rounded-full bg-card border-2 border-white shadow-lg" />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500 border border-border" />
          <span className="text-sm font-mono">#3B82F6</span>
        </div>
      </div>
    </div>
  );
}

function SwatchesDemo() {
  return (
    <div className="w-full p-4">
      <div className="max-w-sm mx-auto space-y-3">
        <div className="grid grid-cols-8 gap-2">
          {wheelSwatches.map((c) => (
            <button key={c} className="h-8 w-8 rounded-lg border border-border" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {["#ef4444", "#3b82f6", "#22c55e"].map((c) => (
            <div key={c} className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
              <div className="h-4 w-4 rounded" style={{ backgroundColor: c }} />
              <span className="text-[10px] font-mono">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PickerInputDemo() {
  return (
    <div className="w-full p-4">
      <div className="max-w-xs mx-auto rounded-xl border border-border bg-card p-4">
        <div className="h-32 rounded-lg mb-3" style={{ background: "linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(210, 100%, 50%))" }} />
        <div className="h-3 rounded-full" style={{ background: "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))" }} />
        <div className="flex gap-2 mt-3">
          <div className="flex-1 px-2 py-1.5 rounded-md border border-border bg-background text-xs font-mono">#3B82F6</div>
          <div className="h-8 w-8 rounded-md bg-blue-500 border border-border" />
        </div>
      </div>
    </div>
  );
}

export default function ColorWheelPage() {
  return (
    <ComponentDocPage
      name="Color Wheel"
      category="Forms"
      description="A color picker wheel component for selecting colors visually with hue, saturation, and brightness controls."
    >
      <PreviewPanel filename="color-wheel.tsx">
        <WheelDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COLOR_WHEEL_SOURCE}
        filename="components/ui/ColorWheel/ColorWheel.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Color Wheel" description="A circular color wheel for visual color selection." code={WHEEL_CODE}>
          <WheelDemo />
        </ExampleBlock>

        <ExampleBlock title="Swatches" description="Quick color selection from predefined swatches." code={SWATCHES_CODE}>
          <SwatchesDemo />
        </ExampleBlock>

        <ExampleBlock title="Color Picker with Input" description="Wheel combined with hex input and recent colors." code={INPUT_CODE}>
          <PickerInputDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}