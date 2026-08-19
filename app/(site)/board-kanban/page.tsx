"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Plus } from "lucide-react";

const BOARD_KANBAN_SOURCE = `"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

interface Card {
  id: string;
  title: string;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export function BoardKanban() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "todo", title: "To Do", cards: [{ id: "1", title: "Design mockups" }, { id: "2", title: "Write docs" }] },
    { id: "doing", title: "In Progress", cards: [{ id: "3", title: "Build components" }] },
    { id: "done", title: "Done", cards: [{ id: "4", title: "Project setup" }] },
  ]);

  const addCard = (columnId: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, { id: String(Date.now()), title: "New task" }] }
          : col
      )
    );
  };

  return (
    <div className="flex w-full min-w-[600px] gap-4">
      {columns.map((column) => (
        <div key={column.id} className="flex-1 rounded-xl border border-border bg-muted/30 p-3">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-medium">{column.title}</span>
            <span className="ml-auto text-xs text-muted-foreground">{column.cards.length}</span>
          </div>
          <div className="space-y-2">
            {column.cards.map((card) => (
              <div key={card.id} className="rounded-lg border border-border bg-card p-3 text-sm">
                {card.title}
              </div>
            ))}
            <button
              onClick={() => addCard(column.id)}
              className="flex w-full items-center gap-1 p-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="h-3 w-3" /> Add card
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}`;

const columns = [
  { title: "To Do", count: 3, color: "bg-blue-500", items: ["Design mockups", "Write docs", "Setup CI"] },
  { title: "In Progress", count: 2, color: "bg-yellow-500", items: ["Build components", "API integration"] },
  { title: "Done", count: 1, color: "bg-green-500", items: ["Project setup"] },
];

function BasicKanbanDemo() {
  return (
    <div className="w-full overflow-x-auto p-4">
      <div className="flex gap-4 min-w-[600px]">
        {columns.map((col) => (
          <div key={col.title} className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-3">
              <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
              <span className="text-sm font-medium">{col.title}</span>
              <span className="text-xs text-muted-foreground ml-auto">{col.count}</span>
            </div>
            <div className="space-y-2">
              {col.items.map((item) => (
                <div key={item} className="rounded-lg border border-border bg-card p-3 text-sm">{item}</div>
              ))}
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground p-2 w-full"><Plus className="h-3 w-3" /> Add card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagsKanbanDemo() {
  const cards = [
    { title: "Fix login bug", tag: "Bug", color: "bg-red-100 text-red-700" },
    { title: "Update API", tag: "Feature", color: "bg-blue-100 text-blue-700" },
  ];
  return (
    <div className="w-full p-4">
      <div className="flex gap-4 min-w-[400px]">
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-2 mb-3"><div className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="text-sm font-medium">High Priority</span></div>
          <div className="space-y-2">
            {cards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-medium">{card.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${card.color}`}>{card.tag}</span>
                  <div className="h-5 w-5 rounded-full bg-primary/10 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactKanbanDemo() {
  const cols = ["Backlog", "To Do", "In Progress", "Review"];
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-4 gap-3">
        {cols.map((col) => (
          <div key={col}>
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{col}</p>
            <div className="space-y-1.5">
              {[1, 2].map((n) => (
                <div key={n} className="rounded border border-border bg-card px-2.5 py-1.5 text-xs">{col} task {n}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BASIC_EXAMPLE = `<BoardKanban columns={columns} cards={cards} />`;

const TAGS_EXAMPLE = `<div className="rounded-lg border border-border bg-card p-3">
  <p className="text-sm font-medium">{card.title}</p>
  <span className={\`text-[10px] px-1.5 py-0.5 rounded-full \${card.color}\`}>
    {card.tag}
  </span>
</div>`;

const COMPACT_EXAMPLE = `<div className="grid grid-cols-4 gap-3">
  {columns.map((col) => (
    <div key={col}>
      <p className="text-xs font-medium uppercase tracking-wider">{col}</p>
      <div className="space-y-1.5">
        <div className="rounded border border-border bg-card px-2.5 py-1.5 text-xs">Task</div>
      </div>
    </div>
  ))}
</div>`;

export default function BoardKanbanPage() {
  return (
    <ComponentDocPage
      name="Board Kanban"
      category="Layout"
      description="A kanban board component for task management with drag-and-drop columns and cards."
    >
      <PreviewPanel filename="board-kanban.tsx">
        <BasicKanbanDemo />
      </PreviewPanel>

      <SourceCodeViewer source={BOARD_KANBAN_SOURCE} filename="components/ui/BoardKanban/BoardKanban.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Kanban Board" description="A simple kanban layout with columns and cards." code={BASIC_EXAMPLE}><BasicKanbanDemo /></ExampleBlock>
        <ExampleBlock title="Cards with Tags" description="Kanban cards with priority tags and avatars." code={TAGS_EXAMPLE}><TagsKanbanDemo /></ExampleBlock>
        <ExampleBlock title="Compact View" description="A compact kanban board for smaller spaces." code={COMPACT_EXAMPLE}><CompactKanbanDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}