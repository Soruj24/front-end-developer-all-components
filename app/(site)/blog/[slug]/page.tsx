import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Avatar } from "@/components/design-system/Avatar";
import { BlogCard, BLOG_POSTS } from "@/features/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const categoryColors: Record<string, string> = {
  Technology: "bg-blue-500/10 text-blue-500",
  Design: "bg-purple-500/10 text-purple-500",
  Business: "bg-amber-500/10 text-amber-500",
  AI: "bg-emerald-500/10 text-emerald-500",
  Security: "bg-rose-500/10 text-rose-500",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  return (
    <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg
          className="h-4 w-4"
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
        Back to blog
      </Link>

      <header className="mb-10">
        <Badge
          className={cn(
            "mb-4 w-fit rounded-full px-3 py-1 text-xs font-medium",
            categoryColors[post.category] || "bg-muted text-muted-foreground"
          )}
        >
          {post.category}
        </Badge>

        <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="mb-6 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="flex items-center gap-4 border-t border-border/50 pt-6">
          <Avatar
            fallback={post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            size="md"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {post.author.name}
            </p>
            <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
              <span>{post.date}</span>
              <span className="text-border">·</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {post.coverImage && (
        <div className="relative mb-10 h-[400px] overflow-hidden rounded-2xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <div className="rounded-xl border border-border/50 bg-muted/30 p-8">
          <p className="text-muted-foreground italic">
            This is a demo blog post. Full article content would be rendered here
            from a CMS or markdown files.
          </p>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-border/50 pt-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {relatedPosts.length > 0 && (
        <section className="mt-14 border-t border-border/50 pt-10">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Related Articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
