"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "../constants/product-data";
import { PRODUCT_CATEGORIES } from "../constants/categories";
import type { SearchSuggestion, ProductCategory } from "../types/ecommerce.types";

interface EnhancedSearchProps {
  className?: string;
}

const RECENT_SEARCHES_KEY = "ecommerce-recent-searches";
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(query: string) {
  const recent = getRecentSearches().filter((s) => s !== query);
  recent.unshift(query);
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

export function EnhancedSearch({ className }: EnhancedSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const productMatches: SearchSuggestion[] = PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    )
      .slice(0, 5)
      .map((p) => ({
        id: p.id,
        text: p.title,
        category: p.category as ProductCategory,
        type: "product" as const,
      }));

    const categoryMatches: SearchSuggestion[] = PRODUCT_CATEGORIES.filter(
      (c) => c.name !== "All" && c.name.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .map((c) => ({
        id: c.name,
        text: c.name,
        category: c.name as ProductCategory,
        type: "category" as const,
      }));

    setSuggestions([...productMatches, ...categoryMatches]);
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    saveRecentSearch(suggestion.text);
    setRecentSearches(getRecentSearches());
    setIsOpen(false);
    if (suggestion.type === "category") {
      router.push(`/e-commerce?category=${encodeURIComponent(suggestion.category || "")}`);
    } else {
      router.push(`/e-commerce?search=${encodeURIComponent(suggestion.text)}`);
    }
  };

  const handleRecentSelect = (search: string) => {
    setQuery(search);
    setIsOpen(false);
    router.push(`/e-commerce?search=${encodeURIComponent(search)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = suggestions.length > 0 ? suggestions : recentSearches.map((s) => ({ id: s, text: s, type: "recent" as const }));
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      const item = items[selectedIndex];
      if (item.type === "product" || item.type === "category") {
        handleSelect(item as SearchSuggestion);
      } else {
        handleRecentSelect(item.text);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const showDropdown = isOpen && (query.trim() || recentSearches.length > 0);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
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
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, categories..."
          className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-10 pr-12 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          /
        </kbd>
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border/50 bg-background shadow-xl">
          {query.trim() && suggestions.length > 0 && (
            <div>
              <p className="px-4 py-2 text-xs font-medium text-muted-foreground">Products</p>
              {suggestions
                .filter((s) => s.type === "product")
                .map((suggestion, i) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSelect(suggestion)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                      selectedIndex === i && "bg-muted"
                    )}
                  >
                    <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-foreground">{suggestion.text}</p>
                      {suggestion.category && (
                        <p className="text-xs text-muted-foreground">{suggestion.category}</p>
                      )}
                    </div>
                  </button>
                ))}
              {suggestions.some((s) => s.type === "category") && (
                <>
                  <p className="px-4 py-2 text-xs font-medium text-muted-foreground border-t border-border/50">Categories</p>
                  {suggestions
                    .filter((s) => s.type === "category")
                    .map((suggestion, i) => (
                      <button
                        key={suggestion.id}
                        onClick={() => handleSelect(suggestion)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                          selectedIndex === suggestions.filter((s) => s.type === "product").length + i && "bg-muted"
                        )}
                      >
                        <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <span className="font-medium text-foreground">{suggestion.text}</span>
                      </button>
                    ))}
                </>
              )}
            </div>
          )}

          {query.trim() && suggestions.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-muted-foreground">No results found for &quot;{query}&quot;</p>
            </div>
          )}

          {!query.trim() && recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-4 py-2">
                <p className="text-xs font-medium text-muted-foreground">Recent Searches</p>
                <button
                  onClick={() => {
                    localStorage.removeItem(RECENT_SEARCHES_KEY);
                    setRecentSearches([]);
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </button>
              </div>
              {recentSearches.map((search, i) => (
                <button
                  key={search}
                  onClick={() => handleRecentSelect(search)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted",
                    selectedIndex === i && "bg-muted"
                  )}
                >
                  <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-foreground">{search}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
