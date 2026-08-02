"use client";

import { useCallback, useState } from "react";

/** Controls the mobile sidebar open/close state. */
export function useSidebar() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((current) => !current), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, toggle, close };
}
