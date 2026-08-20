"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import type { AnimatedCounterProps } from "./AnimatedCounter.types";

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
  startOnMount = true,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!startOnMount) return;

    let startTs = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startOnMount]);

  return (
    <span
      className={cn(
        "tabular-nums tracking-tight",
        className,
      )}
      aria-label={`${prefix}${target.toLocaleString()}${suffix}`}
    >
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
