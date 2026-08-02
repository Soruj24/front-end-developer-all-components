"use client";

import { useMemo, useState } from "react";
import { topPagesData } from "./data";

function SortHeader({
  label,
  sortId,
  sortKey,
  sortDir,
  onToggle,
}: {
  label: string;
  sortId: string;
  sortKey: string;
  sortDir: "asc" | "desc";
  onToggle: (key: string) => void;
}) {
  const active = sortKey === sortId;
  return (
    <th
      className="cursor-pointer pb-3 pr-4 font-medium text-muted-foreground transition-colors select-none hover:text-muted-foreground dark:hover:text-zinc-300"
      onClick={() => onToggle(sortId)}
    >
      <span className="inline-flex items-center gap-1">
        {label}
        <span className="text-[10px] leading-none">
          {active ? (sortDir === "asc" ? "\u25B2" : "\u25BC") : "\u25B4\u25BE"}
        </span>
      </span>
    </th>
  );
}

export function TopPagesSection() {
  const [sortKey, setSortKey] = useState("views");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedPages = useMemo(() => {
    const copy = [...topPagesData];
    copy.sort((a, b) => {
      let aVal: string | number = a[sortKey as keyof typeof a];
      let bVal: string | number = b[sortKey as keyof typeof b];
      if (typeof aVal === "string") aVal = parseFloat(aVal) || 0;
      if (typeof bVal === "string") bVal = parseFloat(bVal) || 0;
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return copy;
  }, [sortKey, sortDir]);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Top Pages</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="pb-3 pr-4 font-medium text-muted-foreground">Page URL</th>
              <SortHeader label="Views" sortId="views" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
              <SortHeader label="Unique Views" sortId="unique" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
              <SortHeader label="Avg Time" sortId="avgTime" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
              <SortHeader label="Bounce Rate" sortId="bounce" sortKey={sortKey} sortDir={sortDir} onToggle={toggleSort} />
              <th scope="col" className="pb-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPages.map((p) => (
              <tr key={p.page} className="border-b border-border last:border-b-0 dark:border-border">
                <td className="py-3 pr-4 font-mono text-xs text-blue-600 dark:text-blue-400">{p.page}</td>
                <td className="py-3 pr-4 text-foreground">{p.views.toLocaleString()}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.unique.toLocaleString()}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.avgTime}</td>
                <td className="py-3 pr-4 text-muted-foreground">{p.bounce}</td>
                <td className="py-3">
                  <button className="rounded-md px-2.5 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
