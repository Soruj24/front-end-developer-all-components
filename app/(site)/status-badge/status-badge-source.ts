export const STATUS_BADGE_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { CheckCircle2, AlertCircle, XCircle, Clock, Circle, type LucideIcon } from "lucide-react";

type StatusVariant = "active" | "warning" | "error" | "info" | "neutral";
type StatusSize = "sm" | "md" | "lg";

interface StatusBadgeProps {
  status: StatusVariant;
  label: string;
  animated?: boolean;
  size?: StatusSize;
  icon?: React.ReactNode;
  dotOnly?: boolean;
  className?: string;
}

const STATUS_CONFIG: Record<StatusVariant, { dot: string; ping: string; text: string; bg: string; border: string; ring: string; icon: LucideIcon }> = {
  active: { dot: "bg-emerald-500", ping: "bg-emerald-400", text: "text-emerald-700 dark:text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", ring: "ring-emerald-500/20", icon: CheckCircle2 },
  warning: { dot: "bg-amber-500", ping: "bg-amber-400", text: "text-amber-700 dark:text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", ring: "ring-amber-500/20", icon: AlertCircle },
  error: { dot: "bg-red-500", ping: "bg-red-400", text: "text-red-700 dark:text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", ring: "ring-red-500/20", icon: XCircle },
  info: { dot: "bg-blue-500", ping: "bg-blue-400", text: "text-blue-700 dark:text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", ring: "ring-blue-500/20", icon: Clock },
  neutral: { dot: "bg-gray-400 dark:bg-gray-500", ping: "bg-gray-400", text: "text-gray-600 dark:text-gray-400", bg: "bg-gray-400/10", border: "border-gray-400/20", ring: "ring-gray-400/20", icon: Circle },
};

const SIZE_MAP = {
  sm: { badge: "px-2 py-0.5 text-xs gap-1", dot: "h-1.5 w-1.5", icon: "h-3 w-3" },
  md: { badge: "px-2.5 py-1 text-sm gap-1.5", dot: "h-2 w-2", icon: "h-3.5 w-3.5" },
  lg: { badge: "px-3 py-1.5 text-sm gap-1.5", dot: "h-2.5 w-2.5", icon: "h-4 w-4" },
} as const;

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(({ status, label, animated = false, size = "md", icon, dotOnly = false, className }, ref) => {
  const config = STATUS_CONFIG[status];
  const sizeConfig = SIZE_MAP[size];
  const Icon = icon ? undefined : config.icon;

  return (
    <span ref={ref} className={cn("inline-flex items-center rounded-full font-medium transition-all duration-200 border shadow-sm", config.text, config.bg, config.border, sizeConfig.badge, className)} role="status" aria-label={\`\${label} - \${status}\`}>
      {icon ? (
        <span className={cn("shrink-0", sizeConfig.icon)} aria-hidden="true">{icon}</span>
      ) : animated ? (
        <span className={cn("relative shrink-0 flex", sizeConfig.dot)} aria-hidden="true">
          <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", config.ping)} />
          <span className={cn("relative inline-flex rounded-full", sizeConfig.dot, config.dot)} />
        </span>
      ) : (
        <span className={cn("shrink-0 rounded-full", sizeConfig.dot, config.dot)} aria-hidden="true" />
      )}
      {!dotOnly && <span className="leading-none">{label}</span>}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

export { StatusBadge };`;

export const STATUS_EXAMPLE = `<StatusBadge status="active" label="Online" />
<StatusBadge status="warning" label="Away" />
<StatusBadge status="error" label="Offline" />`;

export const ANIMATED_EXAMPLE = `<StatusBadge status="active" label="Live" animated />
<StatusBadge status="error" label="Recording" animated />
<StatusBadge status="warning" label="Processing" animated />`;

export const SIZES_EXAMPLE = `<StatusBadge status="active" label="Small" size="sm" />
<StatusBadge status="active" label="Medium" size="md" />
<StatusBadge status="active" label="Large" size="lg" />`;

export const CUSTOM_ICON_EXAMPLE = `<StatusBadge status="active" label="Deployed" icon={<Rocket className="h-3.5 w-3.5" />} />
<StatusBadge status="warning" label="Pending Review" icon={<Clock className="h-3.5 w-3.5" />} />`;

export const USERS_EXAMPLE = `const users = [
  { name: "Sarah Chen", role: "Admin", status: "active" },
  { name: "Aria Patel", role: "Viewer", status: "warning" },
  { name: "Tom Wilson", role: "Contributor", status: "error" },
];

{users.map((user) => (
  <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
    <span className="text-sm font-medium">{user.name}</span>
    <StatusBadge status={user.status} label={user.status} size="sm" />
  </div>
))}`;
