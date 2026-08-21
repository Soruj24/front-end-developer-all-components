"use client";

import { useState, useMemo } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { HeatMap, HeatMapLegend } from "@/components/ui/HeatMap";

const HEATMAP_SOURCE = `"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { HeatMapProps, HeatMapCellProps, HeatMapLegendProps } from "./HeatMap.types";

function defaultColorScale(value: number): string {
  if (value < 20) return "bg-primary/10";
  if (value < 40) return "bg-primary/20";
  if (value < 60) return "bg-primary/35";
  if (value < 80) return "bg-primary/55";
  return "bg-primary/80";
}

function HeatMapCell({ value, row, col, rowLabel, colLabel, colorScale = defaultColorScale, onHover, isHovered }: HeatMapCellProps) {
  const tooltipText = useMemo(() => {
    const parts: string[] = [];
    if (rowLabel) parts.push(rowLabel);
    if (colLabel) parts.push(colLabel);
    parts.push(\`\${value} events\`);
    return parts.join(" · ");
  }, [value, rowLabel, colLabel]);

  return (
    <div role="gridcell" aria-label={tooltipText} tabIndex={0}
      onMouseEnter={() => onHover?.({ row, col })} onMouseLeave={() => onHover?.(null)}
      onFocus={() => onHover?.({ row, col })} onBlur={() => onHover?.(null)}
      className={cn("relative h-9 w-full cursor-pointer rounded-lg transition-all duration-200",
        colorScale(value),
        "hover:scale-110 hover:shadow-md hover:ring-2 hover:ring-primary/30 hover:z-10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-10",
        "active:scale-105",
      )}>
      {isHovered && (
        <div className="pointer-events-none absolute -top-10 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-popover px-3 py-1.5 text-xs font-medium text-popover-foreground shadow-lg">
          {tooltipText}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 h-2 w-2 border-b border-r border-border bg-popover" />
        </div>
      )}
    </div>
  );
}

export function HeatMap({ data, rowLabels, columnLabels, colorScale = defaultColorScale, label, className }: HeatMapProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null);
  const handleHover = useCallback((cell: { row: number; col: number } | null) => setHovered(cell), []);
  const cols = data[0]?.length ?? 0;

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-[360px]">
        {label && <p className="mb-3 text-sm font-medium text-foreground">{label}</p>}
        <div role="grid" aria-label={label || "Heat map"} className="grid gap-1"
          style={{ gridTemplateColumns: rowLabels ? \`48px repeat(\${cols}, minmax(0, 1fr))\` : \`repeat(\${cols}, minmax(0, 1fr))\` }}>
          {columnLabels && (<>{rowLabels && <div />} {columnLabels.map((h) => <div key={h} className="pb-2 text-center text-[11px] font-medium text-muted-foreground">{h}</div>)}</>)}
          {data.map((row, r) => (
            <div key={r} className="contents" style={{ gridTemplateColumns: rowLabels ? \`48px repeat(\${cols}, minmax(0, 1fr))\` : \`repeat(\${cols}, minmax(0, 1fr))\` }}>
              {rowLabels && <div className="flex items-center pr-2 text-[11px] font-medium text-muted-foreground">{rowLabels[r]}</div>}
              {row.map((val, c) => <HeatMapCell key={c} value={val} row={r} col={c} rowLabel={rowLabels?.[r]} colLabel={columnLabels?.[c]} colorScale={colorScale} onHover={handleHover} isHovered={hovered?.row === r && hovered?.col === c} />)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

function generateData(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 100)),
  );
}

const BASIC_SRC = `import { HeatMap } from "@/components/ui/HeatMap";

<HeatMap data={data} />`;

const LABELS_SRC = `import { HeatMap } from "@/components/ui/HeatMap";

<HeatMap
  data={data}
  rowLabels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
  columnLabels={["9am", "10am", "11am", "12pm", "1pm"]}
/>`;

const LEGEND_SRC = `import { HeatMap, HeatMapLegend } from "@/components/ui/HeatMap";

<div>
  <HeatMap data={data} />
  <HeatMapLegend className="mt-3" />
</div>`;

const CUSTOM_COLOR_SRC = `import { HeatMap } from "@/components/ui/HeatMap";

const greenScale = (v: number) => {
  if (v < 20) return "bg-emerald-100 dark:bg-emerald-900/30";
  if (v < 40) return "bg-emerald-200 dark:bg-emerald-800/40";
  if (v < 60) return "bg-emerald-300 dark:bg-emerald-700/50";
  if (v < 80) return "bg-emerald-400 dark:bg-emerald-600/60";
  return "bg-emerald-500 dark:bg-emerald-500/70";
};

<HeatMap data={data} colorScale={greenScale} />`;

const DENSE_SRC = `import { HeatMap } from "@/components/ui/HeatMap";

<HeatMap data={monthlyData} rowLabels={months} columnLabels={days} />`;

export default function HeatMapPage() {
  const [data] = useState(() => generateData(7, 9));
  const [monthlyData] = useState(() => generateData(12, 7));

  const greenScale = useMemo(
    () => (v: number) => {
      if (v < 20) return "bg-emerald-100 dark:bg-emerald-900/30";
      if (v < 40) return "bg-emerald-200 dark:bg-emerald-800/40";
      if (v < 60) return "bg-emerald-300 dark:bg-emerald-700/50";
      if (v < 80) return "bg-emerald-400 dark:bg-emerald-600/60";
      return "bg-emerald-500 dark:bg-emerald-500/70";
    },
    [],
  );

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return (
    <ComponentDocPage
      name="Heat Map"
      category="Data Visualization"
      description="Data heat map visualization with color gradients, tooltips, and responsive sizing for time-based data."
    >
      <PreviewPanel filename="heatmap-preview.tsx">
        <HeatMap
          data={data}
          rowLabels={days}
          columnLabels={hours}
          label="Weekly Activity"
        />
        <HeatMapLegend className="mt-4" />
      </PreviewPanel>

      <SourceCodeViewer
        source={HEATMAP_SOURCE}
        filename="components/ui/HeatMap/HeatMap.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Grid"
          description="Simple heat map without labels."
          code={BASIC_SRC}
          filename="basic.tsx"
        >
          <HeatMap data={data.slice(0, 3).map((r) => r.slice(0, 5))} />
        </ExampleBlock>

        <ExampleBlock
          title="With Labels"
          description="Row and column labels for context."
          code={LABELS_SRC}
          filename="labels.tsx"
        >
          <HeatMap
            data={data.slice(0, 5).map((r) => r.slice(0, 5))}
            rowLabels={days.slice(0, 5)}
            columnLabels={hours.slice(0, 5)}
          />
        </ExampleBlock>

        <ExampleBlock
          title="With Legend"
          description="Color scale legend below the heat map."
          code={LEGEND_SRC}
          filename="legend.tsx"
        >
          <div>
            <HeatMap
              data={data.slice(0, 4).map((r) => r.slice(0, 6))}
              rowLabels={days.slice(0, 4)}
              columnLabels={hours.slice(0, 6)}
            />
            <HeatMapLegend className="mt-4" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Color Scale"
          description="Use a green color scale instead of the default."
          code={CUSTOM_COLOR_SRC}
          filename="custom-color.tsx"
        >
          <HeatMap
            data={data.slice(0, 5).map((r) => r.slice(0, 5))}
            rowLabels={days.slice(0, 5)}
            columnLabels={hours.slice(0, 5)}
            colorScale={greenScale}
          />
        </ExampleBlock>

        <ExampleBlock
          title="Dense Monthly Data"
          description="12-month activity overview with day labels."
          code={DENSE_SRC}
          filename="dense.tsx"
        >
          <HeatMap
            data={monthlyData}
            rowLabels={months}
            columnLabels={days}
            label="Monthly Activity"
          />
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
