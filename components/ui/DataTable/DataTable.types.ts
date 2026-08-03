export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T = Record<string, unknown>> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  className?: string;
}
