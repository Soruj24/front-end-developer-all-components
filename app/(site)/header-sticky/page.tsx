"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  PanelTop,
  Pin,
  ArrowUp,
  Eye,
  EyeOff,
  Settings,
  Bell,
} from "lucide-react";

const installCommand = `npx component-library@latest add header-sticky`;
const usageCode = `import { StickyHeader } from "@/components/header-sticky";

<StickyHeader offset={0} glass>
  <Logo />
  <Nav />
</StickyHeader>`;

function StickyHeader() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b transition-all duration-200 ${scrollY > 10 ? "bg-background/95 backdrop-blur shadow-sm" : "bg-background"}`}>
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HideOnScroll() {
  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const lastScroll = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const y = el.scrollTop;
      setVisible(y < lastScroll.current || y < 50);
      lastScroll.current = y;
      setScrollY(y);
    };
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-background transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlurHeader() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  const blurAmount = Math.min(scrollY / 20, 12);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 `}>
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompactHeader() {
  const [isCompact, setIsCompact] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setIsCompact(el.scrollTop > 60);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div className={`sticky top-0 z-10 flex items-center justify-between border-b bg-background transition-all duration-300 ${isCompact ? "px-6 py-2" : "px-6 py-4"}`}>
        <span className={`font-semibold text-foreground transition-all duration-300 ${isCompact ? "text-sm" : "text-lg"}`}>Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className={`text-muted-foreground hover:text-foreground transition-all duration-300 ${isCompact ? "text-xs" : "text-sm"}`}>{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingHeader() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border bg-muted/30" style={{ scrollbarWidth: "thin" }}>
      <div className={`sticky top-4 z-10 mx-4 flex items-center justify-between rounded-xl border bg-background px-6 py-3 shadow-lg transition-all duration-200 ${scrollY > 20 ? "shadow-xl" : "shadow-md"}`}>
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 pt-8 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-background">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlassHeader() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      <div className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl supports-[backdrop-filter]:bg-white/5`}>
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="relative z-10 p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border bg-background/80 backdrop-blur">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShadowHeader() {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", handler);
    return () => el.removeEventListener("scroll", handler);
  }, []);
  const shadowIntensity = Math.min(scrollY / 50, 1);
  return (
    <div ref={containerRef} className="relative h-72 overflow-y-auto rounded-lg border" style={{ scrollbarWidth: "thin" }}>
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-background transition-all duration-200"
        style={{ boxShadow: `0 ${shadowIntensity * 4}px ${shadowIntensity * 12}px rgba(0,0,0,${shadowIntensity * 0.1})` }}
      >
        <span className="text-lg font-semibold text-foreground">Logo</span>
        <nav className="flex items-center gap-6">
          {["Home", "About", "Contact"].map((item) => (
            <a key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
          ))}
        </nav>
      </div>
      <div className="p-6 space-y-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">{i + 1}</div>
            <div className="flex-1">
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
              <div className="h-2 w-32 bg-muted/60 rounded mt-2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeaderStickyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Header Sticky
          </h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Sticky header patterns with scroll-aware behaviors including hide-on-scroll, blur effects, compact mode, floating style, and dynamic shadows.
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
          <h3 className="text-lg font-medium text-foreground">Sticky Header</h3>
          <p className="text-sm text-muted-foreground">
            Basic sticky header with glass morphism backdrop blur on scroll.
          </p>
          <ComponentPreview id="header-sticky-basic">
            <StickyHeader />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hide on Scroll</h3>
          <p className="text-sm text-muted-foreground">
            Header hides when scrolling down and reappears when scrolling up.
          </p>
          <ComponentPreview id="header-sticky-hide">
            <HideOnScroll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Blur Header</h3>
          <p className="text-sm text-muted-foreground">
            Header with backdrop blur that increases as you scroll further.
          </p>
          <ComponentPreview id="header-sticky-blur">
            <BlurHeader />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Compact Header</h3>
          <p className="text-sm text-muted-foreground">
            Header that shrinks in height and text size when scrolled past threshold.
          </p>
          <ComponentPreview id="header-sticky-compact">
            <CompactHeader />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Floating Header</h3>
          <p className="text-sm text-muted-foreground">
            Header with rounded corners and inset margin creating a floating card effect.
          </p>
          <ComponentPreview id="header-sticky-floating">
            <FloatingHeader />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Glass Header</h3>
          <p className="text-sm text-muted-foreground">
            Full glassmorphism header with gradient background and frosted glass effect.
          </p>
          <ComponentPreview id="header-sticky-glass">
            <GlassHeader />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Shadow Header</h3>
          <p className="text-sm text-muted-foreground">
            Header with dynamic shadow depth that grows with scroll distance.
          </p>
          <ComponentPreview id="header-sticky-shadow">
            <ShadowHeader />
          </ComponentPreview>
        </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">glass</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">hideOnScroll</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
