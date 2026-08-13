import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cn } from "@/lib/cn";
import { Badge } from "@/components/design-system/Badge";
import { Avatar } from "@/components/design-system/Avatar";
import { Button } from "@/components/design-system/Button";
import {
  BlogCard,
  BlogContent,
  BlogTableOfContents,
  BlogAuthorBio,
  BlogShareButtons,
  BlogComments,
  BlogReadingProgress,
  BlogNextPrev,
  BlogBreadcrumbs,
  BlogBookmarkButton,
  BLOG_POSTS,
} from "@/features/blog";

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

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);

  if (!post) {
    notFound();
  }

  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  const relatedPosts = BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  const comments = post.comments || [];

  return (
    <>
      <BlogReadingProgress />

      <article className="mx-auto w-full max-w-4xl px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <BlogBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
          className="mb-8"
        />

        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <Badge
              className={cn(
                "w-fit rounded-full px-3 py-1 text-xs font-medium",
                categoryColors[post.category] || "bg-muted text-muted-foreground"
              )}
            >
              {post.category}
            </Badge>
            {post.featured && (
              <Badge className="rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mb-6 text-lg text-muted-foreground">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 border-t border-border/50 pt-6">
            <div className="flex items-center gap-3">
              <Avatar
                src={post.author.avatar}
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
                {post.author.role && (
                  <p className="text-xs text-muted-foreground">
                    {post.author.role}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-x-3 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span className="text-border">·</span>
              <span>{post.readTime}</span>
            </div>

            {post.views && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {post.views.toLocaleString()} views
              </span>
            )}

            <div className="ml-auto flex items-center gap-1">
              <BlogBookmarkButton postId={post.id} />
              <BlogShareButtons
                title={post.title}
                url={`/blog/${post.slug}`}
                excerpt={post.excerpt}
              />
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

        <div className="flex gap-10">
          <div className="flex-1 min-w-0">
            {post.content ? (
              <BlogContent content={post.content} />
            ) : (
              <div className="rounded-xl border border-border/50 bg-muted/30 p-8">
                <p className="text-muted-foreground italic">
                  This is a demo blog post. Full article content would be rendered
                  here from a CMS or markdown files.
                </p>
              </div>
            )}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-border/50 pt-6">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {post.likes && (
              <div className="mt-6 flex items-center justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-muted-foreground"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {post.likes} likes
                </Button>
              </div>
            )}

            <BlogAuthorBio author={post.author} className="mt-10" />

            <BlogNextPrev
              nextPost={nextPost}
              prevPost={prevPost}
              className="mt-10"
            />

            {comments.length > 0 && (
              <div className="mt-10 border-t border-border/50 pt-10">
                <BlogComments comments={comments} />
              </div>
            )}
          </div>

          <div className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24">
              <BlogTableOfContents content={post.content || ""} />
            </div>
          </div>
        </div>

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
    </>
  );
}
