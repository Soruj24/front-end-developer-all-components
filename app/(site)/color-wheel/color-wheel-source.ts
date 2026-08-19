export const COLOR_WHEEL_SOURCE = `"use client";

import { useState } from "react";

interface ColorWheelProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorWheel({ value = "#3B82F6", onChange }: ColorWheelProps) {
  const [color, setColor] = useState(value);
  const [hex, setHex] = useState(value);

  const select = (next: string) => {
    setColor(next);
    setHex(next);
    onChange?.(next);
  };

  const handleHex = (v: string) => {
    setHex(v);
    if (/^#[0-9a-fA-F]{6}$/.test(v)) setColor(v.toLowerCase());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="h-40 w-40 rounded-full shadow-lg"
        style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}
      >
        <div className="relative m-[30%] h-[40%] w-[40%] rounded-full border-2 border-white bg-card shadow-lg">
          <span
            className="absolute inset-0 m-auto h-3 w-3 rounded-full border-2 border-white shadow"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg border border-border" style={{ backgroundColor: color }} />
        <input
          value={hex}
          onChange={(e) => handleHex(e.target.value)}
          spellCheck={false}
          className="w-28 rounded-lg border border-border bg-background px-3 py-1.5 font-mono text-sm outline-none"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}`;