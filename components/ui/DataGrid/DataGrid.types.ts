import type { ReactNode } from "react";

export interface DataGridColumn<T> {
  /** Column key from the row data. */
  key: keyof T & string;
  /** Column header label. */
  label: string;
  /** Whether this column is sortable. */
  sortable?: boolean;
  /** Custom alignment. */
  align?: "left" | "center" | "right";
  /** Custom cell renderer. */
  render?: (value: T[keyof T], row: T) => ReactNode;
  /** Additional CSS classes for the cell. */
  className?: string;
}

export interface DataGridProps<T extends Record<string, unknown>> {
  /** Column definitions. */
  columns: DataGridColumn<T>[];
  /** Row data array. */
  data: T[];
  /** Enable sorting. */
  sortable?: boolean;
  /** Enable pagination. */
  pagination?: boolean;
  /** Rows per page. */
  pageSize?: number;
  /** Enable search/filter. */
  searchable?: boolean;
  /** Search input placeholder. */
  searchPlaceholder?: string;
  /** Enable striped rows. */
  striped?: boolean;
  /** Enable compact layout. */
  compact?: boolean;
  /** Show row numbers. */
  showRowNumbers?: boolean;
  /** Called when a row is clicked. */
  onRowClick?: (row: T) => void;
  /** Empty state content. */
  emptyContent?: ReactNode;
  /** Footer content. */
  footer?: ReactNode;
  /** Additional CSS classes for the container. */
  className?: string;
  /** Initial sort key. */
  defaultSortKey?: keyof T & string;
  /** Initial sort direction. */
  defaultSortDir?: "asc" | "desc";
}

export interface DataGridSortState {
  key: string | null;
  dir: "asc" | "desc" | null;
}
