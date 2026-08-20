"use client";

import { useState, useCallback } from "react";
import { ColorPicker } from "@/components/_color-picker";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const COLOR_PICKER_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type ColorPickerSize = "sm" | "md" | "lg";

interface ColorPickerProps {
  defaultColor?: string;
  onChange?: (color: string) => void;
  size?: ColorPickerSize;
  className?: string;
}

const SWATCHES = [
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000",
];

const swatchSize: Record<ColorPickerSize, string> = {
  sm: "h-7 w-7", md: "h-9 w-9", lg: "h-10 w-10",
};

const previewSize: Record<ColorPickerSize, string> = {
  sm: "h-8 w-8", md: "h-12 w-12", lg: "h-14 w-14",
};

export function ColorPicker({ defaultColor = "#3b82f6", onChange, size = "md", className }: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor);
  const [hex, setHex] = useState(defaultColor);
  const [history, setHistory] = useState<string[]>([defaultColor, "#ef4444", "#22c55e"]);
  const [copied, setCopied] = useState(false);

  const select = useCallback((c: string) => { setColor(c); setHex(c); onChange?.(c); }, [onChange]);
  const handleHex = useCallback((v: string) => { setHex(v); if (/^#[0-9a-f]{6}$/i.test(v)) select(v); }, [select]);
  const saveToHistory = useCallback(() => {
    if (color && !history.includes(color)) setHistory((h) => [color, ...h].slice(0, 8));
  }, [color, history]);
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(color); setCopied(true); setTimeout(() => setCopied(false), 1500);
  }, [color]);

  return (
    <div className={cn("flex w-full flex-col gap-5", className)}>
      <div className="flex items-center gap-3">
        <div className={cn("shrink-0 rounded-xl border border-border shadow-sm", previewSize[size])} style={{ backgroundColor: color }} />
        <div className="relative flex-1">
          <input value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" aria-label="Hex color value"
            className={cn("w-full rounded-xl border border-border bg-background px-3 pr-9 font-mono text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", size === "sm" && "py-1.5 text-xs", size === "md" && "py-2", size === "lg" && "py-2.5")} />
          <button type="button" onClick={copyToClipboard} aria-label="Copy hex value"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        <button type="button" onClick={saveToHistory}
          className={cn("inline-flex shrink-0 items-center rounded-xl border border-border bg-background px-3.5 text-sm font-medium shadow-sm hover:bg-muted focus-visible:ring-2 active:scale-[0.97]", size === "sm" && "py-1 text-xs", size === "md" && "py-2", size === "lg" && "py-2.5")}>
          Save
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {SWATCHES.map((c) => (
          <button key={c} type="button" onClick={() => select(c)} aria-label={\`Select \${c}\`} aria-pressed={color === c}
            className={cn("rounded-full border-2 transition-all duration-150 hover:scale-110 focus-visible:ring-2 active:scale-95", swatchSize[size], color === c ? "border-foreground scale-110 shadow-md" : "border-transparent hover:border-border")}
            style={{ backgroundColor: c }} />
        ))}
      </div>
      {history.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">History</p>
          <div className="flex flex-wrap gap-1.5">
            {history.map((c, i) => (
              <button key={\`\${c}-\${i}\`} type="button" onClick={() => select(c)} aria-label={\`Select \${c}\`}
                className="h-6 w-6 rounded-md border border-border shadow-sm hover:scale-110 hover:shadow-md active:scale-95"
                style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}`;

const SWATCH_CODE = `import { ColorPicker } from "@/components/_color-picker";

<ColorPicker defaultColor="#3b82f6" onChange={(c) => console.log(c)} />`;

const SIZES_CODE = `import { ColorPicker } from "@/components/_color-picker";

<div className="flex flex-col gap-8">
  <ColorPicker size="sm" />
  <ColorPicker size="md" />
  <ColorPicker size="lg" />
</div>`;

const CONTROLLED_CODE = `"use client";
import { useState } from "react";
import { ColorPicker } from "@/components/_color-picker";

function ControlledExample() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker defaultColor={color} onChange={setColor} />
      <div className="rounded-xl border border-border p-3 text-center">
        <p className="text-sm text-muted-foreground">Selected: <span className="font-mono font-medium text-foreground">{color}</span></p>
      </div>
    </div>
  );
}`;

const INTEGRATION_CODE = `import { ColorPicker } from "@/components/_color-picker";

function ThemePreview() {
  return (
    <div className="rounded-xl border border-border p-4">
      <ColorPicker defaultColor="#3b82f6" onChange={(c) => {
        document.documentElement.style.setProperty("--primary", c);
      }} />
    </div>
  );
}`;

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3b82f6");

  const handleSwatch = useCallback((c: string) => {
    setColor(c);
  }, []);

  return (
    <ComponentDocPage
      name="Color Picker"
      category="Forms"
      description="Color picker with swatch palette, hex input with copy, color history, and multiple sizes. Supports controlled mode with onChange callback."
    >
      <PreviewPanel filename="color-picker.tsx">
        <div className="flex w-full justify-center py-4">
          <div className="w-full max-w-sm">
            <ColorPicker onChange={(c) => setColor(c)} />
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={COLOR_PICKER_SOURCE}
        filename="components/_color-picker/ColorPicker.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Sizes"
          description="Three size options for different contexts."
          code={SIZES_CODE}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Small</p>
              <ColorPicker size="sm" defaultColor="#ef4444" onChange={handleSwatch} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Medium</p>
              <ColorPicker size="md" defaultColor="#3b82f6" onChange={handleSwatch} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Large</p>
              <ColorPicker size="lg" defaultColor="#22c55e" onChange={handleSwatch} />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the selected color externally via state."
          code={CONTROLLED_CODE}
          filename="controlled.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <ColorPicker defaultColor={color} onChange={setColor} />
            <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-center">
              <p className="text-sm text-muted-foreground">
                Selected:{" "}
                <span className="font-mono font-medium text-foreground">
                  {color}
                </span>
              </p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Swatch Palette"
          description="Quick color selection from a preset palette with active state indicator."
          code={SWATCH_CODE}
          filename="swatch-palette.tsx"
        >
          <div className="flex w-full items-center justify-center gap-3 py-6">
            {["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000"].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleSwatch(c)}
                aria-label={`Select ${c}`}
                className={`h-10 w-10 rounded-full border-2 transition-all duration-150 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  color === c
                    ? "border-foreground scale-110 shadow-md"
                    : "border-transparent hover:border-border"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Theme Integration"
          description="Use color picker to set CSS custom properties."
          code={INTEGRATION_CODE}
          filename="theme-integration.tsx"
        >
          <div className="w-full max-w-sm">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Theme Accent
              </p>
              <ColorPicker
                defaultColor="#8b5cf6"
                onChange={(c) => {
                  if (typeof document !== "undefined") {
                    document.documentElement.style.setProperty("--primary", c);
                  }
                }}
              />
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
