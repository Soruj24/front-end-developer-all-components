"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  WAVELOADER_SOURCE,
  INTERACTIVE_EXAMPLE,
  BARS_EXAMPLE,
  SINE_EXAMPLE,
  USECASES_EXAMPLE,
} from "./wave-loader-source";

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
      <style>{`@keyframes wave-bar { 0%, 100% { height: 20%; } 50% { height: 100%; } }`}</style>
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
      <style>{`@keyframes wave-sine { 0% { transform: translateX(-20%); } 50% { transform: translateX(20%); } 100% { transform: translateX(-20%); } }`}</style>
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
      <style>{`@keyframes wave-circle { 0% { r: 10; opacity: 0.8; } 100% { r: 40; opacity: 0; } }`}</style>
    </div>
  );
}

export default function WaveLoaderPage() {
  const [color, setColor] = useState("#6366f1");
  const [bars, setBars] = useState(5);
  const [height, setHeight] = useState(30);
  const [speed, setSpeed] = useState(1.2);

  return (
    <ComponentDocPage name="Wave Loader" category="Feedback" description="Wave animation loader with bar, sine, and circle variants. Pure CSS animations for loading indicators and audio visualizations.">
      <PreviewPanel filename="wave-loader.tsx">
        <WaveBar bars={bars} color={color} height={height} speed={speed} />
      </PreviewPanel>

      <SourceCodeViewer source={WAVELOADER_SOURCE} filename="components/ui/WaveLoader/WaveLoader.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Demo" description="Customize the wave loader bars." code={INTERACTIVE_EXAMPLE}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex h-16 items-center justify-center">
              <WaveBar bars={bars} color={color} height={height} speed={speed} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
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
        </ExampleBlock>

        <ExampleBlock title="Bar Variants" description="Different bar configurations." code={BARS_EXAMPLE}>
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
        </ExampleBlock>

        <ExampleBlock title="Sine & Circle" description="Alternative wave animation styles." code={SINE_EXAMPLE}>
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
        </ExampleBlock>

        <ExampleBlock title="Use Cases" description="Loading states and audio visualizations." code={USECASES_EXAMPLE}>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}