"use client";

import { DataGrid } from "@/components/ui/DataGrid";
import type { DataGridColumn } from "@/components/ui/DataGrid";

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
  Active: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  Away: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  Offline: "bg-gray-400/10 text-gray-600 dark:text-gray-400 border-gray-400/20",
};

const columns: DataGridColumn<Row>[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "role", label: "Role", sortable: true },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (val) => (
      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusColors[String(val)] ?? ""}`}>
        {String(val)}
      </span>
    ),
  },
  { key: "revenue", label: "Revenue", sortable: true, align: "right", render: (val) => <span className="font-mono text-sm">${Number(val).toLocaleString()}</span> },
];

export function BasicGridDemo() {
  return <DataGrid columns={columns} data={sampleData} sortable pagination pageSize={5} searchable />;
}

export function CompactGridDemo() {
  return <DataGrid columns={columns} data={sampleData} compact striped pagination pageSize={8} />;
}

export function RowNumbersDemo() {
  return <DataGrid columns={columns} data={sampleData} showRowNumbers pagination pageSize={5} />;
}
