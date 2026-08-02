import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const searchFiltersResults: RegistryEntry = entry({
    id: "search-filters-results",
    title: "Filters & Results",
    description: "Filter pills, result list, result count, and an empty state.",
    source: `import { useState } from "react";

const allItems = [
  "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape", "Kiwi",
  "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince", "Raspberry", "Strawberry",
  "Tangerine", "Ugli Fruit", "Vanilla Bean", "Watermelon", "Xigua", "Yellow Passion Fruit", "Zucchini",
];

const filters = ["All", "Fruit", "Berry", "Citrus"];

export default function SearchFilteredResults() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = query
    ? allItems.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : activeFilter === "All"
      ? allItems
      : allItems.filter((item) => {
          if (activeFilter === "Berry") return item.toLowerCase().includes("berry");
          if (activeFilter === "Citrus") return ["Lemon", "Orange", "Tangerine", "Lime"].includes(item);
          return true;
        });

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative max-w-md">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search items..."
          className="w-full rounded-md border border-zinc-300 bg-transparent py-2 pl-10 pr-3 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:focus:border-zinc-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button key={f} onClick={() => setActiveFilter(f)} className={\`rounded-full px-3 py-1 text-sm \${activeFilter === f ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"}\`}>
            {f}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-500">
          {filtered.length > 0
            ? \`Showing \${filtered.length} of \${allItems.length} results\`
            : "No results found"}
        </p>
        {query && (
          <p className="text-xs text-zinc-400">
            Search: &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="space-y-2">
          {filtered.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-md border px-4 py-2 text-sm dark:border-zinc-700">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {item.charAt(0)}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <svg className="h-16 w-16 text-zinc-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium text-zinc-500">No results found</p>
          <p className="text-sm text-zinc-400">Try adjusting your search or filter to find what you&rsquo;re looking for.</p>
          <button onClick={() => { setQuery(""); setActiveFilter("All"); }} className="text-sm text-primary hover:underline dark:text-blue-400">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}`,
  });
