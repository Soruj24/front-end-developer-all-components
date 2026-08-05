import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Avatar } from "@/components/design-system/Avatar";
import type { BlogPost } from "../types/blog.types";

interface BlogHeroProps {
  post: BlogPost;
  className?: string;
}

export function BlogHero({ post, className }: BlogHeroProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-primary/90 via-primary to-primary/70",
        "p-8 text-white transition-all duration-300",
        "hover:shadow-xl hover:shadow-primary/20",
        className
      )}
    >
      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-40 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10">
        <Badge className="mb-4 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {post.category}
        </Badge>

        <h2 className="mb-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl group-hover:underline">
          {post.title}
        </h2>

        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-white/80">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3">
          <Avatar
            fallback={post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            size="sm"
            className="border-2 border-white/30"
          />
          <div className="flex items-center gap-x-2 text-xs text-white/70">
            <span className="font-medium text-white/90">
              {post.author.name}
            </span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
