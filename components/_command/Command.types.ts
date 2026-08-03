import type { ReactNode, KeyboardEvent, ClipboardEvent } from "react";

export type CommandVariant = "default" | "dialog";
export type CommandItemProps = {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  shortcut?: string;
  disabled?: boolean;
  group?: string;
  keywords?: string[];
  onSelect?: (value: string) => void;
};

export interface CommandProps {
  placeholder?: string;
  variant?: CommandVariant;
  items: CommandItemProps[];
  emptyMessage?: ReactNode;
  searchPlaceholder?: string;
  maxResults?: number;
  onValueChange?: (value: string) => void;
  onSelect?: (item: CommandItemProps) => void;
  className?: string;
}

export interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface CommandListProps {
  items: CommandItemProps[];
  selected?: string;
  onSelect?: (item: CommandItemProps) => void;
  highlightedIndex?: number;
  onHighlight?: (index: number) => void;
}
