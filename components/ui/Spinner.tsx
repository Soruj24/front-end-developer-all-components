import { cn } from "@/lib/cn";

type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: string;
  label?: string;
  className?: string;
}

const SIZE_MAP: Record<SpinnerSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const STROKE_MAP: Record<SpinnerSize, number> = {
  xs: 3,
  sm: 3,
  md: 2.5,
  lg: 2.5,
  xl: 2,
};

function Spinner({ size = "md", color, label, className }: SpinnerProps) {
  const stroke = STROKE_MAP[size];

  return (
    <svg
      className={cn("animate-spin", SIZE_MAP[size], className)}
      viewBox="0 0 24 24"
      fill="none"
      role={label ? "status" : "presentation"}
      aria-label={label}
    >
      {label && (
        <title>{label}</title>
      )}
      {/* Track ring */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color ?? "currentColor"}
        strokeWidth={stroke}
        strokeLinecap="round"
        className="opacity-15"
      />
      {/* Active arc */}
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color ?? "currentColor"}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Spinner;
export { Spinner };
