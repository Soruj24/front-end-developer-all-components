"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Plus } from "lucide-react";

const installCommand = `npx component-library@latest add board-kanban`;
const usageCode = `import { BoardKanban } from "@/components/ui/board-kanban";

<BoardKanban columns={columns} cards={cards} />`;

export default function BoardKanbanPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Board Kanban</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A kanban board component for task management with drag-and-drop columns and cards.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Kanban Board</h2><p className="mt-1 text-sm text-muted-foreground">A simple kanban layout with columns and cards.</p></div>
        <ComponentPreview id="board-kanban-basic">
          <div className="w-full p-4 overflow-x-auto">
            <div className="flex gap-4 min-w-[600px]">
              {[
                { title: "To Do", count: 3, color: "bg-blue-500", items: ["Design mockups", "Write docs", "Setup CI"] },
                { title: "In Progress", count: 2, color: "bg-yellow-500", items: ["Build components", "API integration"] },
                { title: "Done", count: 1, color: "bg-green-500", items: ["Project setup"] },
              ].map((col) => (
                <div key={col.title} className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                    <span className="text-sm font-medium">{col.title}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{col.count}</span>
                  </div>
                  <div className="space-y-2">
                    {col.items.map((item) => (
                      <div key={item} className="rounded-lg border border-border bg-card p-3 text-sm">{item}</div>
                    ))}
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground p-2 w-full"><Plus className="h-3 w-3" /> Add card</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Cards with Tags</h2><p className="mt-1 text-sm text-muted-foreground">Kanban cards with priority tags and avatars.</p></div>
        <ComponentPreview id="board-kanban-tags">
          <div className="w-full p-4">
            <div className="flex gap-4 min-w-[400px]">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-3"><div className="h-2.5 w-2.5 rounded-full bg-red-500" /><span className="text-sm font-medium">High Priority</span></div>
                <div className="space-y-2">
                  {[{ title: "Fix login bug", tag: "Bug", color: "bg-red-100 text-red-700" }, { title: "Update API", tag: "Feature", color: "bg-blue-100 text-blue-700" }].map((c) => (
                    <div key={c.title} className="rounded-lg border border-border bg-card p-3">
                      <p className="text-sm font-medium">{c.title}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${c.color}`}>{c.tag}</span>
                        <div className="h-5 w-5 rounded-full bg-primary/10 ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Compact View</h2><p className="mt-1 text-sm text-muted-foreground">A compact kanban board for smaller spaces.</p></div>
        <ComponentPreview id="board-kanban-compact">
          <div className="w-full p-4">
            <div className="grid grid-cols-4 gap-3">
              {["Backlog", "To Do", "In Progress", "Review"].map((col) => (
                <div key={col}>
                  <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">{col}</p>
                  <div className="space-y-1.5">
                    {[1, 2].map((n) => (
                      <div key={n} className="rounded border border-border bg-card px-2.5 py-1.5 text-xs">{col} task {n}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
