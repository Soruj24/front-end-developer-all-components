"use client";

import { useState } from "react";
import {
  BlogCard,
  BlogHero,
  BlogSidebar,
  BlogPagination,
  BlogSearch,
  BlogCategoryFilter,
  BLOG_POSTS,
  BLOG_CATEGORIES,
  POPULAR_POSTS,
} from "@/features/blog";
import type { BlogPost } from "@/features/blog";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !post.featured;
  });

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-8 lg:p-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Blog
          </h1>
          <p className="mt-1 text-muted-foreground">
            Insights, tutorials, and updates from our team.
          </p>
        </div>
        <BlogSearch value={searchQuery} onChange={setSearchQuery} />
      </header>

      <BlogHero post={featuredPost} />

      <BlogCategoryFilter
        active={activeCategory}
        onSelect={(cat) => {
          setActiveCategory(cat);
          setCurrentPage(1);
        }}
      />

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {paginatedPosts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">
                No posts found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
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

        <BlogSidebar
          popularPosts={POPULAR_POSTS}
          categories={BLOG_CATEGORIES}
          onCategorySelect={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
