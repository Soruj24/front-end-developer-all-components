export const PROGRESSRING_SOURCE = `"use client";

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  showLabel?: boolean;
  label?: string;
}

const COLOR_CLASSES = {
  primary: "stroke-primary",
  success: "stroke-emerald-500",
  warning: "stroke-amber-500",
  danger: "stroke-red-500",
  info: "stroke-blue-500",
} as const;

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "primary",
  showLabel = true,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={\`\${COLOR_CLASSES[color]} transition-all duration-1000 ease-out\`}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}%</span>
          {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<ProgressRing value={25} />
<ProgressRing value={50} color="info" />
<ProgressRing value={75} color="success" />
<ProgressRing value={90} color="warning" />
<ProgressRing value={100} color="danger" />`;

export const ANIMATED_EXAMPLE = `<ProgressRing value={78} size={160} strokeWidth={12} color="primary" label="Overall Score" />`;

export const SKILLS_EXAMPLE = `<ProgressRing value={92} color="info" />
<ProgressRing value={88} color="primary" />
<ProgressRing value={75} color="success" />
<ProgressRing value={60} color="warning" />`;

export const TASKS_EXAMPLE = `<ProgressRing value={pct} size={56} strokeWidth={5} color={color} showLabel={false} />`;

export const STEPS_EXAMPLE = `<ProgressRing value={45} size={48} strokeWidth={4} color="info" showLabel={false} />`;
