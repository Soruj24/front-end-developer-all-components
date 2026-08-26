import type { CareerResource } from "../types";

interface CareerResourcesProps {
  resources: CareerResource[];
}

export function CareerResources({ resources }: CareerResourcesProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">Career Resources</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Articles to help your job search</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <div key={r.title} className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            <div className="relative h-36 overflow-hidden">
              <img src={r.image} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-zinc-900 backdrop-blur-sm dark:bg-zinc-900/90 dark:text-white">{r.category}</span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{r.title}</h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{r.reads} reads</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
