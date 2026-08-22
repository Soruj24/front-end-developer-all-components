"use client";

import { useState } from "react";

const NODES = [
  { label: "Start", color: "#3b82f6", className: "left-[8%] top-[14%]" },
  { label: "Process", color: "#22c55e", className: "left-[54%] top-[14%]" },
  { label: "End", color: "#8b5cf6", className: "left-[31%] top-[56%]" },
];

const NODE_COLORS = ["#3b82f6", "#22c55e", "#8b5cf6", "#ef4444"];

export function DiagramToolDemo() {
  const [selected, setSelected] = useState(NODE_COLORS[0]);

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145] sm:p-5">
      <h3 className="mb-3 text-sm font-semibold">Flow Diagram</h3>
      <div className="relative h-36 overflow-hidden rounded-lg border border-dashed border-black/[.15] bg-white dark:border-white/[.2]">
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full text-muted-foreground">
          <defs>
            <marker id="easel-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="currentColor" />
            </marker>
          </defs>
          <line x1={27} y1={33} x2={52} y2={33} stroke="currentColor" strokeWidth={1.5} markerEnd="url(#easel-arrow)" vectorEffect="non-scaling-stroke" />
          <line x1={60} y1={42} x2={45} y2={64} stroke="currentColor" strokeWidth={1.5} markerEnd="url(#easel-arrow)" vectorEffect="non-scaling-stroke" />
        </svg>
        {NODES.map((n) => (
          <div
            key={n.label}
            style={{ backgroundColor: n.color }}
            className={`absolute flex h-11 w-16 items-center justify-center rounded-lg text-xs font-medium text-white shadow-sm transition-transform duration-150 hover:-translate-y-0.5 ${n.className}`}
          >
            {n.label}
          </div>
        ))}
      </div>
      <div role="radiogroup" aria-label="Node color" className="mt-3 flex items-center gap-2">
        {NODE_COLORS.map((c) => (
          <button key={c} type="button" role="radio" aria-checked={selected === c} aria-label={`Node color ${c}`} onClick={() => setSelected(c)} style={{ backgroundColor: c }}
            className={`h-6 w-6 rounded-md border-2 border-background shadow-sm transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              selected === c ? "-translate-y-0.5 ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
            }`} />
        ))}
      </div>
    </div>
  );
}
