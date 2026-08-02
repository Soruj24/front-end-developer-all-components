export interface ProgressBarProps {
  value: number;
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

const variantColors: Record<string, string> = {
  default: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-danger",
};

const sizeHeights: Record<string, string> = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

const labelSizes: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

function ProgressBar({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`${sizeHeights[size]} ${variantColors[variant]} rounded-full transition-all duration-500 ${
            animated ? "animate-pulse" : ""
          }`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className={`shrink-0 font-medium text-muted-foreground ${labelSizes[size]}`}>
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
