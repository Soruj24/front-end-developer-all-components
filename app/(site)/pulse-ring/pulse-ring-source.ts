export const PULSERING_SOURCE = `"use client";

interface PulseRingProps {
  color?: string;
  size?: number;
  rings?: number;
  speed?: number;
}

export function PulseRing({ color = "#6366f1", size = 48, rings = 3, speed = 1.5 }: PulseRingProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{ width: size * 0.35, height: size * 0.35, backgroundColor: color }}
        />
      </div>
      {Array.from({ length: rings }, (_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: color,
            animation: \`pulse-ring-expand \${speed}s \${i * (speed / rings)}s ease-out infinite\`,
          }}
        />
      ))}
      <style>{\`@keyframes pulse-ring-expand { 0% { transform: scale(0.3); opacity: 1; } 100% { transform: scale(1); opacity: 0; } }\`}</style>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `<PulseRing color={color} size={size} rings={rings} speed={speed} />`;

export const SIZES_EXAMPLE = `{[32, 48, 64, 80, 96].map((s) => (
  <PulseRing size={s} rings={3} />
))}`;

export const COLORS_EXAMPLE = `<PulseRing color="#10b981" rings={2} />
<PulseRing color="#6366f1" rings={2} />
<PulseRing color="#f94144" rings={2} />
<PulseRing color="#f9c74f" rings={2} />
<PulseRing color="#8b5cf6" rings={2} />`;

export const STATUS_EXAMPLE = `<PulseRing color="#10b981" size={24} rings={2} />
<PulseRing color="#f94144" size={24} rings={2} />
<PulseRing color="#f9c74f" size={24} rings={2} />`;

export const CARD_EXAMPLE = `<div className="relative rounded-xl border border-border p-5">
  <div className="absolute top-3 right-3">
    <PulseRing color="#10b981" size={24} rings={2} />
  </div>
  <h3 className="text-sm font-semibold">Live Stream</h3>
  <p className="mt-1 text-xs text-muted-foreground">1,247 viewers watching now</p>
</div>`;
