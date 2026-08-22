import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutCardGrid: RegistryEntry = entry({
    id: "layout-card-grid",
    title: "Card Grid",
    description: "Responsive card grid filling the page body.",
    source: `const cards = Array.from({ length: 6 }, (_, i) => i);

export default function LayoutCardGrid() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="grid flex-1 auto-rows-min grid-cols-3 gap-2 p-3">
        {cards.map((card) => (
          <div
            key={card}
            className="rounded-lg border border-border bg-card p-2 shadow-xs transition-colors duration-150 hover:border-ring/30"
          >
            <span className="block h-10 rounded-md bg-muted" />
            <span className="mt-2 block h-2 w-3/4 rounded-full bg-muted" />
            <span className="mt-1 block h-2 w-1/2 rounded-full bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
