"use client";

import { useState } from "react";
import { ButtonSpotlight } from "../ButtonSpotlight";
import type { ButtonSpotlightVariant } from "../ButtonSpotlight.types";

export default function PlaygroundExample() {
  const [variant, setVariant] = useState<ButtonSpotlightVariant>("default");
  const [spotlightSize, setSpotlightSize] = useState(160);
  const [spotlightBlur, setSpotlightBlur] = useState(40);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
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
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Size</span>
          <input
            type="range"
            min={80}
            max={240}
            value={spotlightSize}
            onChange={(e) => setSpotlightSize(Number(e.target.value))}
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="w-8 text-xs tabular-nums text-muted-foreground">{spotlightSize}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Blur</span>
          <input
            type="range"
            min={10}
            max={80}
            value={spotlightBlur}
            onChange={(e) => setSpotlightBlur(Number(e.target.value))}
            className="h-1.5 w-24 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
          />
          <span className="w-8 text-xs tabular-nums text-muted-foreground">{spotlightBlur}</span>
        </div>
      </div>
      <div className="flex w-full items-center justify-center rounded-xl border border-border bg-card py-12">
        <ButtonSpotlight
          variant={variant}
          spotlightSize={spotlightSize}
          spotlightBlur={spotlightBlur}
        >
          Hover me!
        </ButtonSpotlight>
      </div>
    </div>
  );
}
