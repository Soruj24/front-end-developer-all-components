export const COUNTER_BADGE_SOURCE = `"use client";

import type { ReactNode } from "react";

type CounterBadgeVariant = "default" | "success" | "warning" | "danger";
type CounterBadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface CounterBadgeProps {
  count: number;
  max?: number;
  variant?: CounterBadgeVariant;
  position?: CounterBadgePosition;
  children?: ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<CounterBadgeVariant, string> = {
  default: "bg-primary text-primary-foreground",
  success: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-white",
  danger: "bg-red-500 text-white",
};

const POSITION_STYLES: Record<CounterBadgePosition, string> = {
  "top-right": "-top-1.5 -right-1.5",
  "top-left": "-top-1.5 -left-1.5",
  "bottom-right": "-bottom-1.5 -right-1.5",
  "bottom-left": "-bottom-1.5 -left-1.5",
};

export function CounterBadge({
  count,
  max = 99,
  variant = "danger",
  position = "top-right",
  children,
  className = "",
}: CounterBadgeProps) {
  const label = count > max ? max + "+" : String(count);

  return (
    <span className={"relative inline-flex " + className}>
      {children}
      {count > 0 && (
        <span className={"absolute flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-medium " + POSITION_STYLES[position] + " " + VARIANT_STYLES[variant]}>
          {label}
        </span>
      )}
    </span>
  );
}`;

export const VARIANTS_EXAMPLE = `<CounterBadge count={3} variant="default" />
<CounterBadge count={3} variant="success" />
<CounterBadge count={3} variant="warning" />
<CounterBadge count={3} variant="danger" />`;

export const DOT_EXAMPLE = `<div className="relative h-10 w-10 rounded-full bg-muted flex items-center justify-center">
  <span>🔔</span>
  <span className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-red-500" />
</div>`;

export const ON_ELEMENTS_EXAMPLE = `<CounterBadge count={12} variant="danger">
  <button className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">📧</button>
</CounterBadge>

<CounterBadge count={3} variant="default">
  <button className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">🛒</button>
</CounterBadge>`;