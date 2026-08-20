"use client";

import { useState } from "react";
import { ButtonGroup } from "../ButtonGroup";
import type { ButtonGroupVariant, ButtonGroupOrientation } from "../ButtonGroup.types";

export default function PlaygroundExample() {
  const [variant, setVariant] = useState<ButtonGroupVariant>("default");
  const [orientation, setOrientation] = useState<ButtonGroupOrientation>("horizontal");
  const [withRounded, setWithRounded] = useState(true);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Variant</span>
        {(["default", "outline", "ghost"] as const).map((v) => (
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
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Orientation</span>
        {(["horizontal", "vertical"] as const).map((o) => (
          <button
            key={o}
            onClick={() => setOrientation(o)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              orientation === o
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Options</span>
        <button
          onClick={() => setWithRounded(!withRounded)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            withRounded ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          rounded: {withRounded ? "on" : "off"}
        </button>
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <ButtonGroup variant={variant} orientation={orientation} rounded={withRounded}>
          <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Left</button>
          <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Center</button>
          <button type="button" className="px-4 py-2 text-sm font-medium transition-colors hover:bg-muted">Right</button>
        </ButtonGroup>
      </div>
    </div>
  );
}
