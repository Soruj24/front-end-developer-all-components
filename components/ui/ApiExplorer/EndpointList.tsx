"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { METHOD_META } from "./constants";
import { LockIcon } from "./Icons";
import type { ApiEndpoint } from "./types";

interface EndpointListProps {
  endpoints: ApiEndpoint[];
  cursor: number;
  selectedId: string;
  onSelect: (endpoint: ApiEndpoint) => void;
}

export function EndpointList({ endpoints, cursor, selectedId, onSelect }: EndpointListProps) {
  const groups: { label: string; items: ApiEndpoint[] }[] = [];
  for (const endpoint of endpoints) {
    const label = endpoint.group ?? "General";
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.items.push(endpoint);
    else groups.push({ label, items: [endpoint] });
  }

  const rows: React.ReactNode[] = [];
  let index = 0;
  for (const group of groups) {
    rows.push(
      <div
        key={group.label}
        className="px-2 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {group.label}
      </div>
    );
    for (const endpoint of group.items) {
      const rowIndex = index;
      const isActive = endpoint.id === selectedId;
      const isCursor = rowIndex === cursor;
      rows.push(
        <button
          key={endpoint.id}
          type="button"
          role="option"
          data-endpoint-index={rowIndex}
          aria-selected={isActive}
          onClick={() => onSelect(endpoint)}
          className={cn(
            "flex w-full flex-col gap-1 rounded-lg px-2 py-2 text-left transition-colors",
            isActive ? "bg-primary/10" : "hover:bg-muted/60",
            isCursor && "ring-1 ring-inset ring-primary"
          )}
        >
          <span className="flex items-center gap-1.5">
            <span
              className={cn(
                "w-14 shrink-0 rounded px-1 py-0.5 text-center font-mono text-[9px] font-bold",
                METHOD_META[endpoint.method].badge
              )}
            >
              {endpoint.method}
            </span>
            <span className="truncate font-mono text-[11px] text-foreground">{endpoint.path}</span>
            {endpoint.requiresAuth && <LockIcon className="h-3 w-3 shrink-0 text-muted-foreground" />}
          </span>
          <span className="truncate text-[11px] text-muted-foreground">{endpoint.title}</span>
        </button>
      );
      index += 1;
    }
  }
  return <div className="flex flex-col gap-0.5">{rows}</div>;
}
