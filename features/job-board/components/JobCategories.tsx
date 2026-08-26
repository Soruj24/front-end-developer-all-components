import { CATEGORIES } from "../constants/ui-data";
import { ALL_JOBS } from "../constants/job-data";

interface JobCategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export function JobCategories({ onSelectCategory, selectedCategory }: JobCategoriesProps) {
  const categoryIcons: Record<string, string> = {
    Engineering: "💻",
    Design: "🎨",
    Marketing: "📣",
    Sales: "💰",
    Finance: "📊",
    HR: "👥",
    Legal: "⚖️",
    Operations: "⚙️",
    Data: "📈",
    Product: "🚀",
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Browse by Category</h3>
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map((cat) => {
          const count = ALL_JOBS.filter((j) => j.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(selectedCategory === cat ? "" : cat)}
              className={`flex items-center gap-2 rounded-lg p-3 text-left text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="text-base">{categoryIcons[cat] || "📁"}</span>
              <div>
                <p className="font-medium">{cat}</p>
                <p className={`text-[10px] ${selectedCategory === cat ? "text-white/70 dark:text-zinc-500" : "text-zinc-400 dark:text-zinc-500"}`}>{count} jobs</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
