import { cn } from "@/lib/cn";
import type { CardFooterProps } from "./Card.types";

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-4 pt-0 sm:p-6", className)}>
      {children}
    </div>
  );
}
