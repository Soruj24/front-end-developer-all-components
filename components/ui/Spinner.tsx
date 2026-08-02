export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

function Spinner({ size = "md", color, className = "" }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${sizeMap[size]} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color || "currentColor"}
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-20"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke={color || "currentColor"}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Spinner;
