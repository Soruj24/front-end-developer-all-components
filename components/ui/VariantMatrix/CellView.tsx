import { memo } from "react";
import type { VariantMatrixAxis, VariantMatrixCell } from "./VariantMatrix.types";
import { CheckIcon, CopyIcon } from "./icons";

interface CellViewProps {
  cell?: VariantMatrixCell;
  row: VariantMatrixAxis;
  column: VariantMatrixAxis;
  copied: boolean;
  copyable: boolean;
  onCopy: (cell: VariantMatrixCell) => void;
}

export const CellView = memo(function CellView({
  cell,
  row,
  column,
  copied,
  copyable,
  onCopy,
}: CellViewProps) {
  if (!cell) {
    return (
      <div className="flex min-h-28 items-center justify-center rounded-lg border border-dashed border-border text-sm text-subtle">
        —
      </div>
    );
  }
  const label = cell.label ?? `${row.label} · ${column.label}`;
  return (
    <div className="group relative flex min-h-28 flex-col justify-between gap-2 rounded-lg border border-border bg-background p-3 transition-colors hover:border-ring/50">
      <div className="flex min-h-12 flex-1 items-center justify-center">{cell.preview}</div>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-foreground">{label}</span>
        {copyable && (
          <button
            type="button"
            onClick={() => onCopy(cell)}
            aria-label={`Copy config for ${label}`}
            className="flex shrink-0 items-center gap-1 rounded-md border border-border bg-muted/60 px-1.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            {copied ? <CheckIcon className="h-3 w-3 text-success" /> : <CopyIcon className="h-3 w-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
});
