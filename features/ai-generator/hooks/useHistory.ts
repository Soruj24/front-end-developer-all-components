"use client";

import { useCallback, useEffect, useState } from "react";
import type { GeneratorResult } from "../types";
import { HISTORY_STORAGE_KEY, MAX_HISTORY } from "../constants";

function readHistory(): GeneratorResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GeneratorResult[]) : [];
  } catch {
    return [];
  }
}

export interface UseHistoryResult {
  entries: GeneratorResult[];
  add: (result: GeneratorResult) => void;
  toggleFavorite: (id: string) => void;
  remove: (id: string) => void;
}

/** Persisted generation history + favorites (localStorage). */
export function useHistory(): UseHistoryResult {
  const [entries, setEntries] = useState<GeneratorResult[]>(() =>
    typeof window === "undefined" ? [] : readHistory()
  );

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Storage can be unavailable (private mode, quota); history is best-effort.
    }
  }, [entries]);

  const add = useCallback((result: GeneratorResult) => {
    setEntries((prev) =>
      [result, ...prev.filter((entry) => entry.id !== result.id)].slice(0, MAX_HISTORY)
    );
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, favorite: !entry.favorite } : entry))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  return { entries, add, toggleFavorite, remove };
}
