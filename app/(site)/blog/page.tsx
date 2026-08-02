"use client";

import { useState } from "react";
import Link from "next/link";

const categories = ["All", "Technology", "Design", "Business", "AI", "Security"];

const featuredPost = {
  id: 1,
  category: "Technology",
  title: "Building Scalable Web Applications with Next.js",
  excerpt: "Learn how to architect and build modern web applications that scale seamlessly using Next.js and its powerful features including server components, streaming, and edge functions.",
  date: "Mar 15, 2026",
  readTime: "8 min read",
  author: "Sarah Chen",
  authorAvatar: "/avatars/sarah.jpg",
};

const allPosts = [
  { id: 2, category: "Design", title: "The Future of UI Design Trends in 2026", excerpt: "Explore the emerging design patterns and visual trends shaping the future of user interfaces from glassmorphism to kinetic typography.", date: "Mar 12, 2026", readTime: "6 min read", author: "Alex Rivera", authorAvatar: "/avatars/alex.jpg" },
  { id: 3, category: "Technology", title: "Mastering TypeScript Generics", excerpt: "A comprehensive guide to understanding and using TypeScript generics in your daily workflow with practical real-world examples.", date: "Mar 10, 2026", readTime: "10 min read", author: "James Wilson", authorAvatar: "/avatars/james.jpg" },
  { id: 4, category: "Business", title: "Scaling Your Startup: Lessons Learned", excerpt: "Key insights from growing a tech startup from zero to millions of users while maintaining team culture and product quality.", date: "Mar 8, 2026", readTime: "7 min read", author: "Priya Patel", authorAvatar: "/avatars/priya.jpg" },
  { id: 5, category: "AI", title: "Integrating LLMs into Your Application", excerpt: "Practical steps for integrating large language models into real-world applications with cost optimization and latency considerations.", date: "Mar 5, 2026", readTime: "12 min read", author: "Michael Brown", authorAvatar: "/avatars/michael.jpg" },
  { id: 6, category: "Security", title: "Web Security Best Practices for 2026", excerpt: "Stay ahead of threats with the latest security practices and tools for web applications including zero-trust architecture.", date: "Mar 3, 2026", readTime: "9 min read", author: "Emily Davis", authorAvatar: "/avatars/emily.jpg" },
  { id: 7, category: "Design", title: "Color Theory in Modern Web Design", excerpt: "Understanding color psychology and accessibility to create harmonious and inclusive digital experiences.", date: "Feb 28, 2026", readTime: "5 min read", author: "Alex Rivera", authorAvatar: "/avatars/alex.jpg" },
  { id: 8, category: "AI", title: "Machine Learning for Frontend Developers", excerpt: "Demystifying ML concepts and showing how frontend developers can leverage browser-based AI models.", date: "Feb 25, 2026", readTime: "11 min read", author: "Michael Brown", authorAvatar: "/avatars/michael.jpg" },
  { id: 9, category: "Business", title: "Remote Team Collaboration Tools", excerpt: "A comparison of the best tools and practices for keeping distributed teams productive and connected.", date: "Feb 22, 2026", readTime: "6 min read", author: "Priya Patel", authorAvatar: "/avatars/priya.jpg" },
  { id: 10, category: "Technology", title: "Edge Computing with Next.js", excerpt: "How edge functions and middleware are changing the way we think about server-side rendering and API routes.", date: "Feb 20, 2026", readTime: "7 min read", author: "Sarah Chen", authorAvatar: "/avatars/sarah.jpg" },
  { id: 11, category: "Security", title: "OAuth 2.0 and OpenID Connect Guide", excerpt: "Everything you need to know about implementing authentication and authorization securely in your applications.", date: "Feb 18, 2026", readTime: "10 min read", author: "Emily Davis", authorAvatar: "/avatars/emily.jpg" },
  { id: 12, category: "Design", title: "Micro-Interactions That Delight Users", excerpt: "Small animation details that make a big difference in user experience and how to implement them efficiently.", date: "Feb 15, 2026", readTime: "4 min read", author: "Alex Rivera", authorAvatar: "/avatars/alex.jpg" },
];

const popularPosts = [
  { id: 5, title: "Integrating LLMs into Your Application" },
  { id: 3, title: "Mastering TypeScript Generics" },
  { id: 6, title: "Web Security Best Practices for 2026" },
  { id: 1, title: "Building Scalable Web Applications with Next.js" },
  { id: 10, title: "Edge Computing with Next.js" },
];

const sidebarCategories = [
  { name: "Technology", count: 8 },
  { name: "Design", count: 6 },
  { name: "Business", count: 4 },
  { name: "AI", count: 5 },
  { name: "Security", count: 3 },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Blog</h1>
          <p className="text-muted-foreground">Insights, tutorials, and updates from our team.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
        </div>
      </div>

      <Link
        href={`/blog/${featuredPost.id}`}
        className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-8 text-white transition-all hover:shadow-xl"
      >
        <span className="mb-3 w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {featuredPost.category}
        </span>
        <h2 className="mb-2 text-2xl font-bold group-hover:underline">{featuredPost.title}</h2>
        <p className="mb-4 max-w-2xl text-sm text-white/80">{featuredPost.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <div className="h-8 w-8 rounded-full bg-white/30" />
          <span className="font-medium text-white/90">{featuredPost.author}</span>
          <span>·</span>
          <span>{featuredPost.date}</span>
          <span>·</span>
          <span>{featuredPost.readTime}</span>
        </div>
      </Link>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {filteredPosts.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No posts found matching your search.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900"
                >
                  <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 text-blue-400 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950 dark:text-blue-600">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {post.category}
                    </span>
                    <h3 className="text-base font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                      {post.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 pt-2">
                      <div className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <span className="font-medium text-muted-foreground">{post.author}</span>
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <span className="mt-1 text-xs font-medium text-blue-600 transition-colors group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-10 flex items-center justify-center gap-2">
            <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
              Prev
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  page === 1
                    ? "bg-blue-600 text-white"
                    : "border border-border text-muted-foreground hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">
              Next
            </button>
          </div>
        </div>

        <aside className="w-full shrink-0 space-y-8 lg:w-80">
          <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-base font-semibold text-foreground">Popular Posts</h3>
            <ol className="space-y-4">
              {popularPosts.map((post, i) => (
                <li key={post.id} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                    {i + 1}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:text-muted-foreground dark:hover:text-blue-400"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
            <h3 className="mb-4 text-base font-semibold text-foreground">Categories</h3>
            <ul className="space-y-3">
              {sidebarCategories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setActiveCategory(cat.name)}
                    className="flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-blue-600 dark:text-muted-foreground/70 dark:hover:text-blue-400"
                  >
                    <span>{cat.name}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                      {cat.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-border dark:from-blue-950/30 dark:to-indigo-950/30">
            <h3 className="mb-2 text-base font-semibold text-foreground">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the latest posts delivered straight to your inbox.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-border dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
              />
              <button className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
