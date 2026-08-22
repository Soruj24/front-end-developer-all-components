export const KEYBOARD_LAYOUT_SOURCE = `"use client";

interface KeyCapProps {
  label: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  sub?: string;
}

function KeyCap({ label, size = "md", highlight = false, sub }: KeyCapProps) {
  const sizeClasses = {
    sm: "min-w-[32px] h-8 text-[10px]",
    md: "min-w-[40px] h-10 text-xs",
    lg: "min-w-[60px] h-10 text-xs",
  };
  return (
    <div className={\`flex flex-col items-center justify-center rounded-lg border font-medium shadow-sm transition-all \${sizeClasses[size]} \${
      highlight
        ? "border-blue-500 bg-blue-50 text-blue-700 shadow-blue-100 dark:bg-blue-950 dark:text-blue-300"
        : "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
    }\`}>
      <span>{label}</span>
      {sub && <span className="text-[8px] text-zinc-400">{sub}</span>}
    </div>
  );
}

interface KeyboardLayoutProps {
  variant?: "full" | "compact" | "gaming" | "mac";
  highlightKeys?: string[];
  className?: string;
}

export function KeyboardLayout({ variant = "full", highlightKeys = [], className = "" }: KeyboardLayoutProps) {
  const rows = [
    ["\`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];

  return (
    <div className={\`flex w-full max-w-2xl flex-col gap-1.5 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 \${className}\`}>
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="md" highlight={highlightKeys.includes(key)} />
          ))}
        </div>
      ))}
    </div>
  );
}`;
