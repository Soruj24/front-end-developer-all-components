"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { CheckCircle2, AlertCircle, XCircle, Clock, Circle, type LucideIcon } from "lucide-react";
import type { StatusBadgeProps, StatusVariant } from "./StatusBadge.types";

const STATUS_CONFIG: Record<
  StatusVariant,
  {
    dot: string;
    ping: string;
    text: string;
    bg: string;
    border: string;
    ring: string;
    icon: LucideIcon;
  }
> = {
  active: {
    dot: "bg-success",
    ping: "bg-success/60",
    text: "text-success",
    bg: "bg-success/10",
    border: "border-success/20",
    ring: "ring-success/20",
    icon: CheckCircle2,
  },
  warning: {
    dot: "bg-warning",
    ping: "bg-warning/60",
    text: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/20",
    ring: "ring-warning/20",
    icon: AlertCircle,
  },
  error: {
    dot: "bg-danger",
    ping: "bg-danger/60",
    text: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/20",
    ring: "ring-danger/20",
    icon: XCircle,
  },
  info: {
    dot: "bg-info",
    ping: "bg-info/60",
    text: "text-info",
    bg: "bg-info/10",
    border: "border-info/20",
    ring: "ring-info/20",
    icon: Clock,
  },
  neutral: {
    dot: "bg-muted-foreground",
    ping: "bg-muted-foreground/60",
    text: "text-muted-foreground",
    bg: "bg-muted/50",
    border: "border-border/60",
    ring: "ring-border/60",
    icon: Circle,
  },
};

const SIZE_MAP = {
  sm: {
    badge: "px-2 py-0.5 text-xs gap-1",
    dot: "h-1.5 w-1.5",
    icon: "h-3 w-3",
  },
  md: {
    badge: "px-2.5 py-1 text-sm gap-1.5",
    dot: "h-2 w-2",
    icon: "h-3.5 w-3.5",
  },
  lg: {
    badge: "px-3 py-1.5 text-sm gap-1.5",
    dot: "h-2.5 w-2.5",
    icon: "h-4 w-4",
  },
} as const;

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, label, animated = false, size = "md", icon, dotOnly = false, className }, ref) => {
    const config = STATUS_CONFIG[status];
    const sizeConfig = SIZE_MAP[size];
    const Icon = icon ? undefined : config.icon;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium transition-all duration-200",
          "border shadow-sm",
          "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
          config.text,
          config.bg,
          config.border,
          sizeConfig.badge,
          className,
        )}
        role="status"
        aria-label={`${label} - ${status}`}
      >
        {icon ? (
          <span className={cn("shrink-0", sizeConfig.icon)} aria-hidden="true">{icon}</span>
        ) : animated ? (
          <span className={cn("relative shrink-0 flex", sizeConfig.dot)} aria-hidden="true">
            <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", config.ping)} />
            <span className={cn("relative inline-flex rounded-full", sizeConfig.dot, config.dot)} />
          </span>
        ) : (
          <span
            className={cn(
              "shrink-0 rounded-full",
              sizeConfig.dot,
              config.dot,
            )}
            aria-hidden="true"
          />
        )}
        {!dotOnly && <span className="leading-none">{label}</span>}
      </span>
    );
  },
);

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
