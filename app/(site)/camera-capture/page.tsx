"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add camera-capture";

const usageCode = `import { CameraCapture } from "@/components/ui";

export default function Example() {
  return <CameraCapture onCapture={(blob) => console.log(blob)} />;
}`;

export default function CameraCapturePage() {
  const [captured, setCaptured] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleCapture = () => {
    setFlash(true);
    setTimeout(() => { setFlash(false); setCaptured(true); }, 200);
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Camera Capture</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Webcam photo capture with preview, retake functionality, aspect ratio selection, and download support.
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
          <h3 className="text-lg font-medium text-foreground">Camera View</h3>
          <ComponentPreview id="camera-capture-default">
            <Card className="w-full max-w-sm overflow-hidden">
              <CardContent className="p-0">
                <div className={`relative flex h-64 items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${flash ? "opacity-50" : ""} transition-opacity`}>
                  <svg className="h-16 w-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                  <div className="absolute inset-0 rounded-t-lg ring-1 ring-inset ring-white/10" />
                </div>
                <div className="flex items-center justify-center gap-4 p-4">
                  <Button variant="outline" size="sm">Gallery</Button>
                  <Button onClick={handleCapture} className="h-12 w-12 rounded-full p-0">📸</Button>
                  <Button variant="outline" size="sm">Flip</Button>
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Captured Preview</h3>
          <ComponentPreview id="camera-capture-preview">
            <Card className="w-full max-w-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex h-64 items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  {captured ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      <span className="text-sm font-medium text-primary">Photo captured!</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No photo yet</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-3 p-4">
                  <Button variant="outline" size="sm" onClick={() => setCaptured(false)}>Retake</Button>
                  <Button size="sm" disabled={!captured}>Download</Button>
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="camera-capture-interactive">
            <Card className="w-full max-w-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="flex h-48 items-center justify-center bg-slate-900">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="h-3 w-3 rounded-sm bg-white/10" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 p-3">
                  <Button variant="ghost" size="sm">⚙️</Button>
                  <Button onClick={handleCapture} className="h-14 w-14 rounded-full p-0 border-4 border-white/20">📸</Button>
                  <Button variant="ghost" size="sm">🔄</Button>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">onCapture</td>
                <td className="px-4 py-3 text-muted-foreground">(blob: Blob) =&gt; void</td>
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