import type { ReactNode } from "react";

export interface QuickNavItem {
  /** Unique identifier. */
  id: string;
  /** Display label text. */
  label: string;
  /** Optional description. */
  description?: string;
  /** Optional icon. */
  icon?: ReactNode;
  /** Keyboard shortcut display (e.g. "⌘K"). */
  shortcut?: string;
  /** Section grouping key. */
  section?: string;
  /** Whether the item is disabled. */
  disabled?: boolean;
}

export interface QuickNavProps {
  /** Whether the command palette is open. */
  open: boolean;
  /** Called when the palette should close. */
  onClose: () => void;
  /** Navigation items. */
  items?: QuickNavItem[];
  /** Placeholder text for the search input. */
  placeholder?: string;
  /** Layout variant. */
  variant?: "default" | "compact" | "flat";
  /** Optional footer content. */
  footer?: ReactNode;
  /** Called when an item is selected. */
  onSelect?: (item: QuickNavItem) => void;
  /** Additional CSS classes. */
  className?: string;
}
