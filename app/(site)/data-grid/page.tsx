"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

const installCommand = `npx component-library@latest add data-grid`;

const usageCode = `import { DataGrid } from "@/components/data-grid";

<DataGrid
  columns={columns}
  data={data}
  sortable
  pagination
  pageSize={10}
/>`;

interface Row {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  revenue: number;
}

const sampleData: Row[] = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active", revenue: 12500 },
  { id: 2, name: "Marcus Johnson", email: "marcus@example.com", role: "Editor", status: "Active", revenue: 8900 },
  { id: 3, name: "Aria Patel", email: "aria@example.com", role: "Viewer", status: "Away", revenue: 4200 },
  { id: 4, name: "Tom Wilson", email: "tom@example.com", role: "Contributor", status: "Offline", revenue: 6700 },
  { id: 5, name: "Luna Kim", email: "luna@example.com", role: "Admin", status: "Active", revenue: 15800 },
  { id: 6, name: "Jake Torres", email: "jake@example.com", role: "Editor", status: "Active", revenue: 9300 },
  { id: 7, name: "Maya Singh", email: "maya@example.com", role: "Viewer", status: "Away", revenue: 3100 },
  { id: 8, name: "Ethan Brown", email: "ethan@example.com", role: "Contributor", status: "Active", revenue: 7600 },
  { id: 9, name: "Zoe Davis", email: "zoe@example.com", role: "Admin", status: "Active", revenue: 18200 },
  { id: 10, name: "Ryan Martinez", email: "ryan@example.com", role: "Editor", status: "Offline", revenue: 5400 },
  { id: 11, name: "Nina Clark", email: "nina@example.com", role: "Viewer", status: "Active", revenue: 2800 },
  { id: 12, name: "Leo Nguyen", email: "leo@example.com", role: "Contributor", status: "Away", revenue: 6100 },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  Away: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Offline: "bg-gray-400/10 text-gray-600 dark:text-gray-400",
};

type SortDir = "asc" | "desc" | null;

export default function DataGridPage() {
  const [sortKey, setSortKey] = useState<keyof Row | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 5;

  const filtered = useMemo(() => {
    if (!search) return sampleData;
    const q = search.toLowerCase();
    return sampleData.filter(
      (r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.role.toLowerCase().includes(q)
    );
  }, [search]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "number" && typeof bv === "number") return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortKey, sortDir]);

  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sorted.length / pageSize);

  const toggleSort = (key: keyof Row) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: keyof Row }) => {
    if (sortKey !== col) return <ArrowUpDown className="h-3 w-3 text-muted-foreground/40" />;
    return sortDir === "asc" ? <ArrowUp className="h-3 w-3 text-primary" /> : <ArrowDown className="h-3 w-3 text-primary" />;
  };

  const columns: { key: keyof Row; label: string; sortable: boolean; className?: string }[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "revenue", label: "Revenue", sortable: true, className: "text-right" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Data Grid</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Sortable data grid with search, pagination, and column-based sorting. Handles large datasets with smooth interactions.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="data-grid-sortable">
        <div className="w-full">
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <Badge variant="outline">{sorted.length} rows</Badge>
          </div>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={`px-4 py-3 font-medium ${col.className || "text-left"} ${col.sortable ? "cursor-pointer select-none hover:text-foreground" : ""}`}
                      onClick={() => col.sortable && toggleSort(col.key)}
                    >
                      <span className="flex items-center gap-1.5">
                        {col.label}
                        {col.sortable && <SortIcon col={col.key} />}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.map((row) => (
                  <tr key={row.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">${row.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {page * pageSize + 1}-{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-8 w-8 rounded-lg text-sm font-medium transition-all ${
                    page === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="rounded-lg border border-border p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="data-grid-condensed">
        <div className="w-full overflow-hidden rounded-lg border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium">Name</th>
                <th className="px-3 py-2 text-left font-medium">Role</th>
                <th className="px-3 py-2 text-left font-medium">Status</th>
                <th className="px-3 py-2 text-right font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.slice(0, 6).map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-3 py-2 font-medium text-foreground">{row.name}</td>
                  <td className="px-3 py-2 text-muted-foreground">{row.role}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusColors[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-muted-foreground">${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 text-muted-foreground">T[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sortable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">pagination</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">pageSize</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
