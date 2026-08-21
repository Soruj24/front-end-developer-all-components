export const SCROLLSPY_SOURCE = `"use client";

import { forwardRef, useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";
import { ArrowUp } from "lucide-react";

interface ScrollspyNavItem { id: string; label: string; icon?: React.ReactNode; }

interface ScrollspyProps {
  items: ScrollspyNavItem[]; offset?: number; showProgress?: boolean;
  onSectionChange?: (id: string) => void; variant?: "sidebar" | "dots" | "pills"; className?: string;
}

interface ScrollspyProgressProps { progress: number; className?: string; }
interface ScrollspyBackToTopProps { threshold?: number; className?: string; }

function useScrollspy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)) : 0);
      let closest = sectionIds[0] ?? ""; let minDist = Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id); if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - offset);
        if (dist < minDist) { minDist = dist; closest = id; }
      }
      setActiveId(closest);
    });
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true }); handleScroll();
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafRef.current); };
  }, [handleScroll]);
  return { activeId, progress };
}

function scrollTo(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }

const Scrollspy = forwardRef<HTMLElement, ScrollspyProps>(({ items, offset = 100, variant = "sidebar", onSectionChange, className }, ref) => {
  const { activeId } = useScrollspy(items.map((i) => i.id), offset);
  useEffect(() => { onSectionChange?.(activeId); }, [activeId, onSectionChange]);

  if (variant === "dots") {
    return <nav ref={ref} className={cn("flex items-center gap-2", className)} aria-label="Section navigation">
      {items.map((item) => <button key={item.id} type="button" onClick={() => scrollTo(item.id)} title={item.label}
        className={cn("h-3 w-3 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          activeId === item.id ? "bg-primary scale-125 ring-4 ring-primary/20" : "bg-muted-foreground/20 hover:bg-muted-foreground/40")}
        aria-label={item.label} aria-current={activeId === item.id ? "true" : undefined} />)}
    </nav>;
  }

  if (variant === "pills") {
    return <nav ref={ref} className={cn("flex flex-wrap gap-1", className)} aria-label="Section navigation">
      {items.map((item) => <button key={item.id} type="button" onClick={() => scrollTo(item.id)}
        className={cn("rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          activeId === item.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground")}
        aria-current={activeId === item.id ? "page" : undefined}>{item.label}</button>)}
    </nav>;
  }

  return <nav ref={ref} className={cn("flex flex-col gap-0.5", className)} aria-label="Section navigation">
    {items.map((item) => { const isActive = activeId === item.id; return (
      <button key={item.id} type="button" onClick={() => scrollTo(item.id)}
        className={cn("group flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/50",
          isActive ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground")}
        aria-current={isActive ? "true" : undefined}>
        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200", isActive ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/50")} aria-hidden="true" />
        {item.icon && <span className="shrink-0 text-muted-foreground" aria-hidden="true">{item.icon}</span>}
        <span className="truncate">{item.label}</span>
      </button>
    ); })}
  </nav>;
});

Scrollspy.displayName = "Scrollspy";

const ScrollspyProgress = forwardRef<HTMLDivElement, ScrollspyProgressProps>(({ progress, className }, ref) => (
  <div ref={ref} className={cn("sticky top-0 z-10", className)}>
    <div className="h-1 overflow-hidden rounded-full bg-muted">
      <div className="h-full rounded-full bg-primary transition-all duration-150 ease-out" style={{ width: \`\${progress}%\` }} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Scroll progress" />
    </div>
    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
      <span>Scroll progress</span><span className="tabular-nums">{Math.round(progress)}%</span>
    </div>
  </div>
));
ScrollspyProgress.displayName = "ScrollspyProgress";

const ScrollspyBackToTop = forwardRef<HTMLButtonElement, ScrollspyBackToTopProps>(({ threshold = 300, className }, ref) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > threshold); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, [threshold]);
  return <button ref={ref} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className={cn("inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-95",
      visible ? "opacity-100" : "pointer-events-none opacity-0", className)} aria-label="Back to top">
    <ArrowUp className="h-4 w-4" />Back to Top</button>;
});
ScrollspyBackToTop.displayName = "ScrollspyBackToTop";

export { Scrollspy, ScrollspyProgress, ScrollspyBackToTop, useScrollspy };`;

export const SIDEBAR_EXAMPLE = `<Scrollspy items={navItems} variant="sidebar" />`;

export const DOTS_EXAMPLE = `<Scrollspy items={navItems} variant="dots" />`;

export const PILLS_EXAMPLE = `<Scrollspy items={navItems} variant="pills" />`;

export const PROGRESS_EXAMPLE = `<ScrollspyProgress progress={scrollProgress} />`;
