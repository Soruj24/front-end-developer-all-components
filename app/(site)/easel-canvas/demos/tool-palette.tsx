"use client";

import { useState } from "react";
import { Circle, Eraser, Minus, MousePointer2, Pen, Square, Type } from "lucide-react";

const TOOLS = [
  { id: "select", icon: MousePointer2, label: "Select" },
  { id: "pen", icon: Pen, label: "Pen" },
  { id: "eraser", icon: Eraser, label: "Eraser" },
  { id: "rect", icon: Square, label: "Rectangle" },
  { id: "circle", icon: Circle, label: "Circle" },
  { id: "line", icon: Minus, label: "Line" },
  { id: "text", icon: Type, label: "Text" },
];

export function ToolPaletteDemo() {
  const [tool, setTool] = useState("pen");
  const active = TOOLS.find((t) => t.id === tool);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div
        role="radiogroup"
        aria-label="Drawing tools"
        className="grid grid-cols-4 gap-1.5 rounded-xl border border-black/[.08] bg-muted/40 p-1.5 dark:border-white/[.145] sm:flex sm:w-fit"
      >
        {TOOLS.map((t) => {
          const isActive = tool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTool(t.id)}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-[11px] font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
                isActive
                  ? "bg-background text-foreground shadow-xs ring-1 ring-black/[.06] dark:ring-white/[.12]"
                  : "text-muted-foreground hover:bg-background/70 hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" aria-hidden="true" />
              {t.label}
            </button>
          );
        })}
      </div>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        Selected tool:
        <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 font-medium text-foreground">
          {active && <active.icon className="h-3 w-3" aria-hidden="true" />}
          {active?.label}
        </span>
      </p>
    </div>
  );
}
