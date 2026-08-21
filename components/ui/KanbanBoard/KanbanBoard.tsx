"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import { KanbanColumn } from "./KanbanColumn";
import type { KanbanBoardProps } from "./KanbanBoard.types";

const KanbanBoard = forwardRef<HTMLDivElement, KanbanBoardProps>(
  (
    {
      columns,
      onCardMove,
      onCardAdd,
      onCardClick,
      draggable = true,
      className,
      label = "Kanban board",
      emptySlot,
    },
    ref,
  ) => {
    const handleDragStart = (e: React.DragEvent, cardId: string, columnId: string) => {
      if (!draggable) return;
      e.dataTransfer.setData("text/plain", JSON.stringify({ cardId, columnId }));
      e.dataTransfer.effectAllowed = "move";
    };

    const handleDrop = (e: React.DragEvent, toColumnId: string) => {
      e.preventDefault();
      try {
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        if (data.columnId !== toColumnId) {
          onCardMove?.(data.cardId, data.columnId, toColumnId);
        }
      } catch { /* ignore */ }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    return (
      <div
        ref={ref}
        className={cn("w-full overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent", className)}
        role="region"
        aria-label={label}
      >
        <div className="flex gap-4 p-1 min-w-max">
          {columns.map((col) => (
            <div
              key={col.id}
              onDrop={(e) => handleDrop(e, col.id)}
              onDragOver={handleDragOver}
            >
              <KanbanColumn
                column={{
                  ...col,
                  cards: col.cards.map((card) => ({
                    ...card,
                    // Attach drag handler via wrapper
                  })),
                }}
                onCardAdd={onCardAdd}
                onCardClick={onCardClick}
                emptySlot={emptySlot}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
);

KanbanBoard.displayName = "KanbanBoard";

export default KanbanBoard;
