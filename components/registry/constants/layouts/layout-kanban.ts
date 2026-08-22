import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutKanban: RegistryEntry = entry({
    id: "layout-kanban",
    title: "Kanban Board",
    description: "Board columns with draggable-looking cards.",
    source: `const columns = [
  { title: "Todo", count: 3 },
  { title: "Doing", count: 2 },
  { title: "Done", count: 5 },
];

export default function LayoutKanban() {
  return (
    <div className="flex h-48 w-full gap-2 overflow-hidden rounded-xl border border-border bg-muted/20 p-2 shadow-xs dark:bg-muted/10">
      {columns.map(({ title, count }) => (
        <section
          key={title}
          aria-label={title}
          className="flex flex-1 flex-col gap-1.5 rounded-lg border border-border bg-background p-1.5 shadow-xs"
        >
          <header className="flex items-center justify-between px-0.5">
            <span className="text-[11px] font-medium">{title}</span>
            <span className="rounded-full bg-muted px-1.5 text-[10px] text-muted-foreground">
              {count}
            </span>
          </header>
          {Array.from({ length: Math.min(count, 3) }, (_, i) => (
            <div
              key={\`\${title}-\${i}\`}
              tabIndex={0}
              className="cursor-grab rounded-md border border-border bg-card p-1.5 shadow-xs transition-shadow duration-150 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <span className="block h-1.5 w-3/4 rounded-full bg-muted" />
              <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-muted" />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}`,
  });
