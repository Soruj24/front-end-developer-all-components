"use client";

import { cn } from "@/lib/cn";
import type { PropertyType, ListingStatus } from "../types/real-estate.types";
import { PROPERTY_TYPES, LISTING_STATUSES } from "../constants/properties";

interface PropertyFiltersProps {
  activeType: PropertyType;
  activeStatus: ListingStatus;
  search: string;
  minPrice: string;
  maxPrice: string;
  minBeds: string;
  minBaths: string;
  onTypeChange: (type: PropertyType) => void;
  onStatusChange: (status: ListingStatus) => void;
  onSearchChange: (search: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onMinBedsChange: (val: string) => void;
  onMinBathsChange: (val: string) => void;
  className?: string;
}

export function PropertyFilters({
  activeType,
  activeStatus,
  search,
  minPrice,
  maxPrice,
  minBeds,
  minBaths,
  onTypeChange,
  onStatusChange,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinBedsChange,
  onMinBathsChange,
  className,
}: PropertyFiltersProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-xl border border-border/50 bg-background p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Search
        </h3>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by address or name..."
            className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Price Range
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="Min"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="Max"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Bedrooms & Bathrooms
        </h3>
        <div className="flex gap-2">
          <input
            type="number"
            value={minBeds}
            onChange={(e) => onMinBedsChange(e.target.value)}
            placeholder="Min Beds"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <input
            type="number"
            value={minBaths}
            onChange={(e) => onMinBathsChange(e.target.value)}
            placeholder="Min Baths"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Property Type
        </h3>
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type as PropertyType)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                activeType === type
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border/50 bg-background p-5">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {LISTING_STATUSES.map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(status as ListingStatus)}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                activeStatus === status
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
