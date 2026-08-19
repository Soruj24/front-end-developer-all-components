export const CROP_TOOL_SOURCE = `"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropToolProps {
  src?: string;
  onCrop?: (area: CropArea) => void;
  aspectRatio?: number;
  shape?: "rect" | "circle";
  className?: string;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function CropTool({ onCrop, aspectRatio = 1, shape = "rect", className = "" }: CropToolProps) {
  const [box, setBox] = useState({ x: 15, y: 20, w: 70, h: 60 });

  const resize = (w: number, h: number) => {
    const nextW = clamp(w, 10, 100);
    const nextH = aspectRatio ? clamp(nextW / aspectRatio, 10, 100) : clamp(h, 10, 100);
    setBox((b) => ({ ...b, w: nextW, h: nextH }));
  };

  const apply = () => onCrop?.({ x: box.x, y: box.y, width: box.w, height: box.h });

  return (
    <div className={"w-full max-w-sm " + className}>
      <div className="relative h-56 overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-60" />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className={"absolute border-2 border-white shadow-lg cursor-move " + (shape === "circle" ? "rounded-full" : "")}
          style={{ left: box.x + "%", top: box.y + "%", width: box.w + "%", height: box.h + "%" }}
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="border border-white/30" />
            ))}
          </div>
          <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-white">
            {Math.round(box.w)}×{Math.round(box.h)}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Drag corners to resize</span>
        <span className="font-mono">{Math.round(box.w)}% × {Math.round(box.h)}%</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={apply} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground py-2.5 text-xs font-medium text-background hover:bg-foreground/90 transition-colors">
          <Check className="h-3.5 w-3.5" />
          Apply
        </button>
        <button type="button" onClick={() => setBox({ x: 15, y: 20, w: 70, h: 60 })} className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/[.08] py-2.5 text-xs font-medium hover:bg-muted transition-colors dark:border-white/[.145]">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
    </div>
  );
}`;

export const CROP_BOX_EXAMPLE = `<CropTool
  src="/image.jpg"
  onCrop={(area) => handleCrop(area)}
/>`;

export const ASPECT_RATIO_EXAMPLE = `<div className="grid grid-cols-5 gap-1.5">
  {["1:1", "4:3", "16:9", "3:2", "Free"].map((r) => (
    <button key={r} className="flex flex-col items-center gap-1 rounded-lg bg-muted px-2 py-2 text-xs">
      <span className="border-2 border-current" style={{ width: 14, height: 10 }} />
      <span className="font-medium">{r}</span>
    </button>
  ))}
</div>`;

export const CONTROLS_EXAMPLE = `<input
  type="range"
  min={-180}
  max={180}
  value={rotation}
  onChange={(e) => setRotation(Number(e.target.value))}
  className="flex-1 accent-foreground"
/>`;

export const AVATAR_EXAMPLE = `<div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
  <img src={src} alt="avatar" className="h-full w-full object-cover" />
</div>`;

export const BANNER_EXAMPLE = `<div className="relative overflow-hidden rounded-lg bg-muted" style={{ height: 120 }}>
  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-60" />
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-2 border-dashed border-white/60" style={{ height: 40 }}>
    <span className="flex items-center justify-center text-[10px] font-medium text-white/80">3:1</span>
  </div>
</div>`;

export const PRESETS_EXAMPLE = `<const presets = [
  { id: "post", label: "Instagram Post", size: "1080×1080" },
  { id: "story", label: "Instagram Story", size: "1080×1920" },
  { id: "thumb", label: "Thumbnail", size: "320×180" },
];`;

export const BEFORE_AFTER_EXAMPLE = `<div className="relative h-48 overflow-hidden rounded-lg">
  <div className="absolute inset-0 bg-gray-300" />
  <div className="absolute inset-0 overflow-hidden" style={{ width: position + "%" }}>
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500" />
  </div>
</div>`;