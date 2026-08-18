"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add gesture-area";

const usageCode = `import { GestureArea } from "@/components/ui";

export default function Example() {
  return <GestureArea onSwipe={(dir) => console.log(dir)} />;
}`;

export default function GestureAreaPage() {
  const [gesture, setGesture] = useState<string | null>(null);
  const [swipes, setSwipes] = useState<string[]>([]);
  const [startX, setStartX] = useState(0);

  const handleStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
  const handleEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startX;
    const dir = diff > 50 ? "Swipe Right" : diff < -50 ? "Swipe Left" : null;
    if (dir) { setGesture(dir); setSwipes((p) => [dir, ...p].slice(0, 5)); }
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gesture Area</h1>
          <Badge variant="primary">Interaction</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Touch gesture detection area supporting swipe, pinch, rotate, and long-press with visual feedback.
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
          <h3 className="text-lg font-medium text-foreground">Swipe Detection</h3>
          <ComponentPreview id="gesture-area-default">
            <Card className="w-full max-w-sm">
              <CardContent className="p-0">
                <div onTouchStart={handleStart} onTouchEnd={handleEnd} className="flex h-48 cursor-grab items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 select-none">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-10 w-10 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    <span className="text-sm text-muted-foreground">Swipe left or right</span>
                    {gesture && <Badge variant="primary">{gesture}</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gesture Log</h3>
          <ComponentPreview id="gesture-area-log">
            <Card className="w-full max-w-sm">
              <CardContent className="p-3">
                {swipes.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">Perform a gesture to see the log</p>}
                {swipes.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-border py-1.5 last:border-0">
                    <Badge variant="secondary">{s}</Badge>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gesture Zone with Feedback</h3>
          <ComponentPreview id="gesture-area-interactive">
            <div className="w-full max-w-md">
              <div onTouchStart={handleStart} onTouchEnd={handleEnd} className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30">
                <div className="text-center">
                  <p className="text-4xl mb-2">👆</p>
                  <p className="text-sm font-medium">Touch & Swipe</p>
                  <p className="text-xs text-muted-foreground mt-1">Swipe left or right to interact</p>
                  {gesture && <p className="mt-2 text-sm font-medium text-primary">{gesture} detected!</p>}
                </div>
              </div>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSwipe</td>
                <td className="px-4 py-3 text-muted-foreground">(direction: string) =&gt; void</td>
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