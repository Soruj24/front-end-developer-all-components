"use client";

import { cn } from "@/lib/cn";
import { METHOD_META } from "./constants";
import type { ApiEndpoint } from "./types";

interface MobileChipsProps {
  endpoints: ApiEndpoint[];
  selectedId: string;
  onSelect: (endpoint: ApiEndpoint) => void;
}

export function MobileChips({ endpoints, selectedId, onSelect }: MobileChipsProps) {
  return (
    <div className="scrollbar-thin flex items-center gap-1.5 overflow-x-auto border-t border-border bg-muted/30 px-3 py-2 lg:hidden">
      {endpoints.map((endpoint) => (
        <button
          key={endpoint.id}
          type="button"
          onClick={() => onSelect(endpoint)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-lg border px-2 py-1 text-xs transition-colors",
            selectedId === endpoint.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:text-foreground"
          )}
        >
          <span
            className={cn(
              "rounded px-1 py-0.5 font-mono text-[9px] font-bold",
              METHOD_META[endpoint.method].badge
            )}
          >
            {endpoint.method}
          </span>
          <span className="font-mono">{endpoint.path}</span>
        </button>
      ))}
    </div>
  );
}
