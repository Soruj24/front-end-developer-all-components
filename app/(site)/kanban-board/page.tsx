"use client";

import { useState, useCallback } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { KanbanBoard, KanbanCard } from "@/components/ui/KanbanBoard";
import type { KanbanColumnData, KanbanCardData } from "@/components/ui/KanbanBoard";
import { KANBAN_BOARD_SOURCE } from "./kanban-board-source";

const BASIC_CODE = `import { KanbanBoard } from "@/components/ui/KanbanBoard";

<KanbanBoard columns={columns} />`;

const WITH_DRAG_CODE = `import { KanbanBoard } from "@/components/ui/KanbanBoard";

<KanbanBoard
  columns={columns}
  draggable
  onCardMove={(cardId, from, to) => console.log(cardId, from, to)}
/>`;

const SAMPLE_COLUMNS: KanbanColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    dotColor: "bg-slate-500",
    cards: [
      { id: "c1", title: "Design new landing page", description: "Create mockups for the hero section", tag: "Design", tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300", time: "2h", priority: "medium" },
      { id: "c2", title: "Write API documentation", description: "Document all REST endpoints", tag: "Docs", tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", time: "4h", priority: "low" },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    dotColor: "bg-blue-500",
    cards: [
      { id: "c3", title: "Implement auth flow", description: "OAuth2 + JWT tokens", tag: "Backend", tagColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300", time: "3h", priority: "high" },
    ],
  },
  {
    id: "review",
    title: "Review",
    dotColor: "bg-amber-500",
    cards: [
      { id: "c4", title: "Update user settings", description: "Add notification preferences", tag: "Frontend", tagColor: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300", time: "1h", priority: "low" },
    ],
  },
  {
    id: "done",
    title: "Done",
    dotColor: "bg-emerald-500",
    cards: [
      { id: "c5", title: "Fix login bug", description: "Resolved session timeout issue", tag: "Bug", tagColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", time: "30m", priority: "high" },
    ],
  },
];

function BoardWithState() {
  const [columns, setColumns] = useState<KanbanColumnData[]>(SAMPLE_COLUMNS);

  const handleCardMove = useCallback(
    (cardId: string, fromId: string, toId: string) => {
      setColumns((prev) => {
        const from = prev.find((c) => c.id === fromId);
        const card = from?.cards.find((c) => c.id === cardId);
        if (!card) return prev;
        return prev.map((col) => {
          if (col.id === fromId) return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
          if (col.id === toId) return { ...col, cards: [...col.cards, card] };
          return col;
        });
      });
    },
    [],
  );

  return (
    <div className="w-full">
      <KanbanBoard
        columns={columns}
        draggable
        onCardMove={handleCardMove}
        onCardAdd={(colId) => alert(`Add card to: ${colId}`)}
        onCardClick={(card) => alert(`Clicked: ${card.title}`)}
      />
    </div>
  );
}

function MinimalDemo() {
  const cols: KanbanColumnData[] = [
    {
      id: "backlog",
      title: "Backlog",
      dotColor: "bg-gray-400",
      cards: [
        { id: "t1", title: "Research competitor pricing" },
        { id: "t2", title: "Set up CI/CD pipeline" },
      ],
    },
    {
      id: "active",
      title: "Active",
      dotColor: "bg-violet-500",
      cards: [
        { id: "t3", title: "Build dashboard widgets", description: "Chart, table, and stat components", time: "5h" },
      ],
    },
    {
      id: "blocked",
      title: "Blocked",
      dotColor: "bg-red-500",
      cards: [],
    },
  ];

  return (
    <div className="w-full">
      <KanbanBoard columns={cols} emptySlot={<span className="text-xs text-muted-foreground">No cards yet</span>} />
    </div>
  );
}

export default function KanbanBoardPage() {
  return (
    <ComponentDocPage
      name="Kanban Board"
      category="Layout"
      description="A drag-and-drop kanban board for task management. Organize work into columns with cards, labels, and due times."
    >
      <PreviewPanel filename="kanban-board.tsx">
        <div className="w-full">
          <KanbanBoard columns={SAMPLE_COLUMNS.slice(0, 2)} emptySlot={<span className="text-xs text-muted-foreground">No cards yet</span>} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={KANBAN_BOARD_SOURCE}
        filename="components/ui/KanbanBoard/KanbanBoard.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Interactive Board"
          description="Drag and drop cards between columns. Click cards for actions."
          code={WITH_DRAG_CODE}
          filename="interactive.tsx"
        >
          <BoardWithState />
        </ExampleBlock>

        <ExampleBlock
          title="Full Workflow"
          description="Four-column workflow: To Do, In Progress, Review, Done."
          code={BASIC_CODE}
          filename="workflow.tsx"
        >
          <div className="w-full">
            <KanbanBoard columns={SAMPLE_COLUMNS} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Minimal"
          description="Simple board with no drag, just display."
          code={`<KanbanBoard columns={columns} draggable={false} />`}
          filename="minimal.tsx"
        >
          <MinimalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Card Composition"
          description="Cards support tags, descriptions, time estimates, priority dots, and avatars."
          code={`<KanbanCard card={{ id: "1", title: "Task", priority: "high", tag: "Bug", time: "2h" }} />`}
          filename="card-composition.tsx"
        >
          <div className="w-full max-w-xs space-y-2">
            <KanbanCard card={{ id: "p1", title: "High priority task", priority: "high", tag: "Urgent", tagColor: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300", time: "1h" }} />
            <KanbanCard card={{ id: "p2", title: "Medium priority task", priority: "medium", tag: "Feature", tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300", time: "3h" }} />
            <KanbanCard card={{ id: "p3", title: "Low priority task", priority: "low", tag: "Enhancement", tagColor: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" }} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Empty Column"
          description="Columns show an empty slot when there are no cards."
          code={`<KanbanBoard columns={columns} emptySlot={<p>No cards</p>} />`}
          filename="empty-column.tsx"
        >
          <div className="w-full">
            <KanbanBoard
              columns={[
                { id: "a", title: "Has Cards", dotColor: "bg-blue-500", cards: [{ id: "1", title: "A card" }] },
                { id: "b", title: "Empty", dotColor: "bg-gray-400", cards: [] },
              ]}
              emptySlot={<span className="text-xs text-muted-foreground">Drag cards here</span>}
            />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
