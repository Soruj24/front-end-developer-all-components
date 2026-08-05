import { CATEGORIES } from "../constants/course-data";

interface CategoryFilterProps {
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button key={cat} onClick={() => onChange(cat)} className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${active === cat ? "bg-blue-600 text-white shadow-md" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground dark:hover:bg-muted"}`}>{cat}</button>
      ))}
    </div>
  );
}
