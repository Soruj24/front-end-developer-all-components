import type { ReactNode, HTMLAttributes, ButtonHTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

export interface DataColumn<T> {
  key: string;
  header: ReactNode;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  resizable?: boolean;
  width?: number | string;
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> extends HTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: DataColumn<T>[];
  loading?: boolean;
  emptyMessage?: ReactNode;
  pagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  selectable?: boolean;
  selectableKey?: keyof T;
  onSelectionChange?: (selected: Set<string | number>) => void;
}

export interface DataTablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}
