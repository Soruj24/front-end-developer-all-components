"use client";

import { useEffect, useState } from "react";

interface UseScrollDetectionOptions {
  threshold?: number;
  throttleMs?: number;
}

export function useScrollDetection(options: UseScrollDetectionOptions = {}) {
  const { threshold = 4, throttleMs = 100 } = options;
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let lastTime = 0;

    const onScroll = () => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > threshold);
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, throttleMs]);

  return { scrolled, scrollY };
}
