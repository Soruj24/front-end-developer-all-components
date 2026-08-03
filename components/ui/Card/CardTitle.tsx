import { cn } from "@/lib/cn";
import type { CardTitleProps } from "./Card.types";

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
      {children}
    </h3>
  );
}
