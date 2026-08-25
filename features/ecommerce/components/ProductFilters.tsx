"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { InlineSelect } from "@/components/ui/InlineSelect";
import type { ProductCategory, ProductSort } from "../types/ecommerce.types";
import { PRODUCT_CATEGORIES, PRICE_RANGES } from "../constants/categories";

interface ProductFiltersProps {
  selectedCategory: ProductCategory;
  selectedPriceRange: number;
  minRating: number;
  sort: ProductSort;
  search: string;
  onCategoryChange: (category: ProductCategory) => void;
  onPriceRangeChange: (index: number) => void;
  onMinRatingChange: (rating: number) => void;
  onSortChange: (sort: ProductSort) => void;
  onSearchChange: (search: string) => void;
  className?: string;
}

function DebouncedSearchInput({
  initialValue,
  onChange,
}: {
  initialValue: string;
  onChange: (value: string) => void;
}) {
  const [localValue, setLocalValue] = useState(initialValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleChange = useCallback(
    (next: string) => {
      setLocalValue(next);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange(next);
      }, 350);
    },
    [onChange],
  );

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

export function ProductFilters({
  selectedCategory,
  selectedPriceRange,
  minRating,
  sort,
  search,
  onCategoryChange,
  onPriceRangeChange,
  onMinRatingChange,
  onSortChange,
  onSearchChange,
  className,
}: ProductFiltersProps) {
  return (
    <aside className={cn("w-full shrink-0 space-y-6 lg:w-72", className)}>
      <DebouncedSearchInput
        key={search}
        initialValue={search}
        onChange={onSearchChange}
      />

      <div className="rounded-xl border border-border/50 bg-background p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Category
        </h3>
        <ul className="space-y-1">
          {PRODUCT_CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <button
                onClick={() => onCategoryChange(cat.name)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  selectedCategory === cat.name
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-muted-foreground">{cat.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>
        <ul className="space-y-1">
          {PRICE_RANGES.map((range, i) => (
            <li key={range.label}>
              <button
                onClick={() => onPriceRangeChange(i)}
                className={cn(
                  "flex w-full rounded-lg px-3 py-2 text-sm transition-colors",
                  selectedPriceRange === i
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Minimum Rating
        </h3>
        <ul className="space-y-1">
          {[0, 3, 4, 4.5].map((rating) => (
            <li key={rating}>
              <button
                onClick={() => onMinRatingChange(rating)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  minRating === rating
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground/80 hover:bg-muted hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={cn(
                        "h-3 w-3",
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted"
                      )}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>{rating === 0 ? "All" : `${rating}+`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sort By
        </h3>
        <InlineSelect
          options={[
            { value: "featured", label: "Featured" },
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
            { value: "rating", label: "Highest Rated" },
            { value: "newest", label: "Newest" },
          ]}
          value={sort}
          onChange={(val) => onSortChange(val as ProductSort)}
          size="sm"
        />
      </div>
    </aside>
  );
}
