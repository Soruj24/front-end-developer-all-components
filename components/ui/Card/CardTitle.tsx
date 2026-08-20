import { cn } from "@/lib/cn";
import type { CardTitleProps } from "./Card.types";

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold leading-none tracking-tight text-foreground sm:text-xl", className)}>
      {children}
    </h3>
  );
}
