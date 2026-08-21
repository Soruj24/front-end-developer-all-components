"use client";

import { forwardRef, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { PieChartProps, PieChartData } from "./PieChart.types";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function buildSlicePath(cx: number, cy: number, r: number, ir: number, start: number, end: number) {
  const outerStart = polarToCartesian(cx, cy, r, start);
  const outerEnd = polarToCartesian(cx, cy, r, end);
  const largeArc = end - start > 180 ? 1 : 0;
  if (ir > 0) {
    const innerStart = polarToCartesian(cx, cy, ir, start);
    const innerEnd = polarToCartesian(cx, cy, ir, end);
    return `M ${outerStart.x} ${outerStart.y} A ${r} ${r} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${ir} ${ir} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
  }
  return `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} A ${r} ${r} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} Z`;
}

const PieChart = forwardRef<HTMLDivElement, PieChartProps>(
  (
    {
      data,
      type = "pie",
      size = 200,
      innerRadius = 0,
      gap = 1,
      showLegend = true,
      showLabels = false,
      centerContent,
      onSegmentClick,
      onSegmentHover,
      className,
    },
    ref,
  ) => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);
    const cx = size / 2;
    const cy = size / 2;
    const outerR = size / 2 - 4;
    const ir = type === "donut" ? innerRadius || outerR * 0.55 : 0;

    const slices = useMemo(() => {
      let angle = -90;
      return data.map((d) => {
        const sweep = (d.value / total) * 360;
        const start = angle + gap / 2;
        const end = angle + sweep - gap / 2;
        const mid = angle + sweep / 2;
        const pct = ((d.value / total) * 100).toFixed(1);
        angle += sweep;
        return { ...d, path: buildSlicePath(cx, cy, outerR, ir, start, end), percentage: pct, midAngle: mid };
      });
    }, [data, total, cx, cy, outerR, ir, gap]);

    const handleMouseEnter = useCallback(
      (idx: number) => {
        setHoveredIdx(idx);
        onSegmentHover?.(data[idx], idx);
      },
      [data, onSegmentHover],
    );

    const handleMouseLeave = useCallback(() => {
      setHoveredIdx(null);
      onSegmentHover?.(null, null);
    }, [onSegmentHover]);

    return (
      <div ref={ref} className={cn("flex flex-col items-center gap-4 sm:flex-row sm:items-start", className)}>
        <div className="relative shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="drop-shadow-sm"
            role="img"
            aria-label="Pie chart"
          >
            {slices.map((s, i) => (
              <path
                key={s.label}
                d={s.path}
                fill={s.color}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  hoveredIdx !== null && hoveredIdx !== i && "opacity-30",
                )}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                tabIndex={0}
                role="graphics-symbol"
                aria-label={`${s.label}: ${s.percentage}%`}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onSegmentClick?.(data[i], i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSegmentClick?.(data[i], i); }}
              />
            ))}
          </svg>
          {type === "donut" && centerContent && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {centerContent}
            </div>
          )}
        </div>

        {showLegend && (
          <div className="flex flex-col gap-2" role="list" aria-label="Chart legend">
            {slices.map((s, i) => (
              <button
                key={s.label}
                type="button"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-150",
                  "hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  hoveredIdx !== null && hoveredIdx !== i && "opacity-40",
                )}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={handleMouseLeave}
                role="listitem"
              >
                <span className="h-3 w-3 shrink-0 rounded-sm shadow-sm" style={{ backgroundColor: s.color }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">{s.value.toLocaleString()}</span>
                </span>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">{s.percentage}%</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);

PieChart.displayName = "PieChart";

export default PieChart;
