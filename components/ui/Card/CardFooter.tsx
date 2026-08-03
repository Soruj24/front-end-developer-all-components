import { cn } from "@/lib/cn";
import type { CardFooterProps } from "./Card.types";

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)}>
      {children}
    </div>
  );
}
