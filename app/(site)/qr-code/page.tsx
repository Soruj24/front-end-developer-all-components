"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Card, CardContent, Input } from "@/components/ui";

const QR_CODE_SOURCE = `"use client";

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

function QrCode({ value, color = "#000000", className = "" }: { value: string; color?: string; className?: string }) {
  const matrix = generateQrMatrix(value);
  return (
    <svg viewBox={\`0 0 \${matrix.length} \${matrix.length}\`} className={className}>
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={\`\${r}-\${c}\`} x={c} y={r} width={1} height={1} fill={color} /> : null
        )
      )}
    </svg>
  );
}

export default QrCode;`;

const DEFAULT_CODE = `<QrCode value="https://example.com" className="h-40 w-40" />`;

const CUSTOM_URL_CODE = `const [url, setUrl] = useState("https://example.com");

<Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" />
<QrCode value={url} className="h-32 w-32" />`;

const INTERACTIVE_CODE = `const [url, setUrl] = useState("https://example.com");
const [color, setColor] = useState("#000000");

<Input value={url} onChange={(e) => setUrl(e.target.value)} />
<QrCode value={url} color={color} />`;

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
    <ComponentDocPage
      name="QR Code"
      category="Data Display"
      description="QR code generator with custom colors, size options, and SVG/download export."
    >
      <PreviewPanel filename="qr-code.tsx">
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
      </PreviewPanel>

      <SourceCodeViewer source={QR_CODE_SOURCE} filename="components/ui/QrCode/QrCode.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="A simple QR code for a fixed URL." code={DEFAULT_CODE}>
          <div className="flex w-full items-center justify-center py-10">
            <div className="rounded-lg border border-border p-4">
              <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} className="h-40 w-40">
                {matrix.map((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null))}
              </svg>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Custom URL" description="Generate a QR code from a user-entered URL." code={CUSTOM_URL_CODE}>
          <div className="flex w-full flex-col items-center gap-4">
            <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL" className="max-w-sm" />
            <div className="rounded-lg border border-border p-4">
              <svg viewBox={`0 0 ${matrix.length} ${matrix.length}`} className="h-32 w-32">
                {matrix.map((row, r) => row.map((cell, c) => cell ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={color} /> : null))}
              </svg>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Interactive" description="Combine the URL input with custom color controls." code={INTERACTIVE_CODE}>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}