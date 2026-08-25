"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { InlineSelect } from "@/components/ui/InlineSelect";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const DATATABLE_SOURCE = `"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { DataTableProps, DataTableColumn } from "./DataTable.types";

const alignClass = { left: "text-left", center: "text-center", right: "text-right" } as const;

export function DataTable<T extends Record<string, unknown>>({
  columns, data, pageSize: initialPageSize = 10, pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true, className, emptyMessage = "No results found.",
  onRowClick, striped = false, compact = false,
}: DataTableProps<T>) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (av == null) return 1; if (bv == null) return -1;
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);
  const startRow = page * pageSize + 1;
  const endRow = Math.min((page + 1) * pageSize, sorted.length);

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(0);
  };

  const cellPadding = compact ? "px-3 py-1.5" : "px-4 py-3";

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((col) => (
                  <th key={col.key} onClick={() => col.sortable && toggleSort(col.key)}
                    className={cn(cellPadding, "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                      alignClass[col.align ?? "left"],
                      col.sortable && "cursor-pointer select-none transition-colors hover:text-foreground",
                      sortKey === col.key && "text-foreground", col.className)} scope="col">
                    <span className="inline-flex items-center gap-1.5">
                      {col.header}
                      {col.sortable && (
                        <span className="inline-flex flex-col" aria-hidden="true">
                          <svg className={cn("h-3 w-3 -mb-0.5", sortKey === col.key && sortDir === "asc" ? "text-foreground" : "text-muted-foreground/40")} viewBox="0 0 24 24" fill="currentColor"><path d="M7 15l5-5 5 5z" /></svg>
                          <svg className={cn("h-3 w-3 -mt-0.5", sortKey === col.key && sortDir === "desc" ? "text-foreground" : "text-muted-foreground/40")} viewBox="0 0 24 24" fill="currentColor"><path d="M7 9l5 5 5-5z" /></svg>
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map((row, i) => (
                <tr key={page * pageSize + i} onClick={() => onRowClick?.(row, page * pageSize + i)}
                  className={cn("transition-colors", striped && (page * pageSize + i) % 2 === 1 && "bg-muted/30",
                    onRowClick && "cursor-pointer hover:bg-muted/50", !onRowClick && "hover:bg-muted/30")}>
                  {columns.map((col) => (
                    <td key={col.key} className={cn(cellPadding, "text-foreground", alignClass[col.align ?? "left"], col.className)}>
                      {col.render ? col.render(row, page * pageSize + i) : ((row[col.key] as React.ReactNode) ?? <span className="text-muted-foreground/50">&mdash;</span>)}
                    </td>
                  ))}
                </tr>
              ))}
              {paged.length === 0 && (
                <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted-foreground">{emptyMessage}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 0 && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Showing {startRow}&ndash;{endRow} of {sorted.length}</span>
            {showPageSizeSelector && (
              <InlineSelect
                options={pageSizeOptions.map((size) => ({ value: String(size), label: size + " / page" }))}
                value={String(pageSize)}
                onChange={(val) => { setPageSize(Number(val)); setPage(0); }}
                size="sm"
              />
            )}
          </div>
          {totalPages > 1 && (
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) pageNum = i;
                else if (page < 3) pageNum = i;
                else if (page > totalPages - 4) pageNum = totalPages - 5 + i;
                else pageNum = page - 2 + i;
                return (
                  <button key={pageNum} onClick={() => setPage(pageNum)}
                    className={cn("inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors",
                      page === pageNum ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted")}
                    aria-label={\`Page \${pageNum + 1}\`} aria-current={page === pageNum ? "page" : undefined}>
                    {pageNum + 1}
                  </button>
                );
              })}
              <button disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50">
                Next
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </nav>
          )}
        </div>
      )}
    </div>
  );
}`;

const BASIC_CODE = `import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

<DataTable columns={columns} data={users} />`;

const SORTABLE_CODE = `import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
];

<DataTable columns={columns} data={users} />`;

const CUSTOM_RENDER_CODE = `import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "name", header: "Name" },
  { key: "status", header: "Status", render: (row) => (
    <span className={row.status === "Active"
      ? "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
      : "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"}>
      <span className={"h-1.5 w-1.5 rounded-full " + (row.status === "Active" ? "bg-emerald-500" : "bg-muted-foreground/50")} />
      {row.status}
    </span>
  )},
];

<DataTable columns={columns} data={users} />`;

const COMPACT_CODE = `import { DataTable } from "@/components/ui/DataTable";

<DataTable columns={columns} data={users} compact />`;

const STRIPED_CODE = `import { DataTable } from "@/components/ui/DataTable";

<DataTable columns={columns} data={users} striped />`;

const ALIGN_CODE = `import { DataTable } from "@/components/ui/DataTable";

const columns = [
  { key: "name", header: "Name" },
  { key: "amount", header: "Amount", align: "right" },
  { key: "role", header: "Role", align: "center" },
];`;

const CLICKABLE_CODE = `import { DataTable } from "@/components/ui/DataTable";

<DataTable columns={columns} data={users} onRowClick={(row) => alert(row.name)} />`;

const EMPTY_CODE = `import { DataTable } from "@/components/ui/DataTable";

<DataTable columns={columns} data={[]} emptyMessage="No users found." />`;

const SAMPLE_DATA = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", amount: 1250 },
  { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", amount: 3400 },
  { name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive", amount: 890 },
  { name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", amount: 2100 },
  { name: "Eva Green", email: "eva@example.com", role: "Admin", status: "Active", amount: 5600 },
  { name: "Frank Miller", email: "frank@example.com", role: "Viewer", status: "Inactive", amount: 450 },
  { name: "Grace Lee", email: "grace@example.com", role: "Editor", status: "Active", amount: 7800 },
  { name: "Henry Wilson", email: "henry@example.com", role: "Admin", status: "Active", amount: 4200 },
  { name: "Ivy Chen", email: "ivy@example.com", role: "Viewer", status: "Inactive", amount: 1500 },
  { name: "Jack Davis", email: "jack@example.com", role: "Editor", status: "Active", amount: 6300 },
  { name: "Karen Lopez", email: "karen@example.com", role: "Admin", status: "Active", amount: 9100 },
  { name: "Leo Kim", email: "leo@example.com", role: "Viewer", status: "Inactive", amount: 2700 },
];

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={status === "Active"
      ? "inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
      : "inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"}>
      <span className={status === "Active" ? "h-1.5 w-1.5 rounded-full bg-emerald-500" : "h-1.5 w-1.5 rounded-full bg-muted-foreground/50"} />
      {status}
    </span>
  );
}

export default function DataTablePage() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  return (
    <ComponentDocPage
      name="Data Table"
      category="Data Display"
      description="A feature-rich data table with sorting, pagination, custom cell rendering, row click handling, striped rows, compact mode, and page size selection."
    >
      <PreviewPanel filename="data-table-demo.tsx">
        <DataTable
          columns={[
            { key: "name", header: "Name", sortable: true },
            { key: "email", header: "Email", sortable: true },
            { key: "role", header: "Role" },
            { key: "status", header: "Status", render: (row: Record<string, unknown>) => <StatusBadge status={row.status as string} /> },
          ]}
          data={SAMPLE_DATA}
          pageSize={5}
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={DATATABLE_SOURCE}
        filename="components/ui/DataTable/DataTable.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic" description="A minimal table with plain text cells." code={BASIC_CODE} filename="basic.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
            ]}
            data={SAMPLE_DATA.slice(0, 4)}
          />
        </ExampleBlock>

        <ExampleBlock title="Sortable Columns" description="Click any sortable header to sort ascending/descending." code={SORTABLE_CODE} filename="sortable.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name", sortable: true },
              { key: "email", header: "Email", sortable: true },
              { key: "role", header: "Role" },
            ]}
            data={SAMPLE_DATA.slice(0, 4)}
          />
        </ExampleBlock>

        <ExampleBlock title="Custom Cell Rendering" description="Render rich content in cells with custom render functions." code={CUSTOM_RENDER_CODE} filename="custom-render.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              {
                key: "status",
                header: "Status",
                render: (row: Record<string, unknown>) => <StatusBadge status={row.status as string} />,
              },
            ]}
            data={SAMPLE_DATA.slice(0, 4)}
          />
        </ExampleBlock>

        <ExampleBlock title="Column Alignment" description="Control text alignment per column." code={ALIGN_CODE} filename="alignment.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "amount", header: "Amount", align: "right", render: (row: Record<string, unknown>) => <span className="font-mono">${(row.amount as number).toLocaleString()}</span> },
              { key: "role", header: "Role", align: "center" },
            ]}
            data={SAMPLE_DATA.slice(0, 5)}
          />
        </ExampleBlock>

        <ExampleBlock title="Compact Mode" description="Denser padding for tables with many rows." code={COMPACT_CODE} filename="compact.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "role", header: "Role" },
              { key: "status", header: "Status", render: (row: Record<string, unknown>) => <StatusBadge status={row.status as string} /> },
            ]}
            data={SAMPLE_DATA.slice(0, 6)}
            compact
          />
        </ExampleBlock>

        <ExampleBlock title="Striped Rows" description="Alternating row backgrounds for better readability." code={STRIPED_CODE} filename="striped.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
              { key: "role", header: "Role" },
            ]}
            data={SAMPLE_DATA.slice(0, 6)}
            striped
          />
        </ExampleBlock>

        <ExampleBlock title="Clickable Rows" description="Handle row clicks for navigation or selection." code={CLICKABLE_CODE} filename="clickable.tsx">
          <div className="flex flex-col gap-2">
            <DataTable
              columns={[
                { key: "name", header: "Name" },
                { key: "email", header: "Email" },
                { key: "role", header: "Role" },
              ]}
              data={SAMPLE_DATA.slice(0, 4)}
              onRowClick={(row) => setSelectedRow(row.name as string)}
            />
            {selectedRow && (
              <p className="rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                Selected: <span className="font-medium text-foreground">{selectedRow}</span>
              </p>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Empty State" description="Custom message when no data is available." code={EMPTY_CODE} filename="empty.tsx">
          <DataTable
            columns={[
              { key: "name", header: "Name" },
              { key: "email", header: "Email" },
            ]}
            data={[]}
          />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
