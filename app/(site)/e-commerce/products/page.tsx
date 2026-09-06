"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";
import EmptyState from "@/components/ui/EmptyState";
import { useGetProductsQuery, useSearchProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from "@/features/ecommerce/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addItem, openCart } from "@/features/ecommerce/slices/cartSlice";
import { toggleWishlist } from "@/features/ecommerce/slices/wishlistSlice";
import { addToast } from "@/features/ecommerce/slices/toastSlice";
import { CartDrawer } from "@/features/ecommerce/components/CartDrawerRTK";
import { ToastContainer } from "@/features/ecommerce/components/ToastContainer";
import { ProductCard } from "./components/ProductCard";
import { ProductDetail } from "./components/ProductDetail";
import type { DummyjsonProduct } from "@/features/ecommerce/types/dummyjson.types";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
] as const;

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
] as const;

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-surface shadow-sm" aria-hidden="true">
      <div className="aspect-square animate-pulse bg-muted/50" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-muted/50" />
        <div className="h-5 w-full animate-pulse rounded bg-muted/50" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-muted/50" />
        <div className="h-6 w-16 animate-pulse rounded bg-muted/50" />
        <div className="h-10 w-full animate-pulse rounded-md bg-muted/50" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<DummyjsonProduct | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<DummyjsonProduct[]>([]);
  const limit = 12;

  const { data: categories } = useGetCategoriesQuery();
  const { data, isLoading, isFetching, error } = useGetProductsQuery({ limit, skip: page * limit }, { skip: !!searchQuery || !!selectedCategory });
  const { data: searchData, isLoading: isSearchLoading } = useSearchProductsQuery(searchQuery, { skip: !searchQuery });
  const { data: categoryData, isLoading: isCategoryLoading } = useGetProductsByCategoryQuery(selectedCategory, { skip: !selectedCategory });

  const products: DummyjsonProduct[] = useMemo(() => {
    const source = searchQuery ? searchData?.products ?? [] : selectedCategory ? categoryData?.products ?? [] : data?.products ?? [];
    const range = PRICE_RANGES[selectedPriceRange];
    const filtered = range.max === Infinity ? source : source.filter((p) => p.price >= range.min && p.price < range.max);
    if (sort === "default") return filtered;
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "discount": return b.discountPercentage - a.discountPercentage;
        default: return 0;
      }
    });
  }, [data, searchData, categoryData, sort, searchQuery, selectedCategory, selectedPriceRange]);

  const total = searchQuery ? searchData?.total ?? 0 : selectedCategory ? categoryData?.total ?? 0 : data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const loading = isLoading || isFetching || isSearchLoading || isCategoryLoading;

  const handleView = useCallback((product: DummyjsonProduct) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedPriceRange(0);
    setSort("default");
    setPage(0);
  }, []);

  const selectClass = cn(
    "h-11 rounded-lg border border-border bg-background px-3 text-sm text-foreground transition-colors hover:border-muted-foreground/30 lg:h-10",
    FOCUS.ringInput,
  );

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-10">
      <header className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Link href="/e-commerce" className="rounded transition-colors hover:text-foreground">
              Store
            </Link>
            <span aria-hidden="true" className="text-border">/</span>
            <span aria-current="page" className="font-medium text-foreground">Products</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Products</h1>
          <p role="status" aria-live="polite" className="mt-1 text-sm text-muted-foreground">
            {total} products · {cartCount} in cart
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(openCart())}
          aria-label={cartCount > 0 ? `Open cart, ${cartCount} items` : "Open cart"}
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-border/60 text-foreground transition-colors hover:bg-muted",
            FOCUS.ring,
          )}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <div role="search" className="relative min-w-[200px] flex-1 sm:max-w-sm">
          <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search products…"
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            className={cn(selectClass, "pl-10 pr-10")}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(""); setPage(0); }}
              aria-label="Clear search"
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <label className="sr-only" htmlFor="products-category">Category</label>
        <select id="products-category" value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setSearchQuery(""); setPage(0); }} className={selectClass}>
          <option value="">All Categories</option>
          {categories?.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <label className="sr-only" htmlFor="products-price">Price range</label>
        <select id="products-price" value={selectedPriceRange} onChange={(e) => { setSelectedPriceRange(Number(e.target.value)); setPage(0); }} className={selectClass}>
          {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
        </select>
        <label className="sr-only" htmlFor="products-sort">Sort by</label>
        <select id="products-sort" value={sort} onChange={(e) => setSort(e.target.value)} className={selectClass}>
          {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {error && (
        <div role="alert" className="rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger">
          Failed to load products. Please try again later.
        </div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={() => handleView(product)}
                onAdd={() => { dispatch(addItem(product)); dispatch(addToast({ message: `${product.title} added to cart`, type: "success" })); dispatch(openCart()); }}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={() => { dispatch(toggleWishlist(product.id)); dispatch(addToast({ message: wishlistIds.includes(product.id) ? "Removed from wishlist" : "Added to wishlist", type: "info" })); }}
              />
            ))}
      </div>

      {!loading && products.length === 0 && (
        <EmptyState
          icon={
            <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          }
          title="No products found"
          description="Try adjusting your search or filters."
          action={
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Clear filters
            </button>
          }
        />
      )}

      {totalPages > 1 && (
        <nav aria-label="Products pages" className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Previous page"
            className="inline-flex min-h-[44px] items-center rounded-md border border-border/60 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 sm:min-h-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Page ${i + 1}`}
              aria-current={page === i ? "page" : undefined}
              className={cn(
                "h-11 min-w-11 rounded-md px-3 text-sm font-medium transition-colors sm:h-9 sm:min-w-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                page === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            aria-label="Next page"
            className="inline-flex min-h-[44px] items-center rounded-md border border-border/60 px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 sm:min-h-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Next
          </button>
        </nav>
      )}

      {recentlyViewed.length > 0 && (
        <section aria-labelledby="recently-viewed" className="flex min-w-0 flex-col gap-4 border-t border-border/60 pt-6">
          <h2 id="recently-viewed" className="text-lg font-semibold text-foreground">Recently Viewed</h2>
          <div className="grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {recentlyViewed.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleView(p)}
                aria-label={`View ${p.title}`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border/60 bg-surface transition-colors hover:border-ring/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="relative aspect-square overflow-hidden bg-muted/20">
                  <Image src={p.thumbnail} alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div className="min-w-0 p-2 text-left">
                  <p className="line-clamp-1 text-xs font-medium text-foreground">{p.title}</p>
                  <p className="text-xs font-bold text-foreground">${p.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <CartDrawer />
      <ToastContainer />
    </div>
  );
}
