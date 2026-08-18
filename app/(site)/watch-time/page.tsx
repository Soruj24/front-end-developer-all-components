"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock, Timer, Hourglass } from "lucide-react";

const installCommand = `npx component-library@latest add watch-time`;
const usageCode = `import { WatchTime } from "@/components/_watch-time";

<WatchTime value={125} format="mm:ss" />`;

function CountdownDisplay({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  return (
    <div className="flex items-center gap-2">
      {[
        { val: hours, label: "H" },
        { val: minutes, label: "M" },
        { val: seconds, label: "S" },
      ].map((u, i) => (
        <div key={u.label} className="flex items-baseline gap-1">
          {i > 0 && <span className="text-2xl font-light text-muted-foreground">:</span>}
          <div className="flex h-16 w-14 flex-col items-center justify-center rounded-lg border border-border bg-muted/30">
            <span className="text-2xl font-bold tabular-nums">{String(u.val).padStart(2, "0")}</span>
            <span className="text-[10px] text-muted-foreground">{u.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StopwatchLap({ lap, time }: { lap: number; time: string }) {
  return (
    <div className="flex items-center justify-between rounded-md px-3 py-1.5 text-sm">
      <span className="text-muted-foreground">Lap {lap}</span>
      <span className="font-mono">{time}</span>
    </div>
  );
}

export default function WatchTimePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Watch Time</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Time displays with countdown, stopwatch, and elapsed time tracking.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Countdown</h2>
        <CountdownDisplay hours={2} minutes={34} seconds={56} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Stopwatch Laps</h2>
        <div className="rounded-lg border border-border p-2">
          <StopwatchLap lap={1} time="0:12.34" />
          <StopwatchLap lap={2} time="0:25.67" />
          <StopwatchLap lap={3} time="0:38.91" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Timer Icons</h2>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <Clock className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Clock</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Timer className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Timer</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Hourglass className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Hourglass</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">format</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;mm:ss&quot; | &quot;hh:mm:ss&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;mm:ss&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
