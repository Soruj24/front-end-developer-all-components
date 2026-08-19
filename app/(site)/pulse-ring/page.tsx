"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  PULSERING_SOURCE,
  INTERACTIVE_EXAMPLE,
  SIZES_EXAMPLE,
  COLORS_EXAMPLE,
  STATUS_EXAMPLE,
  CARD_EXAMPLE,
} from "./pulse-ring-source";

function PulseRingDemo({ color = "#6366f1", size = 48, rings = 3, speed = 1.5 }: { color?: string; size?: number; rings?: number; speed?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full" style={{ width: size * 0.35, height: size * 0.35, backgroundColor: color }} />
      </div>
      {Array.from({ length: rings }, (_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color,
            animation: `pulse-ring-expand ${speed}s ${i * (speed / rings)}s ease-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-ring-expand {
          0% { transform: scale(0.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function PulseStatus({ label, color, active }: { label: string; color: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
        {active && (
          <>
            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: color, animation: "pulse-ring-expand 1.5s ease-out infinite" }} />
            <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: color, animation: "pulse-ring-expand 1.5s 0.5s ease-out infinite" }} />
          </>
        )}
      </div>
      <span className="text-sm font-medium">{label}</span>
      <span className={`text-xs ${active ? "text-emerald-500" : "text-muted-foreground"}`}>{active ? "Active" : "Inactive"}</span>
    </div>
  );
}

export default function PulseRingPage() {
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(64);
  const [rings, setRings] = useState(3);
  const [speed, setSpeed] = useState(1.5);

  return (
    <ComponentDocPage name="Pulse Ring" category="Feedback" description="Expanding pulse ring animation for indicating active status, notifications, or attention on UI elements.">
      <PreviewPanel filename="pulse-ring.tsx">
        <PulseRingDemo color={color} size={size} rings={rings} speed={speed} />
      </PreviewPanel>

      <SourceCodeViewer source={PULSERING_SOURCE} filename="components/ui/PulseRing/PulseRing.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Demo" description="Customize the pulse ring animation." code={INTERACTIVE_EXAMPLE}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-32 items-center justify-center">
              <PulseRingDemo color={color} size={size} rings={rings} speed={speed} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Size <input type="range" min={32} max={120} value={size} onChange={(e) => setSize(+e.target.value)} className="w-20" /> <span className="w-8 text-right text-xs font-mono">{size}px</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Rings <input type="range" min={1} max={5} value={rings} onChange={(e) => setRings(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{rings}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Speed <input type="range" min={0.5} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{speed}s</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
              </label>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Different pulse ring sizes for various contexts." code={SIZES_EXAMPLE}>
          <div className="flex flex-wrap items-end gap-8">
            {[32, 48, 64, 80, 96].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <PulseRingDemo color="#6366f1" size={s} rings={3} />
                <span className="text-xs text-muted-foreground">{s}px</span>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Color Variants" description="Different colors for status indication." code={COLORS_EXAMPLE}>
          <div className="flex flex-wrap items-center gap-8">
            {[
              { color: "#10b981", label: "Online" },
              { color: "#6366f1", label: "Primary" },
              { color: "#f94144", label: "Urgent" },
              { color: "#f9c74f", label: "Warning" },
              { color: "#8b5cf6", label: "Info" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <PulseRingDemo color={c.color} size={48} rings={2} />
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Status Indicators" description="Real-world usage with status labels." code={STATUS_EXAMPLE}>
          <div className="flex flex-col gap-4">
            <PulseStatus label="Online" color="#10b981" active={true} />
            <PulseStatus label="Recording" color="#f94144" active={true} />
            <PulseStatus label="In Meeting" color="#f9c74f" active={true} />
            <PulseStatus label="Offline" color="#6b7280" active={false} />
            <PulseStatus label="Away" color="#8b5cf6" active={false} />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Card Overlay" description="Pulse rings overlaid on card elements." code={CARD_EXAMPLE}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border border-border p-5 dark:border-border">
              <div className="absolute top-3 right-3"><PulseRingDemo color="#10b981" size={24} rings={2} /></div>
              <h3 className="text-sm font-semibold">Live Stream</h3>
              <p className="mt-1 text-xs text-muted-foreground">1,247 viewers watching now</p>
            </div>
            <div className="relative overflow-hidden rounded-xl border border-border p-5 dark:border-border">
              <div className="absolute top-3 right-3"><PulseRingDemo color="#f94144" size={24} rings={2} /></div>
              <h3 className="text-sm font-semibold">Recording</h3>
              <p className="mt-1 text-xs text-muted-foreground">02:34 elapsed</p>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
