"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Input, Button, Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add color-picker";

const usageCode = `import { ColorPicker } from "@/components/ui";

export default function Example() {
  return <ColorPicker onChange={(color) => console.log(color)} />;
}`;

const swatches = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#6b7280", "#000000"];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3b82f6");
  const [hex, setHex] = useState("#3b82f6");
  const [history, setHistory] = useState<string[]>(["#3b82f6", "#ef4444", "#22c55e"]);

  const handleSwatch = (c: string) => { setColor(c); setHex(c); };
  const handleHex = (v: string) => { setHex(v); if (/^#[0-9a-f]{6}$/i.test(v)) setColor(v); };
  const addToHistory = () => { if (color && !history.includes(color)) setHistory((h) => [color, ...h].slice(0, 8)); };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Color Picker</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Color picker with swatch palette, hex input, opacity slider, and color history for design tools.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Swatch Palette</h3>
          <ComponentPreview id="color-picker-default">
            <div className="flex w-full items-center justify-center gap-3 py-10">
              {swatches.map((c) => (
                <button key={c} onClick={() => handleSwatch(c)} className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Hex Input</h3>
          <ComponentPreview id="color-picker-hex">
            <div className="flex w-full max-w-sm items-center gap-3">
              <div className="h-12 w-12 shrink-0 rounded-lg border border-border" style={{ backgroundColor: color }} />
              <Input value={hex} onChange={(e) => handleHex(e.target.value)} placeholder="#000000" className="font-mono" />
              <Button variant="outline" onClick={addToHistory}>Save</Button>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color History</h3>
          <ComponentPreview id="color-picker-history">
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
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(color: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}