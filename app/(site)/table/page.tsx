"use client";

import { useState } from "react";
import Table from "@/components/ui/Table";
import type { Column } from "@/components/ui/Table";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TABLE_SOURCE = `import { type ReactNode, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";

export type TableSize = "sm" | "md" | "lg";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
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
  size?: TableSize;
  compact?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: Record<string, unknown>) => void;
}

// Premium UI: rounded-xl, semantic colors, animated sort icons,
// empty state with icon, focus-visible rings, hover states.`;

const statusColors: Record<string, string> = {
  Active: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400",
  Inactive: "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
  "In Stock": "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400",
  "Out of Stock": "inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={statusColors[status] ?? "inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
      {status}
    </span>
  );
}

const basicCols: Column[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status", align: "center" },
];

const basicData = [
  { id: "1", name: "Alice Johnson", role: "Admin", status: "Active" },
  { id: "2", name: "Bob Smith", role: "Editor", status: "Active" },
  { id: "3", name: "Carol Lee", role: "Viewer", status: "Inactive" },
  { id: "4", name: "David Brown", role: "Editor", status: "Active" },
  { id: "5", name: "Eve Davis", role: "Viewer", status: "Active" },
];

const sortableCols: Column[] = [
  { key: "name", label: "Product", sortable: true },
  { key: "price", label: "Price", sortable: true, align: "right" },
  { key: "stock", label: "Stock", sortable: true, align: "right" },
];

const sortableData = [
  { id: "1", name: "Headphones", price: "$79.99", stock: "45" },
  { id: "2", name: "Keyboard", price: "$149.99", stock: "33" },
  { id: "3", name: "Mouse", price: "$29.99", stock: "120" },
  { id: "4", name: "Monitor", price: "$399.99", stock: "12" },
];

const selectableCols: Column[] = [
  { key: "name", label: "Product" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price", align: "right" },
];

const selectableData = [
  { id: "1", name: "Headphones", category: "Electronics", price: "$79.99" },
  { id: "2", name: "T-Shirt", category: "Clothing", price: "$24.99" },
  { id: "3", name: "Running Shoes", category: "Sports", price: "$89.99" },
  { id: "4", name: "Backpack", category: "Accessories", price: "$59.99" },
];

const compactCols: Column[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", align: "center" },
];

const compactData = [
  { id: "1", name: "Alice", email: "alice@co.com", role: "Admin" },
  { id: "2", name: "Bob", email: "bob@co.com", role: "Editor" },
  { id: "3", name: "Carol", email: "carol@co.com", role: "Viewer" },
];

export default function TablePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  return (
    <ComponentDocPage
      name="Table"
      category="Data Display"
      description="A configurable data table with sorting, selection, striped rows, sticky headers, and compact mode."
    >
      <PreviewPanel filename="table-preview.tsx">
        <Table
          columns={basicCols}
          data={basicData}
          rowKey="id"
        />
      </PreviewPanel>

      <SourceCodeViewer
        source={TABLE_SOURCE}
        filename="components/ui/Table.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple table with columns and row data."
          code={`import Table from "@/components/ui/Table";\n\nconst columns = [\n  { key: "name", label: "Name" },\n  { key: "role", label: "Role" },\n  { key: "status", label: "Status" },\n];\n\nconst data = [\n  { id: "1", name: "Alice", role: "Admin", status: "Active" },\n  { id: "2", name: "Bob", role: "Editor", status: "Active" },\n];\n\n<Table columns={columns} data={data} rowKey="id" />`}
          filename="basic.tsx"
        >
          <Table columns={basicCols} data={basicData} rowKey="id" />
        </ExampleBlock>

        <ExampleBlock
          title="Sortable"
          description="Click column headers to sort ascending or descending."
          code={`import { useState } from "react";\nimport Table from "@/components/ui/Table";\n\nconst columns = [\n  { key: "name", label: "Product", sortable: true },\n  { key: "price", label: "Price", sortable: true, align: "right" },\n  { key: "stock", label: "Stock", sortable: true, align: "right" },\n];\n\n<Table\n  columns={columns}\n  data={data}\n  rowKey="id"\n  sortKey={sortKey}\n  sortDirection={sortDir}\n  onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}\n/>`}
          filename="sortable.tsx"
        >
          <Table
            columns={sortableCols}
            data={sortableData}
            rowKey="id"
            sortKey={sortKey}
            sortDirection={sortDir}
            onSort={(key, dir) => { setSortKey(key); setSortDir(dir); }}
          />
          <p className="mt-2 text-xs text-muted-foreground/70">
            Sorted by {sortKey} ({sortDir})
          </p>
        </ExampleBlock>

        <ExampleBlock
          title="Selectable"
          description="Row selection with checkboxes and bulk actions."
          code={`import { useState } from "react";\nimport Table from "@/components/ui/Table";\n\nconst [selected, setSelected] = useState<string[]>([]);\n\n<Table\n  columns={columns}\n  data={data}\n  rowKey="id"\n  selectedRows={selected}\n  onSelectionChange={setSelected}\n/>\n{selected.length > 0 && <p>{selected.length} selected</p>}`}
          filename="selectable.tsx"
        >
          <div className="flex flex-col gap-3">
            <Table
              columns={selectableCols}
              data={selectableData}
              rowKey="id"
              selectedRows={selected}
              onSelectionChange={setSelected}
            />
            {selected.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {selected.length} row(s) selected
                </span>
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Striped"
          description="Alternating row backgrounds for improved readability."
          code={`import Table from "@/components/ui/Table";\n\n<Table columns={columns} data={data} rowKey="id" striped />`}
          filename="striped.tsx"
        >
          <Table columns={basicCols} data={basicData} rowKey="id" striped />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), and lg."
          code={`import Table from "@/components/ui/Table";\n\n<Table columns={columns} data={data} rowKey="id" size="sm" />\n<Table columns={columns} data={data} rowKey="id" size="md" />\n<Table columns={columns} data={data} rowKey="id" size="lg" />`}
          filename="sizes.tsx"
        >
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Small</p>
              <Table columns={basicCols} data={basicData.slice(0, 2)} rowKey="id" size="sm" />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Medium (default)</p>
              <Table columns={basicCols} data={basicData.slice(0, 2)} rowKey="id" size="md" />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">Large</p>
              <Table columns={basicCols} data={basicData.slice(0, 2)} rowKey="id" size="lg" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Compact"
          description="Dense layout for data-heavy views."
          code={`import Table from "@/components/ui/Table";\n\n<Table columns={columns} data={data} rowKey="id" compact />`}
          filename="compact.tsx"
        >
          <Table columns={compactCols} data={compactData} rowKey="id" compact />
        </ExampleBlock>

        <ExampleBlock
          title="Sticky Header"
          description="Header stays visible while scrolling through long content."
          code={`import Table from "@/components/ui/Table";\n\n<Table columns={columns} data={longData} rowKey="id" stickyHeader />`}
          filename="sticky-header.tsx"
        >
          <div className="max-h-64">
            <Table
              columns={basicCols}
              data={basicData.flatMap((row) =>
                [0, 1, 2].map((copy) => ({ ...row, id: `${row.id}-${copy}` })),
              )}
              rowKey="id"
              stickyHeader
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Empty State"
          description="Customizable empty state message."
          code={`import Table from "@/components/ui/Table";\n\n<Table columns={columns} data={[]} rowKey="id" emptyMessage="No records found" />`}
          filename="empty.tsx"
        >
          <Table
            columns={basicCols}
            data={[]}
            rowKey="id"
            emptyMessage="No records found. Try adjusting your filters."
          />
        </ExampleBlock>

        <ExampleBlock
          title="With Status Badges"
          description="Rich content in table cells with semantic color badges."
          code={`function StatusBadge({ status }) {\n  const colors = {\n    Active: "bg-emerald-500/10 text-emerald-600",\n    Inactive: "bg-muted text-muted-foreground",\n  };\n  return (\n    <span className={\`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium \${colors[status]}\`}>\n      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />\n      {status}\n    </span>\n  );\n}`}
          filename="status-badges.tsx"
        >
          <Table
            columns={basicCols}
            data={basicData}
            rowKey="id"
          />
        </ExampleBlock>

        <ExampleBlock
          title="On Row Click"
          description="Clickable rows with cursor and hover feedback."
          code={`import Table from "@/components/ui/Table";\n\n<Table\n  columns={columns}\n  data={data}\n  rowKey="id"\n  onRowClick={(row) => alert(\`Clicked \${row.name}\`)}\n/>`}
          filename="row-click.tsx"
        >
          <Table
            columns={basicCols}
            data={basicData}
            rowKey="id"
            onRowClick={(row) => alert(`Clicked: ${row.name}`)}
          />
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">columns</td>
                <td className="px-4 py-3 text-muted-foreground">Column[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">data</td>
                <td className="px-4 py-3 text-muted-foreground">Record&lt;string, unknown&gt;[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">rowKey</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;id&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">compact</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">striped</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">stickyHeader</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">emptyMessage</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;No data available&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onRowClick</td>
                <td className="px-4 py-3 text-muted-foreground">(row) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSort</td>
                <td className="px-4 py-3 text-muted-foreground">(key, dir) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">sortKey</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">sortDirection</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;asc&quot; | &quot;desc&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;asc&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">selectedRows</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSelectionChange</td>
                <td className="px-4 py-3 text-muted-foreground">(keys: string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
