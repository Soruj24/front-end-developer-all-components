import { Hammer, Drill, Ruler, Paintbrush } from "lucide-react";

const categories = [
  { name: "Hand Tools", icon: Hammer, count: 24, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  { name: "Power Tools", icon: Drill, count: 12, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
  { name: "Measuring", icon: Ruler, count: 8, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
  { name: "Painting", icon: Paintbrush, count: 15, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10" },
];

export function ToolCategoriesDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="group rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:shadow-zinc-900/50"
        >
          <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${cat.bg} transition-transform duration-150 group-hover:scale-110`}>
            <cat.icon className={`h-5 w-5 ${cat.color}`} />
          </div>
          <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{cat.name}</p>
          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-500">{cat.count} items</p>
        </div>
      ))}
    </div>
  );
}
