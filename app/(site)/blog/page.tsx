"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { BlogPageLayout } from "./components/BlogPageLayout";

const BLOG_SOURCE = `"use client";

import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
}

const posts: BlogPost[] = [
  { id: "1", title: "Designing for Scale", excerpt: "How we structure components for growth.", category: "Design", date: "Jan 12, 2026" },
  { id: "2", title: "AI-Powered Interfaces", excerpt: "Building reactive UIs with language models.", category: "AI", date: "Jan 5, 2026" },
];

export function BlogPage() {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Design", "AI"];

  const filtered =
    category === "All" ? posts : posts.filter((post) => post.category === category);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Blog</h1>
        <p className="mt-1 text-muted-foreground">
          Insights, tutorials, and updates from our team.
        </p>
      </header>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={\`rounded-full px-3 py-1 text-xs font-medium transition-colors \${
              category === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }\`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((post) => (
          <article key={post.id} className="rounded-xl border border-border bg-card p-5">
            <span className="text-xs font-medium text-primary">{post.category}</span>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{post.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <p className="mt-3 text-xs text-muted-foreground">{post.date}</p>
          </article>
        ))}
      </div>
    </div>
  );
}`;

const BLOG_LAYOUT_EXAMPLE = `<BlogPageLayout />`;

const SEARCH_EXAMPLE = `<BlogSearch value={searchQuery} onChange={setSearchQuery} />`;

const CATEGORY_EXAMPLE = `<BlogCategoryFilter
  active={activeCategory}
  onSelect={(cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  }}
/>`;

export default function BlogPage() {
  return (
    <ComponentDocPage
      name="Blog"
      category="Layout"
      description="Blog page layout with posts, categories, search, and newsletter subscription."
    >
      <PreviewPanel filename="blog-page.tsx">
        <BlogPageLayout />
      </PreviewPanel>

      <SourceCodeViewer source={BLOG_SOURCE} filename="components/ui/Blog/BlogPage.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Blog Layout" description="Full blog page with featured hero, post grid, and sidebar." code={BLOG_LAYOUT_EXAMPLE}><BlogPageLayout /></ExampleBlock>
        <ExampleBlock title="Search" description="Live search across post titles, excerpts, and tags." code={SEARCH_EXAMPLE}><BlogPageLayout /></ExampleBlock>
        <ExampleBlock title="Category Filter" description="Filter posts by category with a pill button row." code={CATEGORY_EXAMPLE}><BlogPageLayout /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}