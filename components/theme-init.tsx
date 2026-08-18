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
        apply(mq.matches);
        mq.addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) apply(e.matches);
        });
      }
    } catch (e) {}
  }, []);

  return null;
}
