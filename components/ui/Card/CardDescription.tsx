import { cn } from "@/lib/cn";
import type { CardDescriptionProps } from "./Card.types";

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)}>
      {children}
    </p>
  );
}
