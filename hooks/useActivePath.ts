"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Returns a function that reports whether a given href matches the current
 * route. Uses prefix matching by default (for grouped routes); pass
 * `{ exact: true }` to match only the literal pathname.
 */
export function useActivePath() {
  const pathname = usePathname();

  return useCallback(
    (href: string, options?: { exact?: boolean }) => {
      if (options?.exact) return pathname === href;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );
}
