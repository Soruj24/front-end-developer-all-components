import { cn } from "@/lib/cn";
import type { VariantMatrixLegend } from "./VariantMatrix.types";

interface LegendProps {
  legend?: VariantMatrixLegend[];
}

export function VariantMatrixLegend({ legend }: LegendProps) {
  if (!legend || legend.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      {legend.map((l) => (
        <span key={l.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className={cn("h-2 w-2 rounded-full", l.className)} />
          {l.label}
        </span>
      ))}
    </div>
  );
}
