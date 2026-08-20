import { cn } from "@/lib/cn";
import type { CardHeaderProps } from "./Card.types";

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}>
      {children}
    </div>
  );
}
