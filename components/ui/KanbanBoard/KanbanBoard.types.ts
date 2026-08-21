import type { ReactNode } from "react";

export interface KanbanCardData {
  /** Unique card identifier. */
  id: string;
  /** Card title. */
  title: string;
  /** Optional description. */
  description?: string;
  /** Optional tag label. */
  tag?: string;
  /** Tailwind classes for the tag badge (e.g. "bg-purple-100 text-purple-700"). */
  tagColor?: string;
  /** Optional avatar URL or initials. */
  avatar?: string;
  /** Optional time estimate. */
  time?: string;
  /** Optional priority indicator. */
  priority?: "low" | "medium" | "high";
  /** Whether the card is archived. */
  archived?: boolean;
  /** Optional custom content rendered below the description. */
  children?: ReactNode;
}

export interface KanbanColumnData {
  /** Unique column identifier. */
  id: string;
  /** Column title. */
  title: string;
  /** Tailwind background color class for the dot indicator. */
  dotColor: string;
  /** Cards in this column. */
  cards: KanbanCardData[];
}

export interface KanbanBoardProps {
  /** Column data. */
  columns: KanbanColumnData[];
  /** Called when a card should move between columns. */
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void;
  /** Called when "Add card" is clicked in a column. */
  onCardAdd?: (columnId: string) => void;
  /** Called when a card is clicked. */
  onCardClick?: (card: KanbanCardData, columnId: string) => void;
  /** Enable drag and drop. */
  draggable?: boolean;
  /** Additional CSS classes for the board container. */
  className?: string;
  /** Accessible label for the board. */
  label?: string;
  /** Empty state content for a column with no cards. */
  emptySlot?: ReactNode;
}
