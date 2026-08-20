"use client";

import { useState } from "react";
import { Bubble } from "../Bubble";
import type { BubbleVariant, BubbleSize } from "../Bubble.types";

export default function PlaygroundExample() {
  const [variant, setVariant] = useState<BubbleVariant>("default");
  const [size, setSize] = useState<BubbleSize>("md");
  const [withTail, setWithTail] = useState(true);
  const [withIcon, setWithIcon] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Variant
        </span>
        {(["default", "primary", "secondary", "muted"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              variant === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Size
        </span>
        {(["sm", "md", "lg"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              size === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Options
        </span>
        <button
          onClick={() => setWithTail(!withTail)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            withTail ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          tail: {withTail ? "on" : "off"}
        </button>
        <button
          onClick={() => setWithIcon(!withIcon)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            withIcon ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          icon: {withIcon ? "on" : "off"}
        </button>
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <Bubble
          variant={variant}
          size={size}
          tail={withTail}
          icon={withIcon ? <span className="text-xs">💬</span> : undefined}
        >
          Hello, this is a preview bubble!
        </Bubble>
      </div>
    </div>
  );
}
