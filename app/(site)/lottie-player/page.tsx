"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = "npx component-library@latest add lottie-player";

const usageCode = `import { LottiePlayer } from "@/components/ui";

export default function Example() {
  return <LottiePlayer src="/animation.json" />;
}`;

function AnimatedIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    rocket: "🚀",
    check: "✅",
    star: "⭐",
    heart: "❤️",
    fire: "🔥",
  };
  return (
    <span className="text-6xl" style={{ animation: "bounce 1s infinite" }}>
      {icons[type] || "✨"}
    </span>
  );
}

const animations = [
  { id: "rocket", label: "Rocket" },
  { id: "check", label: "Success" },
  { id: "star", label: "Star" },
  { id: "heart", label: "Heart" },
  { id: "fire", label: "Fire" },
];

export default function LottiePlayerPage() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [current, setCurrent] = useState("rocket");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Lottie Player</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animation player with play/pause controls, speed adjustment, loop options, and segment selection.
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
          <ComponentPreview id="lottie-player-default">
            <div className="flex w-full items-center justify-center py-10">
              <div className={`text-6xl ${playing ? "" : "pause"}`} style={{ animation: `bounce ${1 / speed}s infinite`, animationPlayState: playing ? "running" : "paused" }}>🚀</div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Controls</h3>
          <ComponentPreview id="lottie-player-controls">
            <Card className="w-full max-w-sm">
              <CardContent className="p-4">
                <div className="mb-4 flex h-32 items-center justify-center">
                  <AnimatedIcon type={current} />
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Button variant="outline" size="sm" onClick={() => setPlaying(!playing)}>
                    {playing ? "⏸ Pause" : "▶ Play"}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Speed:</span>
                  {[0.5, 1, 1.5, 2].map((s) => (
                    <Button key={s} variant={speed === s ? "default" : "outline"} size="sm" onClick={() => setSpeed(s)} className="h-6 text-xs">{s}x</Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Animation Picker</h3>
          <ComponentPreview id="lottie-player-picker">
            <div className="w-full">
              <div className="mb-3 flex gap-2">
                {animations.map((a) => (
                  <Button key={a.id} variant={current === a.id ? "default" : "outline"} size="sm" onClick={() => setCurrent(a.id)}>{a.label}</Button>
                ))}
              </div>
              <div className="flex h-40 items-center justify-center rounded-lg border border-border">
                <AnimatedIcon type={current} />
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">src</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">loop</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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