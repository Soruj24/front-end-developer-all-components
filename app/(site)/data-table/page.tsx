"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add data-table`;

const usageCode = `import { DataTable } from "@/components/_data-table";

<DataTable
  columns={[
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ]}
  data={users}
  sortable
  pagination
/>`;

const sampleData = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { name: "David Brown", email: "david@example.com", role: "Editor", status: "Active" },
];

export default function DataTablePage() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const perPage = 3;

  function handleSort(key: string) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sorted = [...sampleData].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof typeof a];
    const bVal = b[sortKey as keyof typeof b];
    return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const paged = sorted.slice(page * perPage, (page + 1) * perPage);

  function SortIcon({ col }: { col: string }) {
    if (sortKey !== col) return <svg className="h-4 w-4 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>;
    return <svg className="h-4 w-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={sortDir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} /></svg>;
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Data Table</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A feature-rich data table with sorting, pagination, and selectable
          rows. Built on top of native HTML tables with Tailwind styling.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Sortable */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sortable</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click column headers to sort.</p>
        </div>
        <ComponentPreview id="data-table-sortable">
          <div className="w-full overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {(["name", "email", "role", "status"] as const).map((col) => (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      className="cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground"
                    >
                      <span className="flex items-center gap-1">
                        {col} <SortIcon col={col} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((row, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                    <td className="px-4 py-3">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${row.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t px-4 py-3">
              <p className="text-sm text-muted-foreground">Page {page + 1} of {Math.ceil(sampleData.length / perPage)}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} className="rounded-md border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50">Prev</button>
                <button type="button" onClick={() => setPage(Math.min(Math.ceil(sampleData.length / perPage) - 1, page + 1))} disabled={page >= Math.ceil(sampleData.length / perPage) - 1} className="rounded-md border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">ColumnDef[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">Record&lt;string, any&gt;[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sortable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">pagination</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
