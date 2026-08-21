"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import type {
  HeatMapProps,
  HeatMapCellProps,
  HeatMapLegendProps,
} from "./HeatMap.types";

function defaultColorScale(value: number): string {
  if (value < 20) return "bg-primary/10";
  if (value < 40) return "bg-primary/20";
  if (value < 60) return "bg-primary/35";
  if (value < 80) return "bg-primary/55";
  return "bg-primary/80";
}

function HeatMapCell({
  value,
  row,
  col,
  rowLabel,
  colLabel,
  colorScale = defaultColorScale,
  onHover,
  isHovered,
}: HeatMapCellProps) {
  const tooltipText = useMemo(() => {
    const parts: string[] = [];
    if (rowLabel) parts.push(rowLabel);
    if (colLabel) parts.push(colLabel);
    parts.push(`${value} events`);
    return parts.join(" · ");
  }, [value, rowLabel, colLabel]);

  return (
    <div
      role="gridcell"
      aria-label={tooltipText}
      tabIndex={0}
      onMouseEnter={() => onHover?.({ row, col })}
      onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.({ row, col })}
      onBlur={() => onHover?.(null)}
      className={cn(
        "relative h-9 w-full cursor-pointer rounded-lg",
        "transition-all duration-200",
        colorScale(value),
        "hover:scale-110 hover:shadow-md hover:ring-2 hover:ring-primary/30 hover:z-10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-10",
        "active:scale-105",
      )}
    >
      {isHovered && (
        <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
          {tooltipText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 h-2 w-2 border-b border-r border-border bg-popover" />
        </div>
      )}
    </div>
  );
}

export function HeatMapCellComponent(
  props: HeatMapCellProps,
) {
  return <HeatMapCell {...props} />;
}

export function HeatMapLegend({
  colorScale = defaultColorScale,
  min = 0,
  max = 100,
  steps = 5,
  className,
}: HeatMapLegendProps) {
  const values = useMemo(() => {
    const step = (max - min) / (steps - 1);
    return Array.from({ length: steps }, (_, i) => Math.round(min + step * i));
  }, [min, max, steps]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="text-xs text-muted-foreground">Less</span>
      {values.map((v) => (
        <div
          key={v}
          className={cn("h-4 w-4 rounded-md", colorScale(v))}
          aria-label={`Value ${v}`}
        />
      ))}
      <span className="text-xs text-muted-foreground">More</span>
    </div>
  );
}

export function HeatMap({
  data,
  rowLabels,
  columnLabels,
  colorScale = defaultColorScale,
  label,
  className,
}: HeatMapProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );

  const handleHover = useCallback(
    (cell: { row: number; col: number } | null) => setHovered(cell),
    [],
  );

  const cols = data[0]?.length ?? 0;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-[360px]">
        {label && (
          <p className="mb-3 text-sm font-medium text-foreground">{label}</p>
        )}

        <div
          role="grid"
          aria-label={label || "Heat map"}
          className="grid gap-1"
          style={{
            gridTemplateColumns: rowLabels
              ? `48px repeat(${cols}, minmax(0, 1fr))`
              : `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {columnLabels && (
            <>
              {rowLabels && <div />}
              {columnLabels.map((h) => (
                <div
                  key={h}
                  className="pb-2 text-center text-[11px] font-medium text-muted-foreground"
                >
                  {h}
                </div>
              ))}
            </>
          )}

          {data.map((row, r) => (
            <div
              key={r}
              className="contents"
              style={{
                gridTemplateColumns: rowLabels
                  ? `48px repeat(${cols}, minmax(0, 1fr))`
                  : `repeat(${cols}, minmax(0, 1fr))`,
              }}
            >
              {rowLabels && (
                <div className="flex items-center pr-2 text-[11px] font-medium text-muted-foreground">
                  {rowLabels[r]}
                </div>
              )}
              {row.map((val, c) => (
                <HeatMapCell
                  key={c}
                  value={val}
                  row={r}
                  col={c}
                  rowLabel={rowLabels?.[r]}
                  colLabel={columnLabels?.[c]}
                  colorScale={colorScale}
                  onHover={handleHover}
                  isHovered={hovered?.row === r && hovered?.col === c}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
