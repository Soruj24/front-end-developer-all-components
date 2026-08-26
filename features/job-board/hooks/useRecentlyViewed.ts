import { useState, useCallback } from "react";
import type { Job } from "../types";

const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Job[]>([]);

  const addRecentlyViewed = useCallback((job: Job) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((j) => j.id !== job.id);
      return [job, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, []);

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}
