"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add bounce-loader`;

const usageCode = `import { BounceLoader } from "@/components/_bounce-loader";

<BounceLoader />
<BounceLoader count={5} color="#6366f1" size={12} />`;

function BounceDots({ count = 5, color = "currentColor", size = 10, gap = 6 }: { count?: number; color?: string; size?: number; gap?: number }) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size, height: size, backgroundColor: color,
            animation: `bounce-dot 1.4s ${i * 0.16}s ease-in-out infinite both`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce-dot {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function BounceBall({ count = 3, color = "#6366f1", size = 16 }: { count?: number; color?: string; size?: number }) {
  return (
    <div className="flex items-end" style={{ height: size * 3, gap: size / 2 }}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size, height: size, backgroundColor: color,
            animation: `bounce-ball 0.6s ${i * 0.15}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce-ball {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${size * 2}px); }
        }
      `}</style>
    </div>
  );
}

export default function BounceLoaderPage() {
  const [demoColor, setDemoColor] = useState("#6366f1");
  const [demoSize, setDemoSize] = useState(10);
  const [demoCount, setDemoCount] = useState(5);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bounce Loader</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated bouncing dots and balls for loading states. Lightweight, pure CSS animation with customizable count, color, and size.
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

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Demo</h2>
          <p className="mt-1 text-sm text-muted-foreground">Customize the bounce loader appearance.</p>
        </div>
        <ComponentPreview id="bounce-interactive">
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-24 items-center justify-center">
              <BounceDots count={demoCount} color={demoColor} size={demoSize} />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Count <input type="range" min={3} max={8} value={demoCount} onChange={(e) => setDemoCount(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{demoCount}</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                Size <input type="range" min={6} max={20} value={demoSize} onChange={(e) => setDemoSize(+e.target.value)} className="w-20" /> <span className="w-4 text-right text-xs font-mono">{demoSize}px</span>
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="color" value={demoColor} onChange={(e) => setDemoColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
              </label>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Dot Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different dot styles and configurations.</p>
        </div>
        <ComponentPreview id="bounce-dots">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <BounceDots count={3} />
              <span className="text-xs text-muted-foreground">3 dots</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceDots count={5} color="#6366f1" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceDots count={5} color="#10b981" size={8} />
              <span className="text-xs text-muted-foreground">Small green</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceDots count={7} color="#f94144" size={6} gap={4} />
              <span className="text-xs text-muted-foreground">Compact red</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceDots count={4} color="#000" size={14} gap={10} />
              <span className="text-xs text-muted-foreground">Large spaced</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Ball Bounce</h2>
          <p className="mt-1 text-sm text-muted-foreground">Bouncing ball animation variant.</p>
        </div>
        <ComponentPreview id="bounce-ball">
          <div className="flex flex-wrap items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <BounceBall count={3} />
              <span className="text-xs text-muted-foreground">Default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceBall count={5} color="#10b981" size={12} />
              <span className="text-xs text-muted-foreground">5 balls</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <BounceBall count={4} color="#f94144" size={18} />
              <span className="text-xs text-muted-foreground">Large red</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">Common loading scenarios with the bounce loader.</p>
        </div>
        <ComponentPreview id="bounce-usecases">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-2">
                <BounceDots count={3} size={6} color="#6366f1" />
                <span className="text-sm font-medium">Sending message...</span>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">Your message is being delivered.</div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-2">
                <BounceDots count={3} size={6} color="#10b981" />
                <span className="text-sm font-medium">Syncing data...</span>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">Last sync: 2 minutes ago</div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-2">
                <BounceBall count={3} size={10} color="#f9c74f" />
                <span className="text-sm font-medium">Processing payment...</span>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">Please do not close this window.</div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <div className="mb-3 flex items-center gap-2">
                <BounceDots count={4} size={5} color="#f94144" />
                <span className="text-sm font-medium">Uploading file...</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "count", type: "number", def: "5", req: "No" },
                { prop: "color", type: "string", def: "\"currentColor\"", req: "No" },
                { prop: "size", type: "number", def: "10", req: "No" },
                { prop: "gap", type: "number", def: "6", req: "No" },
              ].map((row) => (
                <tr key={row.prop} className="border-b">
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.def}</td>
                  <td className="px-4 py-3">{row.req}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
