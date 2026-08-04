"use client";

import { useState, useMemo, Fragment } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add table`;

const usageCode = `// No dedicated component — use native HTML table with Tailwind classes
<table className="w-full text-sm">
  <thead>
    <tr className="border-b bg-muted/50">
      <th className="px-4 py-3 text-left">Name</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b"><td className="px-4 py-3">Data</td></tr>
  </tbody>
</table>`;

const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 45, status: "In Stock", rating: 4.5 },
  { id: 2, name: "Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 120, status: "In Stock", rating: 4.0 },
  { id: 3, name: "Indoor Plant Pot", category: "Home", price: 34.99, stock: 0, status: "Out of Stock", rating: 4.8 },
  { id: 4, name: "Running Shoes", category: "Sports", price: 89.99, stock: 28, status: "In Stock", rating: 4.3 },
  { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 49.99, stock: 0, status: "Discontinued", rating: 4.2 },
  { id: 6, name: "Denim Jacket", category: "Clothing", price: 119.99, stock: 15, status: "In Stock", rating: 4.6 },
  { id: 7, name: "Cookbook Collection", category: "Books", price: 44.99, stock: 67, status: "In Stock", rating: 4.7 },
  { id: 8, name: "Yoga Mat", category: "Sports", price: 29.99, stock: 200, status: "In Stock", rating: 4.1 },
  { id: 9, name: "Desk Lamp", category: "Home", price: 54.99, stock: 0, status: "Out of Stock", rating: 4.4 },
  { id: 10, name: "Mechanical Keyboard", category: "Electronics", price: 149.99, stock: 33, status: "In Stock", rating: 4.9 },
  { id: 11, name: "Water Bottle", category: "Sports", price: 19.99, stock: 500, status: "In Stock", rating: 4.0 },
  { id: 12, name: "Notebook Set", category: "Books", price: 12.99, stock: 0, status: "Out of Stock", rating: 3.8 },
];

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2026-07-28" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-25" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Viewer", status: "Inactive", lastLogin: "2026-06-10" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-29" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Viewer", status: "Active", lastLogin: "2026-07-27" },
  { id: 6, name: "Frank Wilson", email: "frank@example.com", role: "Admin", status: "Inactive", lastLogin: "2026-05-15" },
  { id: 7, name: "Grace Kim", email: "grace@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-30" },
  { id: 8, name: "Henry Miller", email: "henry@example.com", role: "Viewer", status: "Active", lastLogin: "2026-07-26" },
];

const statusColors: Record<string, string> = {
  "In Stock": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Discontinued": "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
  "Active": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Inactive": "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
};

const details: Record<number, { description: string; specs: string; leadTime: string }> = {
  1: { description: "Premium noise-canceling headphones with 30-hour battery life.", specs: "Bluetooth 5.3, 40mm drivers, USB-C", leadTime: "2-3 days" },
  2: { description: "100% organic cotton, pre-shrunk, available in 12 colors.", specs: "S-3XL, 180gsm, jersey knit", leadTime: "5-7 days" },
  4: { description: "Lightweight running shoes with responsive cushioning.", specs: "Mesh upper, EVA midsole, rubber outsole", leadTime: "3-5 days" },
  6: { description: "Classic denim jacket with modern fit, unisex design.", specs: "100% denim, brass buttons, 2 pockets", leadTime: "7-10 days" },
  10: { description: "Hot-swappable mechanical keyboard with RGB backlighting.", specs: "Cherry MX switches, PBT keycaps, USB-C", leadTime: "2-3 days" },
};

const plans = [
  { feature: "Price", free: "$0", pro: "$19/mo", enterprise: "$99/mo", highlight: true },
  { feature: "Users", free: "Up to 3", pro: "Up to 20", enterprise: "Unlimited", highlight: false },
  { feature: "Storage", free: "1 GB", pro: "50 GB", enterprise: "1 TB", highlight: false },
  { feature: "API Access", free: "—", pro: "5,000 req/day", enterprise: "Unlimited", highlight: false },
  { feature: "Support", free: "Community", pro: "Email", enterprise: "24/7 Priority", highlight: false },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom", highlight: false },
  { feature: "Custom Domains", free: "—", pro: "Yes", enterprise: "Yes", highlight: true },
  { feature: "SSO", free: "—", pro: "—", enterprise: "Yes", highlight: false },
  { feature: "SLA", free: "—", pro: "99.9%", enterprise: "99.99%", highlight: false },
];

const cols = [
  { key: "name" as const, label: "Product" },
  { key: "category" as const, label: "Category" },
  { key: "price" as const, label: "Price" },
  { key: "stock" as const, label: "Stock" },
];

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const statuses = ["All", ...Array.from(new Set(products.map((p) => p.status)))];

function SortArrows({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return (
    <span className="ml-1 inline-flex flex-col leading-none">
      <svg className={`h-2.5 w-2.5 ${active && dir === "asc" ? "text-foreground" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 10 6"><path d="M5 0L10 6H0z" /></svg>
      <svg className={`h-2.5 w-2.5 ${active && dir === "desc" ? "text-foreground" : "text-muted-foreground"}`} fill="currentColor" viewBox="0 0 10 6"><path d="M5 6L0 0h10z" /></svg>
    </span>
  );
}

export default function TablePage() {
  const [sortKey, setSortKey] = useState<"name" | "category" | "price" | "stock">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [expanded, setExpanded] = useState<number | null>(null);

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      const cmp = a[sortKey] < b[sortKey] ? -1 : a[sortKey] > b[sortKey] ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortKey, sortDir]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (status !== "All" && p.status !== status) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, category, status]);

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const allSelected = products.length > 0 && products.every((p) => selected.has(p.id));

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(products.map((p) => p.id)));
  };

  const toggleRow = (id: number) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const totalPages = Math.ceil(products.length / pageSize);
  const paged = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Table</h1>
          <Badge variant="primary">8 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of data table patterns — sortable, selectable, filterable,
          paginated, responsive, and more.
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

      <ComponentPreview id="table-basic-simple">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Product", "Category", "Price", "Stock", "Status"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-basic-striped">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Name", "Role", "Status", "Last Login"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((u, i) => (
                <tr key={u.id} className={`${i % 2 === 1 ? "bg-muted/40/50 dark:bg-zinc-900/30" : ""} hover:bg-muted dark:hover:bg-muted/50`}>
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{u.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-basic-actions">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Name", "Email", "Role", "Actions"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.slice(0, 4).map((u) => (
                <tr key={u.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3"><span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium dark:bg-muted">{u.role}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded px-2 py-1 text-xs font-medium text-primary hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20">View</button>
                      <button className="rounded px-2 py-1 text-xs font-medium text-warning hover:bg-warning-soft dark:text-warning dark:hover:bg-amber-900/20">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-medium text-danger hover:bg-danger-soft dark:text-red-400 dark:hover:bg-red-900/20">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-basic-status">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Product", "Price", "Rating", "Stock", "Status"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.slice(0, 6).map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 font-mono text-muted-foreground">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`h-3.5 w-3.5 ${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground/70">{p.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-muted">
                        <div className={`h-full rounded-full ${p.stock > 100 ? "bg-emerald-500" : p.stock > 0 ? "bg-warning" : "bg-danger"}`} style={{ width: `${Math.min(p.stock / 5, 100)}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-sortable">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {cols.map((c) => (
                  <th scope="col"
                    key={c.key}
                    aria-sort={sortKey === c.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(c.key)}
                      className="inline-flex items-center gap-1 rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {c.label}
                      <SortArrows active={sortKey === c.key} dir={sortDir} />
                    </button>
                  </th>
                ))}
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3 font-mono">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.stock < 20 ? "text-danger dark:text-red-400" : "text-muted-foreground"}`}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground/70">Sorted by {sortKey} ({sortDir}ending)</p>
      </ComponentPreview>

      <ComponentPreview id="table-selectable">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                <th scope="col" className="w-12 px-4 py-3">
                  <input type="checkbox" aria-label="Select all products" checked={allSelected} onChange={toggleAll} className="rounded border-border dark:border-border" />
                </th>
                {["Product", "Category", "Price", "Stock", "Status"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((p) => (
                <tr key={p.id} className={`${selected.has(p.id) ? "bg-primary-soft" : ""} hover:bg-muted/40 dark:hover:bg-muted/50 transition-colors`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" aria-label={`Select ${p.name}`} checked={selected.has(p.id)} onChange={() => toggleRow(p.id)} className="rounded border-border dark:border-border" />
                  </td>
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected.size > 0 && (
          <div className="flex gap-2">
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Bulk Edit</button>
            <button className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-danger hover:bg-danger-soft dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">Delete Selected</button>
            <button onClick={() => setSelected(new Set())} className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted/40 dark:border-border dark:hover:bg-muted">Clear</button>
          </div>
        )}
      </ComponentPreview>

      <ComponentPreview id="table-filterable">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
              <input type="text" aria-label="Search products" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-md border border-border bg-transparent py-2 pl-10 pr-4 text-sm outline-none focus:border-zinc-500 dark:border-border dark:focus:border-zinc-400" />
          </div>
          <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-border bg-transparent px-3 py-2 text-sm outline-none dark:border-border">
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-border bg-transparent px-3 py-2 text-sm outline-none dark:border-border">
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
          <span className="text-sm text-muted-foreground/70">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900 sticky top-0">
              <tr>
                {["Product", "Category", "Price", "Stock", "Status"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length > 0 ? filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground/70">No products match your filters. <button onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }} className="text-primary hover:underline dark:text-blue-400">Clear filters</button></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-paginated">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Product", "Category", "Price", "Stock", "Rating"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paged.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground/70">{p.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Rows per page:</span>
            <select aria-label="Rows per page" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border border-border bg-transparent px-2 py-1 text-xs dark:border-border">
              {[3, 5, 10].map((s) => <option key={s}>{s}</option>)}
            </select>
            <span>Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, products.length)} of {products.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(1)} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-muted disabled:opacity-30 dark:hover:bg-muted">{"<<"}</button>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-muted disabled:opacity-30 dark:hover:bg-muted">{"<"}</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`flex h-8 w-8 items-center justify-center rounded text-xs font-medium ${p === page ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : "hover:bg-muted dark:hover:bg-muted"}`}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-muted disabled:opacity-30 dark:hover:bg-muted">{">"}</button>
            <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="flex h-8 w-8 items-center justify-center rounded text-xs hover:bg-muted disabled:opacity-30 dark:hover:bg-muted">{">>"}</button>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="table-expandable">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                <th scope="col" className="w-10 px-4 py-3" />
                {["Product", "Category", "Price", "Stock"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.filter((p) => [1, 2, 4, 6, 10].includes(p.id)).map((p) => (
                <Fragment key={p.id}>
                  <tr onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="cursor-pointer hover:bg-muted/40 dark:hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        aria-expanded={expanded === p.id}
                        aria-label={`Expand ${p.name} details`}
                        aria-controls={`expand-${p.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(expanded === p.id ? null : p.id);
                        }}
                        className="rounded focus-visible:ring-ring outline-none focus-visible:ring-2"
                      >
                        <span className={`inline-block transition-transform ${expanded === p.id ? "rotate-90" : ""}`}>
                          <svg className="h-4 w-4 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  </tr>
                  {expanded === p.id && (
                    <tr>
                      <td id={`expand-${p.id}`} colSpan={5} className="bg-muted/40 px-10 py-4 dark:bg-zinc-900/50">
                        <div className="grid gap-2 text-sm sm:grid-cols-3">
                          <div><span className="text-xs font-semibold uppercase text-muted-foreground/70">Description</span><p className="mt-0.5 text-muted-foreground">{details[p.id]?.description}</p></div>
                          <div><span className="text-xs font-semibold uppercase text-muted-foreground/70">Specifications</span><p className="mt-0.5 text-muted-foreground">{details[p.id]?.specs}</p></div>
                          <div><span className="text-xs font-semibold uppercase text-muted-foreground/70">Lead Time</span><p className="mt-0.5 text-muted-foreground">{details[p.id]?.leadTime}</p></div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground/70">Click any row to expand details.</p>
      </ComponentPreview>

      <ComponentPreview id="table-responsive">
        <div className="overflow-x-auto rounded-lg border border-border lg:overflow-visible">
          <table className="min-w-full text-sm hidden lg:table">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                {["Product", "Category", "Price", "Stock", "Status", "Rating"].map((h) => (
                  <th scope="col" key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-muted/40 dark:hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                  <td className="px-4 py-3">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-muted-foreground"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground/70">{p.rating}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col gap-3 p-4 lg:hidden">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="rounded-lg border border-border p-4 dark:border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-mono font-medium">${p.price.toFixed(2)}</span>
                  <span className="text-muted-foreground">{p.stock} in stock</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`h-3 w-3 ${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-1 text-xs text-muted-foreground/70">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground/70">Resize browser to see card layout at mobile widths.</p>
      </ComponentPreview>

      <ComponentPreview id="table-comparison">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/40 dark:bg-zinc-900">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Feature</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Free</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-primary dark:text-blue-400 bg-primary-soft">Pro</th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {plans.map((row, i) => (
                <tr key={i} className={`${row.highlight ? "bg-muted/40/50 dark:bg-zinc-900/30" : ""} hover:bg-muted/50 dark:hover:bg-muted/30`}>
                  <td className={`px-4 py-3 font-medium ${row.highlight ? "text-foreground" : ""}`}>{row.feature}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.free}</td>
                  <td className="px-4 py-3 text-center font-medium text-primary dark:text-blue-300 bg-blue-50/30 dark:bg-blue-900/10">{row.pro}</td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ComponentPreview>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Pattern</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-left font-medium">Key Features</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Basic</td>
                <td className="px-4 py-3 text-muted-foreground">Simple data display</td>
                <td className="px-4 py-3 text-muted-foreground">Striped, actions, status</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Sortable</td>
                <td className="px-4 py-3 text-muted-foreground">Column sorting</td>
                <td className="px-4 py-3 text-muted-foreground">Click headers to sort</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Selectable</td>
                <td className="px-4 py-3 text-muted-foreground">Row selection</td>
                <td className="px-4 py-3 text-muted-foreground">Checkboxes, bulk actions</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Filterable</td>
                <td className="px-4 py-3 text-muted-foreground">Search & filter</td>
                <td className="px-4 py-3 text-muted-foreground">Search input, dropdowns</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">Paginated</td>
                <td className="px-4 py-3 text-muted-foreground">Page navigation</td>
                <td className="px-4 py-3 text-muted-foreground">Page size, page numbers</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">Expandable</td>
                <td className="px-4 py-3 text-muted-foreground">Row expansion</td>
                <td className="px-4 py-3 text-muted-foreground">Nested content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
