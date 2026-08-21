"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DRAG_HANDLE_SOURCE } from "./drag-handle-source";
import {
  DefaultListDemo,
  HorizontalDemo,
  SizesDemo,
  SortableListDemo,
  GridDemo,
  VariantsDemo,
  TaskCardDemo,
  DisabledDemo,
} from "./drag-handle-demos";

const CODE = {
  basic: '<DragItem>\n  <span className="text-sm">Inbox</span>\n</DragItem>\n<DragItem>\n  <span className="text-sm">Drafts</span>\n</DragItem>',
  horizontal: '<div className="flex gap-2">\n  {["Mon", "Tue", "Wed"].map((day) => (\n    <div className="flex flex-col items-center gap-1.5 rounded-xl border p-3">\n      <DragHandle variant="horizontal" />\n      <span className="text-xs font-medium">{day}</span>\n    </div>\n  ))}\n</div>',
  sizes: '<DragItem size="sm"><span>Small</span></DragItem>\n<DragItem size="md"><span>Medium</span></DragItem>\n<DragItem size="lg"><span>Large</span></DragItem>',
  sortable: '<div className="flex flex-col gap-1.5">\n  {items.map((item, i) => (\n    <div className="flex items-center gap-2.5 rounded-xl border p-3">\n      <DragHandle />\n      <span className="flex-1 text-sm">{item}</span>\n      <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px]">#{i+1}</span>\n    </div>\n  ))}\n</div>',
  grid: '<div className="grid grid-cols-3 gap-2">\n  {items.map((item) => (\n    <div className="flex flex-col items-center gap-2.5 rounded-xl border p-4">\n      <DragHandle variant="grid" />\n      <div className="h-10 w-10 rounded-lg bg-muted">...</div>\n    </div>\n  ))}\n</div>',
  variants: '<DragItem variant="vertical"><span>Vertical</span></DragItem>\n<DragItem variant="horizontal"><span>Horizontal</span></DragItem>\n<DragItem variant="dots"><span>Dots</span></DragItem>\n<DragItem variant="arrows"><span>Arrows</span></DragItem>\n<DragItem variant="grid"><span>Grid</span></DragItem>',
  taskCard: '<div className="w-full max-w-sm rounded-xl border p-3.5">\n  <div className="flex items-start gap-2.5">\n    <DragHandle className="mt-0.5" />\n    <div className="flex-1">\n      <p className="text-sm font-medium">Implement auth flow</p>\n      <p className="text-xs text-muted-foreground">Add OAuth2...</p>\n    </div>\n  </div>\n</div>',
  disabled: '<DragItem><span>Normal item</span></DragItem>\n<DragItem disabled><span>Disabled (cannot drag)</span></DragItem>',
};

export default function DragHandlePage() {
  return (
    <ComponentDocPage
      name="Drag Handle"
      category="Interactive"
      description="A draggable grip handle for reordering items in lists, grids, or sortable containers. Provides a visual affordance indicating that an element can be moved."
    >
      <PreviewPanel filename="drag-handle.tsx">
        <DefaultListDemo />
      </PreviewPanel>

      <SourceCodeViewer source={DRAG_HANDLE_SOURCE} filename="components/ui/DragHandle/DragHandle.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Default List" description="Standard vertical grip handles for list items." code={CODE.basic}>
          <DefaultListDemo />
        </ExampleBlock>

        <ExampleBlock title="Horizontal Grip" description="Horizontal grip for dragging items side-to-side." code={CODE.horizontal}>
          <HorizontalDemo />
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Small, medium, and large handle sizes." code={CODE.sizes}>
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock title="Sortable List" description="Full sortable list with numbered items and drag handles." code={CODE.sortable}>
          <SortableListDemo />
        </ExampleBlock>

        <ExampleBlock title="Grid Layout" description="Draggable items in a grid with centered handles." code={CODE.grid}>
          <GridDemo />
        </ExampleBlock>

        <ExampleBlock title="Grip Variants" description="Different handle icon styles." code={CODE.variants}>
          <VariantsDemo />
        </ExampleBlock>

        <ExampleBlock title="Task Board Card" description="Drag handle used in a kanban-style task card." code={CODE.taskCard}>
          <TaskCardDemo />
        </ExampleBlock>

        <ExampleBlock title="Disabled State" description="Items can be disabled to prevent dragging." code={CODE.disabled}>
          <DisabledDemo />
        </ExampleBlock>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot; | &quot;dots&quot; | &quot;arrows&quot; | &quot;grid&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3">Handle icon style</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">Handle size</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Drag handle&quot;</td>
                <td className="px-4 py-3">Accessibility label</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Prevent dragging</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">DragItem Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">DragHandleVariant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3">Pass-through to DragHandle</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">DragHandleSize</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">Pass-through to DragHandle</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Disables handle + dims item</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
