import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupSort: RegistryEntry = entry({
  id: "button-group-sort",
  title: "Sort",
  description: "Sort options with active state.",
  source: `import { useState } from "react";
import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupSort() {
  const [activeSort, setActiveSort] = useState("date");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground">Sort By</p>
      <ButtonGroup variant="outline" size="sm">
        {["date", "name", "size"].map((sort) => (
          <button
            key={sort}
            type="button"
            onClick={() => setActiveSort(sort)}
            className={\`px-4 py-2 text-sm font-medium capitalize \${activeSort === sort ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}\`}
          >
            {sort}
          </button>
        ))}
      </ButtonGroup>
      <p className="text-xs text-muted-foreground">Active: {activeSort}</p>
    </div>
  );
}`,
});
