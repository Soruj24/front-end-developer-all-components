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
    <div className="space-y-6 rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Job Type</h3>
        <div className="flex flex-wrap gap-2">
          {JOB_TYPES.map((t) => <button key={t} onClick={() => onToggleType(t)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedTypes.includes(t) ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{t}</button>)}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_LEVELS.map((l) => <button key={l} onClick={() => onToggleLevel(l)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${selectedLevels.includes(l) ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{l}</button>)}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Salary Range: ${salaryMin}k - ${salaryMax}k</h3>
        <div className="flex items-center gap-4">
          <input type="range" min={30} max={300} value={salaryMin} onChange={(e) => onSalaryMinChange(Math.min(Number(e.target.value), salaryMax - 10))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue-600 dark:bg-muted" />
          <input type="range" min={30} max={300} value={salaryMax} onChange={(e) => onSalaryMaxChange(Math.max(Number(e.target.value), salaryMin + 10))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-blue-600 dark:bg-muted" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Browse by Category</h3>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => <button key={cat} className="rounded-xl border border-border px-3 py-2 text-center text-xs font-medium text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-border dark:text-muted-foreground dark:hover:border-blue-700 dark:hover:text-blue-400">{cat}</button>)}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Popular Locations</h3>
        <div className="flex flex-wrap gap-2">
          {LOCATIONS.map((loc) => <button key={loc} onClick={() => onLocationSelect(loc)} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-blue-300 hover:text-blue-600 dark:border-border dark:text-muted-foreground/70 dark:hover:border-blue-700 dark:hover:text-blue-400">{loc}</button>)}
        </div>
      </div>
    </div>
  );
}
