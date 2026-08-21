"use client";

import { useState } from "react";
import { DragHandle, DragItem } from "@/components/ui/DragHandle";

function DefaultListDemo() {
  const items = ["Inbox", "Drafts", "Sent", "Spam", "Trash"];
  return (
    <div className="flex w-full flex-col gap-1.5">
      {items.map((item) => (
        <DragItem key={item}>
          <span className="text-sm">{item}</span>
        </DragItem>
      ))}
    </div>
  );
}

function HorizontalDemo() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  return (
    <div className="flex w-full gap-2">
      {days.map((day) => (
        <div key={day} className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-background px-3 py-2.5 shadow-sm">
          <DragHandle variant="horizontal" />
          <span className="text-xs font-medium">{day}</span>
        </div>
      ))}
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex flex-col gap-2">
      <DragItem size="sm"><span className="text-xs">Small handle</span></DragItem>
      <DragItem size="md"><span className="text-sm">Medium handle</span></DragItem>
      <DragItem size="lg"><span className="text-base">Large handle</span></DragItem>
    </div>
  );
}

function SortableListDemo() {
  const [items, setItems] = useState(["Design system", "Components", "Documentation", "Testing", "Deployment"]);
  return (
    <div className="flex w-full flex-col gap-1.5">
      {items.map((item, i) => (
        <div
          key={item}
          className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-background px-3 py-2.5 shadow-sm transition-all duration-150 hover:border-border hover:shadow-md"
        >
          <DragHandle />
          <span className="flex-1 text-sm">{item}</span>
          <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">#{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function GridDemo() {
  const items = Array.from({ length: 6 }, (_, i) => ({ id: i + 1, label: `Item ${i + 1}` }));
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col items-center gap-2.5 rounded-xl border border-border/60 bg-background p-4 shadow-sm transition-all duration-150 hover:border-border hover:shadow-md">
          <DragHandle variant="grid" />
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-xs font-medium">
            {item.id}
          </div>
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function VariantsDemo() {
  const variants = [
    { variant: "vertical" as const, label: "Vertical Grip" },
    { variant: "horizontal" as const, label: "Horizontal Grip" },
    { variant: "dots" as const, label: "Dots" },
    { variant: "arrows" as const, label: "Arrows" },
    { variant: "grid" as const, label: "Grid" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {variants.map((v) => (
        <DragItem key={v.variant} variant={v.variant}>
          <span className="text-sm">{v.label}</span>
        </DragItem>
      ))}
    </div>
  );
}

function TaskCardDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border/60 bg-background p-3.5 shadow-sm">
      <div className="flex items-start gap-2.5">
        <DragHandle className="mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium">Implement auth flow</p>
          <p className="mt-1 text-xs text-muted-foreground">Add OAuth2 and session management</p>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-600 dark:text-blue-400">Frontend</span>
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisabledDemo() {
  return (
    <div className="flex flex-col gap-2">
      <DragItem><span className="text-sm">Normal item</span></DragItem>
      <DragItem disabled><span className="text-sm">Disabled item (cannot drag)</span></DragItem>
      <DragItem><span className="text-sm">Another normal item</span></DragItem>
    </div>
  );
}

export {
  DefaultListDemo,
  HorizontalDemo,
  SizesDemo,
  SortableListDemo,
  GridDemo,
  VariantsDemo,
  TaskCardDemo,
  DisabledDemo,
};
