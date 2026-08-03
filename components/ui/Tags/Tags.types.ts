import type { ReactNode } from "react";

export type TagVariant = "default" | "secondary" | "outline" | "destructive";

export interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  onRemove?: () => void;
  className?: string;
}

export interface TagListProps {
  children: ReactNode;
  className?: string;
}
