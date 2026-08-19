"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Input, Button, Card, CardContent } from "@/components/ui";
import { COLOR_PICKER_SOURCE } from "./color-picker-source";

const swatches = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000"];

const SWATCH_CODE = `const swatches = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000"];

<div className="flex gap-3">
  {swatches.map((c) => (
    <button
      key={c}
      onClick={() => onChange?.(c)}
      className="h-10 w-10 rounded-full border-2 hover:scale-110"
      style={{ backgroundColor: c }}
    />
  ))}
</div>`;

const HEX_CODE = `<div className="flex items-center gap-3">
  <div className="h-12 w-12 rounded-lg border border-border" style={{ backgroundColor: color }} />
  <Input value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" className="font-mono" />
  <Button variant="outline" onClick={addToHistory}>Save</Button>
</div>`;

const HISTORY_CODE = `<Card className="w-full max-w-sm">
  <CardContent className="p-4">
    <div className="mb-3 flex h-16 items-center justify-center rounded-lg border border-border" style={{ backgroundColor: color }}>
      <span className="font-mono text-sm text-white mix-blend-difference">{color}</span>
    </div>
    <div className="mb-3 flex gap-2">
      {swatches.slice(0, 5).map((c) => (
        <button key={c} onClick={() => handleSwatch(c)} className="h-8 w-8 rounded-full border border-border" style={{ backgroundColor: c }} />
      ))}
    </div>
    <p className="mb-1 text-xs text-muted-foreground">History</p>
    <div className="flex gap-1.5">
      {history.map((c, i) => (
        <button key={i} onClick={() => handleSwatch(c)} className="h-6 w-6 rounded border border-border" style={{ backgroundColor: c }} />
      ))}
    </div>
  </CardContent>
</Card>`;

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3b82f6");
  const [hex, setHex] = useState("#3b82f6");
  const [history, setHistory] = useState<string[]>(["#3b82f6", "#ef4444", "#22c55e"]);

  const handleSwatch = (c: string) => { setColor(c); setHex(c); };
  const handleHex = (v: string) => { setHex(v); if (/^#[0-9a-f]{6}$/i.test(v)) setColor(v); };
  const addToHistory = () => { if (color && !history.includes(color)) setHistory((h) => [color, ...h].slice(0, 8)); };

  return (
    <ComponentDocPage
      name="Color Picker"
      category="Forms"
      description="Color picker with swatch palette, hex input, opacity slider, and color history for design tools."
    >
      <PreviewPanel filename="color-picker.tsx">
        <div className="flex w-full max-w-md flex-col items-center gap-6 py-4">
          <div className="flex w-full max-w-sm items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-lg border border-border" style={{ backgroundColor: color }} />
            <Input value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" className="font-mono" />
            <Button variant="outline" onClick={addToHistory}>Save</Button>
          </div>
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
            {swatches.map((c) => (
              <button key={c} onClick={() => handleSwatch(c)} className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex w-full max-w-sm flex-col gap-1.5">
            <p className="text-xs text-muted-foreground">History</p>
            <div className="flex gap-1.5">
              {history.map((c, i) => (
                <button key={i} onClick={() => handleSwatch(c)} className="h-6 w-6 rounded border border-border" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={COLOR_PICKER_SOURCE} filename="components/ui/ColorPicker/ColorPicker.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Swatch Palette" description="Quick color selection from a preset palette." code={SWATCH_CODE} filename="swatch-palette.tsx">
          <div className="flex w-full items-center justify-center gap-3 py-10">
            {swatches.map((c) => (
              <button key={c} onClick={() => handleSwatch(c)} className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Hex Input" description="Type a hex value and see the color update live." code={HEX_CODE} filename="with-hex-input.tsx">
          <div className="flex w-full max-w-sm items-center gap-3">
            <div className="h-12 w-12 shrink-0 rounded-lg border border-border" style={{ backgroundColor: color }} />
            <Input value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" className="font-mono" />
            <Button variant="outline" onClick={addToHistory}>Save</Button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Color History" description="Recently saved colors for quick reuse." code={HISTORY_CODE} filename="color-history.tsx">
          <Card className="w-full max-w-sm">
            <CardContent className="p-4">
              <div className="mb-3 flex h-16 items-center justify-center rounded-lg border border-border" style={{ backgroundColor: color }}>
                <span className="font-mono text-sm text-white mix-blend-difference">{color}</span>
              </div>
              <div className="mb-3 flex gap-2">
                {swatches.slice(0, 5).map((c) => (
                  <button key={c} onClick={() => handleSwatch(c)} className="h-8 w-8 rounded-full border border-border hover:scale-110 transition-transform" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mb-1">History</p>
              <div className="flex gap-1.5">
                {history.map((c, i) => (
                  <button key={i} onClick={() => handleSwatch(c)} className="h-6 w-6 rounded border border-border" style={{ backgroundColor: c }} />
                ))}
              </div>
            </CardContent>
          </Card>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}