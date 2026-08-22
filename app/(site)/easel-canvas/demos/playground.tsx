"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui";
import { EaselCanvas } from "./EaselCanvas";

const SIZES = [
  { value: "small", label: "Small", width: 480, height: 320 },
  { value: "medium", label: "Medium", width: 640, height: 420 },
  { value: "large", label: "Large", width: 800, height: 520 },
];

export function PlaygroundDemo() {
  const [sizeId, setSizeId] = useState("medium");
  const [saved, setSaved] = useState<string[]>([]);
  const preset = SIZES.find((s) => s.value === sizeId) ?? SIZES[1];

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <SegmentedControl
          size="sm"
          value={sizeId}
          onChange={setSizeId}
          options={SIZES.map(({ value, label }) => ({ value, label }))}
        />
        <p className="font-mono text-xs tabular-nums text-muted-foreground">
          {preset.width} × {preset.height}px internal resolution · scales to container width
        </p>
      </div>

      <EaselCanvas
        key={sizeId}
        width={preset.width}
        height={preset.height}
        onSave={(dataUrl) => setSaved((prev) => [dataUrl, ...prev].slice(0, 4))}
        className="w-full"
      />

      <div aria-live="polite" className="sr-only">
        {saved.length > 0 ? `Drawing exported, ${saved.length} saved` : ""}
      </div>

      {saved.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Saved exports (latest 4)</span>
            <button
              type="button"
              onClick={() => setSaved([])}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-danger/10 hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {saved.map((src, i) => (
              <img
                key={`${i}-${src.length}`}
                src={src}
                alt={`Exported drawing ${i + 1}`}
                className="h-20 w-auto rounded-lg border border-black/[.08] bg-white shadow-sm dark:border-white/[.145]"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
