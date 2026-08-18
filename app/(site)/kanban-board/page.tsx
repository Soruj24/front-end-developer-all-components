"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Plus, MoreHorizontal, GripVertical, Circle, Clock, User, Tag, ArrowRight } from "lucide-react";

const installCommand = `npx component-library@latest add kanban-board`;

const usageCode = `import { KanbanBoard } from "@/components/ui";

<KanbanBoard
  columns={columns}
  onCardMove={handleCardMove}
/>`;

type Card = { id: string; title: string; desc?: string; tag?: string; tagColor?: string; avatar?: string; time?: string };
type Column = { id: string; title: string; color: string; cards: Card[] };

const defaultColumns: Column[] = [
  {
    id: "todo", title: "To Do", color: "bg-slate-500",
    cards: [
      { id: "c1", title: "Design new landing page", desc: "Create mockups for the hero section", tag: "Design", tagColor: "bg-purple-100 text-purple-700", time: "2h" },
      { id: "c2", title: "Write API documentation", desc: "Document all REST endpoints", tag: "Docs", tagColor: "bg-blue-100 text-blue-700", time: "4h" },
    ],
  },
  {
    id: "progress", title: "In Progress", color: "bg-blue-500",
    cards: [
      { id: "c3", title: "Implement auth flow", desc: "OAuth2 + JWT tokens", tag: "Backend", tagColor: "bg-green-100 text-green-700", time: "3h" },
    ],
  },
  {
    id: "review", title: "Review", color: "bg-yellow-500",
    cards: [
      { id: "c4", title: "Update user settings", desc: "Add notification preferences", tag: "Frontend", tagColor: "bg-orange-100 text-orange-700", time: "1h" },
    ],
  },
  {
    id: "done", title: "Done", color: "bg-green-500",
    cards: [
      { id: "c5", title: "Fix login bug", desc: "Resolved session timeout issue", tag: "Bug", tagColor: "bg-red-100 text-red-700", time: "30m" },
    ],
  },
];

function KanbanCard({ card }: { card: Card }) {
  return (
    <div className="rounded-lg border border-border bg-background p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium leading-snug">{card.title}</p>
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/50" />
      </div>
      {card.desc && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{card.desc}</p>}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {card.tag && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${card.tagColor}`}>
              {card.tag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {card.time && (
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{card.time}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ column }: { column: Column }) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`h-2.5 w-2.5 rounded-full ${column.color}`} />
          <h3 className="text-sm font-semibold">{column.title}</h3>
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{column.cards.length}</span>
        </div>
        <button className="rounded p-1 hover:bg-muted"><MoreHorizontal className="h-4 w-4 text-muted-foreground" /></button>
      </div>
      <div className="flex flex-col gap-2">
        {column.cards.map((card) => <KanbanCard key={card.id} card={card} />)}
      </div>
      <button className="flex items-center gap-2 rounded-lg border border-dashed border-border p-2 text-xs text-muted-foreground hover:bg-muted">
        <Plus className="h-3 w-3" />Add card
      </button>
    </div>
  );
}

function BasicKanbanDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-2">
        {defaultColumns.slice(0, 2).map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}

function WithColumnsDemo() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-2">
        {defaultColumns.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}

function TaskCardsDemo() {
  const columns: Column[] = [
    {
      id: "backlog", title: "Backlog", color: "bg-gray-400",
      cards: [
        { id: "t1", title: "Research competitor pricing", tag: "Research", tagColor: "bg-indigo-100 text-indigo-700" },
        { id: "t2", title: "Set up CI/CD pipeline", tag: "DevOps", tagColor: "bg-cyan-100 text-cyan-700" },
      ],
    },
    {
      id: "sprint", title: "Sprint", color: "bg-violet-500",
      cards: [
        { id: "t3", title: "Build dashboard widgets", desc: "Chart, table, and stat components", tag: "Frontend", tagColor: "bg-orange-100 text-orange-700", time: "5h" },
        { id: "t4", title: "Database migration", desc: "Add user preferences table", tag: "Backend", tagColor: "bg-green-100 text-green-700", time: "2h" },
      ],
    },
    {
      id: "blocked", title: "Blocked", color: "bg-red-500",
      cards: [
        { id: "t5", title: "Third-party API integration", desc: "Waiting for API credentials", tag: "External", tagColor: "bg-yellow-100 text-yellow-700", time: "1d" },
      ],
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 p-2">
        {columns.map((col) => (
          <KanbanColumn key={col.id} column={col} />
        ))}
      </div>
    </div>
  );
}

export default function KanbanBoardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Kanban Board</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A drag-and-drop kanban board for task management. Organize work into columns with cards, labels, and due times.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Kanban</h2>
          <p className="mt-1 text-sm text-muted-foreground">Two-column kanban with sample cards.</p>
        </div>
        <ComponentPreview id="kanban-basic">
          <BasicKanbanDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Columns</h2>
          <p className="mt-1 text-sm text-muted-foreground">Full four-column workflow: To Do, In Progress, Review, Done.</p>
        </div>
        <ComponentPreview id="kanban-columns">
          <WithColumnsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Task Cards</h2>
          <p className="mt-1 text-sm text-muted-foreground">Cards with tags, descriptions, and time estimates.</p>
        </div>
        <ComponentPreview id="kanban-tasks">
          <TaskCardsDemo />
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">Column[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onCardMove</td>
                <td className="px-4 py-3 text-muted-foreground">(cardId: string, from: string, to: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onCardAdd</td>
                <td className="px-4 py-3 text-muted-foreground">(columnId: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">draggable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
