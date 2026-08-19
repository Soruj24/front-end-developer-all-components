export const COLOR_PICKER_SOURCE = `"use client";

import { useState } from "react";

interface ColorPickerProps {
  defaultColor?: string;
  onChange?: (color: string) => void;
  className?: string;
}

const SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#000000",
];

export function ColorPicker({ defaultColor = "#3b82f6", onChange, className }: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor);
  const [hex, setHex] = useState(defaultColor);
  const [history, setHistory] = useState<string[]>([defaultColor, "#ef4444", "#22c55e"]);

  const select = (c: string) => {
    setColor(c);
    setHex(c);
    onChange?.(c);
  };

  const handleHex = (value: string) => {
    setHex(value);
    if (/^#[0-9a-f]{6}$/i.test(value)) select(value);
  };

  const saveToHistory = () => {
    if (color && !history.includes(color)) {
      setHistory((h) => [color, ...h].slice(0, 8));
    }
  };

  return (
    <div className={["flex flex-col gap-4", className].filter(Boolean).join(" ")}>
      <div className="flex items-center gap-3">
        <div
          className="h-12 w-12 shrink-0 rounded-lg border border-border"
          style={{ backgroundColor: color }}
        />
        <input
          value={hex}
          onChange={(e) => handleHex(e.target.value)}
          placeholder="#000000"
          className="w-32 rounded-lg border border-border px-3 py-2 font-mono text-sm"
        />
        <button
          type="button"
          onClick={saveToHistory}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted"
        >
          Save
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => select(c)}
            className={[
              "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
              color === c ? "scale-110 border-foreground" : "border-transparent",
            ].join(" ")}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">History</p>
        <div className="flex gap-1.5">
          {history.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => select(c)}
              className="h-6 w-6 rounded border border-border"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}`;