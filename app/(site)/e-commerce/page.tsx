"use client";

import { useState, useMemo } from "react";
import {
  ProductGrid,
  ProductFilters,
  useCart,
  PRODUCTS,
  PRICE_RANGES,
  ProductBreadcrumbs,
} from "@/features/ecommerce";
import type { ProductCategory, ProductSort } from "@/features/ecommerce";

const POSTS_PER_PAGE = 12;

export default function EcommercePage() {
  const cart = useCart();
  const [category, setCategory] = useState<ProductCategory>("All");
  const [priceRange, setPriceRange] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<ProductSort>("featured");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const range = PRICE_RANGES[priceRange];
      const matchPrice = p.price >= range.min && p.price <= range.max;
      const matchRating = p.rating >= minRating;
      const matchSearch =
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchPrice && matchRating && matchSearch;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => Number(b.id) - Number(a.id));
        break;
      case "bestselling":
        result = [...result].sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      case "discount":
        result = [...result].sort((a, b) => {
          const discA = a.originalPrice
            ? (a.originalPrice - a.price) / a.originalPrice
            : 0;
          const discB = b.originalPrice
            ? (b.originalPrice - b.price) / b.originalPrice
            : 0;
          return discB - discA;
        });
        break;
    }

    return result;
  }, [category, priceRange, minRating, sort, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-6 sm:p-8 lg:p-12">
      <ProductBreadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
      />

      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shop
        </h1>
        <p className="mt-1 text-muted-foreground">
          Discover our curated collection of premium products
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row">
        <ProductFilters
          selectedCategory={category}
          selectedPriceRange={priceRange}
          minRating={minRating}
          sort={sort}
          search={search}
          onCategoryChange={setCategory}
          onPriceRangeChange={setPriceRange}
          onMinRatingChange={setMinRating}
          onSortChange={setSort}
          onSearchChange={setSearch}
        />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "grid"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
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
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-md p-1.5 transition-colors ${
                    viewMode === "list"
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  }`}
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
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              {cart.totalSavings > 0 && (
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                  You save ${cart.totalSavings.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <ProductGrid
            products={paginatedProducts}
            onAddToCart={cart.addItem}
          />

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-1.5">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                <svg
                  className="h-3.5 w-3.5"
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
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
              >
                Next
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
