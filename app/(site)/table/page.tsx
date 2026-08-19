"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TABLE_SOURCE = `"use client";

import { useCallback, type ReactNode } from "react";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

export interface TableProps {
  columns: Column[];
  data: Array<Record<string, unknown>>;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  selectedRows?: string[];
  onSelectionChange?: (keys: string[]) => void;
  rowKey?: string;
  striped?: boolean;
  stickyHeader?: boolean;
}

export default function Table({
  columns = [],
  data = [],
  onSort,
  sortKey,
  sortDirection = "asc",
  selectedRows = [],
  onSelectionChange,
  rowKey = "id",
  striped = false,
  stickyHeader = false,
}: TableProps) {
  const allSelected =
    data.length > 0 &&
    data.every((row) => selectedRows.includes(row[rowKey] as string));

  const handleSelectAll = useCallback(() => {
    if (!onSelectionChange) return;
    if (allSelected) onSelectionChange([]);
    else onSelectionChange(data.map((row) => row[rowKey] as string));
  }, [onSelectionChange, allSelected, data, rowKey]);

  const handleSelectRow = useCallback(
    (key: string) => {
      if (!onSelectionChange) return;
      const idx = selectedRows.indexOf(key);
      if (idx === -1) onSelectionChange([...selectedRows, key]);
      else {
        const next = [...selectedRows];
        next.splice(idx, 1);
        onSelectionChange(next);
      }
    },
    [onSelectionChange, selectedRows]
  );

  return (
    <div className="w-full overflow-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">Data table</caption>
        <thead>
          <tr
            className={\`border-b border-border bg-muted text-left \${
              stickyHeader ? "sticky top-0" : ""
            }\`}
          >
            {onSelectionChange && (
              <th scope="col" className="w-10 px-3 py-3">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-border"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                aria-sort={
                  col.sortable && sortKey === col.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                className={\`px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground \${
                  col.sortable ? "cursor-pointer select-none hover:text-foreground" : ""
                }\`}
              >
                <button
                  type="button"
                  disabled={!col.sortable}
                  onClick={() => {
                    if (col.sortable && onSort) {
                      onSort(
                        col.key,
                        sortKey === col.key && sortDirection === "asc"
                          ? "desc"
                          : "asc"
                      );
                    }
                  }}
                  className="inline-flex items-center gap-1 focus-visible:ring-ring outline-none focus-visible:ring-2"
                >
                  {col.label}
                  {col.sortable && (
                    <span className="inline-flex flex-col leading-none">
                      <span
                        className={\`text-[10px] \${
                          sortKey === col.key && sortDirection === "asc"
                            ? "text-foreground"
                            : "text-subtle"
                        }\`}
                      >
                        ▲
                      </span>
                      <span
                        className={\`text-[10px] \${
                          sortKey === col.key && sortDirection === "desc"
                            ? "text-foreground"
                            : "text-subtle"
                        }\`}
                      >
                        ▼
                      </span>
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const key = row[rowKey] as string;
            const isSelected = selectedRows.includes(key);
            return (
              <tr
                key={key}
                className={\`border-b border-border transition-colors \${
                  isSelected
                    ? "bg-muted"
                    : striped && idx % 2 === 1
                      ? "bg-muted/50"
                      : "bg-background"
                } hover:bg-muted\`}
              >
                {onSelectionChange && (
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label={\`Select row \${key}\`}
                      checked={isSelected}
                      onChange={() => handleSelectRow(key)}
                      className="h-4 w-4 rounded border-border"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-3 text-foreground">
                    {row[col.key] as ReactNode}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="flex items-center justify-center px-6 py-12 text-sm text-muted-foreground">
          No data available
        </div>
      )}
    </div>
  );
}`;

const BASIC_SOURCE = `import Table from "@/components/ui/Table";

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const data = [
  { id: "1", name: "Alice", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", role: "Editor", status: "Active" },
  { id: "3", name: "Carol", role: "Viewer", status: "Inactive" },
];

function BasicTable() {
  return <Table columns={columns} data={data} rowKey="id" />;
}`;

const SORTABLE_SOURCE = `import { useState } from "react";
import Table from "@/components/ui/Table";

const columns = [
  { key: "name", label: "Name", sortable: true },
  { key: "price", label: "Price", sortable: true },
  { key: "stock", label: "Stock", sortable: true },
];

const products = [
  { id: "1", name: "Headphones", price: "$79.99", stock: "45" },
  { id: "2", name: "Keyboard", price: "$149.99", stock: "33" },
  { id: "3", name: "Mouse", price: "$29.99", stock: "120" },
];

function SortableTable() {
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  return (
    <Table
      columns={columns}
      data={products}
      rowKey="id"
      sortKey={sortKey}
      sortDirection={sortDir}
      onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
    />
  );
}`;

const SELECTABLE_SOURCE = `import { useState } from "react";
import Table from "@/components/ui/Table";

const columns = [
  { key: "name", label: "Product" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
];

const products = [
  { id: "1", name: "Headphones", category: "Electronics", price: "$79.99" },
  { id: "2", name: "T-Shirt", category: "Clothing", price: "$24.99" },
  { id: "3", name: "Running Shoes", category: "Sports", price: "$89.99" },
];

function SelectableTable() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-3">
      <Table
        columns={columns}
        data={products}
        rowKey="id"
        selectedRows={selected}
        onSelectionChange={setSelected}
      />
      {selected.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {selected.length} row(s) selected
        </p>
      )}
    </div>
  );
}`;

const STRIPED_SOURCE = `import Table from "@/components/ui/Table";

const columns = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const data = [
  { id: "1", name: "Alice", role: "Admin", status: "Active" },
  { id: "2", name: "Bob", role: "Editor", status: "Active" },
  { id: "3", name: "Carol", role: "Viewer", status: "Inactive" },
  { id: "4", name: "David", role: "Editor", status: "Active" },
];

function StripedTable() {
  return <Table columns={columns} data={data} rowKey="id" striped />;
}`;

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Inactive: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
  "In Stock": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const basicData = [
  { id: "1", name: "Alice Johnson", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Smith", role: "Editor", status: "Active" },
  { id: "3", name: "Carol Lee", role: "Viewer", status: "Inactive" },
  { id: "4", name: "David Brown", role: "Editor", status: "Active" },
  { id: "5", name: "Eve Davis", role: "Viewer", status: "Active" },
];

const basicCols = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

export default function TablePage() {
  return (
    <ComponentDocPage
      name="Table"
      category="Data Display"
      description="A configurable data table component with support for sorting, row selection, striped rows, and sticky headers."
    >
      <PreviewPanel filename="table-preview.tsx">
        <div className="w-full overflow-auto rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted text-left">
                {basicCols.map((c) => (
                  <th key={c.key} scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {basicData.map((row) => (
                <tr key={row.id} className="border-b border-border hover:bg-muted">
                  <td className="px-3 py-3 font-medium">{row.name}</td>
                  <td className="px-3 py-3">{row.role}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[row.status] || ""}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={TABLE_SOURCE} filename="components/ui/Table.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple table with columns and row data." code={BASIC_SOURCE} filename="basic.tsx">
          <div className="w-full overflow-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted text-left">
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {basicData.slice(0, 3).map((row) => (
                  <tr key={row.id} className="border-b border-border hover:bg-muted">
                    <td className="px-3 py-3 font-medium">{row.name}</td>
                    <td className="px-3 py-3">{row.role}</td>
                    <td className="px-3 py-3">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sortable" description="Click column headers to sort ascending or descending." code={SORTABLE_SOURCE} filename="sortable.tsx">
          <div className="w-full overflow-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted text-left">
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer select-none hover:text-foreground">
                    <span className="inline-flex items-center gap-1">Name <span className="inline-flex flex-col leading-none"><span className="text-[10px] text-foreground">▲</span><span className="text-[10px] text-subtle">▼</span></span></span>
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stock</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "2", name: "Keyboard", price: "$149.99", stock: "33" },
                  { id: "1", name: "Headphones", price: "$79.99", stock: "45" },
                  { id: "3", name: "Mouse", price: "$29.99", stock: "120" },
                ].map((row) => (
                  <tr key={row.id} className="border-b border-border hover:bg-muted">
                    <td className="px-3 py-3 font-medium">{row.name}</td>
                    <td className="px-3 py-3">{row.price}</td>
                    <td className="px-3 py-3">{row.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground/70">Sorted by name (ascending)</p>
        </ExampleBlock>

        <ExampleBlock title="Selectable" description="Row selection with checkboxes and bulk actions." code={SELECTABLE_SOURCE} filename="selectable.tsx">
          <div className="flex flex-col gap-3">
            <div className="w-full overflow-auto rounded-lg border border-border">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted text-left">
                    <th scope="col" className="w-10 px-3 py-3"><input type="checkbox" aria-label="Select all" className="h-4 w-4 rounded border-border" /></th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "1", name: "Headphones", category: "Electronics", price: "$79.99" },
                    { id: "2", name: "T-Shirt", category: "Clothing", price: "$24.99" },
                    { id: "3", name: "Running Shoes", category: "Sports", price: "$89.99" },
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-border hover:bg-muted">
                      <td className="px-3 py-3"><input type="checkbox" aria-label={`Select ${row.name}`} className="h-4 w-4 rounded border-border" /></td>
                      <td className="px-3 py-3 font-medium">{row.name}</td>
                      <td className="px-3 py-3">{row.category}</td>
                      <td className="px-3 py-3">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2">
              <button type="button" className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Bulk Edit</button>
              <button type="button" className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Clear</button>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Striped" description="Alternating row backgrounds for improved readability." code={STRIPED_SOURCE} filename="striped.tsx">
          <div className="w-full overflow-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted text-left">
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {basicData.map((row, idx) => (
                  <tr key={row.id} className={`border-b border-border hover:bg-muted ${idx % 2 === 1 ? "bg-muted/50" : ""}`}>
                    <td className="px-3 py-3 font-medium">{row.name}</td>
                    <td className="px-3 py-3">{row.role}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[row.status] || ""}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
