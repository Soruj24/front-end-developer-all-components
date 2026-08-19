"use client";
import { useState } from "react";
import { Move, Grip, GripVertical, ArrowUp, ArrowDown, List, Grid } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

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
          <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab hover:bg-muted/50 transition-colors">
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
    { id: 1, text: "Widget A" }, { id: 2, text: "Widget B" }, { id: 3, text: "Widget C" },
    { id: 4, text: "Widget D" }, { id: 5, text: "Widget E" }, { id: 6, text: "Widget F" },
  ]);
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {items.map((item, i) => (
          <div key={item.id} className="rounded-lg border border-border bg-card p-4 text-center cursor-grab hover:bg-muted/50 transition-colors">
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
          <div key={item.id} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab hover:bg-muted/50 transition-colors">
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
          <div key={item.id} className="flex items-center gap-3 rounded border border-border bg-card p-2 cursor-grab hover:bg-muted/50 transition-colors">
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
    <ComponentDocPage>
      <PreviewPanel>
        <DraggableList /><SortableGrid /><KanbanBoard /><ReorderItems /><NestedSort /><HandleSort /><AutoScroll />
      </PreviewPanel>
      <ExampleBlock>
        <SourceCodeViewer code={DraggableList.toString()} language="tsx" title="DraggableList" />
        <DraggableList /><SortableGrid /><KanbanBoard /><ReorderItems /><NestedSort /><HandleSort /><AutoScroll />
      </ExampleBlock>
    </ComponentDocPage>
  );
}