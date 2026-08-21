export const KANBAN_BOARD_SOURCE = `"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { GripVertical, Clock, Plus, MoreHorizontal } from "lucide-react";

interface KanbanCardData {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
  avatar?: string;
  time?: string;
  priority?: "low" | "medium" | "high";
  children?: ReactNode;
}

interface KanbanColumnData {
  id: string;
  title: string;
  dotColor: string;
  cards: KanbanCardData[];
}

interface KanbanBoardProps {
  columns: KanbanColumnData[];
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  onCardAdd?: (columnId: string) => void;
  onCardClick?: (card: KanbanCardData, columnId: string) => void;
  draggable?: boolean;
  className?: string;
  label?: string;
  emptySlot?: ReactNode;
}

const PRIORITY_DOT: Record<string, string> = {
  low: "bg-sky-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
};

function KanbanCard({ card, onClick }: { card: KanbanCardData; onClick?: (card: KanbanCardData) => void }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(card)}
      draggable
      className={cn(
        "w-full rounded-xl border border-border/60 bg-background p-3.5 text-left shadow-sm transition-all duration-200",
        "hover:border-border hover:shadow-md hover:shadow-black/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        "active:scale-[0.98] active:shadow-lg",
        "cursor-grab active:cursor-grabbing",
      )}
      aria-label={\`Card: \${card.title}\`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {card.priority && (
              <span className={cn("inline-block h-2 w-2 shrink-0 rounded-full", PRIORITY_DOT[card.priority])} aria-label={\`Priority: \${card.priority}\`} />
            )}
            <p className="truncate text-sm font-medium leading-snug text-foreground">{card.title}</p>
          </div>
          {card.description && (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{card.description}</p>
          )}
        </div>
        <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/40" aria-hidden="true" />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {card.tag && (
            <span className={cn("inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold leading-none", card.tagColor)}>
              {card.tag}
            </span>
          )}
          {card.children}
        </div>
        <div className="flex items-center gap-2">
          {card.time && (
            <span className="inline-flex items-center gap-1 text-[11px] tabular-nums text-muted-foreground">
              <Clock className="h-3 w-3" aria-hidden="true" />
              {card.time}
            </span>
          )}
          {card.avatar && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
              {card.avatar}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function KanbanColumn({ column, onCardAdd, onCardClick, emptySlot }: {
  column: KanbanColumnData;
  onCardAdd?: (columnId: string) => void;
  onCardClick?: (card: KanbanCardData, columnId: string) => void;
  emptySlot?: React.ReactNode;
}) {
  return (
    <div className="flex w-72 min-w-[18rem] shrink-0 flex-col" role="region" aria-label={\`\${column.title} column\`}>
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className={cn("inline-block h-2.5 w-2.5 rounded-full", column.dotColor)} aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-semibold tabular-nums text-muted-foreground">
            {column.cards.length}
          </span>
        </div>
        <button type="button" className={cn(
          "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "active:scale-90",
        )} aria-label={\`More options for \${column.title}\`}>
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {column.cards.length === 0 && emptySlot && (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border/60 p-4">{emptySlot}</div>
        )}
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} onClick={(c) => onCardClick?.(c, column.id)} />
        ))}
      </div>

      {onCardAdd && (
        <button type="button" onClick={() => onCardAdd(column.id)} className={cn(
          "mt-2 flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-2.5 text-xs font-medium text-muted-foreground transition-all duration-150",
          "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
          "active:scale-[0.98]",
        )} aria-label={\`Add card to \${column.title}\`}>
          <Plus className="h-3.5 w-3.5" />
          Add card
        </button>
      )}
    </div>
  );
}

const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  ({ columns, onCardMove, onCardAdd, onCardClick, draggable = true, className, label = "Kanban board", emptySlot }, ref) => {
    const handleDrop = (e: React.DragEvent, toColumnId: string) => {
      e.preventDefault();
      try {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (data.columnId !== toColumnId) onCardMove?.(data.cardId, data.columnId, toColumnId);
      } catch { /* ignore */ }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    return (
      <div ref={ref} className={cn("w-full overflow-x-auto scrollbar-thin", className)} role="region" aria-label={label}>
        <div className="flex gap-4 p-1 min-w-max">
          {columns.map((col) => (
            <div key={col.id} onDrop={(e) => handleDrop(e, col.id)} onDragOver={handleDragOver}>
              <KanbanColumn column={col} onCardAdd={onCardAdd} onCardClick={onCardClick} emptySlot={emptySlot} />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";

export { KanbanBoard, KanbanCard, KanbanColumn };`;
