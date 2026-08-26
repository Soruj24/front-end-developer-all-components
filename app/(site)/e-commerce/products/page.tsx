"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useGetProductsQuery, useSearchProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from "@/features/ecommerce/api/productsApi";
import { useAppDispatch } from "@/hooks/useRedux";
import { addItem, openCart } from "@/features/ecommerce/slices/cartSlice";
import { CartDrawer } from "@/features/ecommerce/components/CartDrawerRTK";
import { useAppSelector } from "@/hooks/useRedux";
import type { DummyjsonProduct } from "@/features/ecommerce/types/dummyjson.types";

const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
] as const;

function ProductCard({ product, onView, onAdd }: { product: DummyjsonProduct; onView: () => void; onAdd: () => void }) {
  const discount = Math.round(product.discountPercentage);
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <div
        className="relative aspect-square cursor-pointer overflow-hidden bg-muted"
        onClick={onView}
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-0.5 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : "fill-muted stroke-current"}`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{product.title}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          {discount > 0 && (
            <span className="text-xs text-muted-foreground line-through">${originalPrice}</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.stock} in stock</span>
          <span>{product.brand}</span>
        </div>

        <button
          onClick={onAdd}
          className="mt-2 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductDetail({ product, onClose }: { product: DummyjsonProduct; onClose: () => void }) {
  const dispatch = useAppDispatch();
  const discount = Math.round(product.discountPercentage);
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const [qty, setQty] = useState(1);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-4 left-1/2 z-50 flex w-full max-w-3xl -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">{product.title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted md:w-1/2">
              <Image src={product.thumbnail} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              {discount > 0 && (
                <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4">
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "fill-muted stroke-current"}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-muted-foreground">{product.rating.toFixed(1)} rating</span>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-muted-foreground">Brand</span>
                  <p className="font-medium text-foreground">{product.brand}</p>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-muted-foreground">Stock</span>
                  <p className="font-medium text-foreground">{product.stock} units</p>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-muted-foreground">Warranty</span>
                  <p className="font-medium text-foreground">{product.warrantyInformation}</p>
                </div>
                <div className="rounded-lg bg-muted/50 px-3 py-2">
                  <span className="text-muted-foreground">Shipping</span>
                  <p className="font-medium text-foreground">{product.shippingInformation}</p>
                </div>
              </div>

              {product.reviews.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-foreground">Reviews ({product.reviews.length})</h3>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                    {product.reviews.map((r, i) => (
                      <div key={i} className="rounded-lg border border-border p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{r.reviewerName}</span>
                          <span className="text-muted-foreground">{new Date(r.date).toLocaleDateString()}</span>
                        </div>
                        <p className="mt-1 text-muted-foreground">{r.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-border px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            {discount > 0 && <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">-</button>
              <span className="min-w-[2rem] text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground">+</button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) dispatch(addItem(product));
                dispatch(openCart());
              }}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="aspect-square animate-pulse bg-muted" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-6 w-16 animate-pulse rounded bg-muted" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<DummyjsonProduct | null>(null);
  const limit = 12;

  const { data: categories } = useGetCategoriesQuery();

  const { data, isLoading, isFetching, error } = useGetProductsQuery(
    { limit, skip: page * limit },
    { skip: !!searchQuery || !!selectedCategory },
  );

  const { data: searchData, isLoading: isSearchLoading } = useSearchProductsQuery(searchQuery, { skip: !searchQuery });

  const { data: categoryData, isLoading: isCategoryLoading } = useGetProductsByCategoryQuery(
    selectedCategory,
    { skip: !selectedCategory },
  );

  const products: DummyjsonProduct[] = useMemo(() => {
    const source = searchQuery
      ? searchData?.products ?? []
      : selectedCategory
        ? categoryData?.products ?? []
        : data?.products ?? [];

    if (sort === "default") return source;

    return [...source].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "discount": return b.discountPercentage - a.discountPercentage;
        default: return 0;
      }
    });
  }, [data, searchData, categoryData, sort, searchQuery, selectedCategory]);

  const total = searchQuery
    ? searchData?.total ?? 0
    : selectedCategory
      ? categoryData?.total ?? 0
      : data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);
  const loading = isLoading || isFetching || isSearchLoading || isCategoryLoading;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6 lg:p-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} products from dummyjson.com &middot; Redux Toolkit RTK Query
          </p>
        </div>
        <button
          onClick={() => dispatch(openCart())}
          className="relative rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            className="w-full rounded-lg border border-border bg-background py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setSearchQuery(""); setPage(0); }}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400">
          Failed to load products. Please try again later.
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={() => setSelectedProduct(product)}
                onAdd={() => { dispatch(addItem(product)); dispatch(openCart()); }}
              />
            ))}
      </div>

      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg font-medium text-foreground">No products found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
            const pageNum = i;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`h-9 min-w-9 rounded-lg px-3 text-sm font-medium transition-colors ${
                  page === pageNum
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {pageNum + 1}
              </button>
            );
          })}
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {selectedProduct && <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
      <CartDrawer />
    </div>
  );
}
