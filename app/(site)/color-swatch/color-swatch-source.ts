export const COLOR_SWATCH_SOURCE = `"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface ColorSwatchProps {
  colors: string[];
  value?: string;
  size?: "sm" | "md" | "lg";
  onChange?: (color: string) => void;
}

const SIZES = { sm: "h-8 w-8", md: "h-10 w-10", lg: "h-12 w-12" };

export function ColorSwatch({
  colors,
  value,
  size = "md",
  onChange,
}: ColorSwatchProps) {
  const [selected, setSelected] = useState(value ?? colors[0]);

  const select = (color: string) => {
    setSelected(color);
    onChange?.(color);
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => select(color)}
            className={\`relative \${SIZES[size]} rounded-lg transition-transform hover:scale-110 \${
              selected === color ? "ring-2 ring-offset-2 ring-primary" : ""
            }\`}
            style={{ backgroundColor: color }}
            aria-label={color}
          >
            {selected === color && (
              <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border p-3">
        <div className="h-8 w-8 rounded-md" style={{ backgroundColor: selected }} />
        <div>
          <p className="text-sm font-medium">Selected</p>
          <p className="font-mono text-xs text-muted-foreground">{selected}</p>
        </div>
      </div>
    </div>
  );
}`;