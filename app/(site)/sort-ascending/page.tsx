"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SortAsc, ArrowUpAZ, ArrowDownAZ, Filter, List, Table, BarChart3 } from "lucide-react";

const installCommand = `npx component-library@latest add sort-ascending`;
const usageCode = `<SortAscending data={items} onSort={handleSort} />`;

function AscendingList() {
  const [items, setItems] = useState([
    { id: 1, name: "Banana", price: 2.99 },
    { id: 2, name: "Apple", price: 1.49 },
    { id: 3, name: "Cherry", price: 4.99 },
    { id: 4, name: "Date", price: 6.99 },
    { id: 5, name: "Elderberry", price: 8.99 },
  ]);
  const [sortKey, setSortKey] = useState<"name" | "price">("name");

  const sorted = [...items].sort((a, b) =>
    a[sortKey] > b[sortKey] ? 1 : -1
  );

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <SortAsc className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Ascending Sort</span>
      </div>
      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setSortKey("name")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            sortKey === "name"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Name
        </button>
        <button
          onClick={() => setSortKey("price")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            sortKey === "price"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Price
        </button>
      </div>
      <ul className="space-y-1">
        {sorted.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
          >
            <span>{item.name}</span>
            <span className="text-muted-foreground">${item.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SortDropdown() {
  const [sortBy, setSortBy] = useState("name-asc");
  const items = [
    { id: 1, name: "Widget", category: "Tools" },
    { id: 2, name: "Gadget", category: "Electronics" },
    { id: 3, name: "Doohickey", category: "Tools" },
    { id: 4, name: "Thingamajig", category: "Electronics" },
  ];

  const sortOptions = [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "category", label: "Category" },
  ];

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <ArrowUpAZ className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sort Dropdown</span>
      </div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="mb-3 w-full rounded-md border bg-background px-3 py-2 text-sm"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted/50"
          >
            <span>{item.name}</span>
            <span className="text-xs text-muted-foreground">{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TableSort() {
  const [sortField, setSortField] = useState<"name" | "status" | "priority">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const tasks = [
    { id: 1, name: "Design mockups", status: "Done", priority: "High" },
    { id: 2, name: "Write tests", status: "In Progress", priority: "Medium" },
    { id: 3, name: "Deploy to staging", status: "Todo", priority: "High" },
    { id: 4, name: "Update docs", status: "Todo", priority: "Low" },
  ];

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sorted = [...tasks].sort((a, b) => {
    const val = a[sortField] > b[sortField] ? 1 : -1;
    return sortDir === "asc" ? val : -val;
  });

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Table className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Table Sort</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th
              className="cursor-pointer pb-2 font-medium hover:text-foreground"
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="cursor-pointer pb-2 font-medium hover:text-foreground"
              onClick={() => handleSort("status")}
            >
              Status {sortField === "status" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="cursor-pointer pb-2 font-medium hover:text-foreground"
              onClick={() => handleSort("priority")}
            >
              Priority {sortField === "priority" && (sortDir === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((task) => (
            <tr key={task.id} className="border-b last:border-0">
              <td className="py-2">{task.name}</td>
              <td className="py-2">
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
                  {task.status}
                </span>
              </td>
              <td className="py-2 text-muted-foreground">{task.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilteredGrid() {
  const [filter, setFilter] = useState("all");
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999 },
    { id: 2, name: "Desk Chair", category: "Furniture", price: 299 },
    { id: 3, name: "Keyboard", category: "Electronics", price: 79 },
    { id: 4, name: "Monitor", category: "Electronics", price: 449 },
    { id: 5, name: "Standing Desk", category: "Furniture", price: 599 },
    { id: 6, name: "Headphones", category: "Electronics", price: 199 },
  ];

  const categories = ["all", "Electronics", "Furniture"];
  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);
  const sorted = [...filtered].sort((a, b) => a.price - b.price);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filtered Grid</span>
      </div>
      <div className="mb-3 flex gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {sorted.map((product) => (
          <div
            key={product.id}
            className="rounded-md border p-3"
          >
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <p className="mt-1 text-sm font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityQueue() {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Fix critical bug", priority: 1 },
    { id: 2, label: "Add new feature", priority: 3 },
    { id: 3, label: "Update documentation", priority: 5 },
    { id: 4, label: "Refactor utils", priority: 2 },
    { id: 5, label: "Write unit tests", priority: 4 },
  ]);

  const sorted = [...tasks].sort((a, b) => a.priority - b.priority);
  const priorityColors: Record<number, string> = {
    1: "bg-red-100 text-red-800",
    2: "bg-orange-100 text-orange-800",
    3: "bg-yellow-100 text-yellow-800",
    4: "bg-blue-100 text-blue-800",
    5: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Priority Queue</span>
      </div>
      <ul className="space-y-2">
        {sorted.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-md border px-3 py-2"
          >
            <span className="text-sm">{task.label}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}>
              P{task.priority}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RankedItems() {
  const [items, setItems] = useState([
    { id: 1, name: "TypeScript", score: 95 },
    { id: 2, name: "JavaScript", score: 90 },
    { id: 3, name: "Python", score: 88 },
    { id: 4, name: "Go", score: 82 },
    { id: 5, name: "Rust", score: 85 },
  ]);

  const sorted = [...items].sort((a, b) => b.score - a.score);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <List className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Ranked Items</span>
      </div>
      <ol className="space-y-2">
        {sorted.map((item, index) => (
          <li
            key={item.id}
            className="flex items-center gap-3 rounded-md border px-3 py-2"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {index + 1}
            </span>
            <span className="flex-1 text-sm">{item.name}</span>
            <span className="text-sm font-semibold text-muted-foreground">{item.score}%</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ScoreBoard() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Alice", score: 1250 },
    { id: 2, name: "Bob", score: 980 },
    { id: 3, name: "Charlie", score: 1420 },
    { id: 4, name: "Diana", score: 1100 },
  ]);

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const maxScore = sorted[0]?.score ?? 1;

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Score Board</span>
      </div>
      <div className="space-y-3">
        {sorted.map((player, index) => (
          <div key={player.id} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">#{index + 1}</span>
                {player.name}
              </span>
              <span className="font-semibold">{player.score.toLocaleString()}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(player.score / maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SortAscendingPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sort Ascending</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A data display component for sorting collections in ascending order with customizable sort keys and visual indicators.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ascending List</h2>
        <ComponentPreview component="SortAscendingList" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sort Dropdown</h2>
        <ComponentPreview component="SortAscendingDropdown" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Table Sort</h2>
        <ComponentPreview component="SortAscendingTable" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Filtered Grid</h2>
        <ComponentPreview component="SortAscendingFilteredGrid" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Priority Queue</h2>
        <ComponentPreview component="SortAscendingPriorityQueue" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ranked Items</h2>
        <ComponentPreview component="SortAscendingRankedItems" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Score Board</h2>
        <ComponentPreview component="SortAscendingScoreBoard" />
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">T[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sortKey</td>
                <td className="px-4 py-3 text-muted-foreground">keyof T</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">{'"asc" | "desc"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"asc"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
