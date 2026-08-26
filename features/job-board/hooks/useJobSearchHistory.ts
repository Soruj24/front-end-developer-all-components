import { useState, useCallback } from "react";
import type { SearchHistoryEntry } from "../types";

const MAX_HISTORY = 20;

export function useJobSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  const addSearch = useCallback((query: string, location: string) => {
    if (!query.trim() && !location.trim()) return;
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) => !(h.query === query && h.location === location)
      );
      return [
        {
          id: `search-${Date.now()}`,
          query: query.trim(),
          location: location.trim(),
          timestamp: new Date().toISOString(),
        },
        ...filtered,
      ].slice(0, MAX_HISTORY);
    });
  }, []);

  const removeSearch = useCallback((id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addSearch,
    removeSearch,
    clearHistory,
  };
}
