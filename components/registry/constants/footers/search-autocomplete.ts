import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const searchAutocomplete: RegistryEntry = entry({
    id: "search-autocomplete",
    title: "Autocomplete",
    description: "Search input with recent searches, suggestions, clear button, and keyboard shortcuts.",
    source: `import { useEffect, useRef, useState } from "react";

const suggestions = [
  "Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Kiwi", "Lemon", "Mango", "Orange",
];

export default function SearchAutocomplete() {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(["Apple", "Mango", "Grape"]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredSuggestions = suggestions
    .filter((s) => s.toLowerCase().includes(query.toLowerCase()) && !recentSearches.includes(s))
    .slice(0, 5);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        setShowSuggestions(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    if (value.trim() && !recentSearches.includes(value)) {
      setRecentSearches((prev) => [value, ...prev].slice(0, 5));
    }
    setQuery(value);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search items..."
          className="w-full rounded-md border border-zinc-300 bg-transparent py-2 pl-10 pr-20 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-400"
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden rounded-md border border-zinc-300 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 sm:inline-block dark:border-zinc-700">⌘K</kbd>
        </div>
      </div>

      {showSuggestions && (query || recentSearches.length > 0) && (
        <div className="absolute z-10 mt-1 w-full rounded-md border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {recentSearches.length > 0 && !query && (
            <div>
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Recent Searches</p>
              {recentSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSearch(s)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          )}
          {query && filteredSuggestions.length > 0 && (
            <div>
              {recentSearches.some((s) => s.toLowerCase().includes(query.toLowerCase())) && (
                <>
                  <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Recent</p>
                  {recentSearches.filter((s) => s.toLowerCase().includes(query.toLowerCase())).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSearch(s)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {s}
                    </button>
                  ))}
                </>
              )}
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Suggestions</p>
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSearch(s)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}`,
  });
