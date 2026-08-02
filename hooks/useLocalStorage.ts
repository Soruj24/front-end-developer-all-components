"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Reads and writes a value to localStorage, falling back to the initial
 * value when storage is unavailable or the key has never been set.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : (JSON.parse(stored) as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode / quota) — keep in-memory state.
    }
  }, [key, value]);

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignore storage errors.
    }
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, remove] as const;
}
