import { cn } from "@/lib/cn";
import type { CardContentProps } from "./Card.types";

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}
