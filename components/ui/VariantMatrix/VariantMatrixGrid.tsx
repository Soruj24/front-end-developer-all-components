import { GridIcon } from "./icons";
import type { VariantMatrixAxis, VariantMatrixCell } from "./VariantMatrix.types";
import { CellView } from "./CellView";
import type { SharedGridProps } from "./VariantMatrix";

interface GridProps extends SharedGridProps {
  visibleRows: VariantMatrixAxis[];
  visibleColumns: VariantMatrixAxis[];
}

export function VariantMatrixGrid({
  visibleRows,
  visibleColumns,
  byKey,
  copiedId,
  copyable,
  handleCopy,
  title,
}: GridProps) {
  const gridTemplateColumns = `11rem repeat(${visibleColumns.length}, minmax(0, 1fr))`;

  return (
    <div className="hidden overflow-hidden rounded-xl border border-border sm:block">
      <div className="grid border-b border-border bg-muted/50" style={{ gridTemplateColumns }}>
        <div className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <GridIcon className="h-3.5 w-3.5" />
          {title ?? "Variant"}
        </div>
        {visibleColumns.map((col) => (
          <div key={col.id} className="flex flex-col justify-center px-3 py-2.5">
            <span className="text-sm font-medium text-foreground">{col.label}</span>
            {col.sublabel && <span className="text-xs text-muted-foreground">{col.sublabel}</span>}
          </div>
        ))}
      </div>
      {visibleRows.map((row) => (
        <div key={row.id} className="grid border-b border-border last:border-b-0" style={{ gridTemplateColumns }}>
          <div className="flex items-center px-4 py-3">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{row.label}</span>
              {row.sublabel && <span className="text-xs text-muted-foreground">{row.sublabel}</span>}
            </div>
          </div>
          {visibleColumns.map((col) => {
            const cell = byKey.get(`${row.id}|${col.id}`);
            return (
              <CellView
                key={col.id}
                cell={cell}
                row={row}
                column={col}
                copied={cell !== undefined && copiedId === cell.id}
                copyable={copyable}
                onCopy={handleCopy}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
