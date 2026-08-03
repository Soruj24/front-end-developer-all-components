import { cn } from "@/lib/cn";
import type { CardProps } from "./Card.types";

const paddingClasses: Record<string, string> = {
  none: "",
  sm: "p-3",
  md: "p-6",
  lg: "p-8",
};

export function Card({ children, padding = "md", className }: CardProps) {
  return (
    <div className={cn("rounded-lg border bg-white shadow-sm dark:bg-zinc-900", paddingClasses[padding], className)}>
      {children}
    </div>
  );
}
