import { cn } from "@/lib/cn";
import type { ListProps, ListItemProps } from "./List.types";

export function List({ children, ordered = false, className }: ListProps) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={cn("list-inside", ordered ? "list-decimal" : "list-disc", "space-y-1", className)}>
      {children}
    </Tag>
  );
}

export function ListItem({ children, className }: ListItemProps) {
  return <li className={cn("text-sm", className)}>{children}</li>;
}
