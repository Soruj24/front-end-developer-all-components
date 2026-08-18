"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowUp } from "lucide-react";

const installCommand = `npx component-library@latest add back-to-top`;

const usageCode = `import { BackToTop } from "@/components/_back-to-top";

<BackToTop />
<BackToTop threshold={200} variant="round" />`;

function BackToTopDemo({ variant = "round", color = "#6366f1", showProgress = false }: { variant?: "round" | "square" | "pill"; color?: string; showProgress?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("demo-scroll-area");
    const handleScroll = () => {
      const el = scrollContainer || document.documentElement;
      const scrollTop = el === document.documentElement ? window.scrollY : el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 300);
    };
    const target = scrollContainer || window;
    target.addEventListener("scroll", handleScroll);
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const el = document.getElementById("demo-scroll-area");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const shapeClass = variant === "pill" ? "rounded-full" : variant === "square" ? "rounded-lg" : "rounded-full";
  const sizeClass = "h-12 w-12";

  return (
    <div className="relative">
      <div id="demo-scroll-area" className="h-64 overflow-y-auto rounded-xl border border-border bg-white dark:border-border dark:bg-zinc-900">
        <div className="space-y-4 p-6">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium">Section {i + 1}</p>
              <p className="mt-1 text-xs text-muted-foreground">Scroll down to see the back-to-top button appear. Content continues below for demonstration purposes.</p>
            </div>
          ))}
        </div>
      </div>
      {visible && (
        <button
          onClick={scrollToTop}
          className={`absolute bottom-4 right-4 flex ${sizeClass} items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 ${shapeClass}`}
          style={{ backgroundColor: color }}
        >
          {showProgress ? (
            <svg className="h-full w-full -rotate-90" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
              <circle cx="22" cy="22" r={radius} fill="none" stroke="white" strokeWidth="3" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
          ) : null}
          <ArrowUp className="absolute h-5 w-5" />
        </button>
      )}
    </div>
  );
}

function BackToTopPositions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 left-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg hover:bg-zinc-700 dark:bg-muted dark:text-foreground">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90">
        <ArrowUp className="h-4 w-4" />
      </button>
    </>
  );
}

export default function BackToTopPage() {
  const [variant, setVariant] = useState<"round" | "square" | "pill">("round");
  const [color, setColor] = useState("#6366f1");
  const [showProgress, setShowProgress] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Back to Top</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Scroll-to-top button that appears when the user scrolls down. Supports different shapes, colors, and optional scroll progress indicator.
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
          <p className="mt-1 text-sm text-muted-foreground">Scroll inside the area to see the button appear.</p>
        </div>
        <ComponentPreview id="back-to-top-interactive">
          <div className="flex flex-col gap-4">
            <BackToTopDemo variant={variant} color={color} showProgress={showProgress} />
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                {(["round", "square", "pill"] as const).map((v) => (
                  <button key={v} onClick={() => setVariant(v)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${variant === v ? "bg-foreground text-background dark:bg-muted dark:text-foreground" : "border border-border hover:bg-muted dark:border-border dark:hover:bg-muted"}`}>
                    {v}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color
              </label>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" checked={showProgress} onChange={(e) => setShowProgress(e.target.checked)} className="rounded" /> Progress ring
              </label>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Shapes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different button shapes to match your design.</p>
        </div>
        <ComponentPreview id="back-to-top-shapes">
          <div className="flex flex-wrap items-center gap-6">
            {([
              { variant: "round" as const, label: "Round" },
              { variant: "square" as const, label: "Square" },
              { variant: "pill" as const, label: "Pill" },
            ]).map((s) => (
              <div key={s.variant} className="flex flex-col items-center gap-2">
                <div className={`flex h-12 w-12 items-center justify-center text-white shadow ${s.variant === "pill" ? "w-16 rounded-full" : s.variant === "square" ? "rounded-lg" : "rounded-full"}`} style={{ backgroundColor: "#6366f1" }}>
                  <ArrowUp className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different color schemes for various themes.</p>
        </div>
        <ComponentPreview id="back-to-top-colors">
          <div className="flex flex-wrap items-center gap-4">
            {[
              { color: "#6366f1", label: "Indigo" },
              { color: "#10b981", label: "Green" },
              { color: "#f94144", label: "Red" },
              { color: "#000000", label: "Black" },
              { color: "#6b7280", label: "Gray" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow" style={{ backgroundColor: c.color }}>
                  <ArrowUp className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground">{c.label}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Progress</h2>
          <p className="mt-1 text-sm text-muted-foreground">Show scroll progress with an animated ring.</p>
        </div>
        <ComponentPreview id="back-to-top-progress">
          <div className="flex flex-wrap items-center gap-8">
            {[
              { progress: 25, label: "25%" },
              { progress: 50, label: "50%" },
              { progress: 75, label: "75%" },
              { progress: 100, label: "100%" },
            ].map((p) => {
              const r = 18;
              const circ = 2 * Math.PI * r;
              const off = circ - (p.progress / 100) * circ;
              return (
                <div key={p.progress} className="flex flex-col items-center gap-2">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
                      <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
                      <circle cx="22" cy="22" r={r} fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
                    </svg>
                    <ArrowUp className="relative h-5 w-5 text-white" />
                  </div>
                  <span className="text-xs text-muted-foreground">{p.label}</span>
                </div>
              );
            })}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Use Cases</h2>
          <p className="mt-1 text-sm text-muted-foreground">Common placement and context scenarios.</p>
        </div>
        <ComponentPreview id="back-to-top-usecases">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <h3 className="text-sm font-medium">Long Article</h3>
              <p className="mt-1 text-xs text-muted-foreground">Bottom-right placement for content-heavy pages.</p>
              <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30">
                <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"><ArrowUp className="h-3 w-3" /></div>
              </div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <h3 className="text-sm font-medium">Dashboard</h3>
              <p className="mt-1 text-xs text-muted-foreground">Bottom-left to avoid conflicting with sidebar.</p>
              <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30">
                <div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs text-white"><ArrowUp className="h-3 w-3" /></div>
              </div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <h3 className="text-sm font-medium">Mobile App</h3>
              <p className="mt-1 text-xs text-muted-foreground">Centered at bottom for thumb-friendly access.</p>
              <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30">
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"><ArrowUp className="h-3 w-3" /></div>
              </div>
            </div>
            <div className="rounded-xl border border-border p-5 dark:border-border">
              <h3 className="text-sm font-medium">With Progress</h3>
              <p className="mt-1 text-xs text-muted-foreground">Show reading progress as a ring.</p>
              <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30">
                <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="12" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="2" />
                    <circle cx="16" cy="16" r="12" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * 0.3} strokeLinecap="round" />
                  </svg>
                  <ArrowUp className="relative h-3 w-3 text-primary" />
                </div>
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
                { prop: "variant", type: "\"round\" | \"square\" | \"pill\"", def: "\"round\"", req: "No" },
                { prop: "threshold", type: "number", def: "300", req: "No" },
                { prop: "color", type: "string", def: "\"#6366f1\"", req: "No" },
                { prop: "showProgress", type: "boolean", def: "false", req: "No" },
                { prop: "onClick", type: "() => void", def: "scroll to top", req: "No" },
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
