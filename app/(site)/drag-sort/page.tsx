"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Move, Grip, GripVertical, ArrowUp, ArrowDown, List, Grid } from "lucide-react";

const installCommand = `npx component-library@latest add drag-sort`;
const usageCode = `import { DragSort } from "@/components/ui/drag-sort";

<DragSort items={items} onReorder={setItems} />`;

function DraggableList() {
  const [items, setItems] = useState([
    { id: 1, text: "Design mockups", color: "bg-blue-500" },
    { id: 2, text: "Write documentation", color: "bg-green-500" },
    { id: 3, text: "Build components", color: "bg-purple-500" },
    { id: 4, text: "Deploy to production", color: "bg-orange-500" },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-sm space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab hover:bg-muted/50 transition-colors"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className={`h-6 w-6 rounded-full ${item.color}/10 flex items-center justify-center text-xs font-medium`} style={{ color: item.color }}>
              {i + 1}
            </div>
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SortableGrid() {
  const [items, setItems] = useState([
    { id: 1, text: "Widget A" },
    { id: 2, text: "Widget B" },
    { id: 3, text: "Widget C" },
    { id: 4, text: "Widget D" },
    { id: 5, text: "Widget E" },
    { id: 6, text: "Widget F" },
  ]);
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="rounded-lg border border-border bg-card p-4 text-center cursor-grab hover:bg-muted/50 transition-colors"
          >
            <Grip className="h-4 w-4 mx-auto text-muted-foreground mb-2" />
            <span className="text-xs font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [columns, setColumns] = useState({
    todo: [{ id: 1, text: "Plan sprint" }, { id: 2, text: "Design UI" }],
    inProgress: [{ id: 3, text: "Build API" }],
    done: [{ id: 4, text: "Write tests" }, { id: 5, text: "Deploy" }],
  });
  return (
    <div className="w-full p-4">
      <div className="flex gap-4 max-w-3xl mx-auto">
        {["todo", "inProgress", "done"].map((col) => (
          <div key={col} className="flex-1 rounded-lg bg-muted/50 p-3 min-h-[200px]">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              {col === "todo" ? "To Do" : col === "inProgress" ? "In Progress" : "Done"}
            </h4>
            <div className="space-y-2">
              {columns[col as keyof typeof columns].map((item) => (
                <div key={item.id} className="rounded border border-border bg-card p-3 cursor-grab hover:bg-muted/50">
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReorderItems() {
  const [items, setItems] = useState([
    { id: 1, text: "First item", priority: "high" },
    { id: 2, text: "Second item", priority: "medium" },
    { id: 3, text: "Third item", priority: "low" },
    { id: 4, text: "Fourth item", priority: "high" },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-sm space-y-2">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab hover:bg-muted/50 transition-colors"
          >
            <ArrowUp className="h-4 w-4 text-muted-foreground shrink-0 opacity-50" />
            <ArrowDown className="h-4 w-4 text-muted-foreground shrink-0 opacity-50" />
            <div className={`h-3 w-3 rounded-full ${item.priority === "high" ? "bg-red-500" : item.priority === "medium" ? "bg-yellow-500" : "bg-green-500"} shrink-0`} />
            <span className="text-sm flex-1">{item.text}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{item.priority}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NestedSort() {
  const [groups, setGroups] = useState([
    { id: 1, name: "Group A", items: [{ id: 11, text: "Item A1" }, { id: 12, text: "Item A2" }] },
    { id: 2, name: "Group B", items: [{ id: 21, text: "Item B1" }] },
    { id: 3, name: "Group C", items: [{ id: 31, text: "Item C1" }, { id: 32, text: "Item C2" }, { id: 33, text: "Item C3" }] },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-sm space-y-4">
        {groups.map((group) => (
          <div key={group.id} className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
              <List className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">{group.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{group.items.length}</span>
            </div>
            <div className="p-2 space-y-1">
              {group.items.map((item, i) => (
                <div key={item.id} className="flex items-center gap-2 px-2 py-1.5 rounded bg-muted/50 text-sm">
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HandleSort() {
  const [items, setItems] = useState([
    { id: 1, text: "Drag by handle only" },
    { id: 2, text: "Content not draggable" },
    { id: 3, text: "Precise control" },
    { id: 4, text: "Better UX" },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-sm space-y-2">
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-muted/50 transition-colors">
            <div className="flex flex-col items-center justify-center h-8 w-8 rounded bg-muted cursor-grab" title="Drag to reorder">
              <Grip className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-sm flex-1">{item.text}</span>
            <span className="text-xs text-muted-foreground font-mono">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoScroll() {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, i) => ({ id: i + 1, text: `Item ${i + 1}` }))
  );
  return (
    <div className="w-full p-4">
      <div className="max-w-sm max-h-64 overflow-y-auto border border-border rounded-lg bg-card p-2 space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded border border-border bg-card p-2 cursor-grab hover:bg-muted/50 transition-colors"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
            <span className="text-sm flex-1">{item.text}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">Scroll to see more items (auto-scroll on drag)</p>
    </div>
  );
}

export default function DragSortPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Drag Sort</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A drag-and-drop sortable list component for reordering items with visual feedback and smooth animations.</p>
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Draggable List</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items with drag handles for reordering.</p>
        </div>
        <ComponentPreview id="drag-sort-draggable"><DraggableList /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sortable Grid</h2>
          <p className="mt-1 text-sm text-muted-foreground">Sortable cards in a grid layout.</p>
        </div>
        <ComponentPreview id="drag-sort-grid"><SortableGrid /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Kanban Board</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multi-column drag and drop board.</p>
        </div>
        <ComponentPreview id="drag-sort-kanban"><KanbanBoard /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Reorder Items</h2>
          <p className="mt-1 text-sm text-muted-foreground">Priority list with up/down controls.</p>
        </div>
        <ComponentPreview id="drag-sort-reorder"><ReorderItems /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Sort</h2>
          <p className="mt-1 text-sm text-muted-foreground">Groups with sortable nested items.</p>
        </div>
        <ComponentPreview id="drag-sort-nested"><NestedSort /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Handle Sort</h2>
          <p className="mt-1 text-sm text-muted-foreground">Drag only by designated handle area.</p>
        </div>
        <ComponentPreview id="drag-sort-handle"><HandleSort /></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Auto Scroll</h2>
          <p className="mt-1 text-sm text-muted-foreground">Long list with auto-scroll on drag.</p>
        </div>
        <ComponentPreview id="drag-sort-autoscroll"><AutoScroll /></ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">items</td><td className="px-4 py-3 text-muted-foreground">T[]</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onReorder</td><td className="px-4 py-3 text-muted-foreground">(items: T[]) => void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">handle</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">axis</td><td className="px-4 py-3 text-muted-foreground">"x" | "y" | "xy"</td><td className="px-4 py-3 text-muted-foreground">"y"</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}