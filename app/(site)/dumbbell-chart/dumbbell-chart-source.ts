export const DUMBBELL_CHART_SOURCE = `"use client";

import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

export interface DumbbellData {
  label: string;
  start: number;
  end: number;
}

interface DumbbellChartProps {
  data: DumbbellData[];
  max?: number;
  color?: string;
  showValues?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const fmt = (n: number) => \`\${Math.round(n * 10) / 10}\`;

function TrendIcon({ delta }: { delta: number }) {
  return delta >= 0 ? (
    <TrendingUp className="h-3 w-3" aria-hidden="true" />
  ) : (
    <TrendingDown className="h-3 w-3" aria-hidden="true" />
  );
}

export function DumbbellChart({
  data,
  max = 100,
  color = "bg-primary",
  showValues = true,
  orientation = "horizontal",
  className = "",
}: DumbbellChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (orientation === "vertical") {
    return (
      <div role="list" aria-label="Dumbbell chart" className={\`flex items-end justify-around gap-2 sm:gap-3 \${className}\`}>
        {data.map((d, i) => {
          const startPct = (Math.min(d.start, d.end) / max) * 100;
          const height = ((Math.max(d.start, d.end) - Math.min(d.start, d.end)) / max) * 100;
          const delta = d.end - d.start;
          return (
            <div
              key={d.label}
              role="listitem"
              tabIndex={0}
              aria-label={\`\${d.label}: from \${fmt(d.start)} to \${fmt(d.end)}, change \${fmt(delta)}\`}
              style={{ transitionDelay: \`\${i * 40}ms\` }}
              className="group flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-lg px-1 py-1.5 transition-colors duration-150 ease-out hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {showValues && (
                <span className="font-mono text-[11px] font-semibold tabular-nums">{fmt(d.end)}</span>
              )}
              <div className="relative h-40 w-full max-w-6 sm:h-44">
                <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                <div
                  aria-hidden="true"
                  className={\`absolute left-1/2 w-1.5 origin-bottom rounded-full transition-all duration-700 ease-out group-hover:opacity-50 \${color}\`}
                  style={{
                    bottom: \`\${startPct}%\`,
                    height: mounted ? \`\${height}%\` : "0%",
                    opacity: mounted ? 0.3 : 0,
                    transform: "translateX(-50%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-muted-foreground shadow-xs transition-transform duration-200 ease-out group-hover:scale-125"
                  style={{ bottom: \`calc(\${(d.start / max) * 100}% - 6px)\` }}
                />
                <div
                  aria-hidden="true"
                  className={\`absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background shadow-sm ring-1 ring-black/5 transition-all delay-300 duration-500 ease-out group-hover:scale-125 dark:ring-white/10 \${color}\`}
                  style={{
                    bottom: \`calc(\${(d.end / max) * 100}% - 6px)\`,
                    opacity: mounted ? 1 : 0,
                  }}
                />
              </div>
              <span className="max-w-full truncate text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {d.label}
              </span>
              {showValues && (
                <span
                  className={\`inline-flex items-center gap-0.5 text-[11px] font-bold tabular-nums \${
                    delta >= 0 ? "text-success" : "text-danger"
                  }\`}
                >
                  <TrendIcon delta={delta} />
                  {fmt(delta)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div role="list" aria-label="Dumbbell chart" className={\`flex flex-col gap-1 \${className}\`}>
      {data.map((d, i) => {
        const left = (Math.min(d.start, d.end) / max) * 100;
        const width = ((Math.max(d.start, d.end) - Math.min(d.start, d.end)) / max) * 100;
        const delta = d.end - d.start;
        return (
          <div
            key={d.label}
            role="listitem"
            tabIndex={0}
            aria-label={\`\${d.label}: from \${fmt(d.start)} to \${fmt(d.end)}, change \${fmt(delta)}\`}
            style={{ transitionDelay: \`\${i * 40}ms\` }}
            className="group -mx-2 flex items-center gap-3 rounded-lg px-2 py-1.5 transition-colors duration-150 ease-out hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="w-20 shrink-0 truncate text-right text-xs font-medium text-foreground/80 sm:w-28">
              {d.label}
            </span>
            <div className="relative h-6 min-w-0 flex-1">
              <div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
              <div
                aria-hidden="true"
                className={\`absolute top-1/2 h-1.5 origin-left rounded-full transition-all duration-700 ease-out group-hover:opacity-50 \${color}\`}
                style={{
                  left: \`\${left}%\`,
                  width: mounted ? \`\${width}%\` : "0%",
                  opacity: mounted ? 0.3 : 0,
                  transform: "translateY(-50%)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background bg-muted-foreground shadow-xs transition-transform duration-200 ease-out group-hover:scale-125"
                style={{ left: \`calc(\${(d.start / max) * 100}% - 6px)\` }}
              />
              <div
                aria-hidden="true"
                className={\`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-background shadow-sm ring-1 ring-black/5 transition-all delay-300 duration-500 ease-out group-hover:scale-125 dark:ring-white/10 \${color}\`}
                style={{
                  left: \`calc(\${(d.end / max) * 100}% - 6px)\`,
                  opacity: mounted ? 1 : 0,
                }}
              />
            </div>
            {showValues && (
              <span
                className={\`inline-flex shrink-0 items-center gap-1 font-mono text-xs tabular-nums \${
                  delta >= 0 ? "text-success" : "text-danger"
                }\`}
              >
                <TrendIcon delta={delta} />
                {fmt(d.start)} → {fmt(d.end)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}`;
