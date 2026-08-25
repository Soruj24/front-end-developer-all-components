import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BlogTag } from "../types/blog.types";

interface BlogTagsCloudProps {
  tags: BlogTag[];
  className?: string;
}

export function BlogTagsCloud({ tags, className }: BlogTagsCloudProps) {
  const maxCount = Math.max(...tags.map((t) => t.count));

  return (
    <div className={cn("rounded-xl border border-border/60 bg-card p-5 shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]", className)}>
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const intensity = tag.count / maxCount;
          return (
            <Link
              key={tag.name}
              href={`/blog?tag=${encodeURIComponent(tag.name)}`}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "active:scale-[0.97]",
                intensity > 0.7
                  ? "bg-primary/10 text-primary hover:bg-primary/20 shadow-sm"
                  : intensity > 0.4
                    ? "bg-muted text-foreground/80 hover:bg-accent"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted",
              )}
            >
              {tag.name}
              <span className="ml-1 text-[10px] opacity-60">({tag.count})</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
