"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Undo2, Redo2, History } from "lucide-react";

const installCommand = `npx component-library@latest add undo-history`;
const usageCode = `import { UndoHistory } from "@/components/_undo-history";

<UndoHistory onUndo={handleUndo} onRedo={handleRedo} />`;

function HistoryItem({ action, time, active }: { action: string; time: string; active: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"}`}>
      <span>{action}</span>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}

export default function UndoHistoryPage() {
  const [history, setHistory] = useState([
    { action: "Typed 'Hello World'", time: "2s ago", active: false },
    { action: "Changed color to blue", time: "5s ago", active: false },
    { action: "Added new paragraph", time: "10s ago", active: false },
    { action: "Deleted image", time: "15s ago", active: false },
    { action: "Saved document", time: "20s ago", active: true },
  ]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Undo History</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Track and navigate through edit history with undo/redo controls and action timestamps.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Undo / Redo Buttons</h2>
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <Undo2 className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <Redo2 className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">History List</h2>
        <div className="w-full max-w-sm rounded-lg border border-border p-2">
          <div className="mb-2 flex items-center gap-2 px-2 py-1">
            <History className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Edit History</span>
          </div>
          <div className="flex flex-col gap-0.5">
            {history.map((h, i) => (
              <HistoryItem key={i} {...h} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Keyboard Shortcuts</h2>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Z</kbd>
            <span>Undo</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">Y</kbd>
            <span>Redo</span>
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
                <td className="px-4 py-3 font-mono text-xs">onUndo</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onRedo</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">history</td>
                <td className="px-4 py-3 text-muted-foreground">HistoryEntry[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
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
