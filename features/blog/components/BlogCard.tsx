import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Avatar } from "@/components/design-system/Avatar";
import type { BlogPost } from "../types/blog.types";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-500/10 text-blue-500",
  Design: "bg-purple-500/10 text-purple-500",
  Business: "bg-amber-500/10 text-amber-500",
  AI: "bg-emerald-500/10 text-emerald-500",
  Security: "bg-rose-500/10 text-rose-500",
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-background",
        "transition-all duration-200 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/30">
            <svg
              className="h-12 w-12 text-muted-foreground/30"
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
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge
          className={cn(
            "w-fit rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            categoryColors[post.category] || "bg-muted text-muted-foreground"
          )}
        >
          {post.category}
        </Badge>

        <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-3 pt-3 border-t border-border/50">
          <Avatar
            fallback={post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            size="sm"
          />
          <div className="flex flex-1 items-center gap-x-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
            <span className="text-border">·</span>
            <span>{post.date}</span>
            <span className="text-border">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <span className="text-xs font-medium text-primary transition-colors group-hover:text-primary/80">
          Read more →
        </span>
      </div>
    </Link>
  );
}
