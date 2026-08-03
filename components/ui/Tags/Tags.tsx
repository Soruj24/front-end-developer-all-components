import { cn } from "@/lib/cn";
import type { TagProps, TagListProps, TagVariant } from "./Tags.types";

const variantClasses: Record<TagVariant, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
  outline: "border border-zinc-200 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100",
  destructive: "bg-red-500 text-white",
};

export function Tag({ children, variant = "default", onRemove, className }: TagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", variantClasses[variant], className)}>
      {children}
      {onRemove && (
        <button type="button" onClick={onRemove} className="ml-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
    </span>
  );
}

export function TagList({ children, className }: TagListProps) {
  return <div className={cn("flex flex-wrap gap-2", className)}>{children}</div>;
}
