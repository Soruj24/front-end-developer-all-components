"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useScrollspy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(totalHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)) : 0);

      let closest = sectionIds[0] ?? "";
      let minDist = Infinity;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - offset);
        if (dist < minDist) { minDist = dist; closest = id; }
      }
      setActiveId(closest);
    });
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(rafRef.current); };
  }, [handleScroll]);

  return { activeId, progress };
}
