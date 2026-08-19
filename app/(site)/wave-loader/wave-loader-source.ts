export const WAVELOADER_SOURCE = `"use client";

interface WaveLoaderProps {
  bars?: number;
  color?: string;
  barWidth?: number;
  gap?: number;
  height?: number;
  speed?: number;
}

export function WaveLoader({
  bars = 5,
  color = "#6366f1",
  barWidth = 4,
  gap = 3,
  height = 30,
  speed = 1.2,
}: WaveLoaderProps) {
  return (
    <div className="flex items-end" style={{ height, gap }}>
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: barWidth,
            backgroundColor: color,
            animation: \`wave-bar \${speed}s \${i * 0.1}s ease-in-out infinite\`,
          }}
        />
      ))}
      <style>{\`@keyframes wave-bar { 0%, 100% { height: 20%; } 50% { height: 100%; } }\`}</style>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `<WaveLoader bars={bars} color={color} height={height} speed={speed} />`;

export const BARS_EXAMPLE = `<WaveLoader bars={3} color="#6366f1" />
<WaveLoader bars={5} color="#10b981" />
<WaveLoader bars={7} color="#f94144" height={40} barWidth={3} />
<WaveLoader bars={9} color="#8b5cf6" height={50} barWidth={5} gap={2} />`;

export const SINE_EXAMPLE = `<div className="relative overflow-hidden" style={{ width: 200, height: 40 }}>
  <svg viewBox="0 0 200 40" className="absolute inset-0 h-full w-full">
    <path d="M0 20 Q50 0 100 20 T200 20" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
  </svg>
</div>`;

export const USECASES_EXAMPLE = `<div className="flex items-center gap-3">
  <WaveLoader bars={5} barWidth={3} height={24} />
  <span className="text-sm font-medium">Loading content</span>
</div>`;