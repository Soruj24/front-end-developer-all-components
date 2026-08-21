export type PaginationBarVariant = "default" | "pill" | "outline";
export type PaginationBarSize = "sm" | "md" | "lg";

export interface PaginationBarProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  variant?: PaginationBarVariant;
  size?: PaginationBarSize;
  showFirstLast?: boolean;
  showInfo?: boolean;
  className?: string;
}
