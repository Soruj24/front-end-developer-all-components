import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";

const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Business",
  "AI",
  "Security",
] as const;

interface BlogCategoryFilterProps {
  active: string;
  onSelect: (category: string) => void;
  className?: string;
}

export function BlogCategoryFilter({
  active,
  onSelect,
  className,
}: BlogCategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filter posts by category"
      className={cn("flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]", className)}
    >
      {CATEGORIES.map((cat) => {
        const selected = active === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            aria-pressed={selected}
            className={cn(
              "min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors sm:min-h-0",
              FOCUS.ring,
              selected
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground",
            )}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
