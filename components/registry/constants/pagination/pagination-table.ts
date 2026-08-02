import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationTable: RegistryEntry = entry({
    id: "pagination-table",
    title: "Table with Pagination",
    description: "A data table with a footer pagination bar.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationTable() {
  const [p1, setP1] = useState(1);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>{["ID", "Name", "Email", "Role", "Status"].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {Array.from({ length: 5 }, (_, i) => {
              const id = (p1 - 1) * 5 + i + 1;
              return (
                <tr key={id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">#{id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">User {id}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-500">user{id}@ex.com</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-500">{["Admin", "Editor", "Viewer"][id % 3]}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={\`rounded-full px-2 py-0.5 text-xs font-medium \${id % 2 === 0 ? "bg-green-100 text-green-700 dark:bg-green-900/30" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800"}\`}>
                      {id % 2 === 0 ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <span className="text-xs text-zinc-500">Page {p1} of 8</span>
        <PaginationBar current={p1} total={8} onChange={setP1} />
      </div>
    </div>
  );
}`,
  });
