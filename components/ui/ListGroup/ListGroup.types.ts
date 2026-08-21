import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface ListGroupItem {
  /** Unique identifier. */
  id: string | number;
  /** Display label text. */
  label: string;
  /** Optional description text below the label. */
  description?: string;
  /** Optional leading icon component. */
  icon?: LucideIcon;
  /** Optional badge value (number or string). */
  badge?: string | number;
  /** Badge color variant. */
  badgeVariant?: "default" | "primary" | "danger" | "success";
  /** Right-side trailing content (text, icon, etc.). */
  trailing?: ReactNode;
  /** Whether the item is disabled. */
  disabled?: boolean;
  /** Whether the item is active/selected. */
  active?: boolean;
  /** Whether the item is unread/highlighted. */
  unread?: boolean;
  /** Additional CSS classes. */
  className?: string;
}

export interface ListGroupProps {
  /** Array of list items. */
  items: ListGroupItem[];
  /** Called when an item is clicked. */
  onSelect?: (id: string | number, index: number) => void;
  /** Show border around the group. */
  bordered?: boolean;
  /** Flush variant (no rounded corners, no gaps). */
  flush?: boolean;
  /** Horizontal layout (pills/tabs). */
  horizontal?: boolean;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Content to render as the group header. */
  header?: ReactNode;
  /** Content to render as the group footer. */
  footer?: ReactNode;
}
