import { cn } from "@/lib/cn";
import type { CardContentProps } from "./Card.types";

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-4 pt-0 sm:p-6", className)}>
      {children}
    </div>
  );
}
