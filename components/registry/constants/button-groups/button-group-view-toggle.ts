import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupViewToggle: RegistryEntry = entry({
  id: "button-group-view-toggle",
  title: "View Toggle",
  description: "Toggle between different view modes.",
  source: `import { useState } from "react";
import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupViewToggle() {
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground">View Mode</p>
      <ButtonGroup variant="outline">
        <button
          type="button"
          onClick={() => setActiveView("list")}
          className={\`px-4 py-2 text-sm font-medium \${activeView === "list" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}\`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setActiveView("grid")}
          className={\`px-4 py-2 text-sm font-medium \${activeView === "grid" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}\`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setActiveView("kanban")}
          className={\`px-4 py-2 text-sm font-medium \${activeView === "kanban" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}\`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
          </svg>
        </button>
      </ButtonGroup>
      <p className="text-xs text-muted-foreground">Active: {activeView}</p>
    </div>
  );
}`,
});
