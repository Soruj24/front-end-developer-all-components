import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export interface DescriptionListItem {
  /** Term label. */
  term: string;
  /** Description text. */
  description: string;
  /** Optional leading icon. */
  icon?: LucideIcon;
  /** Optional trailing content. */
  trailing?: ReactNode;
  /** Whether the item is highlighted. */
  highlighted?: boolean;
  /** Additional CSS classes. */
  className?: string;
}

export interface DescriptionListProps {
  /** Array of term/description items. */
  items: DescriptionListItem[];
  /** Layout variant. */
  variant?: "default" | "card" | "inline" | "stacked";
  /** Show dividers between items. */
  dividers?: boolean;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Optional header content. */
  header?: ReactNode;
  /** Optional footer content. */
  footer?: ReactNode;
}

export interface DescriptionTermProps {
  /** Term label text. */
  children: ReactNode;
  /** Optional icon. */
  icon?: LucideIcon;
  /** Additional CSS classes. */
  className?: string;
}

export interface DescriptionDetailsProps {
  /** Description content. */
  children: ReactNode;
  /** Additional CSS classes. */
  className?: string;
}
