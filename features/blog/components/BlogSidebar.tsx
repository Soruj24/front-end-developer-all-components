import Link from "next/link";
import { cn } from "@/lib/cn";
import type { BlogCategoryCount } from "../types/blog.types";

interface PopularPost {
  id: string;
  slug: string;
  title: string;
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
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
              {i + 1}
            </span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm leading-snug text-foreground/80 transition-colors hover:text-primary"
            >
              {post.title}
            </Link>
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
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              onClick={() => onSelect?.(cat.name)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <span>{cat.name}</span>
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
  return (
    <div className="rounded-xl border border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 p-5">
      <h3 className="mb-2 text-sm font-semibold text-foreground">Newsletter</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Get the latest posts delivered straight to your inbox.
      </p>
      <div className="flex flex-col gap-2.5">
        <input
          type="email"
          placeholder="your@email.com"
          className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
        />
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]">
          Subscribe
        </button>
      </div>
    </div>
  );
}
