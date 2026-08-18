"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add heat-map";

const usageCode = `import { HeatMap } from "@/components/ui";

export default function Example() {
  return <HeatMap data={heatmapData} />;
}`;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"];

function generateData() {
  return days.map(() => hours.map(() => Math.floor(Math.random() * 100)));
}

function getColor(val: number) {
  if (val < 20) return "bg-primary/10";
  if (val < 40) return "bg-primary/25";
  if (val < 60) return "bg-primary/40";
  if (val < 80) return "bg-primary/60";
  return "bg-primary/80";
}

export default function HeatMapPage() {
  const [data] = useState(generateData);
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Heat Map</h1>
          <Badge variant="primary">Data Viz</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Data heat map visualization with color gradients, tooltips, and responsive sizing for time-based data.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Weekly Activity</h3>
          <ComponentPreview id="heat-map-default">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[400px]">
                <div className="mb-1 grid gap-1" style={{ gridTemplateColumns: `40px repeat(${hours.length}, 1fr)` }}>
                  <div />
                  {hours.map((h) => <div key={h} className="text-center text-[10px] text-muted-foreground">{h}</div>)}
                </div>
                {days.map((day, r) => (
                  <div key={day} className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${hours.length}, 1fr)` }}>
                    <div className="flex items-center text-[10px] text-muted-foreground">{day}</div>
                    {data[r].map((val, c) => (
                      <div key={c} className={`h-8 rounded-sm ${getColor(val)} transition-colors hover:ring-2 hover:ring-primary/50`} onMouseEnter={() => setHovered({ r, c })} onMouseLeave={() => setHovered(null)}>
                        {hovered?.r === r && hovered?.c === c && (
                          <div className="relative">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-0.5 text-[10px] text-background whitespace-nowrap">{val} events</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Legend</h3>
          <ComponentPreview id="heat-map-legend">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Less</span>
              {[10, 30, 50, 70, 90].map((v) => <div key={v} className={`h-4 w-4 rounded-sm ${getColor(v)}`} />)}
              <span className="text-xs text-muted-foreground">More</span>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive Grid</h3>
          <ComponentPreview id="heat-map-interactive">
            <Card className="w-full max-w-md">
              <CardContent className="p-3">
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const val = Math.floor(Math.random() * 100);
                    return <div key={i} className={`h-6 rounded-sm ${getColor(val)} cursor-pointer hover:ring-2 hover:ring-primary/50`} title={`${val}%`} />;
                  })}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">data</td>
                <td className="px-4 py-3 text-muted-foreground">number[][]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}