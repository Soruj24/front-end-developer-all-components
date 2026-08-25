import { cn } from "@/lib/cn";
import { statusColors } from "../constants/ui-data";

interface BadgeProps {
  variant: string;
  children: React.ReactNode;
}

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
      statusColors[variant] || "bg-muted text-muted-foreground",
    )}>
      {children}
    </span>
  );
}
