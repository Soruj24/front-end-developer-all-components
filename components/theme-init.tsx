"use client";

import { useEffect, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { THEME_INIT_SCRIPT } from "@/constants/theme";

/**
 * Applies the persisted theme before first paint, then keeps `<html>` in sync
 * after hydration (including OS preference changes).
 */
export function ThemeInit() {
  const didInsert = useRef(false);

  // Server-only: the callback is flushed into the streamed `<head>` during SSR
  // (no-op on the client, where there is no flush provider). That keeps the
  // blocking script out of the React tree, so React 19 never sees — and never
  // warns about — a `<script>` rendered from a component.
  useServerInsertedHTML(() => {
    if (didInsert.current) return null;
    didInsert.current = true;
    return <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />;
  });

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
        // "system" or unset follows the OS; the head script already painted the
        // correct class, this only keeps it in sync.
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
