"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

function formatStatValue(value: number): string {
  if (value >= 1_000_000) {
    const v = value / 1_000_000;
    return v % 1 === 0 ? `${v}M` : `${v.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const v = value / 1_000;
    return v % 1 === 0 ? `${v}K` : `${v.toFixed(1)}K`;
  }
  return String(value);
}

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function AnimatedNumber({
  value,
  duration = 1200,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplayed(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let raf: number;
    let start: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const animate = (timestamp: number) => {
              if (start === null) start = timestamp;
              const elapsed = timestamp - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplayed(Math.round(eased * value));
              if (progress < 1) {
                raf = requestAnimationFrame(animate);
              }
            };
            raf = requestAnimationFrame(animate);
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatStatValue(displayed)}
    </span>
  );
}

interface Stat {
  value: number | null;
  label: string;
  suffix?: string;
}

export function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {stat.value !== null ? (
              <>
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </>
            ) : (
              <span className="text-muted-foreground/40">—</span>
            )}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
