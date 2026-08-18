"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock, ChevronUp, ChevronDown } from "lucide-react";

const installCommand = `npx component-library@latest add time-picker`;

const usageCode = `import { TimePicker } from "@/components/ui";

<TimePicker
  value={time}
  onChange={setTime}
  format="24h"
/>`;

function Spinner({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
  const next = () => onChange(value >= max ? min : value + 1);
  const prev = () => onChange(value <= min ? max : value - 1);
  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={next} className="rounded p-0.5 hover:bg-muted"><ChevronUp className="h-4 w-4" /></button>
      <span className="w-10 text-center font-mono text-lg tabular-nums">{String(value).padStart(2, "0")}</span>
      <button onClick={prev} className="rounded p-0.5 hover:bg-muted"><ChevronDown className="h-4 w-4" /></button>
    </div>
  );
}

function BasicTimeDemo() {
  const [time, setTime] = useState({ h: 14, m: 30 });
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-center gap-1 rounded-xl border border-border bg-background p-4">
        <Spinner value={time.h} min={0} max={23} onChange={(h) => setTime({ ...time, h })} />
        <span className="text-2xl font-bold">:</span>
        <Spinner value={time.m} min={0} max={59} onChange={(m) => setTime({ ...time, m })} />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {String(time.h).padStart(2, "0")}:{String(time.m).padStart(2, "0")}
      </p>
    </div>
  );
}

function TwelveHourDemo() {
  const [time, setTime] = useState({ h: 9, m: 15, period: "AM" as "AM" | "PM" });
  const togglePeriod = () => setTime({ ...time, period: time.period === "AM" ? "PM" : "AM" });

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-background p-4">
        <Spinner value={time.h} min={1} max={12} onChange={(h) => setTime({ ...time, h })} />
        <span className="text-2xl font-bold">:</span>
        <Spinner value={time.m} min={0} max={59} onChange={(m) => setTime({ ...time, m })} />
        <button onClick={togglePeriod}
          className="ml-2 rounded-lg bg-primary px-3 py-2 text-sm font-bold text-primary-foreground">
          {time.period}
        </button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {time.h}:{String(time.m).padStart(2, "0")} {time.period}
      </p>
    </div>
  );
}

function WithSecondsDemo() {
  const [time, setTime] = useState({ h: 16, m: 45, s: 30 });
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center justify-center gap-1 rounded-xl border border-border bg-background p-4">
        <Spinner value={time.h} min={0} max={23} onChange={(h) => setTime({ ...time, h })} />
        <span className="text-2xl font-bold">:</span>
        <Spinner value={time.m} min={0} max={59} onChange={(m) => setTime({ ...time, m })} />
        <span className="text-2xl font-bold">:</span>
        <Spinner value={time.s} min={0} max={59} onChange={(s) => setTime({ ...time, s })} />
      </div>
      <p className="text-center text-sm text-muted-foreground font-mono">
        {String(time.h).padStart(2, "0")}:{String(time.m).padStart(2, "0")}:{String(time.s).padStart(2, "0")}
      </p>
    </div>
  );
}

export default function TimePickerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Time Picker</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A time selection component with spinner controls. Supports 12h/24h formats and optional seconds display.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Time</h2>
          <p className="mt-1 text-sm text-muted-foreground">24-hour time picker with hours and minutes.</p>
        </div>
        <ComponentPreview id="time-picker-basic">
          <BasicTimeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">12h / 24h</h2>
          <p className="mt-1 text-sm text-muted-foreground">12-hour format with AM/PM toggle.</p>
        </div>
        <ComponentPreview id="time-picker-12h">
          <TwelveHourDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Seconds</h2>
          <p className="mt-1 text-sm text-muted-foreground">Time picker that includes seconds precision.</p>
        </div>
        <ComponentPreview id="time-picker-seconds">
          <WithSecondsDemo />
        </ComponentPreview>
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
                <td className="px-4 py-3 text-muted-foreground">{`{ h: number; m: number; s?: number }`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: TimeValue) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">format</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;12h&quot; | &quot;24h&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;24h&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSeconds</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
