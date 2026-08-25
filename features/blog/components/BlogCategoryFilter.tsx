import { cn } from "@/lib/cn";

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
    <div className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "active:scale-[0.97]",
            active === cat
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
