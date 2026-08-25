import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BlogPost } from "../types/blog.types";

interface BlogNextPrevProps {
  nextPost: BlogPost | null;
  prevPost: BlogPost | null;
  className?: string;
}

export function BlogNextPrev({
  nextPost,
  prevPost,
  className,
}: BlogNextPrevProps) {
  if (!nextPost && !prevPost) return null;

  return (
    <div
      className={cn(
        "grid gap-4 sm:grid-cols-2",
        className,
      )}
    >
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className={cn(
            "group flex flex-col gap-2 rounded-xl border border-border/60 bg-card p-5",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "active:scale-[0.98]",
          )}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous Article
          </span>
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {prevPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.slug}`}
          className={cn(
            "group flex flex-col items-end gap-2 rounded-xl border border-border/60 bg-card p-5 text-right",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:border-border hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            "active:scale-[0.98]",
          )}
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Next Article
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
          <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary line-clamp-2">
            {nextPost.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
