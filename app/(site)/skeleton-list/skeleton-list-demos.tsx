"use client";

import { useState } from "react";
import { SkeletonList } from "@/components/ui/SkeletonList";
import type { SkeletonListVariant } from "@/components/ui/SkeletonList";
import { RefreshCw } from "lucide-react";

const variants: SkeletonListVariant[] = ["simple", "avatar", "icon", "card", "notification"];

export function InteractiveDemo() {
  const [rows, setRows] = useState(5);
  const [variant, setVariant] = useState<SkeletonListVariant>("avatar");
  const [loading, setLoading] = useState(true);

  const reset = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {variants.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setVariant(v)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              variant === v
                ? "bg-foreground text-background shadow-sm"
                : "border border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Rows
          <input type="range" min={1} max={10} value={rows} onChange={(e) => setRows(+e.target.value)} className="w-20 accent-primary" />
          <span className="w-4 text-right text-xs font-mono tabular-nums">{rows}</span>
        </label>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RefreshCw className="h-3 w-3" /> Reload
        </button>
      </div>
      <div className="rounded-xl border border-border/60 bg-background p-4">
        {loading ? (
          <SkeletonList rows={rows} variant={variant} />
        ) : (
          <div className="flex h-20 items-center justify-center text-sm text-muted-foreground">Content loaded!</div>
        )}
      </div>
    </div>
  );
}

export function AllVariantsDemo() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Simple</h3>
        <SkeletonList rows={4} variant="simple" />
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Avatar</h3>
        <SkeletonList rows={4} variant="avatar" />
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Icon</h3>
        <SkeletonList rows={4} variant="icon" />
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Card</h3>
        <SkeletonList rows={3} variant="card" />
      </div>
      <div className="sm:col-span-2">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notification</h3>
        <SkeletonList rows={4} variant="notification" />
      </div>
    </div>
  );
}
