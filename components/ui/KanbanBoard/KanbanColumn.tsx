"use client";

import { cn } from "@/lib/cn";
import { Plus, MoreHorizontal } from "lucide-react";
import { KanbanCard } from "./KanbanCard";
import type { KanbanColumnData, KanbanCardData } from "./KanbanBoard.types";

export function KanbanColumn({
  column,
  onCardAdd,
  onCardClick,
  emptySlot,
}: {
  column: KanbanColumnData;
  onCardAdd?: (columnId: string) => void;
  onCardClick?: (card: KanbanCardData, columnId: string) => void;
  emptySlot?: React.ReactNode;
}) {
  return (
    <div className="flex w-72 min-w-[18rem] shrink-0 flex-col" role="region" aria-label={`${column.title} column`}>
      <div className="flex items-center justify-between px-1 pb-3">
        <div className="flex items-center gap-2">
          <span className={cn("inline-block h-2.5 w-2.5 rounded-full", column.dotColor)} aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
          <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-muted px-1.5 text-[11px] font-semibold tabular-nums text-muted-foreground">
            {column.cards.length}
          </span>
        </div>
        <button
          type="button"
          className={cn(
            "inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-all duration-150",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "active:scale-90",
          )}
          aria-label={`More options for ${column.title}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {column.cards.length === 0 && emptySlot && (
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border/60 p-4">
            {emptySlot}
          </div>
        )}
        {column.cards.map((card) => (
          <KanbanCard key={card.id} card={card} onClick={(c) => onCardClick?.(c, column.id)} />
        ))}
      </div>

      {onCardAdd && (
        <button
          type="button"
          onClick={() => onCardAdd(column.id)}
          className={cn(
            "mt-2 flex items-center gap-2 rounded-xl border border-dashed border-border/60 p-2.5 text-xs font-medium text-muted-foreground transition-all duration-150",
            "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "active:scale-[0.98]",
          )}
          aria-label={`Add card to ${column.title}`}
        >
          <Plus className="h-3.5 w-3.5" />
          Add card
        </button>
      )}
    </div>
  );
}
