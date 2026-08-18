"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Input } from "@/components/ui";

const installCommand = "npx component-library@latest add qr-code";

const usageCode = `import { QrCode } from "@/components/ui";

export default function Example() {
  return <QrCode value="https://example.com" />;
}`;

function generateQrMatrix(value: string) {
  const size = 21;
  const matrix: boolean[][] = [];
  for (let r = 0; r < size; r++) {
    matrix[r] = [];
    for (let c = 0; c < size; c++) {
      const inFinder = (r < 7 && c < 7) || (r < 7 && c >= size - 7) || (r >= size - 7 && c < 7);
      const inBorder = inFinder && (r === 0 || r === 6 || c === 0 || c === 6 || c === size - 7 || c === size - 1 || r === size - 7);
      const inCenter = inFinder && r >= 2 && r <= 4 && c >= 2 && c <= 4;
      const inCenter2 = inFinder && r >= size - 5 && r <= size - 3 && c >= 2 && c <= 4;
      const inCenter3 = inFinder && r >= 2 && r <= 4 && c >= size - 5 && c <= size - 3;
      matrix[r][c] = inBorder || inCenter || inCenter2 || inCenter3 || (r + c) % 3 === 0;
    }
  }
  return matrix;
}

export default function QrCodePage() {
  const [url, setUrl] = useState("https://example.com");
  const [color, setColor] = useState("#000000");
  const matrix = generateQrMatrix(url);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">QR Code</h1>
          <Badge variant="primary">Generator</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          QR code generator with custom colors, size options, and SVG/download export.
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
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="qr-code-default">
            <div className="flex w-full items-center justify-center py-10">
              <div className="rounded-lg border border-border p-4">
                <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} className="h-40 w-40">
                  {matrix.map((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null))}
                </svg>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Custom URL</h3>
          <ComponentPreview id="qr-code-url">
            <div className="flex w-full flex-col items-center gap-4">
              <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="max-w-sm" />
              <div className="rounded-lg border border-border p-4">
                <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} className="h-32 w-32">
                  {matrix.map((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null))}
                </svg>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="qr-code-interactive">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="mb-3" />
                <div className="mb-3 flex justify-center">
                  <div className="rounded-lg border border-border p-3">
                    <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} className="h-36 w-36">
                      {matrix.map((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null))}
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-9 w-9 cursor-pointer p-0 border-0" />
                  <Input value={color} onChange={(e) => setColor(e.target.value)} className="font-mono text-sm" />
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground truncate">{url}</p>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#000000"</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
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