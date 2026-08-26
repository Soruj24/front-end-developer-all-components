import { JOB_TYPES, EXPERIENCE_LEVELS, CATEGORIES, LOCATIONS } from "../constants/ui-data";

interface JobFiltersProps {
  selectedTypes: string[];
  onToggleType: (t: string) => void;
  selectedLevels: string[];
  onToggleLevel: (l: string) => void;
  salaryMin: number;
  onSalaryMinChange: (v: number) => void;
  salaryMax: number;
  onSalaryMaxChange: (v: number) => void;
  onLocationSelect: (loc: string) => void;
}

export function JobFilters({ selectedTypes, onToggleType, selectedLevels, onToggleLevel, salaryMin, onSalaryMinChange, salaryMax, onSalaryMaxChange, onLocationSelect }: JobFiltersProps) {
  return (
    <div className="space-y-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Job Type</h3>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onToggleType(t)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                selectedTypes.includes(t)
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => onToggleLevel(l)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 ${
                selectedLevels.includes(l)
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Salary Range: ${salaryMin}k – ${salaryMax}k</h3>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={30}
            max={300}
            value={salaryMin}
            onChange={(e) => onSalaryMinChange(Math.min(Number(e.target.value), salaryMax - 10))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700"
          />
          <input
            type="range"
            min={30}
            max={300}
            value={salaryMax}
            onChange={(e) => onSalaryMaxChange(Math.max(Number(e.target.value), salaryMin + 10))}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700"
          />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Browse by Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="rounded-lg border border-zinc-200 px-3 py-2 text-center text-xs font-medium text-zinc-600 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Popular Locations</h3>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => onLocationSelect(loc)}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-all duration-200 hover:border-zinc-300 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-white"
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
