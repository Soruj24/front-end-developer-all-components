import * as React from "react";
import { cn } from "@/lib/cn";
import { InlineSelect } from "@/components/ui/InlineSelect";
import type { DataColumn, DataTableProps, DataTablePaginationProps } from "./DataTable.types";
import { DATA_TABLE_STYLES } from "./DataTable.constants";

export function DataTable<T>({ data, columns, loading, emptyMessage = "No data available", pageSize = 10, pageSizeOptions = [10, 20, 50, 100], selectable, selectableKey, onSelectionChange, className, ...props }: DataTableProps<T>) {
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set());
  const [page, setPage] = React.useState(1);
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSize);

  const totalPages = Math.ceil(data.length / currentPageSize);
  const start = (page - 1) * currentPageSize;
  const pagedData = data.slice(start, start + currentPageSize);

  const toggleSelection = (key: string | number) => {
    const newSet = new Set(selected);
    if (newSet.has(key)) newSet.delete(key);
    else newSet.add(key);
    setSelected(newSet);
    onSelectionChange?.(newSet);
  };

  const toggleAll = () => {
    const newSet = selected.size === pagedData.length
      ? new Set<string | number>()
      : new Set(pagedData.map((row) => row[selectableKey as keyof T] as string | number));
    setSelected(newSet);
    onSelectionChange?.(newSet);
  };

  return (
    <div className={cn(DATA_TABLE_STYLES.container, className)} {...props}>
      <table className={DATA_TABLE_STYLES.table}>
        <thead className={DATA_TABLE_STYLES.header}>
          <tr>
            {selectable && (
              <th className={DATA_TABLE_STYLES.th}>
                <input type="checkbox" checked={selected.size === pagedData.length} onChange={toggleAll} className={DATA_TABLE_STYLES.checkbox} />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key} className={cn(DATA_TABLE_STYLES.th, `text-${col.align ?? "left"}`)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length} className={DATA_TABLE_STYLES.td}>Loading...</td></tr>
          ) : pagedData.length === 0 ? (
            <tr><td colSpan={columns.length} className="py-8 text-center text-sm text-gray-500">{emptyMessage}</td></tr>
          ) : (
            pagedData.map((row, idx) => (
              <tr key={idx} className={DATA_TABLE_STYLES.row}>
                {selectable && (
                  <td className={DATA_TABLE_STYLES.td}>
                    <input
                      type="checkbox"
                      checked={selected.has(row[selectableKey as keyof T] as string | number)}
                      onChange={() => toggleSelection(row[selectableKey as keyof T] as string | number)}
                      className={DATA_TABLE_STYLES.checkbox}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={cn(DATA_TABLE_STYLES.td, `text-${col.align ?? "left"}`)}>
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DataTablePagination
        page={page}
        pageSize={currentPageSize}
        total={data.length}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setPage}
        onPageSizeChange={setCurrentPageSize}
      />
    </div>
  );
}

function DataTablePagination({ page, pageSize, total, pageSizeOptions, onPageChange, onPageSizeChange }: DataTablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={DATA_TABLE_STYLES.pagination}>
      <div>
        Page {page} of {totalPages} ({total} items)
      </div>
      <div className="flex items-center gap-2">
        <InlineSelect
          options={pageSizeOptions.map((size) => ({ value: String(size), label: String(size) }))}
          value={String(pageSize)}
          onChange={(val) => onPageSizeChange(Number(val))}
          size="sm"
        />
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="rounded px-2 py-1 disabled:opacity-50">Prev</button>
        <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="rounded px-2 py-1 disabled:opacity-50">Next</button>
      </div>
    </div>
  );
}
