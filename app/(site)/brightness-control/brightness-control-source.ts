export const BRIGHTNESS_CONTROL_SOURCE = `"use client";

import { useState } from "react";
import { Sun } from "lucide-react";

interface BrightnessControlProps {
  value?: number;
  min?: number;
  max?: number;
  showLabel?: boolean;
  onChange?: (value: number) => void;
}

export function BrightnessControl({
  value = 50,
  min = 0,
  max = 100,
  showLabel = true,
  onChange,
}: BrightnessControlProps) {
  const [internal, setInternal] = useState(value);
  const current = onChange ? value : internal;
  const percent = Math.round(((current - min) / (max - min)) * 100);

  return (
    <div className="flex items-center gap-4">
      <Sun className="h-5 w-5 text-yellow-500" />
      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => {
          const next = Number(e.target.value);
          setInternal(next);
          onChange?.(next);
        }}
        className="flex-1 accent-yellow-500"
        aria-label="Brightness"
      />
      {showLabel && (
        <span className="w-10 text-right text-sm font-medium">{percent}%</span>
      )}
    </div>
  );
}`;

export const SLIDER_EXAMPLE = `<BrightnessControl value={75} onChange={handleChange} />`;

export const PRESETS_EXAMPLE = `const levels = [25, 50, 75, 100];

<div className="flex gap-2">
  {levels.map((level) => (
    <button
      key={level}
      onClick={() => setValue(level)}
      className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
    >
      {level === 100 ? "Max" : level + "%"}
    </button>
  ))}
</div>`;

export const PREVIEW_EXAMPLE = `<div style={{ opacity: value / 100 }}>
  <img src={preview} alt="Preview" />
</div>
<BrightnessControl value={value} onChange={setValue} />`;
