import type { CareerResource } from "../types";

interface CareerResourcesProps {
  resources: CareerResource[];
}

export function CareerResources({ resources }: CareerResourcesProps) {
  return (
    <div>
      <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Career Resources</h2><p className="mt-1 text-sm text-muted-foreground">Articles to help your job search</p></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((r) => (
          <div key={r.title} className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
            <div className="relative h-36 overflow-hidden">
              <img src={r.image} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-foreground backdrop-blur-sm">{r.category}</span>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{r.reads} reads</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
