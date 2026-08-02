import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationProgress: RegistryEntry = entry({
    id: "pagination-progress",
    title: "Progress Bar",
    description: "A progress bar that tracks the current page.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationProgress() {
  const [p1, setP1] = useState(3);

  return (
    <div className="w-full">
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-100" style={{ width: \`\${(p1 / 8) * 100}%\` }} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">Progress: {Math.round((p1 / 8) * 100)}%</span>
        <PaginationBar current={p1} total={8} onChange={setP1} size="sm" />
      </div>
    </div>
  );
}`,
  });
