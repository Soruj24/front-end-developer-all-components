"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import { Search, X, ChevronDown, Moon, Sun } from "lucide-react";

interface HeaderSearchProps {
  onToggle: () => void;
  onClose: () => void;
  className?: string;
  initialQuery?: string;
}

const RECENT_SEARCHES = [
  "button",
  "dialog",
  "form",
  "navbar",
  "cart",
];

const SEARCH_SUGGESTIONS = [
  { query: "button", category: "Components" },
  { query: "dialog", category: "Components" },
  { query: "template", category: "Templates" },
  { query: "docs", category: "Documentation" },
  { query: "navigation", category: "Components" },
];

interface SearchItem {
  query: string;
  category: string;
  href?: string;
}

export function HeaderSearch({ onToggle, onClose, className, initialQuery = "" }: HeaderSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add to history
  const addToHistory = useCallback((query: string) => {
    setSearchHistory((prev) => {
      const normalized = prev.filter((item) => item.query.toLowerCase() !== query.toLowerCase());
      const updated = [{ query, category: "Recent" }, ...normalized].slice(0, 10);
      return updated;
    });
  }, []);

  // Handle input change
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);

    if (value.length > 0) {
      addToHistory(value);
    } else {
      setShowSuggestions(false);
    }
  }, [addToHistory]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        if (inputRef.current) {
          inputRef.current.blur();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={cn("relative w-full", className)}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "hidden sm:block",
          "flex items-center gap-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        aria-label="Search"
      >
        <Search className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Search Modal */}
      <div
        ref={dropdownRef}
        className={cn(
          "absolute right-0 left-full z-50 mt-2 w-80 rounded-2xl border border-border bg-popover shadow-lg py-4 transition-all duration-200 ease-out transform -translate-x-full sm:translate-x-0",
          showSuggestions ? "translate-x-0" : "-translate-x-full",
          "opacity-0 sm:opacity-100",
          "data-[state=open]:translate-x-0 data-[state=open]:opacity-100",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
      >
        <div className="bg-popover p-4 pt-1">
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search components, templates, docs..."
              value={query}
              onChange={handleChange}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  onClose();
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  // TODO: focus next suggestion
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  // TODO: focus previous suggestion
                }
              }}
              autoFocus
              className={cn(
                "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                "placeholder:text-muted-foreground"
              )}
            />
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "ml-2 flex h-6 w-6 items-center justify-center rounded-full hover:bg-border transition-colors"
              )}
              aria-label={`Close search`}
            >
              <X className="h-3 w-3 stroke-current" />
            </button>
          </div>

          {/* Recent Searches */}
          {showSuggestions && RECENT_SEARCHES.length > 0 && (
            <div className="mb-3 pt-3 border-t border-border">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Recent
              </h3>
              <div className="space-y-1">
                {RECENT_SEARCHES.map((query) => (
                  <button
                    key={query}
                    type="button"
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-border hover:text-foreground transition-colors"
                    )}
                    aria-label={`Recent search: ${query}`}
                    onClick={() => {
                      setQuery(query);
                      setShowSuggestions(false);
                      onClose();
                      // TODO: perform search
                    }}
                  >
                    <Search className="h-3 w-3 shrink-0 mr-1 stroke-current" />
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!showSuggestions && query.length === 0 && (
            <p className="text-xs text-muted-foreground">
              Start typing to search components, templates, or documentation
            </p>
          )}

          {/* Suggestions */}
          {showSuggestions && (
            <div className="mt-2 max-h-40 overflow-y-auto space-y-1">
              {SEARCH_SUGGESTIONS.map((item) => (
                <button
                  key={item.query}
                  type="button"
                  className={cn(
                    "flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm hover:bg-border transition-colors"
                  )}
                  aria-label={`Search: ${item.query}`}
                  onClick={() => {
                    setQuery(item.query);
                    setShowSuggestions(false);
                    onClose();
                    // TODO: perform search
                  }}
                >
                  <Search className="h-3 w-3 shrink-0 mr-1 stroke-current" />
                  {item.query}
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          {showSuggestions && (
            <div className="mt-2 pt-3 border-t border-border">
              <button
                type="button"
                className={cn(
                  "w-full justify-between text-xs text-muted-foreground",
                  "py-1.5"
                )}
              >
                <span>Ctrl + K ⌘ + K to search</span>
                <span>Esc to close</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}