import type { SortOption } from "../types";

interface SortingBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
  perPage: number;
  currentPage: number;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "salary-high", label: "Salary: High to Low" },
  { value: "salary-low", label: "Salary: Low to High" },
  { value: "date-new", label: "Most Recent" },
  { value: "date-old", label: "Oldest First" },
];

export function SortingBar({ sortBy, onSortChange, totalResults, perPage, currentPage }: SortingBarProps) {
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalResults);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Showing <span className="font-medium text-zinc-900 dark:text-white">{totalResults > 0 ? start : 0}–{end}</span> of{" "}
        <span className="font-medium text-zinc-900 dark:text-white">{totalResults}</span> results
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Sort by</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 outline-none transition-colors focus:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
