"use client";

import { useCallback, useState } from "react";

/** Minimal boolean state toggle with `set` and `toggle` helpers. */
export function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue((current) => !current), []);
  return [value, toggle, setValue] as const;
}
