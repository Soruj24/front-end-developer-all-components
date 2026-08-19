export const BOUNCELOADER_SOURCE = `"use client";

interface BounceLoaderProps {
  count?: number;
  color?: string;
  size?: number;
  gap?: number;
}

export function BounceLoader({ count = 5, color = "#6366f1", size = 10, gap = 6 }: BounceLoaderProps) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animation: \`bounce-dot 1.4s \${i * 0.16}s ease-in-out infinite both\`,
          }}
        />
      ))}
      <style>{\`@keyframes bounce-dot { 0%, 80%, 100% { transform: scale(0.4); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }\`}</style>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `<BounceLoader count={count} color={color} size={size} />`;

export const DOTS_EXAMPLE = `<BounceLoader count={3} />
<BounceLoader count={5} color="#6366f1" />
<BounceLoader count={5} color="#10b981" size={8} />
<BounceLoader count={7} color="#f94144" size={6} gap={4} />
<BounceLoader count={4} color="#000" size={14} gap={10} />`;

export const BALL_EXAMPLE = `<BounceLoader count={3} size={16} />
<BounceLoader count={5} color="#10b981" size={12} />
<BounceLoader count={4} color="#f94144" size={18} />`;

export const USECASES_EXAMPLE = `<div className="flex items-center gap-2">
  <BounceLoader count={3} size={6} color="#6366f1" />
  <span className="text-sm font-medium">Sending message...</span>
</div>`;
