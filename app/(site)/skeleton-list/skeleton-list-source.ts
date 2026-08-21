export const SKELETON_LIST_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type SkeletonListVariant = "simple" | "avatar" | "icon" | "card" | "notification";

interface SkeletonListProps {
  rows?: number;
  variant?: SkeletonListVariant;
  bordered?: boolean;
  className?: string;
}

function Bone({ width, height, className }: { width?: string; height?: string; className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} style={{ width, height }} aria-hidden="true" />;
}

function AvatarBone({ size = 40 }: { size?: number }) {
  return <div className="animate-pulse shrink-0 rounded-full bg-muted" style={{ width: size, height: size }} aria-hidden="true" />;
}

function SimpleRows({ rows }: { rows: number }) {
  return <div className="space-y-3">{Array.from({ length: rows }, (_, i) => <Bone key={i} width={\`\${60 + (i * 7) % 35}%\`} height="0.875rem" />)}</div>;
}

function AvatarRows({ rows }: { rows: number }) {
  return <div className="space-y-3">{Array.from({ length: rows }, (_, i) => (
    <div key={i} className="flex items-center gap-3">
      <AvatarBone size={36} />
      <div className="min-w-0 flex-1 space-y-1.5"><Bone width="40%" height="0.875rem" /><Bone width="65%" height="0.625rem" /></div>
    </div>
  ))}</div>;
}

function IconRows({ rows }: { rows: number }) {
  return <div className="space-y-3">{Array.from({ length: rows }, (_, i) => (
    <div key={i} className="flex items-center gap-3">
      <div className="animate-pulse shrink-0 rounded-lg bg-muted p-2"><div className="h-4 w-4 rounded bg-muted-foreground/20" /></div>
      <Bone width={\`\${50 + (i * 11) % 40}%\`} height="0.875rem" />
    </div>
  ))}</div>;
}

function CardRows({ rows }: { rows: number }) {
  return <div className="space-y-3">{Array.from({ length: rows }, (_, i) => (
    <div key={i} className="rounded-xl border border-border/60 bg-background p-4"><div className="flex items-start gap-3"><AvatarBone size={44} /><div className="min-w-0 flex-1 space-y-2"><Bone width="50%" height="1rem" /><Bone width="80%" height="0.625rem" /><Bone width="60%" height="0.625rem" /></div></div></div>
  ))}</div>;
}

function NotificationRows({ rows }: { rows: number }) {
  return <div className="space-y-2">{Array.from({ length: rows }, (_, i) => (
    <div key={i} className="flex items-start gap-3 rounded-xl border border-border/60 bg-background p-3"><AvatarBone size={32} /><div className="min-w-0 flex-1 space-y-1.5"><div className="flex items-center gap-2"><Bone width="30%" height="0.75rem" /><Bone width="15%" height="0.625rem" /></div><Bone width="70%" height="0.625rem" /></div></div>
  ))}</div>;
}

const VARIANT_MAP: Record<SkeletonListVariant, React.FC<{ rows: number }>> = { simple: SimpleRows, avatar: AvatarRows, icon: IconRows, card: CardRows, notification: NotificationRows };

const SkeletonList = forwardRef<HTMLDivElement, SkeletonListProps>(({ rows = 5, variant = "simple", bordered = false, className }, ref) => {
  const Content = VARIANT_MAP[variant];
  return <div ref={ref} className={cn(bordered && "rounded-xl border border-border/60 p-4", className)} aria-busy="true" aria-label="Loading content" role="status"><Content rows={rows} /></div>;
});

SkeletonList.displayName = "SkeletonList";

export { SkeletonList };`;

export const SIMPLE_EXAMPLE = `<SkeletonList rows={5} variant="simple" />`;

export const AVATAR_EXAMPLE = `<SkeletonList rows={4} variant="avatar" />`;

export const ICON_EXAMPLE = `<SkeletonList rows={4} variant="icon" />`;

export const CARD_EXAMPLE = `<SkeletonList rows={3} variant="card" />`;

export const NOTIFICATION_EXAMPLE = `<SkeletonList rows={4} variant="notification" />`;
