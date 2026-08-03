import type { VariantMatrixAxis } from "./VariantMatrix.types";
import { CellView } from "./CellView";
import type { SharedGridProps } from "./VariantMatrix";

interface MobileProps extends SharedGridProps {
  visibleRows: VariantMatrixAxis[];
  visibleColumns: VariantMatrixAxis[];
}

export function VariantMatrixMobile({
  visibleRows,
  visibleColumns,
  byKey,
  copiedId,
  copyable,
  handleCopy,
}: MobileProps) {
  return (
    <div className="flex flex-col gap-4 sm:hidden">
      {visibleRows.map((row) => (
        <div key={row.id} className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted/50 px-3 py-2">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{row.label}</span>
              {row.sublabel && <span className="text-xs text-muted-foreground">{row.sublabel}</span>}
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {visibleColumns.filter((col) => byKey.get(`${row.id}|${col.id}`)).length} variants
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 p-3">
            {visibleColumns.map((col) => {
              const cell = byKey.get(`${row.id}|${col.id}`);
              return (
                <div key={col.id} className="flex flex-col gap-1.5">
                  <span className="px-1 text-xs font-medium text-muted-foreground">{col.label}</span>
                  <CellView
                    cell={cell}
                    row={row}
                    column={col}
                    copied={cell !== undefined && copiedId === cell.id}
                    copyable={copyable}
                    onCopy={handleCopy}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
