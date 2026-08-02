import { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
}

function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
  ...props
}: SkeletonProps) {
  const variantClass =
    variant === "circular" ? "rounded-full" : variant === "rectangular" ? "rounded-lg" : "rounded-md h-4";

  return (
    <div
      className={`skeleton-shimmer ${variantClass} ${className}`}
      style={{ width, height }}
      {...props}
    />
  );
}

function SkeletonCard({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-4 ${className}`}
      {...props}
    >
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div className="mt-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}

function SkeletonListItem({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 ${className}`}
      {...props}
    >
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="70%" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5, columns = 4, className = "" }: { rows?: number; columns?: number; className?: string }) {
  const colWidth = (i: number) => `${((i * 7) % 30) + 10}%`;
  return (
    <div className={`rounded-lg border border-border ${className}`}>
      {/* Header */}
      <div className="flex gap-4 border-b border-border bg-muted px-4 py-3">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} variant="text" width={colWidth(i)} />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="flex gap-4 border-b border-border px-4 py-3 last:border-0"
        >
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} variant="text" width={colWidth(r * 3 + c + 1)} />
          ))}
        </div>
      ))}
    </div>
  );
}

function SkeletonAvatar({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <Skeleton variant="circular" width={size} height={size} className={className} />;
}

export default Skeleton;
export { SkeletonCard, SkeletonListItem, SkeletonTable, SkeletonAvatar };
