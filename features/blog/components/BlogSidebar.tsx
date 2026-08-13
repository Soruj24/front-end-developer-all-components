"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";
import type { BlogCategoryCount } from "../types/blog.types";

interface PopularPost {
  id: string;
  slug: string;
  title: string;
  readTime?: string;
}

interface BlogSidebarProps {
  popularPosts: PopularPost[];
  categories: BlogCategoryCount[];
  onCategorySelect?: (category: string) => void;
  className?: string;
}

export function BlogSidebar({
  popularPosts,
  categories,
  onCategorySelect,
  className,
}: BlogSidebarProps) {
  return (
    <aside className={cn("w-full shrink-0 space-y-6 lg:w-80", className)}>
      <PopularPosts posts={popularPosts} />
      <CategoriesList categories={categories} onSelect={onCategorySelect} />
      <Newsletter />
      <SocialFollow />
    </aside>
  );
}

function PopularPosts({ posts }: { posts: PopularPost[] }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Popular Posts
      </h3>
      <ol className="space-y-3">
        {posts.map((post, i) => (
          <li key={post.id} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm leading-snug text-foreground/80 transition-colors hover:text-primary line-clamp-2"
              >
                {post.title}
              </Link>
              {post.readTime && (
                <span className="mt-0.5 block text-[11px] text-muted-foreground">
                  {post.readTime}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CategoriesList({
  categories,
  onSelect,
}: {
  categories: BlogCategoryCount[];
  onSelect?: (category: string) => void;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </h3>
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() => onSelect?.(cat.name)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    cat.name === "Technology" && "bg-blue-500",
                    cat.name === "Design" && "bg-purple-500",
                    cat.name === "Business" && "bg-amber-500",
                    cat.name === "AI" && "bg-emerald-500",
                    cat.name === "Security" && "bg-rose-500"
                  )}
                />
                {cat.name}
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {cat.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
      <div className="mb-2 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
      </div>
      {subscribed ? (
        <div className="rounded-lg bg-green-500/10 p-3 text-center">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Thanks for subscribing!
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Get the latest posts delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
        </>
      )}
    </div>
  );
}

function SocialFollow() {
  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Follow Us
      </h3>
      <div className="flex gap-2">
        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <a
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
