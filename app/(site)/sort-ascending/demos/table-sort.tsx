"use client";

import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

const TASKS = [
  { id: 1, name: "Design mockups", status: "Done", priority: "High" },
  { id: 2, name: "Write tests", status: "In Progress", priority: "Medium" },
  { id: 3, name: "Deploy to staging", status: "Todo", priority: "High" },
  { id: 4, name: "Update docs", status: "Todo", priority: "Low" },
];

type SortField = "name" | "status" | "priority";

export function TableSort() {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...TASKS].sort((a, b) => {
    const val = a[sortField] > b[sortField] ? 1 : -1;
    return sortDir === "asc" ? val : -val;
  });

  const headers: { field: SortField; label: string }[] = [
    { field: "name", label: "Name" },
    { field: "status", label: "Status" },
    { field: "priority", label: "Priority" },
  ];

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-800">
            {headers.map((h) => (
              <th key={h.field} onClick={() => handleSort(h.field)} className="cursor-pointer px-5 py-3 text-left text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                <span className="flex items-center gap-1.5">
                  {h.label}
                  {sortField === h.field ? (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3 opacity-30" />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {sorted.map((task) => (
            <tr key={task.id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <td className="px-5 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">{task.name}</td>
              <td className="px-5 py-3"><span className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{task.status}</span></td>
              <td className="px-5 py-3 text-sm text-zinc-500 dark:text-zinc-400">{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
