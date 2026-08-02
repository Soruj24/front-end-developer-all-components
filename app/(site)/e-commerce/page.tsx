"use client";

import { useState } from "react";

const categories = ["Electronics", "Clothing", "Home & Garden", "Books", "Sports"];
const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 - $50", min: 25, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "Over $100", min: 100, max: Infinity },
];

const initialProducts = [
  { id: 1, title: "Wireless Headphones", price: 79.99, rating: 4.5, category: "Electronics" },
  { id: 2, title: "Cotton T-Shirt", price: 24.99, rating: 4.0, category: "Clothing" },
  { id: 3, title: "Indoor Plant Pot", price: 34.99, rating: 4.8, category: "Home & Garden" },
  { id: 4, title: "JavaScript: The Good Parts", price: 29.99, rating: 4.7, category: "Books" },
  { id: 5, title: "Running Shoes", price: 89.99, rating: 4.3, category: "Sports" },
  { id: 6, title: "Bluetooth Speaker", price: 49.99, rating: 4.2, category: "Electronics" },
  { id: 7, title: "Denim Jacket", price: 119.99, rating: 4.6, category: "Clothing" },
  { id: 8, title: "Cookbook Collection", price: 44.99, rating: 4.4, category: "Books" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-amber-400" : "text-muted-foreground"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating}</span>
    </div>
  );
}

export default function EcommercePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = initialProducts.filter((p) => {
    if (selectedCategory && p.category !== selectedCategory) return false;
    if (selectedPriceRange) {
      const range = priceRanges.find((r) => r.label === selectedPriceRange);
      if (range && (p.price < range.min || p.price >= range.max)) return false;
    }
    if (p.rating < minRating) return false;
    return true;
  });

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">E-Commerce</h1>
      <p className="text-muted-foreground">Browse our products.</p>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 flex-col gap-6 lg:flex">
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Categories</h2>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${!selectedCategory ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${selectedCategory === cat ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Price Range</h2>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setSelectedPriceRange(null)}
                className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${!selectedPriceRange ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
              >
                Any
              </button>
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(range.label)}
                  className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${selectedPriceRange === range.label ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-muted-foreground/70">Minimum Rating</h2>
            <div className="flex flex-col gap-1">
              {[0, 3, 4, 4.5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`rounded-md px-3 py-1.5 text-left text-sm transition-colors ${minRating === r ? "bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" : "text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 text-sm text-muted-foreground">{filteredProducts.length} products found</div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900"
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-muted-foreground/70 dark:from-zinc-800 dark:to-zinc-900 dark:text-muted-foreground">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{product.category}</span>
                  <h2 className="font-semibold text-foreground">{product.title}</h2>
                  <StarRating rating={product.rating} />
                  <p className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</p>
                  <button className="mt-auto w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
