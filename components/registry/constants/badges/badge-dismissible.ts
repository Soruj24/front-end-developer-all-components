import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const badgeDismissible: RegistryEntry = entry({
    id: "badge-dismissible",
    title: "With Close Button",
    description: "Dismissible badges that can be removed and reset.",
    source: `import { useState } from "react";

const variants = [
  { name: "default", className: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" },
  { name: "primary", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" },
  { name: "secondary", className: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100" },
];

export default function BadgeDismissible() {
  const [visible, setVisible] = useState([true, true, true]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-4">
        {variants.map((v, i) =>
          visible[i] ? (
            <span key={v.name} className={\`inline-flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium \${v.className}\`}>
              {v.name}
              <button
                type="button"
                aria-label={\`Dismiss \${v.name}\`}
                onClick={() => setVisible((prev) => prev.map((v, j) => (j === i ? false : v)))}
              >
                <svg className="h-3 w-3 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ) : null
        )}
      </div>
      {!visible.every(Boolean) && (
        <button type="button" onClick={() => setVisible([true, true, true])} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
          Reset badges
        </button>
      )}
    </div>
  );
}`,
  });
