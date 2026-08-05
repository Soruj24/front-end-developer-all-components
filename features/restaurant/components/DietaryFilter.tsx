import { DIETARY_OPTIONS } from "../constants/menu-data";

interface DietaryFilterProps {
  active: string | null;
  onChange: (dietary: string | null) => void;
}

export function DietaryFilter({ active, onChange }: DietaryFilterProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Dietary Preferences</h3>
      <div className="flex flex-wrap gap-2">
        {DIETARY_OPTIONS.map((d) => (
          <button key={d} onClick={() => onChange(active === d ? null : d)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active === d ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{d}</button>
        ))}
      </div>
    </div>
  );
}
