import { cn } from "@/lib/cn";
import type { TagProps, TagListProps, TagVariant } from "./Tags.types";

const variantClasses: Record<TagVariant, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
  destructive: "bg-destructive text-destructive-foreground",
};

export function Tag({ children, variant = "default", onRemove, className }: TagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", variantClasses[variant], className)}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-0.5 rounded-full hover:bg-foreground/10 transition-colors duration-150">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </span>
  );
}

export function TagList({ children, className }: TagListProps) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}
