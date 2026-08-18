"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add wave-loader`;

const usageCode = `import { WaveLoader } from "@/components/_wave-loader";

<WaveLoader />
<WaveLoader bars={7} color="#6366f1" height={40} />`;

function WaveBar({ bars = 5, color = "#6366f1", barWidth = 4, gap = 3, height = 30, speed = 1.2 }: { bars?: number; color?: string; barWidth?: number; gap?: number; height?: number; speed?: number }) {
  return (
    <div className="flex items-end" style={{ height, gap }}>
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: barWidth, backgroundColor: color,
            animation: `wave-bar ${speed}s ${i * 0.1}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes wave-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
}

function WaveSine({ color = "#6366f1", width = 200, height = 40 }: { color?: string; width?: number; height?: number }) {
  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full">
        <path
          d={`M0 ${height / 2} Q${width / 4} 0 ${width / 2} ${height / 2} T${width} ${height / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          style={{ animation: "wave-sine 2s ease-in-out infinite" }}
        />
      </svg>
      <style>{`
        @keyframes wave-sine {
          0% { transform: translateX(-20%); }
          50% { transform: translateX(20%); }
          100% { transform: translateX(-20%); }
        }
      `}</style>
    </div>
  );
}

function WaveCircle({ color = "#6366f1", size = 60 }: { color?: string; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="50" cy="50" r="15"
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity={1 - i * 0.3}
            style={{ animation: `wave-circle ${1.5 + i * 0.3}s ${i * 0.2}s ease-out infinite` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes wave-circle {
          0% { r: 10; opacity: 0.8; }
          100% { r: 40; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function WaveLoaderPage() {
  const [color, setColor] = useState("#6366f1");
  const [bars, setBars] = useState(5);
  const [height, setHeight] = useState(30);
  const [speed, setSpeed] = useState(1.2);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wave Loader</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Wave animation loader with bar, sine, and circle variants. Pure CSS animations for loading indicators and audio visualizations.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Customize the wave loader bars.</p>
        </div>
        <ComponentPreview id="wave-interactive">
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-16 items-center justify-center">
              <WaveBar bars={bars} color={color} height={height} speed={speed} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Bars <input type="range" min={3} max={12} value={bars} onChange={(e) => setBars(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{bars}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Height <input type="range" min={16} max={64} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-20" /> <span className="w-8 text-right text-xs font-mono">{height}px</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Speed <input type="range" min={0.5} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-20" /> <span className="w-6 text-right text-xs font-mono">{speed}s</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
              </label>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Bar Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different bar configurations.</p>
        </div>
        <ComponentPreview id="wave-bars">
          <div className="flex flex-wrap items-end gap-10">
            <div className="flex flex-col items-center gap-2">
              <WaveBar bars={3} color="#6366f1" />
              <span className="text-xs text-muted-foreground">Minimal</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveBar bars={5} color="#10b981" />
              <span className="text-xs text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveBar bars={7} color="#f94144" height={40} barWidth={3} />
              <span className="text-xs text-muted-foreground">Dense</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveBar bars={9} color="#8b5cf6" height={50} barWidth={5} gap={2} />
              <span className="text-xs text-muted-foreground">Wide</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sine & Circle</h2>
          <p className="mt-1 text-sm text-muted-foreground">Alternative wave animation styles.</p>
        </div>
        <ComponentPreview id="wave-alternatives">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <WaveSine color="#6366f1" />
              <span className="text-xs text-muted-foreground">Sine wave</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveSine color="#10b981" width={250} />
              <span className="text-xs text-muted-foreground">Extended</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveCircle color="#f94144" size={50} />
              <span className="text-xs text-muted-foreground">Circle</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <WaveCircle color="#8b5cf6" size={70} />
              <span className="text-xs text-muted-foreground">Large circle</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">Loading states and audio visualizations.</p>
        </div>
        <ComponentPreview id="wave-usecases">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-3">
                <WaveBar bars={5} color="#6366f1" barWidth={3} height={24} />
                <span className="text-sm font-medium">Loading content</span>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-3">
                <WaveBar bars={5} color="#10b981" barWidth={3} height={24} speed={0.8} />
                <span className="text-sm font-medium">Audio playing</span>
              </div>
              <p className="text-xs text-muted-foreground">Now playing: Ambient Music</p>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-3">
                <WaveCircle color="#f94144" size={32} />
                <span className="text-sm font-medium">Processing</span>
              </div>
              <p className="text-xs text-muted-foreground">Analyzing data...</p>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-3">
                <WaveSine color="#8b5cf6" width={120} height={24} />
                <span className="text-sm font-medium">Voice input</span>
              </div>
              <p className="text-xs text-muted-foreground">Speak now...</p>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "bars", type: "number", def: "5", req: "No" },
                { prop: "color", type: "string", def: "\"#6366f1\"", req: "No" },
                { prop: "height", type: "number", def: "30", req: "No" },
                { prop: "barWidth", type: "number", def: "4", req: "No" },
                { prop: "gap", type: "number", def: "3", req: "No" },
                { prop: "speed", type: "number", def: "1.2", req: "No" },
              ].map((row) => (
                <tr key={row.prop} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.def}</td>
                  <td className="px-4 py-3">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
