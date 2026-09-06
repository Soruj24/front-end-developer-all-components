"use client";

import { useState } from "react";
import EmptyState from "@/components/ui/EmptyState";
import {
  BlogCard,
  BlogHero,
  BlogSidebar,
  BlogPagination,
  BlogSearch,
  BlogCategoryFilter,
  BlogTagsCloud,
  BLOG_POSTS,
  BLOG_CATEGORIES,
  POPULAR_POSTS,
  BLOG_TAGS,
} from "@/features/blog";

const POSTS_PER_PAGE = 6;

export function BlogPageLayout() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch && !post.featured;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  const totalViews = BLOG_POSTS.reduce((acc, post) => acc + (post.views || 0), 0);
  const totalLikes = BLOG_POSTS.reduce((acc, post) => acc + (post.likes || 0), 0);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-8 lg:p-12">
      <header className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Blog
            </h1>
            <p className="mt-1 text-muted-foreground">
              Insights, tutorials, and updates from our team.
            </p>
          </div>
          <BlogSearch
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            {BLOG_POSTS.length} articles
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {totalViews.toLocaleString()} views
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {totalLikes} likes
          </span>
        </div>
      </header>

      <BlogHero post={featuredPost} />

      <BlogCategoryFilter
        active={activeCategory}
        onSelect={(cat) => {
          setActiveCategory(cat);
          setCurrentPage(1);
        }}
      />

      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
        Showing {paginatedPosts.length} of {filteredPosts.length} articles
        {searchQuery.trim() && (
          <>
            {" "}for &ldquo;
            <span className="font-medium text-foreground">{searchQuery.trim()}</span>
            &rdquo;
          </>
        )}
      </p>

      <div className="flex min-w-0 flex-col gap-8 lg:flex-row">
        <div className="min-w-0 flex-1">
          {paginatedPosts.length === 0 ? (
            <EmptyState
              icon={
                <svg
                  className="h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
              title="No posts found"
              description="Try adjusting your search or filter to find what you're looking for."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                    setCurrentPage(1);
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid min-w-0 gap-6 sm:grid-cols-2">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <BlogPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className="mt-10"
            />
          )}
        </div>

        <div className="w-full shrink-0 space-y-6 lg:w-80">
          <BlogSidebar
            popularPosts={POPULAR_POSTS}
            categories={BLOG_CATEGORIES}
            onCategorySelect={(cat) => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
          />
          <BlogTagsCloud tags={BLOG_TAGS} />
        </div>
      </div>
    </div>
  );
}
