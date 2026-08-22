"use client";

interface KeyCapProps {
  label: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  sub?: string;
}

export function KeyCap({ label, size = "md", highlight = false, sub }: KeyCapProps) {
  const sizeClasses = {
    sm: "min-w-[32px] h-8 text-[10px]",
    md: "min-w-[40px] h-10 text-xs",
    lg: "min-w-[60px] h-10 text-xs",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-lg border font-medium shadow-sm transition-all ${
        sizeClasses[size]
      } ${
        highlight
          ? "border-blue-500 bg-blue-50 text-blue-700 shadow-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:shadow-blue-900/50"
          : "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
    >
      <span>{label}</span>
      {sub && <span className="text-[8px] text-zinc-400 dark:text-zinc-500">{sub}</span>}
    </div>
  );
}
