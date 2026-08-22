import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const layoutMasonry: RegistryEntry = entry({
    id: "layout-masonry",
    title: "Masonry",
    description: "Masonry-style columns of varied-height cards.",
    source: `const columns = [
  ["h-16", "h-10"],
  ["h-10", "h-14"],
  ["h-12", "h-12"],
];

export default function LayoutMasonry() {
  return (
    <div className="flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs">
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {columns.map((heights, c) => (
          <div key={c} className="flex flex-col gap-2">
            {heights.map((h, r) => (
              <div
                key={\`\${c}-\${r}\`}
                className={\`rounded-lg border border-border bg-card p-2 shadow-xs \${h}\`}
              >
                <span className="block h-full rounded-md bg-muted" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
