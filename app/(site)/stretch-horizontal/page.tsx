"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { StretchHorizontal, Columns, PanelLeft, PanelRight, ArrowLeftRight, Maximize2, Layout } from "lucide-react";

const installCommand = `npx component-library@latest add stretch-horizontal`;
const usageCode = `<FlexRow gap={4} align="center"><div>Item 1</div><div>Item 2</div></FlexRow>`;

function FlexRow() {
  const [gap, setGap] = useState(4);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Flex Row</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Gap: {gap}px</span>
          <input type="range" min={0} max={16} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-24" />
        </div>
      </div>
      <div className="flex items-center" style={{ gap: `${gap * 4}px` }}>
        {["First", "Second", "Third"].map((item) => (
          <div key={item} className="rounded-md bg-primary/10 px-4 py-3 text-sm font-medium text-primary">{item}</div>
        ))}
      </div>
    </div>
  );
}

function EqualColumns() {
  const [count, setCount] = useState(3);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Equal Columns</h3>
        <div className="flex gap-1">
          {[2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`rounded px-2 py-1 text-xs font-medium ${
                count === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-md border bg-muted/50 p-4 text-center text-sm text-foreground">
            Column {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function AutoFit() {
  const [minWidth, setMinWidth] = useState(150);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Auto Fit</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Min: {minWidth}px</span>
          <input type="range" min={80} max={250} value={minWidth} onChange={(e) => setMinWidth(Number(e.target.value))} className="w-24" />
        </div>
      </div>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))` }}>
        {["Alpha", "Beta", "Gamma", "Delta", "Epsilon"].map((item) => (
          <div key={item} className="rounded-md bg-primary/10 p-3 text-center text-sm font-medium text-primary">{item}</div>
        ))}
      </div>
    </div>
  );
}

function GapControl() {
  const [rowGap, setRowGap] = useState(8);
  const [colGap, setColGap] = useState(8);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <h3 className="font-medium text-foreground">Gap Control</h3>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Row: {rowGap}px</span>
          <input type="range" min={0} max={24} value={rowGap} onChange={(e) => setRowGap(Number(e.target.value))} className="w-20" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Col: {colGap}px</span>
          <input type="range" min={0} max={24} value={colGap} onChange={(e) => setColGap(Number(e.target.value))} className="w-20" />
        </div>
      </div>
      <div className="grid grid-cols-3" style={{ gap: `${rowGap}px ${colGap}px` }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-md bg-primary/10 p-4 text-center text-sm font-medium text-primary">Cell {i + 1}</div>
        ))}
      </div>
    </div>
  );
}

function ResponsiveRow() {
  const [breakpoint, setBreakpoint] = useState("md");
  const cols = { sm: 1, md: 2, lg: 3 };
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Responsive Row</h3>
        <div className="flex gap-1">
          {["sm", "md", "lg"].map((bp) => (
            <button
              key={bp}
              onClick={() => setBreakpoint(bp)}
              className={`rounded px-2 py-1 text-xs font-medium ${
                breakpoint === bp ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {bp.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cols[breakpoint] }).map((_, i) => (
          <div key={i} className="rounded-md border bg-muted/50 p-4 text-center text-sm text-foreground">
            Item {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function SplitView() {
  const [split, setSplit] = useState(50);
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Split View</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{split}% / {100 - split}%</span>
          <input type="range" min={20} max={80} value={split} onChange={(e) => setSplit(Number(e.target.value))} className="w-24" />
        </div>
      </div>
      <div className="flex gap-2" style={{ height: "120px" }}>
        <div className="flex items-center justify-center rounded-md bg-primary/10 text-sm font-medium text-primary" style={{ width: `${split}%` }}>
          Left Panel
        </div>
        <div className="flex items-center justify-center rounded-md bg-muted/50 text-sm text-muted-foreground" style={{ width: `${100 - split}%` }}>
          Right Panel
        </div>
      </div>
    </div>
  );
}

function ContentStretch() {
  const [stretch, setStretch] = useState(true);
  const items = ["Fixed Width", "Stretch to Fit", "Fixed End"];
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">Content Stretch</h3>
        <button
          onClick={() => setStretch(!stretch)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            stretch ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {stretch ? "Stretching" : "Fixed"}
        </button>
      </div>
      <div className="flex gap-2">
        <div className="flex h-12 w-24 items-center justify-center rounded-md bg-muted/50 text-xs text-muted-foreground">{items[0]}</div>
        <div className={`flex h-12 items-center justify-center rounded-md bg-primary/10 px-4 text-xs font-medium text-primary ${
          stretch ? "flex-1" : "w-32"
        }`}>
          {items[1]}
        </div>
        <div className="flex h-12 w-24 items-center justify-center rounded-md bg-muted/50 text-xs text-muted-foreground">{items[2]}</div>
      </div>
    </div>
  );
}

export default function StretchHorizontalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stretch Horizontal</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A layout component for creating flexible horizontal arrangements with stretch, gap control, split views, and responsive column grids.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flex Row</h2>
        <ComponentPreview component="StretchHorizontalFlex" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Equal Columns</h2>
        <ComponentPreview component="StretchHorizontalColumns" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Auto Fit</h2>
        <ComponentPreview component="StretchHorizontalAuto" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Gap Control</h2>
        <ComponentPreview component="StretchHorizontalGap" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Responsive Row</h2>
        <ComponentPreview component="StretchHorizontalResponsive" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Split View</h2>
        <ComponentPreview component="StretchHorizontalSplit" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Content Stretch</h2>
        <ComponentPreview component="StretchHorizontalContent" />
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">direction</td><td className="px-4 py-3 text-muted-foreground">{'"row" | "col"'}</td><td className="px-4 py-3 text-muted-foreground">{'"row"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">gap</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">4</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">align</td><td className="px-4 py-3 text-muted-foreground">{'"start" | "center" | "end" | "stretch"'}</td><td className="px-4 py-3 text-muted-foreground">{'"stretch"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">justify</td><td className="px-4 py-3 text-muted-foreground">{'"start" | "center" | "end" | "between"'}</td><td className="px-4 py-3 text-muted-foreground">{'"start"'}</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">wrap</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">stretch</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr><tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
