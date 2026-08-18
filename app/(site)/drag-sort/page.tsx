"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { GripVertical } from "lucide-react";

const installCommand = `npx component-library@latest add drag-sort`;
const usageCode = `import { DragSort } from "@/components/ui/drag-sort";

<DragSort items={items} onReorder={setItems} />`;

export default function DragSortPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Drag Sort</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A drag-and-drop sortable list component for reordering items with visual feedback and smooth animations.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Sortable List</h2><p className="mt-1 text-sm text-muted-foreground">Items with drag handles for reordering.</p></div>
        <ComponentPreview id="drag-sort-basic">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-2">
              {["Design mockups", "Write documentation", "Build components", "Deploy to production"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab hover:bg-muted/50 transition-colors">
                  <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">{i + 1}</div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Card Grid Sort</h2><p className="mt-1 text-sm text-muted-foreground">Sortable cards in a grid layout.</p></div>
        <ComponentPreview id="drag-sort-grid">
          <div className="w-full p-4">
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {["Widget A", "Widget B", "Widget C", "Widget D", "Widget E", "Widget F"].map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-card p-4 text-center cursor-grab hover:bg-muted/50 transition-colors">
                  <GripVertical className="h-4 w-4 mx-auto text-muted-foreground mb-2" />
                  <span className="text-xs font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Priority List</h2><p className="mt-1 text-sm text-muted-foreground">Sortable priority list with color indicators.</p></div>
        <ComponentPreview id="drag-sort-priority">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-2">
              {[
                { text: "Critical: Fix login bug", color: "bg-red-500" },
                { text: "High: Update API docs", color: "bg-orange-500" },
                { text: "Medium: Refactor utils", color: "bg-yellow-500" },
                { text: "Low: Update readme", color: "bg-green-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 cursor-grab">
                  <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className={`h-3 w-3 rounded-full ${item.color} shrink-0`} />
                  <span className="text-sm">{item.text}</span>
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
