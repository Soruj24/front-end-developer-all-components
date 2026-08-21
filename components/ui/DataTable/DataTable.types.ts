export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  className?: string;
  emptyMessage?: string;
  onRowClick?: (row: T, index: number) => void;
  striped?: boolean;
  compact?: boolean;
}
