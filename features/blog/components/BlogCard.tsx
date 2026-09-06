import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import type { BlogPost } from "../types/blog.types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const CATEGORY_VARIANTS: Record<string, "info" | "primary" | "warning" | "success" | "error"> = {
  Technology: "info",
  Design: "primary",
  Business: "warning",
  AI: "success",
  Security: "error",
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`${post.title} — by ${post.author.name}. ${post.excerpt}`}
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-surface shadow-sm transition-colors duration-200 hover:border-ring/40",
        FOCUS.ring,
        className,
      )}
    >
      <div className="relative h-48 overflow-hidden bg-muted/20">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center" aria-hidden="true">
            <svg
              className="h-12 w-12 text-muted-foreground/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {post.featured && (
          <div className="absolute left-3 top-3">
            <Badge variant="warning" size="sm">
              Featured
            </Badge>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <Badge variant={CATEGORY_VARIANTS[post.category] ?? "secondary"} size="sm" className="w-fit">
          {post.category}
        </Badge>

        <h3 className="text-base font-semibold leading-snug text-foreground">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex min-w-0 items-center gap-3 border-t border-border/60 pt-3">
          <Avatar
            fallback={post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            alt={post.author.name}
            size="sm"
          />
          <div className="flex min-w-0 flex-1 items-center gap-x-2 text-xs text-muted-foreground">
            <span className="truncate font-medium text-foreground">
              {post.author.name}
            </span>
            <span className="shrink-0 text-border" aria-hidden="true">·</span>
            <span className="shrink-0">{post.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime}
            </span>
            {post.views && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views.toLocaleString()}
              </span>
            )}
            {post.likes && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.likes}
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-primary">
            Read more
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
