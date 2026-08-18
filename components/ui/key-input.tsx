import * as React from "react";
import { cn } from "@/lib/cn";

interface KeyInputProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: string[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}

function KeyInput({ keys, size = "md", variant = "default", className, ...props }: KeyInputProps) {
  const sizeClasses = {
    sm: "h-5 min-w-[20px] px-1 text-[10px]",
    md: "h-6 min-w-[24px] px-1.5 text-xs",
    lg: "h-8 min-w-[32px] px-2 text-sm",
  };

  const variantClasses = {
    default: "bg-muted border border-border text-foreground shadow-sm",
    outline: "bg-background border border-border text-foreground",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          className={cn(
            "inline-flex items-center justify-center rounded-md font-mono font-medium",
            sizeClasses[size],
            variantClasses[variant]
          )}
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}

export { KeyInput };
export type { KeyInputProps };
