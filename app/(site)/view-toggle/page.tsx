"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { LayoutGrid, List, Rows3 } from "lucide-react";

const installCommand = `npx component-library@latest add view-toggle`;
const usageCode = `import { ViewToggle } from "@/components/_view-toggle";

<ViewToggle value={view} onChange={setView} />`;

function ToggleButton({ icon: Icon, label, active, onClick }: { icon: React.ElementType; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default function ViewTogglePage() {
  const [view, setView] = useState<"grid" | "list" | "rows">("grid");
  const items = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">View Toggle</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Switch between grid, list, and row view layouts with animated toggle controls.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Toggle Buttons</h2>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <ToggleButton icon={LayoutGrid} label="Grid" active={view === "grid"} onClick={() => setView("grid")} />
          <ToggleButton icon={List} label="List" active={view === "list"} onClick={() => setView("list")} />
          <ToggleButton icon={Rows3} label="Rows" active={view === "rows"} onClick={() => setView("rows")} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2>
        <div className={view === "grid" ? "grid grid-cols-3 gap-2" : view === "list" ? "flex flex-col gap-2" : "flex flex-col gap-1"}>
          {items.map((item) => (
            <div key={item.id} className={`rounded-lg border border-border p-3 text-sm ${view === "rows" ? "flex items-center gap-3" : ""}`}>
              {view === "rows" && <div className="h-6 w-6 rounded bg-muted" />}
              {item.name}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Only</h2>
        <div className="flex items-center gap-1 rounded-lg border border-border p-1">
          <button className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
            <List className="h-4 w-4" />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted">
            <Rows3 className="h-4 w-4" />
          </button>
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
                <td className="px-4 py-3 text-muted-foreground">&quot;grid&quot; | &quot;list&quot; | &quot;rows&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;grid&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
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
