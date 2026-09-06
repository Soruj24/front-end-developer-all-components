"use client";

import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    try {
      const stored = (() => {
        try {
          return localStorage.getItem("theme");
        } catch (e) {
          return null;
        }
      })();
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const apply = (dark: boolean) => {
        document.documentElement.classList.toggle("dark", dark);
      };
      if (stored === "dark") apply(true);
      else if (stored === "light") apply(false);
      else {
        // "system" or unset follows the OS; blocking script in layout already
        // painted the correct class, this only keeps it in sync.
        apply(mq.matches);
        const onChange = (e: MediaQueryListEvent) => {
          try {
            if (!localStorage.getItem("theme")) apply(e.matches);
          } catch {}
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      }
    } catch (e) {}
  }, []);

  return null;
}
