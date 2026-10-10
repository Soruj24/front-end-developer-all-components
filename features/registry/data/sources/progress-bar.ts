import type { ComponentProp } from "../../types/props";

export const progressBarProps: ComponentProp[] = [
  {
    name: "value",
    type: "number",
    required: true,
    description: "Completion percentage from 0 to 100. Clamped into range.",
  },
  {
    name: "variant",
    type: "enum",
    default: "default",
    description: "Fill color of the bar.",
    values: ["default", "success", "warning", "error"],
  },
  {
    name: "size",
    type: "enum",
    default: "md",
    description: "Bar thickness and label text size.",
    values: ["sm", "md", "lg"],
  },
  {
    name: "showLabel",
    type: "boolean",
    default: "false",
    description: "Shows the rounded percent value next to the bar.",
  },
  {
    name: "animated",
    type: "boolean",
    default: "true",
    description: "Applies a subtle pulse animation to the fill.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes merged onto the row wrapper.",
  },
];

export const progressBarSource: string = `"use client";

import { cn } from "@/lib/cn";

/* Types inlined from ./ProgressBar.types.ts so this snippet is self-contained. */
export type ProgressBarVariant = "default" | "success" | "warning" | "error";

export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

const VARIANT_MAP: Record<ProgressBarVariant, string> = {
  default: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-danger",
};

const SIZE_MAP: Record<ProgressBarSize, { bar: string; label: string }> = {
  sm: { bar: "h-1.5", label: "text-xs" },
  md: { bar: "h-2.5", label: "text-sm" },
  lg: { bar: "h-4", label: "text-base" },
};

export function ProgressBar({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={\`Progress: \${Math.round(clamped)}%\`}
        className={cn(
          "flex-1 overflow-hidden rounded-full bg-muted",
          SIZE_MAP[size].bar,
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            VARIANT_MAP[variant],
            "transition-all duration-500 ease-out",
            animated && "animate-pulse",
          )}
          style={{ width: \`\${clamped}%\` }}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            "shrink-0 tabular-nums font-medium text-muted-foreground",
            SIZE_MAP[size].label,
          )}
        >
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}

// cn() is imported from @/lib/cn (clsx + tailwind-merge).
`;
