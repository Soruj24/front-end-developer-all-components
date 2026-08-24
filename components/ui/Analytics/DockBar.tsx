import React from "react";

interface DockBarItem {
  icon: React.ReactNode;
  label?: string;
}

interface DockBarProps {
  items: DockBarItem[];
}

export function DockBar({ items }: DockBarProps) {
  return (
    <div className="flex items-end gap-1 rounded-2xl border border-border bg-card/80 p-2 shadow-lg backdrop-blur-xl">
      {items.map((item, i) => (
        <div key={i} className="group relative flex flex-col items-center gap-1">
          {item.label && (
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-all group-hover:opacity-100">
              {item.label}
            </span>
          )}
          <div className="flex size-11 items-center justify-center rounded-2xl transition-transform hover:scale-110 sm:size-12 md:size-14">
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}