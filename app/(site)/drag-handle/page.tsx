"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { GripVertical, GripHorizontal, MoreVertical, ArrowUpDown, Move } from "lucide-react";

const installCommand = `npx component-library@latest add drag-handle`;

const usageCode = `import { GripVertical } from "lucide-react";

function DragHandle() {
  return (
    <button className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground">
      <GripVertical className="h-4 w-4" />
    </button>
  );
}

// Usage in a sortable list
{items.map((item) => (
  <div key={item.id} className="flex items-center gap-2">
    <DragHandle />
    <span>{item.label}</span>
  </div>
))}`;

function DragHandleItem({
  children,
  variant = "vertical",
  size = "md",
}: {
  children: React.ReactNode;
  variant?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5";
  const isVertical = variant === "vertical";
  const Icon = variant === "grip" ? GripHorizontal : variant === "dots" ? MoreVertical : variant === "arrows" ? ArrowUpDown : isVertical ? GripVertical : GripHorizontal;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
      <button className="cursor-grab text-muted-foreground/60 transition-colors hover:text-foreground active:cursor-grabbing">
        <Icon className={sizeClass} />
      </button>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SortableList() {
  const [items, setItems] = useState(["Design system", "Components", "Documentation", "Testing", "Deployment"]);

  return (
    <div className="flex w-full flex-col gap-1">
      {items.map((item, i) => (
        <div key={item} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5 transition-colors hover:bg-muted/50">
          <button className="cursor-grab text-muted-foreground/60 transition-colors hover:text-foreground active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </button>
          <span className="flex-1 text-sm">{item}</span>
          <span className="text-xs text-muted-foreground">#{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function DragGrid() {
  const items = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` }));

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2 rounded-lg border border-border p-4">
          <button className="cursor-grab text-muted-foreground/60 transition-colors hover:text-foreground active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-xs font-medium">
            {item.id}
          </div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DragHandlePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Drag Handle</h1>
          <Badge variant="primary">Interactive</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A draggable grip handle for reordering items in lists, grids, or sortable containers. Provides a visual affordance indicating that an element can be moved.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default (Vertical Grip)</h2>
          <p className="mt-1 text-sm text-muted-foreground">Standard vertical grip handle for list items.</p>
        </div>
        <ComponentPreview id="drag-default">
          <div className="flex w-full flex-col gap-1">
            {["Inbox", "Drafts", "Sent", "Spam", "Trash"].map((item) => (
              <DragHandleItem key={item}>
                <span className="text-sm">{item}</span>
              </DragHandleItem>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Grip</h2>
          <p className="mt-1 text-sm text-muted-foreground">Horizontal grip for dragging items side-to-side.</p>
        </div>
        <ComponentPreview id="drag-horizontal">
          <div className="flex w-full gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <div key={day} className="flex flex-col items-center gap-1 rounded-lg border border-border px-3 py-2">
                <button className="cursor-grab text-muted-foreground/60 active:cursor-grabbing">
                  <GripHorizontal className="h-4 w-4" />
                </button>
                <span className="text-xs font-medium">{day}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Small, medium, and large handle sizes.</p>
        </div>
        <ComponentPreview id="drag-sizes">
          <div className="flex flex-col gap-2">
            <DragHandleItem size="sm"><span className="text-xs">Small handle</span></DragHandleItem>
            <DragHandleItem size="md"><span className="text-sm">Medium handle</span></DragHandleItem>
            <DragHandleItem size="lg"><span className="text-base">Large handle</span></DragHandleItem>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sortable List</h2>
          <p className="mt-1 text-sm text-muted-foreground">Full sortable list with numbered items and drag handles.</p>
        </div>
        <ComponentPreview id="drag-sortable-list">
          <SortableList />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Grid Layout</h2>
          <p className="mt-1 text-sm text-muted-foreground">Draggable items in a grid with centered handles.</p>
        </div>
        <ComponentPreview id="drag-grid">
          <DragGrid />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Grip Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different handle icon styles.</p>
        </div>
        <ComponentPreview id="drag-variants">
          <div className="flex flex-col gap-2">
            {[
              { variant: "vertical", label: "Vertical Grip" },
              { variant: "horizontal", label: "Horizontal Grip" },
              { variant: "dots", label: "Dots" },
              { variant: "arrows", label: "Arrows" },
            ].map((v) => (
              <DragHandleItem key={v.variant} variant={v.variant}>
                <span className="text-sm">{v.label}</span>
              </DragHandleItem>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Task Board Card</h2>
          <p className="mt-1 text-sm text-muted-foreground">Drag handle used in a kanban-style task card.</p>
        </div>
        <ComponentPreview id="drag-task-card">
          <div className="w-full max-w-xs rounded-lg border border-border p-3">
            <div className="flex items-start gap-2">
              <button className="mt-0.5 cursor-grab text-muted-foreground/60 active:cursor-grabbing">
                <GripVertical className="h-4 w-4" />
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium">Implement auth flow</p>
                <p className="mt-1 text-xs text-muted-foreground">Add OAuth2 and session management</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Frontend</span>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">Medium</span>
                </div>
              </div>
            </div>
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"vertical" | "horizontal" | "dots" | "arrows"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"vertical"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"sm" | "md" | "lg"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"md"`}'}</td>
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
