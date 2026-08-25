"use client";

import { Suspense, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ProductGrid,
  ProductFilters,
  useCart,
  PRODUCTS,
  PRICE_RANGES,
  ProductBreadcrumbs,
} from "@/features/ecommerce";
import type { ProductCategory, ProductSort } from "@/features/ecommerce";

const installCommand = `npx component-library@latest add e-commerce`;

const usageCode = `import { ProductGrid, ProductFilters, useCart } from "@/features/ecommerce";

<ProductFilters onCategoryChange={setCategory} />
<ProductGrid products={products} onAddToCart={addToCart} />`;

const POSTS_PER_PAGE = 12;

function EcommerceContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const cart = useCart();

  const category = (searchParams.get("category") as ProductCategory) || "All";
  const search = searchParams.get("search") || "";
  const sort = (searchParams.get("sort") as ProductSort) || "featured";
  const priceRangeIdx = Number(searchParams.get("price")) || 0;
  const minRating = Number(searchParams.get("rating")) || 0;
  const currentPage = Number(searchParams.get("page")) || 1;

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "0" && value !== "featured" && value !== "All" && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/e-commerce${params.toString() ? `?${params.toString()}` : ""}`);
    },
    [router, searchParams],
  );

  const setCategory = useCallback(
    (c: ProductCategory) => updateParam("category", c),
    [updateParam],
  );
  const setSearch = useCallback(
    (s: string) => updateParam("search", s),
    [updateParam],
  );
  const setSort = useCallback(
    (s: ProductSort) => updateParam("sort", s),
    [updateParam],
  );
  const setPriceRange = useCallback(
    (i: number) => updateParam("price", String(i)),
    [updateParam],
  );
  const setMinRating = useCallback(
    (r: number) => updateParam("rating", String(r)),
    [updateParam],
  );
  const setPage = useCallback(
    (p: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (p > 1) {
        params.set("page", String(p));
      } else {
        params.delete("page");
      }
      router.push(`/e-commerce?${params.toString()}`);
    },
    [router, searchParams],
  );

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      const matchCat = category === "All" || p.category === category;
      const range = PRICE_RANGES[priceRangeIdx] || PRICE_RANGES[0];
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
  }, [category, priceRangeIdx, minRating, sort, search]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Shop</h1>
          <Badge variant="primary">5 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          E-commerce storefront with product grid, filters, search, sorting, pagination, and cart.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">Product Grid with Filters</h3>
          <p className="text-sm text-muted-foreground">Filterable product grid with category, price, rating, and sort controls.</p>
          <div className="rounded-lg border border-border bg-background p-6">
            <ProductBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
            <div className="flex flex-col gap-8 lg:flex-row mt-6">
              <ProductFilters
                selectedCategory={category}
                selectedPriceRange={priceRangeIdx}
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
                    {cart.totalSavings > 0 && (
                      <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                        You save ${cart.totalSavings.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <ProductGrid products={paginatedProducts} onAddToCart={cart.addItem} />
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-1.5">
                    <button onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40">
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button key={page} onClick={() => setPage(page)} className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${page === currentPage ? "bg-primary text-primary-foreground shadow-sm" : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                        {page}
                      </button>
                    ))}
                    <button onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40">
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default function EcommercePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-12 w-64 animate-pulse rounded bg-muted" />
          <div className="flex gap-8">
            <div className="h-96 w-64 animate-pulse rounded-xl bg-muted" />
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <EcommerceContent />
    </Suspense>
  );
}
