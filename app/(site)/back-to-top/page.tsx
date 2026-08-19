"use client";

import { useState, useEffect } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ArrowUp } from "lucide-react";
import { BACKTOTOP_SOURCE, SHAPES_EXAMPLE, COLORS_EXAMPLE, PROGRESS_EXAMPLE, USECASES_EXAMPLE } from "./back-to-top-source";

function BackToTopDemo({ variant = "round", color = "#6366f1", showProgress = false }: { variant?: "round" | "square" | "pill"; color?: string; showProgress?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("demo-scroll-area") || document.documentElement;
      const scrollTop = el === document.documentElement ? window.scrollY : el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
      setVisible(scrollTop > 300);
    };
    const target = document.getElementById("demo-scroll-area") || window;
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
  const shapeClass = variant === "square" ? "rounded-lg" : "rounded-full";
  return (
    <div className="relative w-full">
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
        <button onClick={scrollToTop} className={`absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center text-white shadow-lg transition-all duration-300 hover:scale-110 ${shapeClass}`} style={{ backgroundColor: color }}>
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

function InteractiveDemo() {
  const [variant, setVariant] = useState<"round" | "square" | "pill">("round");
  const [color, setColor] = useState("#6366f1");
  const [showProgress, setShowProgress] = useState(false);
  return (
    <div className="flex w-full flex-col gap-4">
      <BackToTopDemo variant={variant} color={color} showProgress={showProgress} />
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {(["round", "square", "pill"] as const).map((v) => (
            <button key={v} onClick={() => setVariant(v)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${variant === v ? "bg-foreground text-background dark:bg-muted dark:text-foreground" : "border border-border hover:bg-muted dark:border-border dark:hover:bg-muted"}`}>{v}</button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer" /> Color</label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={showProgress} onChange={(e) => setShowProgress(e.target.checked)} className="rounded" /> Progress ring</label>
      </div>
    </div>
  );
}

function ShapesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {(["round", "square", "pill"] as const).map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-2">
          <div className={`flex h-12 items-center justify-center text-white shadow ${variant === "pill" ? "w-16 rounded-full" : variant === "square" ? "w-12 rounded-lg" : "w-12 rounded-full"}`} style={{ backgroundColor: "#6366f1" }}><ArrowUp className="h-5 w-5" /></div>
          <span className="text-xs text-muted-foreground capitalize">{variant}</span>
        </div>
      ))}
    </div>
  );
}

function ColorsDemo() {
  const colors = [
    { color: "#6366f1", label: "Indigo" },
    { color: "#10b981", label: "Green" },
    { color: "#f94144", label: "Red" },
    { color: "#000000", label: "Black" },
    { color: "#6b7280", label: "Gray" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-4">
      {colors.map((c) => (
        <div key={c.label} className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow" style={{ backgroundColor: c.color }}><ArrowUp className="h-5 w-5" /></div>
          <span className="text-xs text-muted-foreground">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function ProgressDemo() {
  const items = [25, 50, 75, 100];
  return (
    <div className="flex flex-wrap items-center gap-8">
      {items.map((pct) => {
        const r = 18;
        const circ = 2 * Math.PI * r;
        const off = circ - (pct / 100) * circ;
        return (
          <div key={pct} className="flex flex-col items-center gap-2">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="3" />
                <circle cx="22" cy="22" r={r} fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
              </svg>
              <ArrowUp className="relative h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">{pct}%</span>
          </div>
        );
      })}
    </div>
  );
}

function UseCasesDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-border p-5 dark:border-border">
        <h3 className="text-sm font-medium">Long Article</h3>
        <p className="mt-1 text-xs text-muted-foreground">Bottom-right placement for content-heavy pages.</p>
        <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30"><div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"><ArrowUp className="h-3 w-3" /></div></div>
      </div>
      <div className="rounded-xl border border-border p-5 dark:border-border">
        <h3 className="text-sm font-medium">Dashboard</h3>
        <p className="mt-1 text-xs text-muted-foreground">Bottom-left to avoid conflicting with sidebar.</p>
        <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30"><div className="absolute bottom-2 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-xs text-white"><ArrowUp className="h-3 w-3" /></div></div>
      </div>
      <div className="rounded-xl border border-border p-5 dark:border-border">
        <h3 className="text-sm font-medium">Mobile App</h3>
        <p className="mt-1 text-xs text-muted-foreground">Centered at bottom for thumb-friendly access.</p>
        <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30"><div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground"><ArrowUp className="h-3 w-3" /></div></div>
      </div>
      <div className="rounded-xl border border-border p-5 dark:border-border">
        <h3 className="text-sm font-medium">With Progress</h3>
        <p className="mt-1 text-xs text-muted-foreground">Show reading progress as a ring.</p>
        <div className="relative mt-3 h-24 overflow-hidden rounded-lg bg-muted/30"><div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center"><svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="2" /><circle cx="16" cy="16" r="12" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray={2 * Math.PI * 12} strokeDashoffset={2 * Math.PI * 12 * 0.3} strokeLinecap="round" /></svg><ArrowUp className="relative h-3 w-3 text-primary" /></div></div>
      </div>
    </div>
  );
}

export default function BackToTopPage() {
  return (
    <ComponentDocPage name="Back to Top" category="Feedback" description="Scroll-to-top button that appears when the user scrolls down. Supports different shapes, colors, and optional scroll progress indicator.">
      <PreviewPanel filename="back-to-top.tsx">
        <InteractiveDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BACKTOTOP_SOURCE} filename="components/ui/BackToTop/BackToTop.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Shapes" description="Different button shapes to match your design." code={SHAPES_EXAMPLE}><ShapesDemo /></ExampleBlock>
        <ExampleBlock title="Color Variants" description="Different color schemes for various themes." code={COLORS_EXAMPLE}><ColorsDemo /></ExampleBlock>
        <ExampleBlock title="With Progress" description="Show scroll progress with an animated ring." code={PROGRESS_EXAMPLE}><ProgressDemo /></ExampleBlock>
        <ExampleBlock title="Use Cases" description="Common placement and context scenarios." code={USECASES_EXAMPLE}><UseCasesDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}