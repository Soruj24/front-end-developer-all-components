import { CUISINES } from "../constants/menu-data";

interface CuisineFilterProps {
  active: string;
  onChange: (cuisine: string) => void;
}

export function CuisineFilter({ active, onChange }: CuisineFilterProps) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Cuisine Type</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {CUISINES.map((c) => (
          <button key={c} onClick={() => onChange(c)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${active === c ? "bg-orange-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{c}</button>
        ))}
      </div>
    </div>
  );
}
